import Card from "@/components/base/Card";
import Container from "@/components/base/Container";
import List from "@/components/base/List";
import MyText from "@/components/base/Text";
import Info from "@/components/features/dashboard/Info";
import InteractiveDonut, {
  mapHabitsToPieChartData,
} from "@/components/features/dashboard/PieChart";
import StreakItem from "@/components/features/dashboard/StreakItem";
import R from "@/constants";
import useHabitStore from "@/store/habitStore";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function DashboardScreen() {
  const { habits } = useHabitStore();

  const pieChartData = useMemo(() => mapHabitsToPieChartData(habits), [habits]); //  calculate pieChartData only when habits change
  const sortedHabitsByStreak = useMemo(
    () => habits.sort((a, b) => (b?.streak || 0) - (a?.streak || 0)),
    [habits]
  );

  return (
    <Container withBottomTab style={styles.container}>
      <ScrollView>
        <Card style={styles.chartCard}>
          <MyText variant="title">Today Habits Status</MyText>
          <InteractiveDonut data={pieChartData} />
          <View style={styles.chartInfoContainer}>
            {pieChartData.map((slice) => (
              <Info
                key={slice.label}
                label={`${slice.label}:${slice.value}`}
                color={slice.color}
              />
            ))}
          </View>
        </Card>
        <Card style={styles.streakCard}>
          <MyText variant="title" style={styles.streakTitle}>
            Your Habits Streak
          </MyText>
          <List
            data={sortedHabitsByStreak}
            renderItem={({ item }) => (
              <StreakItem value={item.streak} title={item.title} />
            )}
            contentContainerStyle={styles.list}
          />
        </Card>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  chartInfoContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: R.dimensions.h16,
  },
  chartCard: {
    justifyContent: "center",
    alignItems: "center",
    gap: R.dimensions.v12,
    backgroundColor: R.colors.cardPrimary,
    paddingVertical: R.dimensions.v20,
  },
  streakCard: {
    gap: R.dimensions.v12,
  },
  streakTitle: {
    alignSelf: "center",
  },
  streakValue: {
    marginVertical: R.dimensions.v4,
    color: R.colors.primary,
  },
  list: {
    gap: R.dimensions.v8,
  },
});
