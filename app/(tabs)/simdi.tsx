import * as Haptics from 'expo-haptics';
import React, { useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MoodFace } from '@/components/mood-face';
import { type MoodKey, type ThemeColors } from '@/constants/palette';
import { useJournal } from '@/contexts/journal';
import { useTheme } from '@/hooks/use-theme';
import { formatTime } from '@/lib/format';

type Mood = { key: MoodKey; label: string };

const MOODS: Mood[] = [
  { key: 'good', label: 'İyi' },
  { key: 'ok', label: 'İdare eder' },
  { key: 'tired', label: 'Yorgun' },
  { key: 'hard', label: 'Zor bir\ngün' },
];

const MOOD_LABEL: Record<MoodKey, string> = {
  good: 'İyi',
  ok: 'İdare eder',
  tired: 'Yorgun',
  hard: 'Zor bir gün',
};

function isToday(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

export default function SimdiScreen() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { entries, addMood } = useJournal();

  const handleMood = (mood: MoodKey) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    addMood(mood);
  };

  const todayMoods = useMemo(
    () =>
      entries.filter(
        (e): e is Extract<typeof e, { kind: 'mood' }> =>
          e.kind === 'mood' && isToday(e.createdAt)
      ),
    [entries]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Şu an nasıl hissediyorsun?</Text>
        <Text style={styles.subheading}>
          Seçtiğin an tarih ve saatiyle birlikte kaydedilir.
        </Text>

        <View style={styles.moodRow}>
          {MOODS.map((mood) => {
            const colors = c.moods[mood.key];
            return (
              <Pressable
                key={mood.key}
                onPress={() => handleMood(mood.key)}
                style={[styles.moodCard, { backgroundColor: colors.bg }]}>
                <MoodFace variant={mood.key} color={colors.face} size={52} />
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.dayCard}>
          <Text style={styles.dayCardTitle}>Günün kartı</Text>
          <Text style={styles.dayCardBody}>
            Her yeni gün, kendine iyi bakmak için yeni bir fırsattır. Nazik ol. 🤍
          </Text>
        </View>

        <View style={styles.todayHeader}>
          <Text style={styles.sectionTitle}>Bugünkü kayıtların</Text>
          {todayMoods.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{todayMoods.length}</Text>
            </View>
          )}
        </View>

        {todayMoods.length === 0 ? (
          <Text style={styles.emptyText}>
            Bugün henüz kayıt yok. Yukarıdan bir seçim yap.
          </Text>
        ) : (
          todayMoods.map((item) => {
            const colors = c.moods[item.mood];
            return (
              <View key={item.id} style={styles.logRow}>
                <MoodFace variant={item.mood} color={colors.face} size={34} />
                <Text style={styles.logLabel}>{MOOD_LABEL[item.mood]}</Text>
                <Text style={styles.logTime}>{formatTime(item.createdAt)}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },
    heading: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: c.fonts.bold,
      color: c.sage,
      textAlign: 'center',
    },
    subheading: {
      fontSize: 14,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    moodRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: 10,
    },
    moodCard: {
      flex: 1,
      borderRadius: 20,
      paddingVertical: 18,
      paddingHorizontal: 6,
      alignItems: 'center',
      gap: 12,
      minHeight: 130,
      justifyContent: 'center',
    },
    moodLabel: {
      fontSize: 14,
      fontFamily: c.fonts.medium,
      color: c.textPrimary,
      textAlign: 'center',
    },
    dayCard: {
      width: '100%',
      backgroundColor: c.card.bg,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 24,
      paddingHorizontal: 22,
      marginTop: 24,
      alignItems: 'center',
    },
    dayCardTitle: {
      fontSize: 16,
      fontFamily: c.fonts.bold,
      color: c.sage,
      marginBottom: 14,
    },
    dayCardBody: {
      fontSize: 17,
      lineHeight: 26,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
      textAlign: 'center',
    },
    todayHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 28,
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 17,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
    },
    countBadge: {
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      paddingHorizontal: 6,
      backgroundColor: c.tab.activePill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      fontSize: 12,
      fontFamily: c.fonts.bold,
      color: c.sageDark,
    },
    emptyText: {
      fontSize: 14.5,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
    logRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: c.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
    },
    logLabel: {
      flex: 1,
      fontSize: 15,
      fontFamily: c.fonts.medium,
      color: c.textPrimary,
    },
    logTime: {
      fontSize: 13,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      fontVariant: ['tabular-nums'],
    },
  });
