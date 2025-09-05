import MyText from "@/components/base/Text";
import R from "@/constants";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  onPress: () => void;
  children?: ReactNode;
  title?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  style,
  outline = false,
  disabled = false,
  loading = false,
  loadingColor = R.colors.primaryLight,
  title,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        outline && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : title ? (
        <MyText style={styles.title}>{title}</MyText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: R.dimensions.v2,
    height: R.dimensions.v36,
    backgroundColor: R.colors.primary,
    justifyContent: "center",
    borderRadius: R.dimensions.radius20,
  },
  disabled: {
    opacity: 0.6,
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: R.colors.primary,
    borderWidth: R.dimensions.borderWidth,
  },
  title: {
    color: R.colors.primaryLight,
  },
});
