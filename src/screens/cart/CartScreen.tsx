import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { products } from "../../data/products";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { vs } from "react-native-size-matters";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";
const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((store: RootState) => store.cartSlice);

  const dispatch = useDispatch();

  if (items.length === 0) return <EmptyCart />;
  const totalPrice = items.reduce(
    (sum, item) => sum + item.sum,
    0,
  );
  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            // title={item.title}
            // imageURL={item.imageURL}
            // price={item.price}
            {...item}
            onIncreasePress={() => dispatch(addItemToCart(item))}
            onDecreasePress={() => dispatch(removeItemFromCart(item))}
            onDeletePress={() => dispatch(removeProductFromCart(item))}
            price={item.sum}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          paddingHorizontal: sharedPaddingHorizontal,
          // marginTop: vs(20),
          // flex: 1,
        }}
      >
        <TotalsView itemsPrice={totalPrice} />
        <AppButton
          title="Continue"
          onPress={() => navigation.navigate("CheckoutScreen")}
        ></AppButton>
      </View> 
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
