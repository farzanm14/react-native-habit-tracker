import Card from "@/components/base/Card";
import Checkbox from "@/components/base/CheckBox";
import Counter from "@/components/base/Counter";
import MyText from "@/components/base/Text";
import R from "@/constants";
import { getTodayRecord } from "@/hooks/useRecords";
import { Habit } from "@/store/types";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

interface HabitItemProps {
  habit: Habit;
  updateRecord: () => void;
}

export default function HabitItem({ habit, updateRecord }: HabitItemProps) {
  //used memoization concept to avoid re-rendering if todaysRecord doesn't change and update it on change of habit.records
  const todaysRecord = useMemo(() => getTodayRecord(habit), [habit]);

  return (
    <Card style={styles.card}>
      <View>
        <MyText style={styles.habitName}>{habit.title}</MyText>
        {habit?.description && (
          <MyText variant="subtitle" style={styles.habitDescription}>
            {habit?.description}
          </MyText>
        )}
      </View>
      {habit?.target ? (
        <Counter
          target={habit?.target ?? 1}
          record={(todaysRecord?.value as number) ?? 0}
          onChange={updateRecord}
        />
      ) : (
        <Checkbox
          checked={(todaysRecord?.value as boolean) ?? false}
          onChange={updateRecord}
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
  habitDescription: { color: R.colors.primaryDark },
});
