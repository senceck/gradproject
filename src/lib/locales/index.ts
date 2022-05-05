import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";

import { I18nManager } from "react-native";

export const setI18nConfig = (preselected: string | null = "en") => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: true };
  let languageTag, isRTL;

  if (!preselected) {
    let prefered =
      RNLocalize.findBestAvailableLanguage(
        preselected ? [preselected] : ["ar", "en"]
      ) || fallback;
    languageTag = prefered.languageTag;
    isRTL = prefered.isRTL;

  } else {
    languageTag = preselected;
    isRTL = preselected === "ar" ? true : false;
  }
  i18n.locale = languageTag;
  i18n.isRTL = isRTL;
  // update layout direction
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);


  return { languageTag, isRTL };
};
