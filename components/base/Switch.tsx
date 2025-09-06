import MyText from "@/components/base/Text";
import R from "@/constants";
import React from "react";
import { StyleProp, StyleSheet, Switch, View, ViewStyle } from "react-native";

export interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const MySwitch: React.FC<MyButtonProps> = ({
  value,
  onValueChange,
  style,
  label,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <MyText style={styles.label}>{label}</MyText>}
      <Switch {...rest} value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default MySwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  label: {
    fontSize: R.dimensions.fs12,
    color: R.colors.primaryDark,
    fontFamily: R.fonts.light,
    alignSelf: "center",
    marginRight: R.dimensions.h8,
  },
});
