import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import React, { useDebugValue, useState } from "react";
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
const schema = yup.object({
  name: yup.string().required("validation.nameRequired").min(3, "validation.nameMin"),
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

const SignUpScreen = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSignUp = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(userCredential.user, { displayName: data.name });

      const userDataObj = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: data.name,
      };
      dispatch(setUserData(userDataObj));
      navigation.navigate("MainAppBottomTabs");
      return userCredential.user;
    } catch (error) {
      showMessage({
        type: "danger",
        message: t("auth.signupError"),
      });
    }
  };
  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController
        name="name"
        placeholder={t("auth.name")}
        control={control}
      />
      <AppTextInputController
        placeholder={t("auth.email")}
        name="email"
        control={control}
      />
      <AppTextInputController
        placeholder={t("auth.password")}
        name="password"
        control={control}
        secureTextEntry
      />

      <AppButton
        title={t("auth.createAccount")}
        onPress={handleSubmit(handleSignUp)}
      />
      <AppButton
        title={t("auth.goToSignIn")}
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
