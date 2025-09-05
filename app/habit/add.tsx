import Container from "@/components/base/Container";
import AddOrUpdateHabitForm from "@/components/features/habit/HabitForm";
import useHabitForm from "@/hooks/useHabitForm";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function AddNewHabitScreen() {
  const navigation = useNavigation();
  const { formik, handleBlur } = useHabitForm(() => {
    // Submit form logic here
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
