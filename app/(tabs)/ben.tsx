import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { MoodInsights } from '@/components/mood-insights';
import { SettingsSheet } from '@/components/settings-sheet';
import { type ThemeColors } from '@/constants/palette';
import { useJournal } from '@/contexts/journal';
import { useProfile } from '@/contexts/profile';
import { useTheme } from '@/hooks/use-theme';
import { formatRelative } from '@/lib/format';
import type { GuideTone } from '@/lib/guides/guides';
import { pickProfileImage } from '@/lib/media';

const TONE_COLOR: Record<GuideTone, string> = {
  warning: '#D9534F',
  reflect: '#8B89C4',
  calm: '#8FAE8B',
};

export default function BenScreen() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { profile, updateProfile } = useProfile();
  const { entries } = useJournal();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const stats = useMemo(() => {
    const thoughts = entries.filter((e) => e.kind === 'thought').length;
    const moods = entries.filter((e) => e.kind === 'mood').length;
    const days = new Set(entries.map((e) => new Date(e.createdAt).toDateString())).size;
    return { thoughts, moods, days };
  }, [entries]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      const d = new Date(e.createdAt).toISOString().split('T')[0];
      counts[d] = (counts[d] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [entries]);

  const guideHistory = useMemo(
    () =>
      entries
        .filter((e): e is Extract<typeof e, { kind: 'guide' }> => e.kind === 'guide')
        .slice(0, 6),
    [entries]
  );

  const handleChangePhoto = async () => {
    const uri = await pickProfileImage();
    if (uri) updateProfile({ avatarUri: uri });
  };

  const Stat = ({ value, label }: { value: number; label: string }) => (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.avatarWrap} onPress={handleChangePhoto}>
          <Avatar uri={profile?.avatarUri} size={110} />
          <View style={styles.avatarBadge}>
            <Ionicons name="camera" size={15} color="#FFFFFF" />
          </View>
        </Pressable>

        <Text style={styles.name}>{profile?.name ?? 'Misafir'}</Text>
        <Text style={styles.sub}>
          {profile?.isGuest ? 'Misafir hesabı' : profile?.email}
        </Text>

        <View style={styles.statsRow}>
          <Stat value={stats.thoughts} label="Not" />
          <View style={styles.statDivider} />
          <Stat value={stats.moods} label="Ruh hali" />
          <View style={styles.statDivider} />
          <Stat value={stats.days} label="Aktif gün" />
        </View>

        <Pressable style={styles.menuRow} onPress={() => setSettingsOpen(true)}>
          <Ionicons name="settings-outline" size={20} color={c.textPrimary} />
          <Text style={styles.menuText}>Ayarlar</Text>
          <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
        </Pressable>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Etkinliklerin</Text>
          <ContributionGraph
            values={chartData}
            endDate={new Date()}
            numDays={90}
            width={Dimensions.get('window').width - 48}
            height={220}
            tooltipDataAttrs={() => ({ rx: '8', ry: '8' })}
            chartConfig={{
              backgroundColor: c.surface,
              backgroundGradientFrom: c.surface,
              backgroundGradientTo: c.surface,
              color: (opacity = 1) => `rgba(143, 174, 139, ${opacity})`,
              labelColor: () => c.textMuted,
            }}
            style={styles.chart}
          />
        </View>

        {guideHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>Geçmiş değerlendirmeler</Text>
            {guideHistory.map((g) => (
              <View key={g.id} style={styles.historyRow}>
                <View style={[styles.historyDot, { backgroundColor: TONE_COLOR[g.tone] }]} />
                <View style={styles.historyTextWrap}>
                  <Text style={styles.historyTitle} numberOfLines={1}>
                    {g.topicTitle}
                  </Text>
                  <Text style={styles.historyResult} numberOfLines={1}>
                    {g.resultTitle}
                  </Text>
                </View>
                <Text style={styles.historyDate}>{formatRelative(g.createdAt)}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.insights}>
          <Text style={styles.sectionTitle}>Ruh Hali Dağılımı</Text>
          <MoodInsights />
        </View>
      </ScrollView>

      <SettingsSheet visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    content: {
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 36,
      paddingBottom: 24,
    },
    avatarWrap: { marginBottom: 14 },
    avatarBadge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.sageDark,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: c.background,
    },
    name: { fontSize: 24, fontFamily: c.fonts.extra, color: c.textPrimary },
    sub: { fontSize: 15, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 4 },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 18,
      width: '100%',
      marginTop: 24,
      marginBottom: 20,
    },
    stat: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 22, fontFamily: c.fonts.extra, color: c.sage },
    statLabel: { fontSize: 13, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 4 },
    statDivider: { width: 1, height: 36, backgroundColor: c.card.border },
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      backgroundColor: c.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    menuText: { flex: 1, fontSize: 16, fontFamily: c.fonts.medium, color: c.textPrimary },
    insights: { width: '100%', marginTop: 24 },
    sectionTitle: {
      fontSize: 17,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
      marginBottom: 14,
    },
    chartContainer: { width: '100%', marginTop: 24 },
    chart: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingTop: 16,
    },
    historyContainer: { width: '100%', marginTop: 24 },
    historyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: c.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 10,
    },
    historyDot: { width: 10, height: 10, borderRadius: 5 },
    historyTextWrap: { flex: 1 },
    historyTitle: { fontSize: 14.5, fontFamily: c.fonts.bold, color: c.textPrimary },
    historyResult: { fontSize: 13, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 2 },
    historyDate: { fontSize: 12, fontFamily: c.fonts.regular, color: c.textMuted },
  });
