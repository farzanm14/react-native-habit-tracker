import { calculateStreak } from "@/hooks/useRecords";
import storageService from "@/services/storageService";
import useHabitStore from "@/store/habitStore";
import { Habit } from "@/store/types";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

const HABITS_KEY = "habits";

export function usePersistedHabits() {
  const { habits } = useHabitStore();

  // Load habits on app start
  useEffect(() => {
    const loadHabits = async () => {
      const savedHabits = await storageService.getItem<Habit[]>(HABITS_KEY);
      if (savedHabits && savedHabits.length > 0) {
        // calculate Streak of today for each habit
        savedHabits.forEach((habit) => {
          habit.streak = calculateStreak(habit.records);
        });
        useHabitStore.setState({ habits: savedHabits });
      }
    };
    loadHabits();
  }, []);

  // Save habits on app background/terminate
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        await storageService.saveItem(HABITS_KEY, habits);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [habits]);
}
