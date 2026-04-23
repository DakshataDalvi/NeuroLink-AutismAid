import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/i18n/translations";

export const useT = () => {
  const { lang } = useLanguage();
  return t[lang];
};
