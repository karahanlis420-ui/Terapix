import { darkPalette, lightPalette, type ThemeColors } from '@/constants/palette';
import { useSettings } from '@/contexts/settings';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** Aktif temanın koyu olup olmadığını döndürür (ayar + sistem tercihine göre). */
export function useIsDark(): boolean {
  const system = useColorScheme();
  const { themeMode } = useSettings();
  if (themeMode === 'dark') return true;
  if (themeMode === 'light') return false;
  return system === 'dark';
}

/** Aktif tema renklerini ve fontlarını döndürür. */
export function useTheme(): ThemeColors {
  return useIsDark() ? darkPalette : lightPalette;
}
