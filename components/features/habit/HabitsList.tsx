import List from "@/components/base/List";
import HabitItem from "@/components/features/habit/HabitItem";
import { updateRecord } from "@/hooks/useRecords";
import useHabitStore from "@/store/habitStore";
import { Habit } from "@/store/types";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HabitsList() {
  const { habits, updateHabit } = useHabitStore();

  function handleChangeRecord(habit: Habit) {
    const updated = updateRecord(habit);
    updateHabit(updated);
  }

  const renderNotifItem = (item: Habit) => (
    <HabitItem habit={item} updateRecord={() => handleChangeRecord(item)} />
  );
  return (
    <View style={styles.container}>
      <List
        renderItem={({ item }) => renderNotifItem(item)}
        keyExtractor={(item) => item.id}
        data={habits}
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
