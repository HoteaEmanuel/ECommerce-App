import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HomeEmptyStateProps = {
  variant: "empty" | "noResults";
  onClearSearch?: () => void;
};

const HomeEmptyState = ({ variant, onClearSearch }: HomeEmptyStateProps) => {
  const { t } = useTranslation();
  const isNoResults = variant === "noResults";

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={isNoResults ? "magnify-remove-outline" : "storefront-outline"}
        size={s(80)}
        color={AppColors.primary}
        style={styles.icon}
      />
      <AppText style={styles.title}>
        {t(isNoResults ? "home.noResultsTitle" : "home.emptyTitle")}
      </AppText>
      <AppText style={styles.subTitle}>
        {t(isNoResults ? "home.noResultsMessage" : "home.emptyMessage")}
      </AppText>

      {isNoResults && onClearSearch && (
        <AppButton
          title={t("home.clearSearch")}
          style={styles.button}
          onPress={onClearSearch}
        />
      )}
    </View>
  );
};

export default HomeEmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: s(20),
    paddingTop: vs(60),
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
