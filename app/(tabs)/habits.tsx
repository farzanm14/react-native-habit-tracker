import Container from "@/components/base/Container";
import Fab from "@/components/base/Fab";
import MyText from "@/components/base/Text";
import HabitOptionsBottomSheet from "@/components/features/habit/HabitOptionsBottomSheet";
import HabitsList from "@/components/features/habit/HabitsList";
import R from "@/constants";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HabitListScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.forceClose();
    }, 100);
  }, []);

  function navigateToAddHabit() {
    router.navigate("/habit/add");
  }

  function openOptionsBottomSheet() {
    setShowOptions(true);
    bottomSheetRef.current?.expand();
  }
  function closeOptionsBottomSheet() {
    setShowOptions(false);
    bottomSheetRef.current?.collapse();
  }

  return (
    <Container withBottomTab style={styles.container}>
      <MyText variant="title" style={styles.header}>
        Your Habits
      </MyText>
      <MyText variant="subtitle" style={styles.date}>
        {
          //todays date in format "Monday, 20 March"
          new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        }
      </MyText>
      <HabitsList onHabitPress={openOptionsBottomSheet} />
      <Fab onPress={navigateToAddHabit} icon="plus" />
      {showOptions ? (
        <HabitOptionsBottomSheet
          onClose={closeOptionsBottomSheet}
          bottomSheetRef={bottomSheetRef}
        />
      ) : (
        <View />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    alignSelf: "center",
    marginTop: R.dimensions.v10,
  },
  date: {
    alignSelf: "center",
    marginVertical: R.dimensions.v10,
    color: R.colors.primaryDark,
  },
});
