import { Habit } from "@/store/types";
import dayjs from "dayjs";

export function updateRecord(habit: Habit) {
  const today = dayjs().format("YYYY-MM-DD");
  let updatedRecords = habit.records ? [...habit.records] : [];
  const todayIndex = updatedRecords.findIndex((r) => r.date === today);

  if (habit.target) {
    // Quantitative habit
    let newValue = 1;
    if (todayIndex !== -1) {
      newValue = Math.min(
        ((updatedRecords[todayIndex].value as number) || 0) + 1,
        habit.target
      );
      updatedRecords[todayIndex].value = newValue;
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
    } else {
      // If unchecked, check (add record)
      updatedRecords.push({
        date: today,
        status: "done",
        value: true,
      });
    }
  }

  return {
    ...habit,
    records: updatedRecords,
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
