import MyText from "@/components/base/Text";
import { Habit } from "@/store/types";
import React from "react";
import { View } from "react-native";

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem({ habit }: HabitItemProps) {
  return (
    <View>
      <MyText>{habit.title}</MyText>
    </View>
  );
}
