import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedMascot } from '@/components/animated-mascot';
import { Avatar } from '@/components/avatar';
import { Segmented } from '@/components/segmented';
import { type ThemeColors } from '@/constants/palette';
import { useProfile } from '@/contexts/profile';
import { type Language, type ThemeMode, useSettings } from '@/contexts/settings';
import { useTheme } from '@/hooks/use-theme';
import { pickProfileImage } from '@/lib/media';

type Method = 'email' | 'guest';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const TOTAL_STEPS = 3;

export default function OnboardingScreen() {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { signIn } = useProfile();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<Method>('guest');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const nameOk = name.trim().length > 0;
  const emailOk = isValidEmail(email);
  const profileOk = method === 'email' ? nameOk && emailOk : nameOk;

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const chooseMethod = (m: Method) => {
    setMethod(m);
    goNext();
  };

  const handlePickPhoto = async () => {
    const uri = await pickProfileImage();
    if (uri) setAvatarUri(uri);
  };

  const handleFinish = () => {
    if (!profileOk) return;
    signIn({
      name: name.trim(),
      email: method === 'email' ? email.trim() : null,
      avatarUri,
      isGuest: method === 'guest',
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        {step > 0 ? (
          <Pressable hitSlop={10} onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
        <View style={styles.dots}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {step === 0 && <WelcomeStep onAccept={goNext} />}
          {step === 1 && <MethodStep onChoose={chooseMethod} />}
          {step === 2 && (
            <ProfileStep
              method={method}
              name={name}
              email={email}
              avatarUri={avatarUri}
              profileOk={profileOk}
              onName={setName}
              onEmail={setEmail}
              onPickPhoto={handlePickPhoto}
              onFinish={handleFinish}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- Adım 1: Hoş geldin ---------- */

function WelcomeStep({ onAccept }: { onAccept: () => void }) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { language, setLanguage, themeMode, setThemeMode } = useSettings();

  const showInfo = (title: string) =>
    Alert.alert(title, `${title} metni yakında eklenecek. Şimdilik bu bir yer tutucudur.`);

  return (
    <View style={styles.stepFill}>
      <View style={styles.welcomeTop}>
        <AnimatedMascot size={160} />
        <Text style={styles.welcomeTitle}>Terapix&apos;e{'\n'}Hoş Geldin</Text>
        <Text style={styles.welcomeDesc}>
          Duygularını fark et, içinden geçeni paylaş ve kendine iyi bakmaya başla. 🤍
        </Text>
      </View>

      <View style={styles.welcomeBottom}>
        <View style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="globe-outline" size={18} color={c.textMuted} />
            <Text style={styles.settingLabelText}>Dil</Text>
          </View>
          <Segmented<Language>
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'tr', label: 'Türkçe' },
              { value: 'en', label: 'English' },
            ]}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Ionicons name="contrast-outline" size={18} color={c.textMuted} />
            <Text style={styles.settingLabelText}>Tema</Text>
          </View>
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

        <Text style={styles.terms}>
          Devam ederek{' '}
          <Text style={styles.link} onPress={() => showInfo('Gizlilik İlkeleri')}>
            Gizlilik İlkeleri
          </Text>
          &apos;ni ve{' '}
          <Text style={styles.link} onPress={() => showInfo('Hizmet Koşulları')}>
            Hizmet Koşulları
          </Text>
          &apos;nı kabul etmiş olursun.
        </Text>

        <Pressable style={styles.primaryBtn} onPress={onAccept}>
          <Text style={styles.primaryBtnText}>Kabul et ve devam et</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ---------- Adım 2: Yöntem ---------- */

function MethodStep({ onChoose }: { onChoose: (m: Method) => void }) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View>
      <Text style={styles.stepTitle}>Nasıl devam etmek istersin?</Text>
      <Text style={styles.stepSubtitle}>
        İstersen e-posta ile kayıt ol, istersen hemen misafir olarak başla.
      </Text>

      <Pressable style={styles.optionCard} onPress={() => onChoose('email')}>
        <View style={styles.optionIcon}>
          <Ionicons name="mail-outline" size={24} color={c.sageDark} />
        </View>
        <View style={styles.optionTextWrap}>
          <Text style={styles.optionTitle}>E-posta ile devam et</Text>
          <Text style={styles.optionDesc}>İlerlemen hesabına kaydedilir</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={c.textMuted} />
      </Pressable>

      <Pressable style={styles.optionCard} onPress={() => onChoose('guest')}>
        <View style={styles.optionIcon}>
          <Ionicons name="person-outline" size={24} color={c.sageDark} />
        </View>
        <View style={styles.optionTextWrap}>
          <Text style={styles.optionTitle}>Misafir olarak devam et</Text>
          <Text style={styles.optionDesc}>Kayıt olmadan hemen dene</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={c.textMuted} />
      </Pressable>
    </View>
  );
}

/* ---------- Adım 3: Profil ---------- */

type ProfileStepProps = {
  method: Method;
  name: string;
  email: string;
  avatarUri: string | null;
  profileOk: boolean;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPickPhoto: () => void;
  onFinish: () => void;
};

function ProfileStep({
  method,
  name,
  email,
  avatarUri,
  profileOk,
  onName,
  onEmail,
  onPickPhoto,
  onFinish,
}: ProfileStepProps) {
  const c = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View>
      <Text style={styles.stepTitle}>Profilini oluştur</Text>
      <Text style={styles.stepSubtitle}>
        Eşlikçin sana ismiyle hitap edebilsin diye birkaç bilgi.
      </Text>

      <View style={styles.profileAvatar}>
        <Pressable onPress={onPickPhoto}>
          <Avatar uri={avatarUri} size={110} />
          <View style={styles.avatarBadge}>
            <Ionicons name="camera" size={15} color="#FFFFFF" />
          </View>
        </Pressable>
        <Text style={styles.photoHint}>Profil fotoğrafı ekle (opsiyonel)</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Adın</Text>
        <TextInput
          value={name}
          onChangeText={onName}
          placeholder="Örn. Süleyman"
          placeholderTextColor={c.textMuted}
          style={styles.input}
        />
      </View>

      {method === 'email' && (
        <View style={styles.field}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            value={email}
            onChangeText={onEmail}
            placeholder="ornek@eposta.com"
            placeholderTextColor={c.textMuted}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      )}

      <Pressable
        onPress={onFinish}
        disabled={!profileOk}
        style={[styles.primaryBtn, !profileOk && styles.btnDisabled]}>
        <Text style={styles.primaryBtnText}>Başla</Text>
      </Pressable>
    </View>
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
      paddingHorizontal: 16,
      paddingTop: 4,
      paddingBottom: 8,
    },
    backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    dots: { flexDirection: 'row', gap: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.card.border },
    dotActive: { width: 22, backgroundColor: c.sage },
    content: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 8, paddingBottom: 32 },
    stepFill: { flex: 1, justifyContent: 'space-between' },
    welcomeTop: { alignItems: 'center', marginTop: 24 },
    logoCircle: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: c.tab.activePill,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    welcomeTitle: {
      fontSize: 32,
      lineHeight: 40,
      fontFamily: c.fonts.extra,
      color: c.sage,
      textAlign: 'center',
    },
    welcomeDesc: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
      marginTop: 14,
      paddingHorizontal: 8,
    },
    welcomeBottom: { marginTop: 32 },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    settingLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    settingLabelText: { fontSize: 14, fontFamily: c.fonts.medium, color: c.textPrimary },
    terms: {
      fontSize: 13,
      lineHeight: 20,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 16,
    },
    link: { color: c.sageDark, fontFamily: c.fonts.bold },
    stepTitle: { fontSize: 26, fontFamily: c.fonts.extra, color: c.sage, marginTop: 16 },
    stepSubtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: c.fonts.regular,
      color: c.textMuted,
      marginTop: 8,
      marginBottom: 28,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      backgroundColor: c.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.card.border,
      padding: 16,
      marginBottom: 14,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: c.tab.activePill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionTextWrap: { flex: 1 },
    optionTitle: { fontSize: 16, fontFamily: c.fonts.bold, color: c.textPrimary },
    optionDesc: { fontSize: 13, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 2 },
    profileAvatar: { alignItems: 'center', marginBottom: 24 },
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
    photoHint: { fontSize: 13, fontFamily: c.fonts.regular, color: c.textMuted, marginTop: 10 },
    field: { marginBottom: 16 },
    label: { fontSize: 14, fontFamily: c.fonts.medium, color: c.textPrimary, marginBottom: 8 },
    input: {
      backgroundColor: c.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.card.border,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      fontFamily: c.fonts.regular,
      color: c.textPrimary,
    },
    primaryBtn: {
      backgroundColor: c.sage,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontFamily: c.fonts.bold },
    btnDisabled: { opacity: 0.45 },
  });
