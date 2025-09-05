import R from "@/constants";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: R.colors.cardPrimary,
    borderRadius: R.dimensions.radius15,
    padding: R.dimensions.h16,

    // iOS shadow
    shadowColor: R.colors.gray,
    shadowOpacity: 0.3,
    shadowRadius: R.dimensions.radius15,
    shadowOffset: { width: 0, height: 6 },

    // Android shadow
    elevation: 6,

    marginVertical: R.dimensions.v8,
    marginHorizontal: R.dimensions.h10,
  },
});
