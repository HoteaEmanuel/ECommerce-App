import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { MaterialIcons } from "@expo/vector-icons";

type ProfileSectionButtonProps = {
  title: string;
  onPress: () => void;
};

const ProfileSectionButton = ({
  title,
  onPress,
}: ProfileSectionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.textTitle}>{title}</AppText>
      </View>
      <View>
        <MaterialIcons
          name="arrow-forward-ios"
          size={s(14)}
          color={AppColors.medGray}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSectionButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: AppColors.lightGray,
    paddingBottom: vs(10),
    marginTop: vs(14),
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: s(8),
  },
  textTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
});
