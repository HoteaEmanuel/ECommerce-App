import { useTranslation } from "react-i18next";
import { AppState, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSaveView from "../../components/views/AppSaveView";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from "../../store/reducers/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import ProfileAccountHeader from "../../components/profile/ProfileAccountHeader";
const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const handleLogin = async () => {
    try {
      dispatch(setUserData({}));
      await AsyncStorage.removeItem("USER_DATA");
      await signOut(auth);
      navigation.navigate("AuthStack");
    } catch (error) {
      console.error("Error loggin out: ", error);
    }
  };

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileAccountHeader name={currentUser?.displayName} email={currentUser?.email} />
        <ProfileSectionButton
          title={t("navigation.orders")}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton
          title={t("profile.language")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <ProfileSectionButton
          title={t("profile.logout")}
          onPress={handleLogin}
        />
      </View>

      <LanguageBottomSheet />
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
