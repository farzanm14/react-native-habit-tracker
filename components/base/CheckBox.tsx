import MyText from "@/components/base/Text";
import R from "@/constants";
import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  style?: ViewStyle;
};

export default function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  size = R.dimensions.iconSize20,
  color = R.colors.success,
  style,
}: Props) {
  const [internal, setInternal] = useState<boolean>(defaultChecked);
  const isControlled = typeof checked === "boolean";
  const value = isControlled ? (checked as boolean) : internal;

  useEffect(() => {
    if (!isControlled) setInternal(defaultChecked);
  }, [defaultChecked, isControlled]);

  const toggle = (_e?: GestureResponderEvent) => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      style={[styles.container, style]}
      disabled={disabled}
    >
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderRadius: Math.max(4, size * 0.15),
            backgroundColor: value ? color : "transparent",
            borderColor: value ? color : R.colors.primary,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {value && (
          <MyText style={[styles.check, { fontSize: Math.round(size * 0.7) }]}>
            ✓
          </MyText>
        )}
      </View>

      {label ? (
        <MyText style={[styles.label, disabled && styles.disabledLabel]}>
          {label}
        </MyText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: R.dimensions.h8,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: R.dimensions.borderWidth,
  },
  check: {
    color: "white",
    lineHeight: 0,
  },
  label: {
    fontSize: R.dimensions.fs14,
    color: R.colors.success,
  },
  disabledLabel: {
    color: R.colors.gray,
  },
});
