import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../inputs/AppTextInput";
import IconButton from "../buttons/IconButton";
import { AppColors } from "../../styles/colors";
import type { Ionicons } from "@expo/vector-icons";

export type ProductSort = "none" | "priceAsc" | "priceDesc";

const nextSort: Record<ProductSort, ProductSort> = {
  none: "priceAsc",
  priceAsc: "priceDesc",
  priceDesc: "none",
};

const sortIcons: Record<ProductSort, keyof typeof Ionicons.glyphMap> = {
  none: "swap-vertical-outline",
  priceAsc: "arrow-up-outline",
  priceDesc: "arrow-down-outline",
};

const sortLabels: Record<ProductSort, string> = {
  none: "home.sortDefault",
  priceAsc: "home.sortPriceAsc",
  priceDesc: "home.sortPriceDesc",
};

type ProductsSearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
};

const ProductsSearchBar = ({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: ProductsSearchBarProps) => {
  const { t } = useTranslation();
  const isSorted = sort !== "none";
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AppTextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder={t("home.search")}
          icon="search-outline"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      <IconButton
        name={sortIcons[sort]}
        onPress={() => onSortChange(nextSort[sort])}
        accessibilityLabel={t(sortLabels[sort])}
        size={s(18)}
        backgroundColor={isSorted ? AppColors.primary : AppColors.blueGray}
        color={isSorted ? AppColors.white : AppColors.primary}
        style={styles.sortButton}
      />
    </View>
  );
};

export default ProductsSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: s(10),
    paddingTop: vs(10),
  },
  inputContainer: {
    flex: 1,
  },
  sortButton: {
    height: s(40),
    width: s(40),
    borderRadius: s(20),
  },
});
