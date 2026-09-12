import {
  FlatList,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import IconButton from "../buttons/IconButton";

type ProductImageSliderProps = {
  imageURLs: string[];
  height?: number;
};

const ProductImageSlider = ({ imageURLs, height = vs(280) }: ProductImageSliderProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const listRef = useRef<FlatList<string>>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!width) return;
      setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
    },
    [width],
  );

  const goTo = useCallback((nextIndex: number) => {
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setIndex(nextIndex);
  }, []);

  if (!imageURLs.length) {
    return <View style={[styles.placeholder, { height }]} />;
  }

  if (imageURLs.length === 1) {
    return (
      <View style={[styles.container, { height }]}>
        <Image source={{ uri: imageURLs[0] }} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width > 0 && (
        <FlatList
          ref={listRef}
          data={imageURLs}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, itemIndex) => `${itemIndex}-${item}`}
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={[styles.image, { width }]} />
          )}
        />
      )}

      <IconButton
        name={isRTL ? "chevron-forward" : "chevron-back"}
        style={[styles.arrow, styles.prevArrow]}
        onPress={() => goTo(index - 1)}
        disabled={index === 0}
        accessibilityLabel={t("common.previousImage")}
      />
      <IconButton
        name={isRTL ? "chevron-back" : "chevron-forward"}
        style={[styles.arrow, styles.nextArrow]}
        onPress={() => goTo(index + 1)}
        disabled={index === imageURLs.length - 1}
        accessibilityLabel={t("common.nextImage")}
      />

      <View
        style={styles.dotsContainer}
        accessibilityLabel={t("common.imageIndicator", { current: index + 1, total: imageURLs.length })}
      >
        {imageURLs.map((url, dotIndex) => (
          <View
            key={`${dotIndex}-${url}`}
            style={[styles.dot, dotIndex === index && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImageSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: AppColors.white,
  },
  placeholder: {
    width: "100%",
    backgroundColor: AppColors.lightGray,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    marginTop: -s(15),
  },
  prevArrow: {
    start: s(10),
  },
  nextArrow: {
    end: s(10),
  },
  dotsContainer: {
    position: "absolute",
    bottom: vs(10),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: s(6),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: AppColors.borderColor,
    marginHorizontal: s(3),
  },
  dotActive: {
    backgroundColor: AppColors.primary,
  },
});
