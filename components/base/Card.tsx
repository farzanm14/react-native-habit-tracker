import R from "@/constants";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Card({ children, style, onPress }: CardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.card, style]}>
      {children}
    </Pressable>
  );
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
