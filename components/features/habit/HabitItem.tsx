import Card from "@/components/base/Card";
import Checkbox from "@/components/base/CheckBox";
import Counter from "@/components/base/Counter";
import MyText from "@/components/base/Text";
import R from "@/constants";
import { Habit } from "@/store/types";
import React from "react";
import { StyleSheet } from "react-native";

interface HabitItemProps {
  habit: Habit;
  updateRecord: () => void;
}

export default function HabitItem({ habit, updateRecord }: HabitItemProps) {
  return (
    <Card style={styles.card}>
      <MyText style={styles.habitName}>{habit.title}</MyText>
      {!habit?.target?.hasAmount ? (
        <Checkbox checked={true} onChange={() => updateRecord()} />
      ) : (
        <Counter
          target={habit?.target?.amount ?? 1}
          record={0}
          onChange={() => {}}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitName: { color: R.colors.primary },
});
