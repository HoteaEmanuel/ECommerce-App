import { AppState, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSaveView from "../../components/views/AppSaveView";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((store: RootState) => store.userSlice);
  console.log("USER: ", userData);
  return (
    <AppSaveView>
      <HomeHeader />
      <AppText style={{ fontSize: s(18), marginTop: vs(10) }}>
        {" "}
        Hello {userData.email}
      </AppText>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title="My Orders"
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton title="Language" />
        <ProfileSectionButton title="Log out" />
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
