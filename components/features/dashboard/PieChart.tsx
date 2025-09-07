import R from "@/constants";
import { Habit } from "@/store/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export type PieChartSlice = {
  value: number;
  color: string;
  label: string;
};

export type PieChartProps = {
  data: PieChartSlice[];
};

export default function InteractiveDonut({ data }: PieChartProps) {
  return (
    <View style={[styles.wrapper]}>
      <PieChart
        data={data}
        donut
        innerRadius={70}
        showGradient
        strokeWidth={R.dimensions.borderWidthHalf}
        strokeColor={R.colors.success}
        centerLabelComponent={() => null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", justifyContent: "center" },
  centerWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    marginBottom: R.dimensions.v6,
  },
  percentText: { fontWeight: "700", fontSize: R.dimensions.fs16 },
  smallText: { fontSize: R.dimensions.fs12, color: R.colors.textSubtitle },
});

export const mapHabitsToPieChartData = (habits: Habit[]): PieChartSlice[] => {
  const statusCounts = {
    done: 0,
    none: 0,
    partial: 0,
  };

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" format

  habits.forEach((habit) => {
    const todayRecord = habit.records?.find((record) => record.date === today);

    if (todayRecord) {
      if (todayRecord.status in statusCounts) {
        statusCounts[todayRecord.status]++;
      }
    } else {
      // If a habit has no record for today, count it as "none"
      statusCounts.none++;
    }
  });

  // Convert the status counts into the pie chart's required data format
  const pieChartData: PieChartSlice[] = [
    { value: statusCounts.done, color: R.colors.success, label: "Done" },
    { value: statusCounts.partial, R.colors.partial, label: "Partial" },
    { value: statusCounts.none, R.colors.error, label: "None" },
  ];

  return pieChartData;
};
