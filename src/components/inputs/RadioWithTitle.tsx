import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";

interface RadioWithTitleProps {
  selected: boolean;
  disabled?: boolean;
  title: string;
  onPress: () => void;
}

const RadioWithTitle = ({
  selected = false,
  disabled = false,
  onPress,
  title,
}: RadioWithTitleProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}
      accessibilityRole="radio" accessibilityLabel={title}
      accessibilityState={{ checked: selected, disabled }}>
      <View style={styles.circle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <AppText>{title}</AppText>
    </TouchableOpacity>
  );
};

export default RadioWithTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(10),
    gap:s(10)
  },
  circle: {
    height: s(20),
    width: s(20),
    borderRadius: s(10),
    borderWidth: 2,
    borderColor: AppColors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: s(15),
    width: s(15),
    borderRadius: s(8),
    borderWidth: 2,
    backgroundColor: AppColors.black,
    borderColor: AppColors.black,
    justifyContent: "center",
    alignItems: "center",
  },
});
