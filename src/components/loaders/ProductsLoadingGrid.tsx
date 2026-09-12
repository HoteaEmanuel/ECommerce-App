import { StyleSheet, View } from "react-native";
import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { PRODUCT_GRID_GUTTER } from "../cards/ProductCard";

type ProductsLoadingGridProps = {
  count?: number;
};

// Drop-in replacement for the product grid's ListEmptyComponent while
// products are loading - same 2-column wrap and gutter as HomeScreen's
// FlatList, built from PRODUCT_GRID_GUTTER so it can't drift out of sync.
const ProductsLoadingGrid = ({ count = 6 }: ProductsLoadingGridProps) => {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </View>
  );
};

export default ProductsLoadingGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: PRODUCT_GRID_GUTTER,
  },
});
