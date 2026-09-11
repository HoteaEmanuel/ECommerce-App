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
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
type FormData = yup.InferType<typeof schema>
const schema = yup.object({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be shorter than 100 characters"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  detailedAddress: yup
    .string()
    .required("The address is required")
    .min(
      15,
      "Please provide a detailed address containing atlest 15 characters",
    ),
});
const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const saveOrder = (orderData: FormData) => {

  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            placeholder={"Full Name"}
            name="fullName"
          />
          <AppTextInputController
            control={control}
            placeholder="Phone Number"
            name="phoneNumber"
          />
          <AppTextInputController
            control={control}
            placeholder="Detailed Address"
            name="detailedAddress"
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
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
    paddingTop: vs(15),
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
