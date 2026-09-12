import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import OrderItemCard from "../../components/cards/OrderItemCard";
import { vs } from "react-native-size-matters";
import { formatDate } from "../../helpers/dateFormat";
import { fetchUserData } from "../../config/dataServices";
import type { Order } from "../../types/order";
import { showMessage } from "react-native-flash-message";
import AppText from "../../components/texts/AppText";
import EmptyOrders from "./EmptyOrders";

const MyOrdersScreen = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const getUserOrders = async () => {
    try {
      const data = await fetchUserData();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      showMessage({
        message: t("orders.loadError"),
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);

  if (!loading && orders.length === 0) return <EmptyOrders />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        ListEmptyComponent={<AppText>{t("common.loading")}</AppText>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItemCard
            price={item.totalPrice}
            date={formatDate(item.createdAt.toDate(), i18n.resolvedLanguage)}
            items={item.items}
          />
        )}
        contentContainerStyle={{
          gap: vs(14),
          paddingTop: vs(4),
          marginBottom: vs(50),
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingBottom: vs(20),
  },
});
