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

const CartScreen = () => {
  const navigation=useNavigation();
  return (
    <AppSaveView>
      <HomeHeader />
       <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              // title={item.title}
              // imageURL={item.imageURL}
              // price={item.price}
              qty={0}
              onIncreasePress={() => {}}
              onDecreasePress={() => {}}
              onDeletePress={() => {}}
              {...item}
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
       
        <TotalsView itemsPrice={200} />
        <AppButton title="Continue" onPress={() => navigation.navigate('CheckoutScreen')}></AppButton>
      </View>
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
