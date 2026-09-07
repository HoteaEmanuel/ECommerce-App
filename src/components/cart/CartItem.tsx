import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const tempItem = {
  id: 1,
  price: 1199,
  title: "iPhone 16 Pro Max",
  imageURL:
    "https://2b.com.eg/media/catalog/product/cache/661473ab953cdcdf4c3b607144109b90/m/a/ma658.jpg",
};

const CartItem = () => {
  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: tempItem.imageURL }} style={styles.image} />
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.textTitle}>{tempItem.title}</AppText>
        <AppText style={styles.textPrice}>{tempItem.title}</AppText>

        <View style={styles.qtyContainer}>
          <Pressable style={styles.iconButton}>
            <FontAwesome name="plus" size={s(10)} color={AppColors.primary} />
          </Pressable>
          <AppText style={styles.textQty}>1</AppText>
          <Pressable style={styles.iconButton}>
            <FontAwesome name="minus" size={s(10)} color={AppColors.primary} />
          </Pressable>
        </View>
      </View>

      {/* Delete Container */}
      <View style={styles.deleteContainer}>
        <Pressable style={styles.deleteButton}>
          <MaterialIcons
            name="delete-outline"
            size={s(14)}
            color={AppColors.redColor}
          />
          <AppText style={styles.deleteText}>Delete</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    paddingBottom: vs(4),
    borderColor: AppColors.blueGray,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: vs(80),
    width: s(80),
    borderRadius: s(5),
  },
  detailsContainer: {
    flex: 3,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingEnd: s(12),
  },
  textTitle: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
    marginTop: vs(5),
  },
  textPrice: {
    fontSize: s(16),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(5),
  },
  deleteText: {
    fontSize: s(12),
    marginLeft: s(7),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    marginTop: vs(3),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    paddingHorizontal: s(5),
    borderRadius: s(30),
    borderWidth: s(1),
    borderColor: AppColors.blueGray,
    width: s(80),
    paddingVertical: vs(5),
  },
  iconButton: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: AppColors.blueGray,
    padding: s(10),
    height: vs(10),
    width: s(10),
    borderRadius: s(10),
  },
  textQty: {
    flex: 1,
    textAlign: "center",
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
});
