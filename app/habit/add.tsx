import Container from "@/components/base/Container";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function AddNewHabitScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Habit",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  return <Container></Container>;
}
