import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { IS_IOS } from "../../constants/constants";

const CheckoutScreen = () => {
  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInput placeholder="Full Name" />
          <AppTextInput placeholder="Phone Number" />
          <AppTextInput placeholder="Detailed Address" />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : 0,
    paddingTop:vs(15)
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: 10,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: s(10),
  },
});
