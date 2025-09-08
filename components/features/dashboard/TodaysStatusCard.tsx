import Card from "@/components/base/Card";
import MyText from "@/components/base/Text";
import Info from "@/components/features/dashboard/Info";
import PieChart from "@/components/features/dashboard/PieChart";
import R from "@/constants";
import { ChartData, mapHabitsToPieChartData } from "@/hooks/useDashboardData";
import useHabitStore from "@/store/habitStore";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function TodayStatusCard() {
  const { habits } = useHabitStore();

  const pieChartData: ChartData = useMemo(
    () => mapHabitsToPieChartData(habits),
    [habits]
  ); //  calculate pieChartData only when habits change

  return (
    <Card style={styles.chartCard}>
      <MyText variant="title">{`Todays Habits Status`}</MyText>
      <PieChart
        centerLabel={`${pieChartData.completedHabitsPercentage}% \n Completed`}
        data={pieChartData.allHabitsInfo}
      />
      <View style={styles.chartInfoContainer}>
        {pieChartData.allHabitsInfo.map((slice) => (
          <Info
            key={slice.label}
            label={`${slice.label}:${slice.value}`}
            color={slice.color}
          />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    justifyContent: "center",
    alignItems: "center",
    gap: R.dimensions.v12,
    backgroundColor: R.colors.cardPrimary,
    paddingVertical: R.dimensions.v20,
  },
  chartInfoContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: R.dimensions.h16,
  },
});
