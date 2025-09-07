import MyText from "@/components/base/Text";
import R from "@/constants";
import { Octicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
  label?: string;
  children?: React.ReactNode;
}

const OptionItem: React.FC<MyButtonProps> = ({
  onPress,
  style,
  icon,
  label,
  iconColor = R.colors.primaryDark,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.optionItemContainer, style]}
    >
      {children ? (
        children
      ) : (
        <>
          <MyText style={styles.label}>{label}</MyText>
          <Octicons
            name={icon}
            style={[styles.iconStyle, { color: iconColor }]}
            size={R.dimensions.iconSize24}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  optionItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: R.dimensions.v8,
    paddingBottom: R.dimensions.v8,
    borderBottomColor: R.colors.border,
    borderBottomWidth: R.dimensions.borderWidthHalf,
  },
  iconStyle: {
    color: R.colors.primaryDark,
    alignSelf: "center",
  },
  label: {
    fontSize: R.dimensions.fs12,
    fontFamily: R.fonts.light,
    alignSelf: "center",
  },
});
