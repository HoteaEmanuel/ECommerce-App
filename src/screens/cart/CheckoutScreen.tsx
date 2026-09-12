import { useTranslation } from "react-i18next";
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
import { IS_IOS, SHIPPING_FEE, TAXES } from "../../constants/constants";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { emptyCart } from "../../store/reducers/cartSlice";
type FormData = yup.InferType<typeof schema>;
const schema = yup.object({
  fullName: yup
    .string()
    .required("validation.nameRequired")
    .min(3, "validation.nameMin")
    .max(100, "validation.nameMax"),
  phoneNumber: yup
    .string()
    .required("validation.phoneRequired")
    .matches(/^[0-9]+$/, "validation.phoneDigits")
    .min(10, "validation.phoneMin"),
  detailedAddress: yup
    .string()
    .required("validation.addressRequired")
    .min(15, "validation.addressMin"),
});
const CheckoutScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { items } = useSelector((store: RootState) => store.cartSlice);
  const navigation = useNavigation();

  const totalProductPrices = items.reduce((sum, item) => sum + item.sum, 0);
  const totalPrice = totalProductPrices + TAXES + SHIPPING_FEE;
  const dispatch = useDispatch();
  const { userData } = useSelector((store: RootState) => store.userSlice);
  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductPrices,
        createdAt: new Date(),
        totalPrice,
      };

      const userOrderRef = collection(doc(db, "users", userData.uid), "orders");

      await addDoc(userOrderRef, orderBody);
      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, orderBody);
      showMessage({
        type: "success",
        message: t("checkout.success"),
      });
      dispatch(emptyCart());
      navigation.goBack();
    } catch (error) {
      console.log("Error in placing order: ", error);
      showMessage({
        type: "danger",
        message: t("checkout.error"),
      });
    }
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            placeholder={t("checkout.fullName")}
            name="fullName"
            icon="person-outline"
          />
          <AppTextInputController
            control={control}
            placeholder={t("checkout.phone")}
            name="phoneNumber"
            icon="call-outline"
            keyboardType="numeric"
          />
          <AppTextInputController
            control={control}
            placeholder={t("checkout.address")}
            name="detailedAddress"
            icon="location-outline"
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton
          title={t("common.confirm")}
          onPress={handleSubmit(saveOrder)}
        />
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
