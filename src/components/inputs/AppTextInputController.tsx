import { StyleSheet, type TextInputProps } from "react-native";
import React from "react";
import {
  Control,
  Controller,
  Path,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { s } from "react-native-size-matters";
interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoFocus?: boolean;
}
const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  autoFocus = false,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange: fieldOnChange, value },
        fieldState: { error },
      }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={fieldOnChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
            autoFocus={autoFocus}
          />
          {error?.message && (
            <AppText style={styles.textError}>{error.message}</AppText>
          )}
        </>
      )}
    ></Controller>
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.redColor,
    borderWidth: 1,
  },
  textError: {
    color: AppColors.redColor,
    fontSize: s(12),
  },
});
