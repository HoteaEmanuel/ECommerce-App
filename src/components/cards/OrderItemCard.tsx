import AppText from "../texts/AppText";
import { formatPrice } from "../../localization/formatters";
import { useTranslation } from "react-i18next";
import { FlatList, Image, StyleSheet, View } from "react-native";
import React from "react";
import Separator from "../separator";
import { s, vs } from "react-native-size-matters";
import { commonStyles, sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { getPrimaryImageURL } from "../../helpers/productImages";
import type { OrderItem } from "../../types/order";

interface OrderItemCardProps {
  price: number | string;
  date: string;
  items: OrderItem[];
}

const OrderItemCard = ({ price, date, items }: OrderItemCardProps) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={[styles.container, commonStyles.shadow]}>
      <View style={styles.header}>
        <Ionicons name="receipt-outline" size={s(18)} color={AppColors.primary} />
        <AppText style={styles.titleText}>{t("orders.details")}</AppText>
      </View>

      {items.length > 0 && (
        <FlatList
          data={items}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          style={styles.thumbnailList}
          contentContainerStyle={styles.thumbnailListContent}
          renderItem={({ item }) => (
            <View style={styles.thumbnailWrapper}>
              <Image
                source={{ uri: getPrimaryImageURL(item) }}
                style={styles.thumbnail}
                accessibilityLabel={t("orders.productImage", { title: item.title })}
              />
              {item.qty > 1 && (
                <View style={styles.qtyBadge}>
                  <AppText style={styles.qtyBadgeText}>×{item.qty}</AppText>
                </View>
              )}
            </View>
          )}
        />
      )}

      <Separator />

      <View style={styles.row}>
        <View style={styles.rowLabel}>
          <Ionicons name="pricetag-outline" size={s(15)} color={AppColors.medGray} />
          <AppText style={styles.text}>{t("orders.total")}</AppText>
        </View>
        <AppText style={styles.priceText}>{formatPrice(price, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>
      <View style={styles.row}>
        <View style={styles.rowLabel}>
          <Ionicons name="calendar-outline" size={s(15)} color={AppColors.medGray} />
          <AppText style={styles.text}>{t("orders.date")}</AppText>
        </View>
        <AppText style={styles.dateText}>{date}</AppText>
      </View>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sharedPaddingHorizontal,
    paddingHorizontal: s(14),
    paddingVertical: vs(14),
    borderRadius: s(14),
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
    marginBottom: vs(4),
  },
  thumbnailList: {
    marginTop: vs(10),
  },
  thumbnailListContent: {
    gap: s(10),
  },
  thumbnailWrapper: {
    position: "relative",
  },
  thumbnail: {
    width: s(56),
    height: s(56),
    borderRadius: s(10),
    backgroundColor: AppColors.lightGray,
  },
  qtyBadge: {
    position: "absolute",
    bottom: -vs(4),
    end: -s(4),
    backgroundColor: AppColors.primary,
    borderRadius: s(8),
    paddingHorizontal: s(5),
    paddingVertical: vs(1),
    minWidth: s(20),
    alignItems: "center",
  },
  qtyBadgeText: {
    fontSize: s(10),
    fontFamily: AppFonts.Bold,
    color: AppColors.white,
  },
  text: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
  },
  titleText: {
    fontSize: s(16),
    fontFamily: AppFonts.Bold,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  priceText: {
    fontSize: vs(17),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
  dateText: {
    fontSize: vs(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: s(8),
    marginBlock: vs(10),
  },
  rowLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(6),
  },
});
