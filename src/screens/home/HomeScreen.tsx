import { FlatList, RefreshControl, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard, {
  PRODUCT_GRID_GUTTER,
} from "../../components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { toggleFavorite } from "../../store/reducers/favoritesSlice";
import { RootState } from "../../store/store";
import { Product } from "../../types/product";
import { getProductsData } from "../../config/dataServices";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import ProductsLoadingGrid from "../../components/loaders/ProductsLoadingGrid";
import ProductsSearchBar, {
  type ProductSort,
} from "../../components/home/ProductsSearchBar";
import { AppColors } from "../../styles/colors";
import HomeEmptyState from "./HomeEmptyState";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const [sort, setSort] = useState<ProductSort>("none");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const { items: favoriteItems } = useSelector(
    (store: RootState) => store.favoritesSlice,
  );
  const favoriteIds = useMemo(
    () => new Set(favoriteItems.map((item) => item.id)),
    [favoriteItems],
  );

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

  const refreshProducts = async () => {
    setRefreshing(true);
    await getProducts();
    setRefreshing(false);
  };

  const visibleProducts = useMemo(() => {
    const search = debouncedQuery.trim().toLowerCase();
    const matches = search
      ? products.filter((product) =>
          product.title.toLowerCase().includes(search),
        )
      : products;
    if (sort === "none") return matches;
    return [...matches].sort((a, b) =>
      sort === "priceAsc"
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price),
    );
  }, [products, debouncedQuery, sort]);

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={{ paddingHorizontal: PRODUCT_GRID_GUTTER }}>
        <ProductsSearchBar
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
        />
      </View>
      <FlatList
        numColumns={2}
        data={visibleProducts}
        ListEmptyComponent={
          loading ? (
            <ProductsLoadingGrid />
          ) : (
            <HomeEmptyState
              variant={debouncedQuery.trim() ? "noResults" : "empty"}
              onClearSearch={() => setQuery("")}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshProducts}
            tintColor={AppColors.primary}
            colors={[AppColors.primary]}
          />
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURLs={item.imageURLs}
            onPress={() =>
              navigation.navigate("ProductDetailsScreen", { product: item })
            }
            onAddToCartPress={() => dispatch(addItemToCart(item))}
            isFavorite={favoriteIds.has(item.id)}
            onToggleFavoritePress={() => dispatch(toggleFavorite(item))}
            price={Number(item.price)}
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
        keyboardShouldPersistTaps="handled"
      />
    </AppSaveView>
  );
};

export default HomeScreen;
