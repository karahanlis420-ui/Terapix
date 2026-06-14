import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Segmented } from '@/components/segmented';
import { type ThemeColors } from '@/constants/palette';
import { useJournal } from '@/contexts/journal';
import { useProfile } from '@/contexts/profile';
import { type Language, type ThemeMode, useSettings } from '@/contexts/settings';
import { useTheme } from '@/hooks/use-theme';

type SettingsSheetProps = {
  visible: boolean;
  onClose: () => void;
};

export function SettingsSheet({ visible, onClose }: SettingsSheetProps) {
  const insets = useSafeAreaInsets();
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { language, setLanguage, themeMode, setThemeMode } = useSettings();
  const { signOut } = useProfile();
  const { clearAll, entries } = useJournal();

  const handleClear = () => {
    Alert.alert(
      'Tüm kayıtları sil',
      `${entries.length} kayıt kalıcı olarak silinecek. Emin misin?`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        { text: 'Sil', style: 'destructive', onPress: () => clearAll() },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert('Çıkış yap', 'Çıkış yapmak istediğine emin misin?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Çıkış yap',
        style: 'destructive',
        onPress: () => {
          onClose();
          signOut();
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Ayarlar</Text>
          <Pressable hitSlop={10} onPress={onClose}>
            <Ionicons name="close" size={24} color={c.textMuted} />
          </Pressable>
        </View>

        <Text style={styles.section}>Görünüm</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dil</Text>
          <Segmented<Language>
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'tr', label: 'Türkçe' },
              { value: 'en', label: 'English' },
            ]}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tema</Text>
          <Segmented<ThemeMode>
            value={themeMode}
            onChange={setThemeMode}
            options={[
              { value: 'light', label: 'Açık' },
              { value: 'dark', label: 'Koyu' },
              { value: 'system', label: 'Sistem' },
            ]}
          />
        </View>

        <Text style={styles.section}>Veriler</Text>
        <Pressable style={styles.actionRow} onPress={handleClear}>
          <Ionicons name="trash-outline" size={20} color={c.textPrimary} />
          <Text style={styles.actionText}>Tüm kayıtları sil</Text>
          <Text style={styles.actionMeta}>{entries.length}</Text>
        </Pressable>

        <Text style={styles.section}>Hesap</Text>
        <Pressable style={styles.actionRow} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color={c.moods.hard.face} />
          <Text style={[styles.actionText, { color: c.moods.hard.face }]}>Çıkış yap</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
      backgroundColor: c.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    title: {
      fontSize: 22,
      fontFamily: c.fonts.extra,
      color: c.textPrimary,
    },
    section: {
      fontSize: 13,
      fontFamily: c.fonts.bold,
      color: c.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 18,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    rowLabel: {
      fontSize: 15,
      fontFamily: c.fonts.medium,
      color: c.textPrimary,
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: c.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    actionText: {
      flex: 1,
      fontSize: 15,
      fontFamily: c.fonts.medium,
      color: c.textPrimary,
    },
    actionMeta: {
      fontSize: 14,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
  });
