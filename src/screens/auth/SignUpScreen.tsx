import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";

import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AppTextInputController from "../../components/inputs/AppTextInputController";
const schema = yup.object({
  name: yup.string().required().min(3, "Name is required"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain atleast 8 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const handleSignUp = (data: FormData) => {
    try {
      navigation.navigate("MainAppBottomTabs");
    } catch (error) {}
  };
  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController
        name="name"
        placeholder="Name"
        control={control}
      />
      <AppTextInputController
        placeholder="Email"
        name="email"
        control={control}
      />
      <AppTextInputController
        placeholder="Password"
        name="password"
        control={control}
        secureTextEntry
      />

      <AppButton
        title="Create new account"
        onPress={handleSubmit(handleSignUp)}
      />
      <AppButton
        title="Go to Sign In"
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: vs(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
  },
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
