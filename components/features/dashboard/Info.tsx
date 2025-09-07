import MyText from "@/components/base/Text";
import R from "@/constants";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  style?: StyleProp<ViewStyle>;
  color: string;
  label: string;
}

export default function Info({ label, style, color }: CardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <MyText variant="subtitle" style={styles.label}>
        {label}
      </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: R.dimensions.h4,
  },
  label: {
    fontSize: R.dimensions.fs14,
  },
  dot: {
    height: R.dimensions.v16,
    width: R.dimensions.v16,
    borderRadius: R.dimensions.radius5,

    // iOS shadow
    shadowColor: R.colors.gray,
    shadowOpacity: 0.3,
    shadowRadius: R.dimensions.radius15,
    shadowOffset: { width: 0, height: 6 },

    // Android shadow
    elevation: 6,
  },
});
