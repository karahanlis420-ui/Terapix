import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Palette } from '@/constants/palette';

type PlaceholderScreenProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

/**
 * Henüz tasarlanmamış sekmeler için ortak yer tutucu ekran.
 */
export function PlaceholderScreen({ icon, title, subtitle }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.iconCircle}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Palette.tab.activePill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Palette.sage,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Palette.textMuted,
    textAlign: 'center',
  },
});
