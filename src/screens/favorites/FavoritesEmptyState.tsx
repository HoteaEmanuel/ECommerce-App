import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FavoritesEmptyState = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons
        name="heart-outline"
        size={s(80)}
        color={AppColors.primary}
        style={styles.icon}
      />
      <AppText style={styles.title}>{t("favorites.emptyTitle")}</AppText>
      <AppText style={styles.subTitle}>{t("favorites.emptyMessage")}</AppText>

      <AppButton
        title={t("cart.startShopping")}
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default FavoritesEmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: s(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginBottom: vs(4),
  },
  subTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    textAlign: "center",
    marginBottom: vs(20),
  },
  button: {
    width: "80%",
  },
  icon: {
    marginBottom: vs(20),
    opacity: 0.8,
  },
});
