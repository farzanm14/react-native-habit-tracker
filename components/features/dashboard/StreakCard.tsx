import Card from "@/components/base/Card";
import List from "@/components/base/List";
import MyText from "@/components/base/Text";
import StreakItem from "@/components/features/dashboard/StreakItem";
import R from "@/constants";
import useHabitStore from "@/store/habitStore";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function DashboardScreen() {
  const { habits } = useHabitStore();

  const sortedHabitsByStreak = useMemo(
    () =>
      [...habits] //use a copy of habits; since sort() method mutates the original array and at same time habits is managed by Zustand + Immer, it's frozen and cannot be mutated.
        .filter((habit) => (habit?.streak || 0) > 0)
        .sort((a, b) => (b?.streak || 0) - (a?.streak || 0)),
    [habits]
  );

  return (
    <Card style={styles.streakCard}>
      <MyText variant="title" style={styles.streakTitle}>
        Your Habits Streak
      </MyText>
      <List
        data={sortedHabitsByStreak}
        renderItem={({ item }) => (
          <StreakItem value={item.streak} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        emptyListMessage={`No streak started yet! \n Update your habits status`}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  streakCard: {
    gap: R.dimensions.v12,
  },
  streakTitle: {
    alignSelf: "center",
  },
  list: {
    gap: R.dimensions.v8,
  },
});
