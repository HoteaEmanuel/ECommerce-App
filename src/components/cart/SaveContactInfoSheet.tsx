import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

export const SAVE_CONTACT_INFO_SHEET_ID = "SAVE_CONTACT_INFO_SHEET";

type SaveContactInfoSheetProps = {
  isUpdate: boolean;
  onConfirm: () => Promise<void> | void;
  onDismiss: () => void;
};

const SaveContactInfoSheet = ({ isUpdate, onConfirm, onDismiss }: SaveContactInfoSheetProps) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    await onConfirm();
    SheetManager.hide(SAVE_CONTACT_INFO_SHEET_ID);
  };

  return (
    <ActionSheet id={SAVE_CONTACT_INFO_SHEET_ID} onClose={onDismiss}>
      <View style={styles.container}>
        <Ionicons
          name="bookmark-outline"
          size={s(40)}
          color={AppColors.primary}
          style={styles.icon}
        />
        <AppText style={styles.title}>
          {t(isUpdate ? "checkout.updateAddressTitle" : "checkout.saveAddressTitle")}
        </AppText>
        <AppText style={styles.message}>{t("checkout.saveAddressMessage")}</AppText>

        <AppButton
          title={t(isUpdate ? "checkout.updateAddress" : "checkout.saveAddress")}
          onPress={handleConfirm}
        />
        <AppButton
          title={t("common.notNow")}
          style={styles.dismissButton}
          textColor={AppColors.primary}
          backgroundColor={AppColors.white}
          onPress={() => SheetManager.hide(SAVE_CONTACT_INFO_SHEET_ID)}
        />
      </View>
    </ActionSheet>
  );
};

export default SaveContactInfoSheet;

const styles = StyleSheet.create({
  container: {
    padding: s(20),
    alignItems: "center",
  },
  icon: {
    marginBottom: vs(10),
  },
  title: {
    fontSize: s(18),
    color: AppColors.primary,
    textAlign: "center",
    marginBottom: vs(6),
  },
  message: {
    fontSize: s(14),
    color: AppColors.medGray,
    textAlign: "center",
    marginBottom: vs(20),
  },
  dismissButton: {
    borderWidth: 1,
    borderColor: AppColors.primary,
    marginTop: vs(10),
  },
});
