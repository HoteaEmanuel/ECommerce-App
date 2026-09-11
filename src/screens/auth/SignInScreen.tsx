import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";

import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
const schema = yup.object({
  email: yup
    .string()
    .email("validation.emailInvalid")
    .required("validation.emailRequired"),
  password: yup
    .string()
    .min(8, "validation.passwordMin")
    .required("validation.passwordRequired"),
});

type FormData = yup.InferType<typeof schema>;
const SignInScreen = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const handleLogin = async (loginData: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password,
      );

      const userDataObj = {
        id: userCredential.user.uid,
      };
      dispatch(setUserData(userDataObj));
      navigation.navigate("MainAppBottomTabs");
    } catch (error) {
      const errorMessage = t("auth.invalidCredentials");
      showMessage({
        message: errorMessage,
        type: "danger",
      });
    }
  };
  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController
        placeholder={t("auth.email")}
        control={control}
        name="email"
      />
      <AppTextInputController
        placeholder={t("auth.password")}
        control={control}
        name="password"
        secureTextEntry
      />

      <AppButton title={t("auth.login")} onPress={handleSubmit(handleLogin)} />
      <AppButton
        title={t("auth.signup")}
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

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
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
