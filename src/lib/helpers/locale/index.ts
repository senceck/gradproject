import i18n from "i18n-js";

export const ifArabic = (p1, p2) => {
  return i18n.isRTL ? p1 : p2;
};
