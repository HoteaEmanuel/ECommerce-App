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
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={t("navigation.orders")}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton
          title={t("profile.language")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <ProfileSectionButton title={t("profile.logout")} />
      </View>

      <LanguageBottomSheet />
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
