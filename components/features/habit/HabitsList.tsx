import List from "@/components/base/List";
import HabitItem from "@/components/features/habit/HabitItem";
import { updateRecord } from "@/hooks/useRecords";
import useHabitStore from "@/store/habitStore";
import { Habit } from "@/store/types";
import React from "react";
import { StyleSheet, View } from "react-native";

type ListProps = {
  onHabitPress: () => void;
};

export default function HabitsList({ onHabitPress }: ListProps) {
  const { habits, updateHabit } = useHabitStore();

  function handleChangeRecord(habit: Habit) {
    const updated = updateRecord(habit);
    updateHabit(updated);
  }

  function showHabitOptions(habit: Habit) {
    useHabitStore.setState({ selectedHabit: habit });
    onHabitPress();
  }

  const renderNotifItem = (item: Habit) => (
    <HabitItem
      onPress={() => showHabitOptions(item)}
      habit={item}
      updateRecord={() => handleChangeRecord(item)}
    />
  );
  return (
    <View style={styles.container}>
      <List
        renderItem={({ item }) => renderNotifItem(item)}
        keyExtractor={(item) => item.id}
        data={habits}
        emptyListMessage={`No habits found. \n Add a new habit to get started! `}
        style={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height: "100%",
  },
});
