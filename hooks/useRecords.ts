import { DailyRecord, Habit } from "@/store/types";
import dayjs from "dayjs";

export function calculateStreak(records: Habit["records"]) {
  let streak = 0;

  if (!records || records.length === 0) return 0;
  // Map records by date for fast lookup
  const recordMap = new Map<string, DailyRecord>();
  records.forEach((r) => recordMap.set(r.date, r));

  //check todays record separately, cause user still has time to make "done" todays task and no need to quite checking other days
  const todayDate = dayjs().format("YYYY-MM-DD");
  const todayRecord = recordMap.get(todayDate);
  if (todayRecord && todayRecord.status === "done") streak++; //today has "done" record

  let yesterdayDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  while (true) {
    const record = recordMap.get(yesterdayDate);
    if (!record || record.status !== "done") break;
    streak++;
    yesterdayDate = dayjs(yesterdayDate)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
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

type UpdatedHabitInfo = {
  records?: DailyRecord[];
  streak?: number;
};
export function updateRecordOnEditTarget(
  currentHabit: Habit,
  newTarget: boolean | number
): UpdatedHabitInfo {
  const today = dayjs().format("YYYY-MM-DD");
  const todayRecordIndex = currentHabit.records?.findIndex(
    (r) => r.date === today
  );

  if (
    //today has record & target has changed
    currentHabit.records &&
    todayRecordIndex &&
    todayRecordIndex !== -1 &&
    currentHabit?.target !== newTarget
  ) {
    const prevStreak =
      typeof currentHabit?.streak === "number" ? currentHabit.streak : 0;

    if (typeof newTarget === "boolean" || typeof newTarget === "undefined") {
      //today has record, but need to just update the value, based on target type
      const updatedTodaysRecord: DailyRecord = {
        date: today,
        value: true,
        status: "done",
      };

      const newRecords = replaceRecordForDate(
        currentHabit.records,
        today,
        updatedTodaysRecord
      );

      return {
        records: newRecords,
        streak:
          currentHabit.records[todayRecordIndex].status === "done"
            ? prevStreak
            : prevStreak + 1, //means previous record was partial so hadn't upgrade the streak, but by turning "done" with changing target type, streak needs to increase
      };
    } else if (typeof newTarget === "number") {
      //today has record but it's boolean, so need to update to numerical value (one unit)
      const updatedTodaysRecord: DailyRecord = {
        date: today,
        value: 1,
        status: newTarget > 1 ? "partial" : "done",
      };
      const newRecords = replaceRecordForDate(
        currentHabit.records,
        today,
        updatedTodaysRecord
      );
      return {
        records: newRecords,
        streak:
          newTarget > 1
            ? prevStreak - 1 //means user hasn't complete habit target, just has done only 1 unit
            : prevStreak, //means done
      };
    }
  }

  return {
    //target didn't change or theres no record for today so previous record & streak is valid
    records: currentHabit.records,
    streak: currentHabit.streak,
  };
}

function replaceRecordForDate(
  records: DailyRecord[],
  date: string,
  newRecord: DailyRecord
): DailyRecord[] {
  const recordIndex = records.findIndex((r) => r.date === date);
  if (recordIndex === -1) {
    // No record for date; return a new array to preserve immutability
    return [...records];
  }
  // Remove all occurrences of the date to de-duplicate
  const withoutDate = records.filter((r) => r.date !== date);
  // Insert the replacement at the original first index to preserve order
  const newRecords = [...withoutDate];
  newRecords.splice(recordIndex, 0, newRecord);
  return newRecords;
}
