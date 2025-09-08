import { PieChartSlice } from "@/components/features/dashboard/PieChart";
import R from "@/constants";
import { Habit } from "@/store/types";

export type ChartData = {
  allHabitsInfo: PieChartSlice[];
  completedHabitsPercentage: string;
};

export const mapHabitsToPieChartData = (habits: Habit[]): ChartData => {
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
    { value: statusCounts.partial, color: R.colors.partial, label: "Partial" },
    { value: statusCounts.none, color: R.colors.error, label: "None" },
  ];

  const completedPercentage = Math.floor(
    (statusCounts?.done / habits?.length) * 100
  );
  return {
    allHabitsInfo: pieChartData,
    completedHabitsPercentage: Number.isNaN(completedPercentage)
      ? "0"
      : completedPercentage.toString(),
  };
};
