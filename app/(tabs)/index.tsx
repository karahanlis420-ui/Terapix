import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedMascot } from '@/components/animated-mascot';
import { Avatar } from '@/components/avatar';
import { Segmented } from '@/components/segmented';
import { SettingsSheet } from '@/components/settings-sheet';
import { TherapyCard } from '@/components/therapy-card';
import { type ThemeColors } from '@/constants/palette';
import { useJournal, type Visibility } from '@/contexts/journal';
import { useProfile } from '@/contexts/profile';
import { useTheme } from '@/hooks/use-theme';
import { formatDateTime } from '@/lib/format';
import { pickProfileImage } from '@/lib/media';
import { getCardById } from '@/lib/therapy/cards';
import { matchTherapyCard } from '@/lib/therapy/match';

const INPUT_MIN = 44;
const INPUT_MAX = 150;

export default function EslikciScreen() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { profile, updateProfile } = useProfile();
  const { entries, addThought } = useJournal();
  const [visibility, setVisibility] = useState<Visibility>('local');
  const [thought, setThought] = useState('');
  const [inputHeight, setInputHeight] = useState(INPUT_MIN);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const isPublic = visibility === 'public';
  const recentThoughts = entries
    .filter((e): e is Extract<typeof e, { kind: 'thought' }> => e.kind === 'thought')
    .slice(0, 8);

  const handleChangePhoto = async () => {
    const uri = await pickProfileImage();
    if (uri) updateProfile({ avatarUri: uri });
  };

  const handleSend = async () => {
    const text = thought.trim();
    if (!text && !recording) return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsSubmitting(true);
    let finalAudioUri;
    if (recording) {
      await recording.stopAndUnloadAsync();
      finalAudioUri = recording.getURI() || undefined;
      setRecording(null);
      setIsRecording(false);
    }
    setThought('');
    setInputHeight(INPUT_MIN);
    Keyboard.dismiss();
    await addThought(text, visibility, finalAudioUri);
    setIsSubmitting(false);
  };

  const toggleRecording = async () => {
    try {
      if (isRecording && recording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        const perm = await Audio.requestPermissionsAsync();
        if (perm.status === 'granted') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
          const { recording: newRec } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(newRec);
          setIsRecording(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable hitSlop={10} style={styles.iconBtn} onPress={() => setSettingsOpen(true)}>
          <Ionicons name="settings-outline" size={23} color={c.textMuted} />
        </Pressable>

        <Segmented<Visibility>
          value={visibility}
          onChange={setVisibility}
          options={[
            { value: 'local', label: 'Yerel' },
            { value: 'public', label: 'Herkese açık' },
          ]}
        />

        <View style={styles.iconBtn}>
          <Ionicons
            name={isPublic ? 'lock-open-outline' : 'lock-closed-outline'}
            size={22}
            color={isPublic ? c.moods.hard.face : c.sageDark}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Pressable onPress={handleChangePhoto}>
              <Avatar uri={profile?.avatarUri} size={56} />
            </Pressable>
            <Text style={styles.greeting}>
              Merhaba {profile?.name ?? 'misafir'},{'\n'}şu an nasıl hissediyorsun?
            </Text>
          </View>

          <View style={styles.inputCard}>
            <TextInput
              value={thought}
              onChangeText={setThought}
              placeholder="anlık düşüncelerini yaz..."
              placeholderTextColor={c.textMuted}
              multiline
              onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
              style={[
                styles.input,
                { height: Math.min(Math.max(INPUT_MIN, inputHeight), INPUT_MAX) },
              ]}
              textAlignVertical="top"
            />
            <Pressable
              onPress={toggleRecording}
              style={[styles.recordBtn, isRecording && styles.recordBtnActive]}>
              <Ionicons
                name={isRecording ? 'stop' : 'mic'}
                size={20}
                color={isRecording ? '#FFFFFF' : c.textMuted}
              />
            </Pressable>

            <Pressable
              onPress={handleSend}
              style={[
                styles.sendBtn,
                ((!thought.trim() && !isRecording && !recording) || isSubmitting) &&
                  styles.sendBtnDisabled,
              ]}
              disabled={(!thought.trim() && !isRecording && !recording) || isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
              )}
            </Pressable>
          </View>

          {recording && !isRecording && (
            <View style={styles.audioAttached}>
              <Ionicons name="volume-high" size={14} color={c.sage} />
              <Text style={styles.audioAttachedText}>Ses kaydı eklendi</Text>
            </View>
          )}

          <View style={styles.hintRow}>
            <Ionicons
              name={isPublic ? 'earth' : 'lock-closed'}
              size={14}
              color={c.textMuted}
            />
            <Text style={styles.hintText}>
              {isPublic
                ? 'Herkese açık — toplulukla paylaşılır (yakında)'
                : 'Yerel — bu not yalnızca sende kalır'}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Eşlikçin</Text>
          {recentThoughts.length === 0 ? (
            <View style={styles.empty}>
              <AnimatedMascot size={120} />
              <Text style={[styles.emptyText, { marginTop: 8 }]}>
                İçinden geçeni yaz; eşlikçin sana özel bir kartla yanıt versin 🌱
              </Text>
            </View>
          ) : (
            recentThoughts.map((item) => {
              const card = getCardById(item.cardId ?? '') ?? matchTherapyCard(item.text);
              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.duration(350)}
                  style={styles.feedItem}>
                  <View style={styles.noteBubble}>
                    <Ionicons
                      name={item.visibility === 'public' ? 'earth' : 'lock-closed'}
                      size={12}
                      color={c.textMuted}
                    />
                    <Text style={styles.noteText} numberOfLines={3}>
                      {item.text}
                    </Text>
                  </View>
                  <Text style={styles.noteDate}>{formatDateTime(item.createdAt)}</Text>

                  {item.audioUri && (
                    <View style={styles.audioPlayback}>
                      <Ionicons name="play-circle" size={24} color={c.sage} />
                      <Text style={styles.audioPlaybackText}>Ses Kaydı</Text>
                    </View>
                  )}

                  {card && <TherapyCard card={card} />}
                </Animated.View>
              );
            })
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <SettingsSheet visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    flex: { flex: 1 },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingTop: 6,
      paddingBottom: 10,
    },
    iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18,
    },
    greeting: {
      flex: 1,
      fontSize: 20,
      lineHeight: 27,
      fontFamily: c.fonts.bold,
      color: c.sage,
    },
    inputCard: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 10,
      backgroundColor: c.surface,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      lineHeight: 22,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
      paddingTop: 10,
      paddingBottom: 8,
    },
    recordBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.background,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: c.card.border,
    },
    recordBtnActive: { backgroundColor: '#FF5A5A', borderColor: '#FF5A5A' },
    sendBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.sage,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendBtnDisabled: { opacity: 0.4 },
    audioAttached: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 8,
      marginLeft: 4,
    },
    audioAttachedText: { fontSize: 12.5, fontFamily: c.fonts.medium, color: c.sage },
    hintRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 10,
      marginLeft: 4,
    },
    hintText: { fontSize: 12.5, fontFamily: c.fonts.regular, color: c.textMuted },
    sectionTitle: {
      fontSize: 17,
      fontFamily: c.fonts.bold,
      color: c.textPrimary,
      marginTop: 28,
      marginBottom: 14,
    },
    empty: {
      backgroundColor: c.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingVertical: 28,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14.5,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
    },
    feedItem: { marginBottom: 18 },
    noteBubble: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-end',
      maxWidth: '90%',
      backgroundColor: c.tab.bg,
      borderRadius: 14,
      borderTopRightRadius: 4,
      borderWidth: 1,
      borderColor: c.tab.border,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    noteText: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
      flexShrink: 1,
    },
    noteDate: {
      fontSize: 11,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      alignSelf: 'flex-end',
      marginTop: 4,
      marginBottom: 8,
    },
    audioPlayback: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: c.surface,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: c.card.border,
      marginBottom: 12,
      alignSelf: 'flex-start',
    },
    audioPlaybackText: { fontSize: 14, fontFamily: c.fonts.medium, color: c.textPrimary },
  });
