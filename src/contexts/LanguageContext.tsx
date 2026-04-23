import { createContext, useContext, useState, ReactNode } from "react";
import { LangCode, languages } from "@/i18n/translations";

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", setLang: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LangCode>(() => {
    const saved = localStorage.getItem("neurolink-lang");
    return (saved as LangCode) || "en";
  });

  const handleSetLang = (l: LangCode) => {
    setLang(l);
    localStorage.setItem("neurolink-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
