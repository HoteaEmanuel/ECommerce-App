import { formatPrice } from "../../localization/formatters";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { commonStyles } from "../../styles/sharedStyles";
import { getPrimaryImageURL } from "../../helpers/productImages";
import IconButton from "../buttons/IconButton";

// Shared with the screen that lays cards out in a grid, so the card's own
// width and the FlatList's row spacing can never drift apart.
export const PRODUCT_GRID_GUTTER = s(12);
export const getProductCardWidth = (windowWidth: number) =>
  (windowWidth - PRODUCT_GRID_GUTTER * 3) / 2;

type ProductCardProps = {
  imageURLs: string[];
  title: string;
  price: number;
  onPress: () => void;
  onAddToCartPress: () => void;
  isFavorite?: boolean;
  onToggleFavoritePress?: () => void;
};

const ProductCard = ({
  imageURLs,
  onPress,
  onAddToCartPress,
  price,
  title,
  isFavorite = false,
  onToggleFavoritePress,
}: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[styles.container, { width: getProductCardWidth(width) }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: getPrimaryImageURL({ imageURLs }),
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText} numberOfLines={2}>
          {title}
        </AppText>
        <AppText style={styles.priceText}>{formatPrice(price, i18n.resolvedLanguage ?? "en")}</AppText>
      </View>

      <IconButton
        name="cart"
        style={styles.addToCartButton}
        onPress={onAddToCartPress}
        accessibilityLabel={t("cart.addItem", { title })}
      />

      {onToggleFavoritePress && (
        <IconButton
          name={isFavorite ? "heart" : "heart-outline"}
          style={styles.favoriteButton}
          onPress={onToggleFavoritePress}
          backgroundColor={AppColors.white}
          color={isFavorite ? AppColors.redColor : AppColors.medGray}
          accessibilityLabel={t(
            isFavorite ? "favorites.removeItem" : "favorites.addItem",
            { title },
          )}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(165),
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    paddingTop: s(10),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(15),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(17),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  addToCartButton: {
    position: "absolute",
    top: vs(5),
    start: s(5),
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    end: 0,
    zIndex: 1,
  },
});
