import { Habit } from "@/store/types";
import dayjs from "dayjs";

export function updateRecord(habit: Habit) {
  const today = dayjs().format("YYYY-MM-DD");

  let updatedRecords = habit.records ? [...habit.records] : [];

  // find today's record
  const todayIndex = updatedRecords.findIndex((r) => r.date === today);

  if (habit.target?.hasAmount) {
    // quantitative habit
    if (todayIndex !== -1) {
      // increment existing record
      const prev = (updatedRecords[todayIndex].value as number) || 0;
      updatedRecords[todayIndex] = {
        ...updatedRecords[todayIndex],
        value: Math.min(prev + 1, habit.target.amount ?? prev + 1),
        status: "partial",
      };
      if (updatedRecords[todayIndex].value === habit.target.amount) {
        updatedRecords[todayIndex].status = "done";
      }
    } else {
      // create new record for today
      updatedRecords.push({
        date: today,
        value: 1,
        status:
          habit.target.amount && habit.target.amount === 1 ? "done" : "partial",
      });
    }
  } else {
    // boolean habit
    if (todayIndex !== -1) {
      // toggle between done and not_done
      const currentStatus = updatedRecords[todayIndex].status;
      updatedRecords[todayIndex] = {
        ...updatedRecords[todayIndex],
        status: currentStatus === "done" ? "none" : "done",
        value: currentStatus === "done" ? false : true,
      };
    } else {
      updatedRecords.push({
        date: today,
        status: "done",
        value: true,
      });
    }
  }

  const newHabitValue: Habit = {
    ...habit,
    records: updatedRecords,
  };

  return newHabitValue;
}
