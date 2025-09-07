import MyText from "@/components/base/Text";
import R from "@/constants";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  style?: StyleProp<ViewStyle>;
  value: number;
  title: string;
}

export default function StreakItem({ title, style, value }: CardProps) {
  if (value === 0) return null;
  return (
    <View style={[styles.container, style]}>
      <MyText variant="subtitle" style={styles.title}>
        {title}
      </MyText>
      <MyText variant="subtitle" style={styles.streakValue}>
        {value} days
      </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: R.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: R.dimensions.v4,
    paddingBottom: R.dimensions.v4,
  },
  title: {
    fontSize: R.dimensions.fs14,
  },
  streakValue: {
    color: R.colors.primary,
    fontSize: R.dimensions.fs14,
    fontFamily: R.fonts.bold,
  },
});
