import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { syncProfile } from '@/lib/firebase';

const STORAGE_KEY = 'terapix.profile.v1';

export type Profile = {
  name: string;
  email: string | null;
  avatarUri: string | null;
  isGuest: boolean;
};

type ProfileContextValue = {
  profile: Profile | null;
  isLoading: boolean;
  signIn: (profile: Profile) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Açılışta kayıtlı profili yükle
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setProfile(JSON.parse(raw) as Profile);
      } catch {
        // bozuk/eksik veri: yok say
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = async (next: Profile | null) => {
    setProfile(next);
    if (next) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      void syncProfile(next); // Firebase açıksa buluta yaz, değilse sessizce geç
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  const signIn = (p: Profile) => persist(p);
  const signOut = () => persist(null);
  const updateProfile = (patch: Partial<Profile>) =>
    persist({
      ...(profile ?? { name: '', email: null, avatarUri: null, isGuest: true }),
      ...patch,
    });

  return (
    <ProfileContext.Provider
      value={{ profile, isLoading, signIn, signOut, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile, ProfileProvider içinde kullanılmalı');
  }
  return ctx;
}
