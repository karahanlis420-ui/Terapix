import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SceneArt } from '@/components/scene-art';
import { TherapyCard } from '@/components/therapy-card';
import { type ThemeColors } from '@/constants/palette';
import { useJournal } from '@/contexts/journal';
import { useTheme } from '@/hooks/use-theme';
import {
  DISCLAIMER,
  evaluateGuide,
  getTopic,
  GUIDE_TOPICS,
  type GuideTone,
  type GuideTopic,
} from '@/lib/guides/guides';
import { getReading, READING_GROUPS, READINGS, type Reading } from '@/lib/readings/readings';
import { FEELINGS, getScene, SCENES, type Scene } from '@/lib/scenes/scenes';
import { getCardById } from '@/lib/therapy/cards';

const SCENE_W = Dimensions.get('window').width - 40;

const GUIDE_GROUPS = Array.from(new Set(GUIDE_TOPICS.map((t) => t.group)));

const TONE_COLOR: Record<GuideTone, string> = {
  warning: '#D9534F',
  reflect: '#8B89C4',
  calm: '#8FAE8B',
};

const TONE_ICON: Record<GuideTone, keyof typeof Ionicons.glyphMap> = {
  warning: 'alert-circle-outline',
  reflect: 'bulb-outline',
  calm: 'leaf-outline',
};

const TOPIC_CARD: Record<string, string> = {
  'rel-cheating': 'anx-reframe',
  'rel-health': 'rel-ifeel',
  'rel-breakup': 'rel-ifeel',
  'mood-depression': 'sad-activation',
  'anx-normal': 'anx-box',
  panic: 'anx-box',
  'anger-control': 'ang-pause',
  'self-worth': 'sc-friend',
  burnout: 'str-relax',
  procrastination: 'str-one',
  boundaries: 'sc-friend',
  perfectionism: 'sc-friend',
  'phone-overuse': 'str-relax',
  'social-anxiety': 'anx-54321',
};

export default function KesfetScreen() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { addGuideResult } = useJournal();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [readingId, setReadingId] = useState<string | null>(null);
  const [sceneId, setSceneId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const topic = activeId ? getTopic(activeId) : undefined;
  const reading = readingId ? getReading(readingId) : undefined;
  const scene = sceneId ? getScene(sceneId) : undefined;

  const toTop = () =>
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ y: 0, animated: false }));

  const openTopic = (id: string) => {
    setReadingId(null);
    setSceneId(null);
    setActiveId(id);
    setAnswers({});
    setShowResult(false);
    toTop();
  };
  const closeTopic = () => {
    setActiveId(null);
    setAnswers({});
    setShowResult(false);
    toTop();
  };
  const openReading = (id: string) => {
    setActiveId(null);
    setSceneId(null);
    setReadingId(id);
    toTop();
  };
  const closeReading = () => {
    setReadingId(null);
    toTop();
  };
  const openScene = (id: string) => {
    setActiveId(null);
    setReadingId(null);
    setSceneId(id);
    toTop();
  };
  const closeScene = () => {
    setSceneId(null);
    toTop();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {scene ? (
          <SceneDetail scene={scene} onClose={closeScene} />
        ) : reading ? (
          <ReadingDetail reading={reading} onClose={closeReading} />
        ) : topic ? (
          <TopicDetail
            topic={topic}
            answers={answers}
            showResult={showResult}
            onAnswer={(qid, idx) => setAnswers((p) => ({ ...p, [qid]: idx }))}
            onSeeResult={() => {
              const result = evaluateGuide(topic, answers);
              addGuideResult(topic.id, topic.title, result.title, result.tone);
              setShowResult(true);
              toTop();
            }}
            onRetake={() => {
              setAnswers({});
              setShowResult(false);
              toTop();
            }}
            onClose={closeTopic}
          />
        ) : (
          <TopicList
            onOpenGuide={openTopic}
            onOpenReading={openReading}
            onOpenScene={openScene}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Liste ---------------- */

function TopicList({
  onOpenGuide,
  onOpenReading,
  onOpenScene,
}: {
  onOpenGuide: (id: string) => void;
  onOpenReading: (id: string) => void;
  onOpenScene: (id: string) => void;
}) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <>
      <Text style={styles.title}>Keşfet</Text>
      <Text style={styles.subtitle}>
        Değerlendirmeler, kanıta dayalı bilgiler ve kalbe iyi gelen sözler.
      </Text>

      <Text style={styles.bigGroup}>Kendini keşfet</Text>
      {GUIDE_GROUPS.map((group) => (
        <View key={group} style={styles.group}>
          <Text style={styles.groupTitle}>{group}</Text>
          {GUIDE_TOPICS.filter((t) => t.group === group).map((t) => (
            <Card
              key={t.id}
              icon={t.icon}
              accent={t.accent}
              title={t.title}
              teaser={t.teaser}
              onPress={() => onOpenGuide(t.id)}
            />
          ))}
        </View>
      ))}

      <Text style={styles.bigGroup}>Oku & dinlen</Text>
      {READING_GROUPS.map((group) => (
        <View key={group} style={styles.group}>
          <Text style={styles.groupTitle}>{group}</Text>
          {READINGS.filter((r) => r.group === group).map((r) => (
            <Card
              key={r.id}
              icon={r.icon}
              accent={r.accent}
              title={r.title}
              teaser={r.teaser}
              onPress={() => onOpenReading(r.id)}
            />
          ))}
        </View>
      ))}

      <Text style={styles.bigGroup}>Görselle yansıt</Text>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Sahneler</Text>
        {SCENES.map((s) => (
          <Card
            key={s.id}
            icon={s.icon}
            accent={s.accent}
            title={s.title}
            teaser={s.teaser}
            onPress={() => onOpenScene(s.id)}
          />
        ))}
      </View>
    </>
  );
}

function Card({
  icon,
  accent,
  title,
  teaser,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  title: string;
  teaser: string;
  onPress: () => void;
}) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <Animated.View entering={FadeInDown.duration(300)}>
      <Pressable style={styles.topicCard} onPress={onPress}>
        <View style={[styles.topicIcon, { backgroundColor: accent + '22' }]}>
          <Ionicons name={icon} size={22} color={accent} />
        </View>
        <View style={styles.topicText}>
          <Text style={styles.topicTitle}>{title}</Text>
          <Text style={styles.topicTeaser}>{teaser}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={c.textMuted} />
      </Pressable>
    </Animated.View>
  );
}

/* ---------------- Okuma detayı ---------------- */

function ReadingDetail({ reading, onClose }: { reading: Reading; onClose: () => void }) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <>
      <Pressable style={styles.backRow} onPress={onClose} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        <Text style={styles.backText}>Geri</Text>
      </Pressable>

      <View style={[styles.introCard, { borderColor: reading.accent + '55' }]}>
        <View style={[styles.topicIcon, { backgroundColor: reading.accent + '22' }]}>
          <Ionicons name={reading.icon} size={22} color={reading.accent} />
        </View>
        <Text style={styles.detailTitle}>{reading.title}</Text>
        <View style={styles.readMetaRow}>
          <Ionicons name="time-outline" size={13} color={c.textMuted} />
          <Text style={styles.readMeta}>
            {reading.readMinutes} dk · {reading.group}
          </Text>
        </View>
      </View>

      {reading.sections.map((s, i) => (
        <View key={i} style={styles.readSection}>
          {s.heading ? <Text style={styles.readHeading}>{s.heading}</Text> : null}
          {s.body ? <Text style={styles.readBody}>{s.body}</Text> : null}
          {s.bullets?.map((b, bi) => (
            <View key={bi} style={styles.readBulletRow}>
              <View style={[styles.readBulletDot, { backgroundColor: reading.accent }]} />
              <Text style={styles.readBulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}

      {reading.source ? (
        <View style={styles.sourceRow}>
          <Ionicons name="shield-checkmark-outline" size={14} color={c.textMuted} />
          <Text style={styles.sourceText}>{reading.source}</Text>
        </View>
      ) : null}

      <Pressable style={styles.secondaryBtn} onPress={onClose}>
        <Text style={styles.secondaryBtnText}>Listeye dön</Text>
      </Pressable>
    </>
  );
}

/* ---------------- Görselle yansıtma ---------------- */

function SceneDetail({ scene, onClose }: { scene: Scene; onClose: () => void }) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const [feeling, setFeeling] = useState<string | null>(null);
  const selected = FEELINGS.find((f) => f.label === feeling);

  return (
    <>
      <Pressable style={styles.backRow} onPress={onClose} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        <Text style={styles.backText}>Geri</Text>
      </Pressable>

      <View style={{ marginBottom: 18 }}>
        <SceneArt kind={scene.kind} width={SCENE_W} height={200} />
      </View>

      <Text style={styles.detailTitle}>{scene.title}</Text>
      <Text style={styles.intro}>{scene.prompt}</Text>

      <View style={styles.chipsRow}>
        {FEELINGS.map((f) => {
          const on = f.label === feeling;
          return (
            <Pressable
              key={f.label}
              onPress={() => setFeeling(f.label)}
              style={[
                styles.chip,
                on && { backgroundColor: scene.accent + '22', borderColor: scene.accent },
              ]}>
              <Text style={[styles.chipText, on && { color: scene.accent }]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {selected && (
        <View
          style={[
            styles.responseCard,
            { borderColor: scene.accent + '55', backgroundColor: scene.accent + '10' },
          ]}>
          <Text style={styles.responseText}>{selected.response}</Text>
        </View>
      )}

      <Text style={styles.disclaimer}>
        Doğru ya da yanlış bir his yok; sadece fark etmen yeterli.
      </Text>

      <Pressable style={styles.secondaryBtn} onPress={onClose}>
        <Text style={styles.secondaryBtnText}>Listeye dön</Text>
      </Pressable>
    </>
  );
}

/* ---------------- Değerlendirme ---------------- */

type DetailProps = {
  topic: GuideTopic;
  answers: Record<string, number>;
  showResult: boolean;
  onAnswer: (qid: string, idx: number) => void;
  onSeeResult: () => void;
  onRetake: () => void;
  onClose: () => void;
};

function TopicDetail({
  topic,
  answers,
  showResult,
  onAnswer,
  onSeeResult,
  onRetake,
  onClose,
}: DetailProps) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const allAnswered = topic.questions.every((q) => answers[q.id] != null);

  return (
    <>
      <Pressable style={styles.backRow} onPress={onClose} hitSlop={8}>
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        <Text style={styles.backText}>Konular</Text>
      </Pressable>

      <View style={[styles.introCard, { borderColor: topic.accent + '55' }]}>
        <View style={[styles.topicIcon, { backgroundColor: topic.accent + '22' }]}>
          <Ionicons name={topic.icon} size={22} color={topic.accent} />
        </View>
        <Text style={styles.detailTitle}>{topic.title}</Text>
        <Text style={styles.intro}>{topic.intro}</Text>
      </View>

      {!showResult ? (
        <>
          {topic.questions.map((q, qi) => (
            <View key={q.id} style={styles.qCard}>
              <Text style={styles.qText}>
                {qi + 1}. {q.text}
              </Text>
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <Pressable
                    key={oi}
                    onPress={() => onAnswer(q.id, oi)}
                    style={[
                      styles.option,
                      selected && {
                        borderColor: topic.accent,
                        backgroundColor: topic.accent + '12',
                      },
                    ]}>
                    <View
                      style={[
                        styles.radio,
                        { borderColor: selected ? topic.accent : c.card.border },
                        selected && { backgroundColor: topic.accent },
                      ]}>
                      {selected && <Ionicons name="checkmark" size={12} color="#FFF" />}
                    </View>
                    <Text style={styles.optionText}>{opt.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}

          <Pressable
            onPress={onSeeResult}
            disabled={!allAnswered}
            style={[
              styles.primaryBtn,
              { backgroundColor: topic.accent },
              !allAnswered && styles.btnDisabled,
            ]}>
            <Text style={styles.primaryBtnText}>
              {allAnswered ? 'Sonucu gör' : 'Tüm soruları yanıtla'}
            </Text>
          </Pressable>
        </>
      ) : (
        <ResultView topic={topic} answers={answers} onRetake={onRetake} onClose={onClose} />
      )}
    </>
  );
}

/* ---------------- Sonuç ---------------- */

function ResultView({
  topic,
  answers,
  onRetake,
  onClose,
}: {
  topic: GuideTopic;
  answers: Record<string, number>;
  onRetake: () => void;
  onClose: () => void;
}) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const result = evaluateGuide(topic, answers);
  const color = TONE_COLOR[result.tone];
  const exerciseCard = getCardById(TOPIC_CARD[topic.id] ?? '');

  return (
    <>
      <View style={[styles.resultCard, { borderColor: color + '55', backgroundColor: color + '10' }]}>
        <View style={styles.resultHead}>
          <View style={[styles.topicIcon, { backgroundColor: color + '22' }]}>
            <Ionicons name={TONE_ICON[result.tone]} size={22} color={color} />
          </View>
          <Text style={[styles.resultTag, { color }]}>Senin için yansıma</Text>
        </View>
        <Text style={styles.resultTitle}>{result.title}</Text>
        <Text style={styles.resultBody}>{result.body}</Text>

        {result.tips.map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={[styles.tipDot, { backgroundColor: color }]} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {exerciseCard && (
        <>
          <Text style={styles.exerciseHeader}>Hemen deneyebileceğin bir egzersiz</Text>
          <View style={{ marginBottom: 14 }}>
            <TherapyCard card={exerciseCard} />
          </View>
        </>
      )}

      <Text style={styles.disclaimer}>{DISCLAIMER}</Text>

      <Pressable style={[styles.primaryBtn, { backgroundColor: topic.accent }]} onPress={onRetake}>
        <Text style={styles.primaryBtnText}>Tekrar yap</Text>
      </Pressable>
      <Pressable style={styles.secondaryBtn} onPress={onClose}>
        <Text style={styles.secondaryBtnText}>Konulara dön</Text>
      </Pressable>
    </>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 36 },
    title: { fontSize: 26, fontFamily: c.fonts.extra, color: c.sage },
    subtitle: {
      fontSize: 14.5,
      lineHeight: 21,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      marginTop: 8,
      marginBottom: 18,
    },
    bigGroup: {
      fontSize: 18,
      fontFamily: c.fonts.extra,
      color: c.textPrimary,
      marginTop: 14,
      marginBottom: 6,
    },
    group: { marginTop: 12 },
    groupTitle: {
      fontSize: 13,
      fontFamily: c.fonts.bold,
      color: c.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 12,
    },
    topicCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      backgroundColor: c.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.card.border,
      padding: 14,
      marginBottom: 12,
    },
    topicIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topicText: { flex: 1 },
    topicTitle: { fontSize: 16, fontFamily: c.fonts.bold, color: c.textPrimary },
    topicTeaser: { fontSize: 13, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 2 },
    backRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
    backText: { fontSize: 16, fontFamily: c.fonts.medium, color: c.textPrimary },
    introCard: {
      backgroundColor: c.surface,
      borderRadius: 20,
      borderWidth: 1,
      padding: 18,
      marginBottom: 16,
    },
    detailTitle: {
      fontSize: 20,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
      marginTop: 12,
      marginBottom: 8,
    },
    intro: { fontSize: 14.5, lineHeight: 22, fontFamily: c.fonts.regular, color: c.textMuted },
    readMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    readMeta: { fontSize: 12.5, fontFamily: c.fonts.regular, color: c.textMuted },
    readSection: { marginBottom: 18 },
    readHeading: { fontSize: 16, fontFamily: c.fonts.bold, color: c.textPrimary, marginBottom: 6 },
    readBody: { fontSize: 15.5, lineHeight: 24, fontFamily: c.fonts.regular, color: c.textPrimary },
    readBulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10 },
    readBulletDot: { width: 7, height: 7, borderRadius: 4, marginTop: 9 },
    readBulletText: { flex: 1, fontSize: 15, lineHeight: 22, fontFamily: c.fonts.regular, color: c.textPrimary },
    sourceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2, marginBottom: 16 },
    sourceText: { flex: 1, fontSize: 12, fontFamily: c.fonts.regular, color: c.textMuted, fontStyle: 'italic' },
    qCard: {
      backgroundColor: c.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.card.border,
      padding: 16,
      marginBottom: 12,
    },
    qText: { fontSize: 15.5, fontFamily: c.fonts.bold, color: c.textPrimary, marginBottom: 12, lineHeight: 22 },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 1.5,
      borderColor: c.card.border,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    radio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: { flex: 1, fontSize: 14.5, lineHeight: 20, fontFamily: c.fonts.regular, color: c.textPrimary },
    primaryBtn: { borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
    primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontFamily: c.fonts.bold },
    btnDisabled: { opacity: 0.4 },
    secondaryBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
    secondaryBtnText: { color: c.textMuted, fontSize: 15, fontFamily: c.fonts.medium },
    resultCard: { borderRadius: 20, borderWidth: 1, padding: 18, marginBottom: 14 },
    resultHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    resultTag: { fontSize: 12, fontFamily: c.fonts.bold, textTransform: 'uppercase', letterSpacing: 0.4 },
    resultTitle: { fontSize: 19, fontFamily: c.fonts.bold, color: c.textPrimary, marginBottom: 8 },
    resultBody: { fontSize: 15, lineHeight: 23, fontFamily: c.fonts.regular, color: c.textPrimary },
    tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 12 },
    tipDot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
    tipText: { flex: 1, fontSize: 14.5, lineHeight: 21, fontFamily: c.fonts.regular, color: c.textPrimary },
    disclaimer: {
      fontSize: 12.5,
      lineHeight: 19,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    exerciseHeader: { fontSize: 15, fontFamily: c.fonts.bold, color: c.textPrimary, marginBottom: 10 },
    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16, marginBottom: 6 },
    chip: {
      borderWidth: 1.5,
      borderColor: c.card.border,
      borderRadius: 20,
      paddingVertical: 9,
      paddingHorizontal: 16,
    },
    chipText: { fontSize: 14, fontFamily: c.fonts.medium, color: c.textPrimary },
    responseCard: { borderRadius: 18, borderWidth: 1, padding: 16, marginTop: 14 },
    responseText: { fontSize: 15, lineHeight: 23, fontFamily: c.fonts.regular, color: c.textPrimary },
  });
