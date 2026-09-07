import {
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../styles/colors";

interface AppViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const AppSaveView = ({ children, style }: AppViewProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSaveView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
