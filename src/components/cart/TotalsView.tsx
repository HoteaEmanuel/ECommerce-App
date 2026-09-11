import { formatPrice } from "../../localization/formatters";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { SHIPPING_FEE, TAXES } from "../../constants/constants";
import Separator from "../separator";

type TotalsViewProps = {
  itemsPrice: number;
};

const TotalsView = ({ itemsPrice }: TotalsViewProps) => {
  const { t, i18n } = useTranslation();
  const ORDER_TOTAL = itemsPrice + SHIPPING_FEE + TAXES;
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>{t("cart.products")}</AppText>
        <AppText style={styles.priceText}>{formatPrice(itemsPrice, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>{t("cart.taxes")}</AppText>
        <AppText style={styles.priceText}>{formatPrice(TAXES, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>{t("cart.shipping")}</AppText>
        <AppText style={styles.priceText}>{formatPrice(SHIPPING_FEE, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
      <Separator />
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>{t("cart.total")}</AppText>
        <AppText style={styles.priceText}>{formatPrice(ORDER_TOTAL, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
    </View>
  );
};

export default TotalsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBlock: vs(10),
  },
  orderTotalText: {
    fontSize: s(16),
    flex: 1,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(16),
    color: AppColors.primary,
  },
});
