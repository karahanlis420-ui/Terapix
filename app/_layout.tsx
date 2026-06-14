import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/nunito';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { JournalProvider } from '@/contexts/journal';
import { ProfileProvider, useProfile } from '@/contexts/profile';
import { SettingsProvider } from '@/contexts/settings';
import { useIsDark } from '@/hooks/use-theme';
import { setupNotifications } from '@/lib/notifications';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { profile, isLoading } = useProfile();
  const isDark = useIsDark();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
      setupNotifications();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!profile}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack.Protected>

        <Stack.Protected guard={!profile}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // Fontlar yüklenene kadar splash görünür; hata olursa yine de devam et (sistem fontuyla)
  if (!fontsLoaded && !fontError) return null;

  return (
    <SettingsProvider>
      <ProfileProvider>
        <JournalProvider>
          <RootNavigator />
        </JournalProvider>
      </ProfileProvider>
    </SettingsProvider>
  );
}
