
import React, { createContext, useContext, useEffect, useState } from "react";
import { en } from "../locales/en";
import { ar } from "../locales/ar";

type Language = "en" | "ar";
type Translations = typeof en;

type LanguageContextType = {
  language: Language;
  translations: Translations;
  changeLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  translations: en,
  changeLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language") as Language;
    return savedLang || "en";
  });

  const [translations, setTranslations] = useState<Translations>(language === "en" ? en : ar);

  useEffect(() => {
    // When language changes, update the translations
    setTranslations(language === "en" ? en : ar);
    
    // Save to localStorage
    localStorage.setItem("language", language);
    
    // Update the dir attribute on the html tag for RTL/LTR
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    
    // Set a class on the body for additional RTL/LTR styling if needed
    if (language === "ar") {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Helper function to get translations
  const t = (key: keyof Translations): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
