import List from "@/components/base/List";
import HabitItem from "@/components/features/habit/HabitItem";
import { mockHabits } from "@/constants/mockData";
import { Habit } from "@/store/types";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HabitsList() {
  const renderNotifItem = (item: Habit) => <HabitItem habit={item} />;
  return (
    <View style={styles.container}>
      <List
        renderItem={({ item }) => renderNotifItem(item)}
        data={mockHabits}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
