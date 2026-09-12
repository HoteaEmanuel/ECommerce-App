import { FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard, { PRODUCT_GRID_GUTTER } from "../../components/cards/ProductCard";
import FavoritesEmptyState from "./FavoritesEmptyState";
import { RootState } from "../../store/store";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { toggleFavorite } from "../../store/reducers/favoritesSlice";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items } = useSelector((store: RootState) => store.favoritesSlice);

  if (items.length === 0) return <FavoritesEmptyState />;

  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURLs={item.imageURLs}
            onPress={() => navigation.navigate("ProductDetailsScreen", { product: item })}
            onAddToCartPress={() => dispatch(addItemToCart(item))}
            isFavorite
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
          paddingTop: PRODUCT_GRID_GUTTER,
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppSaveView>
  );
};

export default FavoritesScreen;
