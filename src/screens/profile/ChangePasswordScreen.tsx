import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { IS_IOS } from "../../constants/constants";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
  currentPassword: yup
    .string()
    .required("validation.passwordRequired")
    .min(8, "validation.passwordMin"),
  newPassword: yup
    .string()
    .required("validation.passwordRequired")
    .min(8, "validation.passwordMin"),
  confirmNewPassword: yup
    .string()
    .required("validation.passwordRequired")
    .oneOf([yup.ref("newPassword")], "validation.passwordsMustMatch"),
});

type FormData = yup.InferType<typeof schema>;

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();

  const handleChangePassword = async (data: FormData) => {
    try {
      const user = auth.currentUser;
      if (!user?.email) throw new Error("No signed-in user");

      const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);

      showMessage({
        type: "success",
        message: t("profile.passwordChanged"),
      });
      reset();
      navigation.goBack();
    } catch (error) {
      showMessage({
        type: "danger",
        message: t("profile.passwordChangeError"),
      });
    }
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            placeholder={t("profile.currentPassword")}
            name="currentPassword"
            icon="lock-closed-outline"
            secureTextEntry
          />
          <AppTextInputController
            control={control}
            placeholder={t("profile.newPassword")}
            name="newPassword"
            icon="key-outline"
            secureTextEntry
          />
          <AppTextInputController
            control={control}
            placeholder={t("profile.confirmNewPassword")}
            name="confirmNewPassword"
            icon="key-outline"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton
          title={t("profile.updatePassword")}
          onPress={handleSubmit(handleChangePassword)}
        />
      </View>
    </AppSaveView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : 0,
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: 10,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: s(10),
  },
});
