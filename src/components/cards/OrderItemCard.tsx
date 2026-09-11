import AppText from "../texts/AppText";
import { formatPrice } from "../../localization/formatters";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Separator from "../separator";
import { s, vs } from "react-native-size-matters";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";

interface OrderItemCardProps {
  price: number | string;
  date: string;
}

const OrderItemCard = ({ price, date }: OrderItemCardProps) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={[styles.container, commonStyles.shadow]}>
      <AppText style={styles.titleText}>{t("orders.details")}</AppText>
      <Separator />

      <View style={styles.row}>
        <AppText style={styles.text}>{t("orders.total")}</AppText>
        <AppText style={styles.priceText}>{formatPrice(price, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.text}>{t("orders.date")}</AppText>
        <AppText style={styles.dateText}>{date}</AppText>
      </View>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sharedPaddingHorizontal,
    backgroundColor: AppColors.background,
  },
  text: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
  },
  titleText: {
    fontSize: s(16),
    textTransform: "uppercase",
  },
  priceText: {
    fontSize: vs(16),
    fontFamily: AppFonts.Bold,
  },
  dateText: {
    fontSize: vs(14),
    fontFamily: AppFonts.Medium,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: s(8),
    marginBlock: vs(10),
  },
});
