import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard, { PRODUCT_GRID_GUTTER } from "../../components/cards/ProductCard";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { Product } from "../../types/product";
import { getProductsData } from "../../config/dataServices";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import AppText from "../../components/texts/AppText";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
            imageURLs={item.imageURLs}
            onPress={() => navigation.navigate("ProductDetailsScreen", { product: item })}
            onAddToCartPress={() => dispatch(addItemToCart(item))}
            price={item.price}
            title={item.title}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: PRODUCT_GRID_GUTTER,
        }}
        contentContainerStyle={{
          paddingHorizontal: PRODUCT_GRID_GUTTER,
        }}
      />
    </AppSaveView>
  );
};

export default HomeScreen;
