import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppTextInputProps extends TextInputProps {}

const AppTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
}: AppTextInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    height: s(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: AppColors.white,
    width: "100%",
    marginBottom: vs(10),
  },
});
