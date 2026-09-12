import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import AppSaveView from "../../components/views/AppSaveView";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import { formatPrice } from "../../localization/formatters";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { addItemToCart } from "../../store/reducers/cartSlice";
import type { RootStackParamList } from "../../navigation/types";

const ProductDetailsScreen = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { params } = useRoute<RouteProp<RootStackParamList, "ProductDetailsScreen">>();
  const { product } = params;

  const onAddToCartPress = () => {
    dispatch(addItemToCart(product));
    showMessage({ type: "success", message: t("cart.added") });
  };

  return (
    <AppSaveView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProductImageSlider imageURLs={product.imageURLs} />

        <View style={styles.detailsContainer}>
          <AppText style={styles.titleText}>{product.title}</AppText>
          <AppText style={styles.priceText}>
            {formatPrice(product.price, i18n.resolvedLanguage ?? "en")}
          </AppText>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <AppButton title={t("cart.addToCart")} onPress={onAddToCartPress} />
      </View>
    </AppSaveView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: vs(90),
  },
  detailsContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    paddingTop: vs(15),
  },
  titleText: {
    fontSize: s(22),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(8),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: 10,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: s(10),
  },
});
