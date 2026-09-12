import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

interface AppTextInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

const AppTextInput = ({
  style,
  icon,
  iconColor = AppColors.medGray,
  ...rest
}: AppTextInputProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <View style={styles.wrapper}>
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={s(18)} color={iconColor} />
        </View>
      )}
      <TextInput
        placeholderTextColor={AppColors.medGray}
        {...rest}
        style={[
          styles.input,
          icon && styles.inputWithIcon,
          { textAlign: isRTL ? "right" : "left" },
          style,
        ]}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: vs(10),
  },
  input: {
    height: s(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: AppColors.white,
    width: "100%",
  },
  inputWithIcon: {
    paddingStart: s(42),
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    start: s(15),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
