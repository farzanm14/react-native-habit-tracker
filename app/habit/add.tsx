import Container from "@/components/base/Container";
import AddOrUpdateHabitForm from "@/components/features/habit/HabitForm";
import useHabitForm from "@/hooks/useHabitForm";
import useHabitStore from "@/store/habitStore";
import { Habit } from "@/store/types";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function AddNewHabitScreen() {
  const navigation = useNavigation();
  const { addHabit } = useHabitStore();
  const { formik, handleBlur } = useHabitForm(() => {
    const { title, description, target } = formik.values;

    const newHabit: Habit = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      title,
      description,
      target:
        typeof target === "number" && !Number.isNaN(target)
          ? target
          : undefined,
      streak: 0,
      records: [],
    };

    addHabit(newHabit);
    navigation.goBack();
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Habit",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return (
    <Container withBottomTab>
      <AddOrUpdateHabitForm
        formik={formik}
        handleBlur={handleBlur}
        submitLabel="create habit"
      />
    </Container>
  );
}

const styles = StyleSheet.create({});
