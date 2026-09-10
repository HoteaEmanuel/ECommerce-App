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
  return (
    <View style={[styles.container, commonStyles.shadow]}>
      <Text style={styles.titleText}>Order Details:</Text>
      <Separator />

      <View style={styles.row}>
        <Text style={styles.text}>Total Price:</Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Date:</Text>
        <Text style={styles.dateText}>{date}</Text>
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
    marginBlock: vs(10),
  },
});
