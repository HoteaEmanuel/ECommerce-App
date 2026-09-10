import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppColors } from "../styles/colors";
import { vs } from "react-native-size-matters";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 2,
    width: "100%",
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(10),
  },
});
