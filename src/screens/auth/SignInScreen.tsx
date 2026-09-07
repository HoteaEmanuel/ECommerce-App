import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";

import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton
        title="Login"
        onPress={() => navigation.navigate("MainAppBottomTabs")}
      />
      <AppButton
        title="Sign up"
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: vs(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
  },
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
