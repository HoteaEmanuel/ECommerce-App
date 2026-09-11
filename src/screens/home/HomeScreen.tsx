import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import { AppFonts } from "../../styles/fonts";
import ProductCard from "../../components/cards/ProductCard";
import { products } from "../../data/products";
import { s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { Product } from "../../types/product";
import { getProductsData } from "../../config/dataServices";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import AppText from "../../components/texts/AppText";
const HomeScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { items } = useSelector((store: RootState) => store.cartSlice);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const products = await getProductsData();
      setProducts(products ?? []);
    } catch (error) {
      showMessage({ message: t("home.loadError"), type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        ListEmptyComponent={<AppText>{t(loading ? "common.loading" : "home.empty")}</AppText>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURL={item.imageURL}
            onAddToCartPress={() => dispatch(addItemToCart(item))}
            price={item.price}
            title={item.title}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
        }}
        contentContainerStyle={{
          paddingHorizontal: s(10),
        }}
      />
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
