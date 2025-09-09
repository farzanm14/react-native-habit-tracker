import OptionItem from "@/components/base/Option";
import MyText from "@/components/base/Text";
import R from "@/constants";
import useHabitStore from "@/store/habitStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

type BottomSheetProps = {
  bottomSheetRef: any;
  onClose: () => void;
};

const HabitOptionsBottomSheet = ({
  bottomSheetRef,
  onClose,
}: BottomSheetProps) => {
  const { selectedHabit, deleteSelectedHabit } = useHabitStore();
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const [isDeletingHabit, setIsDeletingHabit] = useState(false);

  function handleDeleteHabit() {
    deleteSelectedHabit();
    onClose();
  }

  return (
    <BottomSheet
      onClose={onClose}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enablePanDownToClose
      animateOnMount
    >
      <BottomSheetView style={styles.contentContainer}>
        <OptionItem
          onPress={() => {
            router.push(`/habit/${selectedHabit?.id}`);
            onClose();
          }}
          label="Review All Records"
          icon="eye"
          iconColor={R.colors.primary}
        />
        <OptionItem
          onPress={() => {
            router.push(`/habit/${selectedHabit?.id}/edit`);
            onClose();
          }}
          label="Edit Habit"
          icon="pencil"
          iconColor={R.colors.textPending}
        />
        {isDeletingHabit ? (
          <OptionItem style={styles.confirmContainer}>
            <MyText variant="subtitle">
              Are you sure you want to delete
              <MyText variant="subtitle" style={styles.selectedTitle}>
                {` ${selectedHabit?.title} `}
              </MyText>
              ?
            </MyText>
            <View style={styles.buttonContainer}>
              <MyText
                variant="subtitle"
                style={styles.dismissBtn}
                onPress={() => setIsDeletingHabit(false)}
              >
                dismiss
              </MyText>
              <MyText
                style={styles.deleteBtn}
                variant="subtitle"
                onPress={handleDeleteHabit}
              >
                yes, delete
              </MyText>
            </View>
          </OptionItem>
        ) : (
          <OptionItem
            onPress={() => setIsDeletingHabit(true)}
            label="Delete Habit"
            icon="trash"
            iconColor={R.colors.textError}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: R.dimensions.h16,
    alignItems: "center",
    height: R.dimensions.v200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: R.dimensions.h32,
    marginTop: R.dimensions.v4,
  },
  confirmContainer: {
    flexDirection: "column",
  },
  dismissBtn: {
    color: R.colors.textSubtitle,
  },
  deleteBtn: {
    color: R.colors.error,
  },
  selectedTitle: {
    color: R.colors.primary,
    fontWeight: "bold",
  },
});

export default HabitOptionsBottomSheet;
