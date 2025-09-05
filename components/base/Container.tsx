import R from "@/constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { ReactElement } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface ContainerProps {
  children?: ReactElement[] | ReactElement;
  style?: StyleProp<ViewStyle>;
  withBottomTab?: boolean;
}

export default function Container({ children, style }: ContainerProps) {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: R.colors.backgroundPrimary,
          paddingTop: R.dimensions.v50,
        },
        { paddingBottom: tabBarHeight + 10 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
