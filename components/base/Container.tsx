import R from "@/constants";
import React, { ReactElement } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

interface ContainerProps {
  children?: ReactElement[] | ReactElement;
  style?: StyleProp<ViewStyle>;
  withBottomTab?: boolean;
}

export default function Container({
  children,
  style,
  withBottomTab,
}: ContainerProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: R.colors.backgroundPrimary,
          paddingTop: R.dimensions.v16,
          paddingBottom:
            Platform.OS === "ios" ? R.dimensions.v20 : R.dimensions.v50,
        },
        withBottomTab && {
          paddingBottom: R.dimensions.bottomTabPadding,
          paddingTop: R.dimensions.v36,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
