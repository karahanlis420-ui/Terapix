import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MoodFace } from '@/components/mood-face';
import { type ThemeColors } from '@/constants/palette';
import { useJournal } from '@/contexts/journal';
import { useTheme } from '@/hooks/use-theme';
import { bandOfScore, colorKeyOfBand, lastNDays, predict } from '@/lib/analytics';

const CHART_HEIGHT = 100;

export function MoodInsights() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { entries } = useJournal();

  const moodCount = useMemo(
    () => entries.filter((e) => e.kind === 'mood').length,
    [entries]
  );
  const week = useMemo(() => lastNDays(entries, 7), [entries]);
  const prediction = useMemo(() => predict(entries), [entries]);

  if (moodCount === 0) {
    return (
      <View style={styles.emptyCard}>
        <Ionicons name="bar-chart-outline" size={36} color={c.sageDark} />
        <Text style={styles.emptyText}>
          “Şimdi” sekmesinden ruh halini kaydetmeye başla; eğilimin ve tahminin
          burada görünecek.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Son 7 gün</Text>
        <View style={styles.chart}>
          {week.map((b) => {
            const ratio = b.avg !== null ? b.avg / 4 : 0;
            const color =
              b.avg !== null
                ? c.moods[colorKeyOfBand(bandOfScore(b.avg))].face
                : c.card.border;
            return (
              <View key={b.key} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: Math.max(6, ratio * CHART_HEIGHT),
                        backgroundColor: color,
                        opacity: b.avg !== null ? 1 : 0.4,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{b.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {prediction.hasEnoughData ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Yarın için tahmin</Text>
          <View style={styles.predRow}>
            <View
              style={[
                styles.predFace,
                { backgroundColor: c.moods[prediction.colorKey].bg },
              ]}>
              <MoodFace
                variant={prediction.colorKey}
                color={c.moods[prediction.colorKey].face}
                size={44}
              />
            </View>
            <View style={styles.predInfo}>
              <Text style={styles.predLabel}>{prediction.label}</Text>
              <View style={styles.confRow}>
                <Ionicons name="pulse" size={14} color={c.textMuted} />
                <Text style={styles.confText}>Güven: {prediction.confidenceLabel}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.basis}>{prediction.basis}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tahmin için biraz daha veri</Text>
          <Text style={styles.basis}>{prediction.basis}</Text>
        </View>
      )}

      {prediction.hasEnoughData && prediction.precautions.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="bulb-outline" size={18} color={c.sageDark} />
            <Text style={styles.cardTitle}>Sana önerilenler</Text>
          </View>
          {prediction.precautions.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="checkmark-circle" size={18} color={c.sage} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.disclaimer}>
        <Ionicons name="shield-checkmark-outline" size={15} color={c.textMuted} />
        <Text style={styles.disclaimerText}>
          Bu tahmin bir tıbbi teşhis değildir; yalnızca kayıtlarına dayalı genel
          bir eğilim göstergesidir.
        </Text>
      </View>
    </>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.card.border,
      padding: 18,
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    chart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 18,
    },
    barCol: {
      flex: 1,
      alignItems: 'center',
      gap: 8,
    },
    barTrack: {
      height: CHART_HEIGHT,
      justifyContent: 'flex-end',
    },
    barFill: {
      width: 20,
      borderRadius: 8,
    },
    barLabel: {
      fontSize: 12,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
    predRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginTop: 14,
    },
    predFace: {
      width: 68,
      height: 68,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    predInfo: {
      flex: 1,
    },
    predLabel: {
      fontSize: 19,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
    },
    confRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 6,
    },
    confText: {
      fontSize: 13.5,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
    basis: {
      fontSize: 14,
      lineHeight: 21,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      marginTop: 12,
    },
    tipRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 12,
    },
    tipText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 22,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
    },
    disclaimer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      paddingHorizontal: 4,
      marginBottom: 8,
    },
    disclaimerText: {
      flex: 1,
      fontSize: 12.5,
      lineHeight: 19,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
    emptyCard: {
      backgroundColor: c.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.card.border,
      padding: 24,
      alignItems: 'center',
      gap: 10,
    },
    emptyText: {
      fontSize: 14.5,
      lineHeight: 22,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
    },
  });
