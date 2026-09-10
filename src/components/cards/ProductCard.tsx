import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../styles/sharedStyles";

type ProductCardProps = {
  imageURL: string;
  title: string;
  price: number;
  onAddToCartPress: () => void;
};

const ProductCard = ({
  imageURL,
  onAddToCartPress,
  price,
  title,
}: ProductCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageURL,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>${price}</AppText>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={onAddToCartPress}
      >
        <Ionicons name="cart" size={15} color={AppColors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(190),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: s(8),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  addToCartButton: {
    position: "absolute",
    top: vs(5),
    left: s(5),
    backgroundColor: AppColors.primary,
    height: vs(30),
    width: s(30),
    borderRadius: s(15),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
