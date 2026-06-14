import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type AvatarProps = {
  uri?: string | null;
  size?: number;
};

/** Yuvarlak profil avatarı. Foto varsa onu, yoksa kişi ikonunu gösterir. */
export function Avatar({ uri, size = 104 }: AvatarProps) {
  const c = useTheme();
  const radius = size / 2;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: c.tab.activePill,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: radius }}
          contentFit="cover"
        />
      ) : (
        <Ionicons name="person" size={size * 0.42} color={c.sageDark} />
      )}
    </View>
  );
}
