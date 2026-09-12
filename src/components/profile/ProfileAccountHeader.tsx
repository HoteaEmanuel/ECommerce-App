import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

type ProfileAccountHeaderProps = {
  name?: string | null;
  email?: string | null;
};

const ProfileAccountHeader = ({ name, email }: ProfileAccountHeaderProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={s(56)} color={AppColors.primary} />
      <View style={styles.textContainer}>
        <AppText style={styles.name}>{name || t("profile.noName")}</AppText>
        {!!email && <AppText style={styles.email}>{email}</AppText>}
      </View>
    </View>
  );
};

export default ProfileAccountHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(12),
    paddingBottom: vs(16),
    marginBottom: vs(4),
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGray,
  },
  textContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: s(17),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
  email: {
    fontSize: s(13),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    marginTop: vs(2),
  },
});
