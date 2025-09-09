import Container from "@/components/base/Container";
import AddOrUpdateHabitForm from "@/components/features/habit/HabitForm";
import useHabitForm, { HabitFormik } from "@/hooks/useHabitForm";
import { updateRecordOnEditTarget } from "@/hooks/useRecords";
import useHabitStore from "@/store/habitStore";
import { Habit } from "@/store/types";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";

export default function EditHabitScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { selectedHabit, updateHabit } = useHabitStore();

  const { formik, handleBlur } = useHabitForm(() => {
    const { title, description, target } = formik.values;
    const newRecordAndStreak = selectedHabit
      ? updateRecordOnEditTarget(selectedHabit, target)
      : { records: [], streak: 0 };

    const newHabit: Habit = {
      id: id as string,
      title,
      description,
      target:
        typeof target === "number" && !Number.isNaN(target)
          ? target
          : undefined,
      ...newRecordAndStreak,
    };

    updateHabit(newHabit);
    navigation.goBack();
  });
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Habit Screen",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <Container>
      <AddOrUpdateHabitForm
        formik={formik}
        handleBlur={handleBlur}
        submitLabel="Submit Changes"
        initialValues={selectedHabit as HabitFormik}
      />
    </Container>
  );
}
