import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { SHIPPING_FEE, TAXES } from "../../constants/constants";

type TotalsViewProps = {
  itemsPrice: number;
};

const TotalsView = ({ itemsPrice }: TotalsViewProps) => {
  const ORDER_TOTAL = itemsPrice + SHIPPING_FEE + TAXES;
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>Products:</AppText>
        <AppText style={styles.priceText}>${itemsPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>Taxes:</AppText>
        <AppText style={styles.priceText}>${TAXES}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>Shipping Fee:</AppText>
        <AppText style={styles.priceText}>${SHIPPING_FEE}</AppText>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AppText style={styles.orderTotalText}>Order Total:</AppText>
        <AppText style={styles.priceText}>${ORDER_TOTAL}</AppText>
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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(10),
  },
});
