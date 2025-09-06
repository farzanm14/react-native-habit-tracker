import { mockHabits } from "@/constants/mockData";
import createSelectors from "@/store/createSelectors";
import { Habit } from "@/store/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface HabitStoreState {
  habits: Habit[];
}

type HabitStoreActions = {
  updateHabit: (updatedHabit: Habit) => void;
  addHabit: (newHabit: Habit) => void;
};

const initialStoreValue: HabitStoreState = {
  habits: mockHabits,
};

export const useHabitStoreBase = create<HabitStoreState & HabitStoreActions>()(
  immer((set) => ({
    ...initialStoreValue,
    updateHabit: (updatedHabit: Habit) =>
      set((state) => {
        const index = state.habits.findIndex(
          (h: Habit) => h.id === updatedHabit.id
        );
        if (index !== -1) {
          state.habits[index] = updatedHabit;
        }
      }),
    addHabit: (newHabit: Habit) =>
      set((state) => {
        state.habits.push(newHabit);
      }),
  }))
);

const useHabitStore = createSelectors(useHabitStoreBase);
export default useHabitStore;
