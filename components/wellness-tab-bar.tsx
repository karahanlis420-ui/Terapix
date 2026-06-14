import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React, { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type ThemeColors } from '@/constants/palette';
import { useTheme } from '@/hooks/use-theme';

type IconProps = { color: string; size: number };

const TAB_ICONS: Record<string, (p: IconProps) => React.ReactNode> = {
  index: ({ color, size }) => (
    <MaterialCommunityIcons name="sprout" size={size} color={color} />
  ),
  simdi: ({ color, size }) => (
    <MaterialCommunityIcons name="heart-pulse" size={size} color={color} />
  ),
  kesfet: ({ color, size }) => (
    <Ionicons name="compass-outline" size={size} color={color} />
  ),
  ben: ({ color, size }) => (
    <Ionicons name="person-outline" size={size} color={color} />
  ),
};

export function WellnessTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title ?? route.name;

        const isFocused = state.index === index;
        const color = isFocused ? c.tab.active : c.tab.inactive;
        const renderIcon = TAB_ICONS[route.name];

        const onPress = () => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.tab}>
            <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
              {renderIcon?.({ color, size: 24 })}
            </View>
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: c.tab.bg,
      borderTopWidth: 1,
      borderTopColor: c.tab.border,
      paddingTop: 10,
      paddingHorizontal: 8,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    iconWrap: {
      width: 56,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconWrapActive: {
      backgroundColor: c.tab.activePill,
    },
    label: {
      fontSize: 12,
      fontFamily: c.fonts.medium,
    },
  });
