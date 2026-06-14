import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type ThemeColors } from '@/constants/palette';
import { useTheme } from '@/hooks/use-theme';

type Option<T extends string> = { value: T; label: string };

type SegmentedProps<T extends string> = {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
};

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: SegmentedProps<T>) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View style={styles.segment}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.item, active && styles.itemActive]}>
            <Text style={[styles.text, active && styles.textActive]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    segment: {
      flexDirection: 'row',
      backgroundColor: c.tab.bg,
      borderRadius: 14,
      padding: 3,
      borderWidth: 1,
      borderColor: c.tab.border,
    },
    item: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 11,
    },
    itemActive: {
      backgroundColor: c.surface,
    },
    text: {
      fontSize: 13,
      fontFamily: c.fonts.medium,
      color: c.textMuted,
    },
    textActive: {
      color: c.sageDark,
    },
  });
