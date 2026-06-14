import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { BreathingPlayer } from '@/components/breathing-player';
import { type ThemeColors } from '@/constants/palette';
import { useTheme } from '@/hooks/use-theme';
import { CATEGORY_META, type TherapyCard as TCard } from '@/lib/therapy/cards';

const EMERGENCY = [
  { label: '182 · ALO Yaşam Hattı', number: '182' },
  { label: '183 · Sosyal Destek', number: '183' },
  { label: '112 · Acil', number: '112' },
];

export function TherapyCard({ card }: { card: TCard }) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [breatheOpen, setBreatheOpen] = useState(false);
  const meta = CATEGORY_META[card.category];
  const accent = meta.accent;
  const isCrisis = card.category === 'crisis';

  return (
    <View
      style={[
        styles.card,
        { borderColor: accent + '55' },
        isCrisis && { backgroundColor: accent + '12' },
      ]}>
      <View style={styles.head}>
        <View style={[styles.iconChip, { backgroundColor: accent + '22' }]}>
          <Ionicons name={card.icon} size={18} color={accent} />
        </View>
        <Text style={[styles.tag, { color: accent }]}>{card.typeLabel}</Text>
      </View>

      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.body}>{card.body}</Text>

      {card.steps?.map((step, i) => (
        <View key={i} style={styles.stepRow}>
          <View style={[styles.bullet, { backgroundColor: accent }]}>
            <Text style={styles.bulletText}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      {card.breathing && (
        <Pressable
          style={[styles.breatheBtn, { backgroundColor: accent }]}
          onPress={() => setBreatheOpen(true)}>
          <Ionicons name="play" size={16} color="#FFFFFF" />
          <Text style={styles.breatheText}>Nefes egzersizini başlat</Text>
        </Pressable>
      )}

      {isCrisis && (
        <View style={styles.callRow}>
          {EMERGENCY.map((e) => (
            <Pressable
              key={e.number}
              style={[styles.callBtn, { borderColor: accent }]}
              onPress={() => Linking.openURL(`tel:${e.number}`)}>
              <Ionicons name="call" size={15} color={accent} />
              <Text style={[styles.callText, { color: accent }]}>{e.label}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {card.breathing && (
        <BreathingPlayer
          visible={breatheOpen}
          onClose={() => setBreatheOpen(false)}
          title={card.title}
          phases={card.breathing}
          accent={accent}
        />
      )}
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: c.surface,
      borderRadius: 18,
      borderWidth: 1,
      padding: 16,
    },
    head: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10,
    },
    iconChip: {
      width: 30,
      height: 30,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tag: {
      fontSize: 12,
      fontFamily: c.fonts.bold,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    title: {
      fontSize: 16.5,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
      marginBottom: 6,
    },
    body: {
      fontSize: 14.5,
      lineHeight: 21,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 10,
    },
    bullet: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    bulletText: {
      fontSize: 11,
      fontFamily: c.fonts.bold,
      color: '#FFFFFF',
    },
    stepText: {
      flex: 1,
      fontSize: 14.5,
      lineHeight: 21,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
    },
    callRow: {
      marginTop: 14,
      gap: 8,
    },
    callBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderWidth: 1.5,
      borderRadius: 12,
      paddingVertical: 11,
    },
    callText: {
      fontSize: 14,
      fontFamily: c.fonts.bold,
    },
    breatheBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 12,
      paddingVertical: 12,
      marginTop: 14,
    },
    breatheText: {
      color: '#FFFFFF',
      fontSize: 14.5,
      fontFamily: c.fonts.bold,
    },
  });
