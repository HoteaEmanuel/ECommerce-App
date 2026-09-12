import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import React, { useEffect, useRef } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { commonStyles } from "../../styles/sharedStyles";
import { getProductCardWidth } from "../cards/ProductCard";

// Placeholder shown in place of a ProductCard while products are loading.
// Mirrors ProductCard's own dimensions (imported from it) so the grid
// doesn't jump around once the real cards arrive.
const ProductCardSkeleton = () => {
  const { width } = useWindowDimensions();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <Animated.View style={[styles.container, { width: getProductCardWidth(width), opacity }]}>
      <Animated.View style={styles.image} />
      <Animated.View style={styles.detailsContainer}>
        <Animated.View style={styles.titleLine} />
        <Animated.View style={styles.priceLine} />
      </Animated.View>
    </Animated.View>
  );
};

export default ProductCardSkeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  image: {
    height: vs(165),
    width: "100%",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    backgroundColor: AppColors.lightGray,
  },
  detailsContainer: {
    paddingTop: s(10),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleLine: {
    height: s(15),
    width: "80%",
    borderRadius: s(4),
    backgroundColor: AppColors.lightGray,
  },
  priceLine: {
    height: s(15),
    width: "45%",
    borderRadius: s(4),
    backgroundColor: AppColors.lightGray,
    marginTop: vs(10),
  },
});
