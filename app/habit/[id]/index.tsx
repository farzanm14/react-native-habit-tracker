import Container from "@/components/base/Container";
import MyText from "@/components/base/Text";
import R from "@/constants";
import useHabitStore from "@/store/habitStore";
import dayjs from "dayjs";
import { useNavigation } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function HabitCalendarScreen() {
  const navigation = useNavigation();
  const { selectedHabit } = useHabitStore();
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Habit Calendar",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  // Memoize marked dates for the current month
  const markedDates = useMemo(() => {
    if (!selectedHabit?.records) return {};

    // Filter records for current month
    const monthRecords = selectedHabit.records.filter((r) =>
      r.date.startsWith(currentMonth)
    );

    // Build markedDates object
    const marks: Record<string, any> = {};
    monthRecords.forEach((record) => {
      if (record.status === "done") {
        marks[record.date] = {
          customStyles: {
            container: styles.doneDay,
            text: styles.doneText,
          },
        };
      } else if (record.status === "partial") {
        marks[record.date] = {
          customStyles: {
            container: styles.partialDay,
            text: styles.partialText,
          },
        };
      }
    });
    return marks;
  }, [selectedHabit?.records, currentMonth]);

  return (
    <Container>
      <View style={styles.infoContainer}>
        <MyText variant="bold" style={styles.header}>
          {selectedHabit?.title} Records
        </MyText>
        <MyText variant="subtitle" style={styles.description}>
          {selectedHabit?.description}
        </MyText>
        <MyText variant="title" style={styles.streak}>
          Streak: {selectedHabit?.streak ?? 0} days
        </MyText>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth + "-01"}
          markingType="custom"
          maxDate={dayjs().format("YYYY-MM-DD")}
          markedDates={markedDates}
          onMonthChange={(month) =>
            setCurrentMonth(month.dateString.slice(0, 7))
          }
          theme={calendarTheme}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginVertical: R.dimensions.v16,
    gap: R.dimensions.v16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
  description: {
    color: R.colors.textPending,
  },
  calendarContainer: {
    margin: R.dimensions.h16,
    borderRadius: R.dimensions.radius10,
    overflow: "hidden",
    elevation: 2,
  },
  doneDay: {
    backgroundColor: R.colors.success,
    borderRadius: R.dimensions.radius15,
  },
  doneText: {
    color: R.colors.whiteSmoke,
    fontWeight: "bold",
  },
  partialDay: {
    backgroundColor: R.colors.partial,
    borderRadius: R.dimensions.radius15,
  },
  partialText: {
    color: R.colors.whiteSmoke,
    fontWeight: "bold",
  },
  streak: {
    color: R.colors.primary,
  },
});

const calendarTheme = {
  todayTextColor: R.colors.primaryDark,
  monthTextColor: R.colors.primary,
  backgroundColor: R.colors.backgroundPrimary,
};
