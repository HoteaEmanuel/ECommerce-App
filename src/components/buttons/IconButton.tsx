import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

type IconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  accessibilityLabel: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

const IconButton = ({
  name,
  onPress,
  accessibilityLabel,
  size = s(15),
  color = AppColors.white,
  backgroundColor = AppColors.primary,
  disabled = false,
  style,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? AppColors.disabledGray : backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    height: s(30),
    width: s(30),
    borderRadius: s(15),
    alignItems: "center",
    justifyContent: "center",
  },
});
