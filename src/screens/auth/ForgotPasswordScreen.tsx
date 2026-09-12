import { useTranslation } from "react-i18next";
import { Image, StyleSheet } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import AppText from "../../components/texts/AppText";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";

const schema = yup.object({
  email: yup
    .string()
    .email("validation.emailInvalid")
    .required("validation.emailRequired"),
});

type FormData = yup.InferType<typeof schema>;

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();

  const handleResetPassword = async (data: FormData) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      showMessage({
        type: "success",
        message: t("auth.resetEmailSent"),
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        type: "danger",
        message: t("auth.resetEmailError"),
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppText style={styles.subtitle}>{t("auth.resetPasswordSubtitle")}</AppText>
      <AppTextInputController
        placeholder={t("auth.email")}
        control={control}
        name="email"
        icon="mail-outline"
        keyboardType="email-address"
      />

      <AppButton
        title={t("auth.sendResetLink")}
        onPress={handleSubmit(handleResetPassword)}
      />
      <AppButton
        title={t("auth.backToSignIn")}
        style={styles.backButton}
        textColor={AppColors.primary}
        onPress={() => navigation.goBack()}
      />
    </AppSaveView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: vs(150),
    width: s(150),
    marginBottom: vs(20),
  },
  subtitle: {
    textAlign: "center",
    color: AppColors.medGray,
    marginBottom: vs(20),
  },
  backButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
