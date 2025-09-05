import MyText from "@/components/base/Text";
import R from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  target: number;
  record: number;
  increment?: number; // how much to add per press (default 1)
  onChange?: (newRecord: number) => void;
};

export default function Counter({
  target,
  record,
  increment = 1,
  onChange,
}: Props) {
  const [current, setCurrent] = useState(Math.max(0, Math.min(record, target)));

  useEffect(
    () => setCurrent(Math.max(0, Math.min(record, target))),
    [record, target]
  );

  const handlePress = () => {
    const next = Math.min(current + increment, target);
    setCurrent(next);
    onChange?.(next);
  };

  return (
    <View style={styles.wrapper}>
      <MyText
        variant="bold"
        style={[
          styles.value,
          current >= target / 2 && styles.partialValue,
          current === target && styles.finishedValue,
        ]}
      >
        {current}/{target}
      </MyText>
      {current !== target && (
        <Pressable onPress={handlePress} accessibilityLabel="increment">
          <MaterialIcons
            name="add"
            size={R.dimensions.iconSize24}
            color={R.colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: R.dimensions.fs12,
    color: R.colors.primary,
  },
  finishedValue: {
    color: R.colors.success,
  },
  partialValue: {
    color: R.colors.partial,
  },
});
