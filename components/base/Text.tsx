import R from "@/constants";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

export interface IMyTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  variant?: "bold" | "title" | "subtitle" | "header";
  color?: string;
}

const MyText: React.FC<IMyTextProps> = ({
  style,
  variant,
  color,
  ...props
}) => {
  const variantStyle = () => {
    switch (variant) {
      case "bold":
        return styles.bold;
      case "title":
        return styles.title;
      case "subtitle":
        return styles.subtitle;
      case "header":
        return styles.header;
    }
  };
  return (
    <Text
      {...props}
      style={[
        styles.baseStyle,
        variant && variantStyle(),
        { color: color },
        style,
      ]}
    />
  );
};

export default MyText;

const styles = StyleSheet.create({
  baseStyle: {
    color: R.colors.textPrimary,
    fontSize: R.dimensions.fs16,
    fontFamily: R.fonts.regular,
  },
  bold: {
    fontFamily: R.fonts.bold,
  },
  title: {
    fontSize: R.dimensions.fs20,
    color: R.colors.textPrimary,
    fontFamily: R.fonts.medium,
  },
  subtitle: {
    fontSize: R.dimensions.fs14,
    color: R.colors.textSubtitle,
    fontFamily: R.fonts.light,
  },
  header: {
    fontSize: R.dimensions.fs18,
    color: R.colors.textPrimary,
    fontFamily: R.fonts.bold,
  },
});
