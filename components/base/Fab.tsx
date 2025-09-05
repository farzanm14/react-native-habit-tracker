import MyText from "@/components/base/Text";
import R from "@/constants";
import Octicons from "@expo/vector-icons/Octicons";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  icon?: string;
  onPress: () => void;
  children?: ReactNode;
  title?: string;
}

const Fab: React.FC<MyButtonProps> = ({
  onPress,
  style,
  icon,
  title,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.fabButton, style]}
    >
      {icon ? (
        <Octicons
          name={icon}
          color={R.colors.whiteSmoke}
          style={styles.iconStyle}
          size={R.dimensions.iconSize24}
        />
      ) : title ? (
        <MyText style={styles.fabText}>{title}</MyText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fabButton: {
    position: "absolute",
    right: R.dimensions.h16,
    bottom: R.dimensions.h16 + R.dimensions.bottomTabHeight,
    minHeight: R.dimensions.h56,
    minWidth: R.dimensions.h56,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: R.colors.primaryLight,
    padding: R.dimensions.h10,
    marginVertical: R.dimensions.v10,
    marginHorizontal: R.dimensions.h10,
    borderRadius: R.dimensions.radius30,

    shadowColor: R.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconStyle: {
    color: R.colors.primaryDark,
    alignSelf: "center",
  },
  fabText: {
    fontSize: R.dimensions.fs10,
    color: R.colors.primaryDark,
    fontFamily: R.fonts.light,
    alignSelf: "center",
  },
});
