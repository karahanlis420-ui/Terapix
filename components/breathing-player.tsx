import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type ThemeColors } from '@/constants/palette';
import { useTheme } from '@/hooks/use-theme';
import type { BreathPhase } from '@/lib/therapy/cards';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  phases: BreathPhase[];
  accent: string;
};

const SMALL = 0.5;
const BIG = 1;

export function BreathingPlayer({ visible, onClose, title, phases, accent }: Props) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const scale = useSharedValue(SMALL);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0]?.seconds ?? 0);
  const [round, setRound] = useState(1);

  const phase = phases[phaseIdx];

  // Açılışta sıfırla
  useEffect(() => {
    if (visible) {
      setPhaseIdx(0);
      setRound(1);
      scale.value = withTiming(SMALL, { duration: 300 });
    }
  }, [visible, scale]);

  // Her faz: sayaç + animasyon + haptik
  useEffect(() => {
    if (!visible || !phase) return;

    setSecondsLeft(phase.seconds);
    const dur = phase.seconds * 1000;
    if (phase.kind === 'inhale') {
      scale.value = withTiming(BIG, { duration: dur, easing: Easing.inOut(Easing.ease) });
    } else if (phase.kind === 'exhale') {
      scale.value = withTiming(SMALL, { duration: dur, easing: Easing.inOut(Easing.ease) });
    }
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    let left = phase.seconds;
    const id = setInterval(() => {
      left -= 1;
      if (left <= 0) {
        clearInterval(id);
        setPhaseIdx((idx) => {
          const next = (idx + 1) % phases.length;
          if (next === 0) setRound((r) => r + 1);
          return next;
        });
      } else {
        setSecondsLeft(left);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [phaseIdx, visible, phase, phases.length, scale]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.closeBtn} hitSlop={12} onPress={onClose}>
          <Ionicons name="close" size={28} color={c.textMuted} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.round}>{round}. tur</Text>

        <View style={styles.circleArea}>
          <Animated.View
            style={[
              styles.circle,
              { backgroundColor: accent + '22', borderColor: accent + '55' },
              circleStyle,
            ]}
          />
          <View style={styles.circleCenter} pointerEvents="none">
            <Text style={[styles.phaseLabel, { color: accent }]}>{phase?.label}</Text>
            <Text style={styles.count}>{secondsLeft}</Text>
          </View>
        </View>

        <Text style={styles.hint}>Daireyle birlikte nefes al, sakince izle.</Text>

        <Pressable style={[styles.doneBtn, { backgroundColor: accent }]} onPress={onClose}>
          <Text style={styles.doneText}>Bitir</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const CIRCLE = 220;

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 28,
    },
    closeBtn: {
      position: 'absolute',
      top: 56,
      right: 24,
    },
    title: {
      fontSize: 22,
      fontFamily: c.fonts.extra,
      color: c.textPrimary,
      textAlign: 'center',
    },
    round: {
      fontSize: 14,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      marginTop: 6,
      marginBottom: 28,
    },
    circleArea: {
      width: CIRCLE,
      height: CIRCLE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      position: 'absolute',
      width: CIRCLE,
      height: CIRCLE,
      borderRadius: CIRCLE / 2,
      borderWidth: 2,
    },
    circleCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    phaseLabel: {
      fontSize: 22,
      fontFamily: c.fonts.bold,
    },
    count: {
      fontSize: 44,
      fontFamily: c.fonts.extra,
      color: c.textPrimary,
      fontVariant: ['tabular-nums'],
      marginTop: 4,
    },
    hint: {
      fontSize: 14,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
      marginTop: 32,
    },
    doneBtn: {
      borderRadius: 16,
      paddingVertical: 15,
      paddingHorizontal: 48,
      marginTop: 24,
    },
    doneText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: c.fonts.bold,
    },
  });
