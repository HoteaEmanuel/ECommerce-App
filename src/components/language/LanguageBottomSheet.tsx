import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AppText from "../texts/AppText";
import AppButton from "../buttons/AppButton";
import { s } from "react-native-size-matters";
import RadioWithTitle from "../inputs/RadioWithTitle";
import { useTranslation } from "react-i18next";
import { changeAppLanguage, languages, isLanguageCode, type LanguageCode } from "../../localization/i18n";
const LanguageBottomSheet = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<LanguageCode>("en");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const confirm = async () => {
    setSaving(true);
    setSaveError(false);
    try {
      await changeAppLanguage(selected);
      await SheetManager.hide("LANG_SHEET");
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };
  return (
    <ActionSheet id="LANG_SHEET" onBeforeShow={() => {
      setSelected(isLanguageCode(i18n.resolvedLanguage) ? i18n.resolvedLanguage : "en");
      setSaveError(false);
    }}>
      <View style={[styles.container, { direction: i18n.dir() }]}>
        <AppText
          style={{
            textAlign: "center",
          }}
        >
          {t("language.title")}
        </AppText>
        <ScrollView style={styles.languages}>
          {languages.map((language) => (
            <RadioWithTitle key={language.code} title={language.label}
              selected={selected === language.code} disabled={saving}
              onPress={() => setSelected(language.code)} />
          ))}
        </ScrollView>

        {saveError && <AppText accessibilityRole="alert">{t("language.saveError")}</AppText>}
        <AppButton title={t("common.confirm")} onPress={confirm} disabled={saving} />
      </View>
    </ActionSheet>
  );
};

export default LanguageBottomSheet;

const styles = StyleSheet.create({
  languages: { maxHeight: 360, marginVertical: s(12) },
  container: {
    padding: s(16),
  },
});
