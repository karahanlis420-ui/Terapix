import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'tr' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'terapix.settings.v1';

type Settings = {
  language: Language;
  themeMode: ThemeMode;
};

const DEFAULTS: Settings = { language: 'tr', themeMode: 'system' };

type SettingsContextValue = Settings & {
  setLanguage: (language: Language) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
      } catch {
        // yok say
      }
    })();
  }, []);

  const persist = (next: Settings) => {
    setSettings(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setLanguage: (language) => persist({ ...settings, language }),
        setThemeMode: (themeMode) => persist({ ...settings, themeMode }),
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings, SettingsProvider içinde kullanılmalı');
  }
  return ctx;
}
