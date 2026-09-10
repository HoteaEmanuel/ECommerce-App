import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderItemCard from "../../components/cards/OrderItemCard";
import { s, vs } from "react-native-size-matters";
import { formatDate } from "../../helpers/dateFormat";

const ordersData = [
  {
    orderId: 1,
    price: 100,
    date: formatDate(new Date()),
  },
  {
    orderId: 2,
    price: 1250,
    date: formatDate(new Date()),
  },
  {
    orderId: 3,
    price: 500,
    date: formatDate(new Date()),
  },
  {
    orderId: 4,
    price: 500,
    date: formatDate(new Date()),
  },
  {
    orderId: 5,
    price: 500,
    date: formatDate(new Date()),
  },
  {
    orderId: 6,
    price: 500,
    date: formatDate(new Date()),
  },
];
const MyOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={({ item }) => <OrderItemCard {...item} />}
        contentContainerStyle={{
          gap: s(10),
          marginBottom: vs(50),
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container:{
    height:'100%',
    paddingBottom:vs(20)
  }
});
