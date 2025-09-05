import Container from "@/components/base/Container";
import Fab from "@/components/base/Fab";
import MyText from "@/components/base/Text";
import HabitsList from "@/components/features/habit/HabitsList";
import R from "@/constants";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function HabitListScreen() {
  function navigateToAddHabit() {
    router.navigate("/habit/add");
  }
  return (
    <Container withBottomTab style={styles.container}>
      <MyText variant="title" style={styles.header}>
        Your Habits
      </MyText>
      <HabitsList />
      <Fab onPress={navigateToAddHabit} icon="plus" />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    alignSelf: "center",
    marginTop: R.dimensions.v10,
  },
});
