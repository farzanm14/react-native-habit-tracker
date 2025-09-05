import MyText from "@/components/base/Text";
import R from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string | undefined;
  icon?: {
    name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    onPress?: () => void;
  };
  error?: string;
  isDisable?: boolean;
}

export const Input = ({
  label,
  icon,
  error,
  isDisable = false,
  ...props
}: InputProps) => {
  const inputStyle = { ...styles.input, ...(error ? styles.error : {}) };
  const propsStyle = (props?.style || {}) as object;
  return (
    <View style={styles.container}>
      {label && (
        <MyText variant="bold" style={styles.label}>
          {label}
        </MyText>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={R.colors.textSubtitle}
          {...props}
          style={{
            ...inputStyle,
            ...propsStyle,
            ...(isDisable && styles.disabledInput),
          }}
        />
        {!error && icon && (
          <TouchableOpacity style={styles.icon} onPress={icon.onPress}>
            <MaterialCommunityIcons
              name={icon.name}
              size={R.dimensions.iconSize16}
              color={R.colors.gray}
            />
          </TouchableOpacity>
        )}
        {error && (
          <MaterialCommunityIcons
            name={"alert-circle-outline"}
            size={R.dimensions.iconSize16}
            color={R.colors.error}
            style={styles.icon}
          />
        )}
      </View>
      {error && (
        <MyText variant="subtitle" style={styles.error}>
          {error}
        </MyText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: R.dimensions.v2,
    flexShrink: 0,
  },
  label: {
    marginBottom: R.dimensions.v4,
    color: R.colors.primaryDark,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    height: R.dimensions.h36,
    borderWidth: R.dimensions.borderWidthHalf,
    borderColor: R.colors.border,
    borderRadius: R.dimensions.radius15,
    paddingHorizontal: R.dimensions.h12,
    fontSize: R.dimensions.fs14,
    color: R.colors.textPrimary,
    outlineWidth: 0,
  },
  icon: {
    position: "absolute",
    right: R.dimensions.h12,
    top: R.dimensions.v8,
  },
  error: {
    color: R.colors.error,
    borderColor: R.colors.errorBox,
    marginBottom: R.dimensions.v4,
  },
  disabledInput: {
    color: R.colors.textSubtitle,
    backgroundColor: R.colors.border,
  },
});
