/**
 * Terapix tasarım sistemi: açık + koyu palet ve tipografi token'ları.
 * Yuvarlak font (Nunito) tüm metinlerde kullanılır.
 */

const fonts = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extra: 'Nunito_800ExtraBold',
} as const;

export const lightPalette = {
  background: '#F5F2E8',
  surface: '#FFFFFF',
  textPrimary: '#3F3F3F',
  textMuted: '#7A7A7A',
  sage: '#8FAE8B',
  sageDark: '#6E8C6A',
  moods: {
    good: { bg: '#D9E7D1', face: '#6E8C6A', border: '#B9D2AC' },
    ok: { bg: '#FAF0C9', face: '#C9A94E', border: '#EBDB9E' },
    tired: { bg: '#DCDBEE', face: '#8B89C4', border: '#C3C1E2' },
    hard: { bg: '#F8DABF', face: '#E0915C', border: '#EEC29B' },
  },
  card: { bg: '#E9E7F4', border: '#D8D5EC' },
  tab: {
    bg: '#F1EDE0',
    activePill: '#D9E4D0',
    active: '#6E8C6A',
    inactive: '#9A968B',
    border: '#E4DFD0',
  },
  fonts,
};

export const darkPalette = {
  background: '#15171C',
  surface: '#1F232B',
  textPrimary: '#ECEDEF',
  textMuted: '#9BA1AC',
  sage: '#9CC098',
  sageDark: '#B4D0A0',
  moods: {
    good: { bg: '#2C3A2A', face: '#A7C98F', border: '#3A4A36' },
    ok: { bg: '#3A3622', face: '#E2C56B', border: '#4A452E' },
    tired: { bg: '#2E2E40', face: '#A8A6DC', border: '#3C3C52' },
    hard: { bg: '#3E2C22', face: '#E7A277', border: '#503A2E' },
  },
  card: { bg: '#27243A', border: '#393650' },
  tab: {
    bg: '#1B1E24',
    activePill: '#2C3A2A',
    active: '#B4D0A0',
    inactive: '#8A8F99',
    border: '#2A2E36',
  },
  fonts,
};

export type ThemeColors = typeof lightPalette;
export type MoodKey = keyof typeof lightPalette.moods;

/** Geriye dönük uyumluluk: tema-duyarlı olmayan dosyalar açık paleti kullanır. */
export const Palette = lightPalette;

export const AppFonts = fonts;
