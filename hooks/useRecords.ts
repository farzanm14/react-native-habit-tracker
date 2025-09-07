import { Habit } from "@/store/types";
import dayjs from "dayjs";

export function calculateStreak(records: Habit["records"]) {
  if (!records || records.length === 0) return 0;
  // Sort records by date descending
  const sorted = [...records]
    .filter((r) => r.status === "done")
    .sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  let currentDate = dayjs().format("YYYY-MM-DD");

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].date === currentDate) {
      streak++;
      currentDate = dayjs(currentDate).subtract(1, "day").format("YYYY-MM-DD");
    } else {
      break;
    }
  }
  return streak;
}

export function updateRecord(habit: Habit) {
  const today = dayjs().format("YYYY-MM-DD");
  let updatedRecords = habit.records ? [...habit.records] : [];
  const todayIndex = updatedRecords.findIndex((r) => r.date === today);
  let updatedStreak = habit?.streak ?? 0;

  if (habit.target) {
    // Quantitative habit
    let newValue = 1;
    if (todayIndex !== -1) {
      newValue = Math.min(
        ((updatedRecords[todayIndex].value as number) || 0) + 1,
        habit.target
      );
      // Replace the record with a new object
      updatedRecords[todayIndex] = {
        ...updatedRecords[todayIndex],
        value: newValue,
      };
    } else {
      updatedRecords.push({ date: today, value: 1, status: "partial" });
    }
    // Update status
    const record =
      updatedRecords[
        todayIndex !== -1 ? todayIndex : updatedRecords.length - 1
      ];
    if (record.value === habit.target) {
      record.status = "done";
      updatedStreak = updatedStreak + 1; // Update streak cause today's record is 'done'
    } else if ((record.value as number) < habit.target) {
      record.status = "partial";
    } else {
      record.status = "none";
    }
  } else {
    // Boolean habit
    if (todayIndex !== -1) {
      // If checked, uncheck (remove record)
      updatedRecords.splice(todayIndex, 1);
      updatedStreak = updatedStreak - 1; //remove today's streak cause unchecked
    } else {
      // If unchecked, check (add record)
      updatedRecords.push({
        date: today,
        status: "done",
        value: true,
      });
      updatedStreak = updatedStreak + 1; // Update streak cause today's record is 'done'
    }
  }

  return {
    ...habit,
    records: updatedRecords,
    streak: updatedStreak,
  };
}

// given a habit and a date in format "YYYY-MM-DD" to this func to returns the record of that date, or null if not found
export function getRecordByDate(habit: Habit, date: string) {
  if (!habit.records) return null;
  const record = habit.records.find((r) => r.date === date);
  return record || null;
}

export function getTodayRecord(habit: Habit) {
  return getRecordByDate(habit, dayjs().format("YYYY-MM-DD"));
}
