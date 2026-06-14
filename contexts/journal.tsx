import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { MoodKey } from '@/constants/palette';
import { syncEntry } from '@/lib/firebase';
import type { GuideTone } from '@/lib/guides/guides';
import type { TherapyCategory } from '@/lib/therapy/cards';
import { matchTherapyCard } from '@/lib/therapy/match';

const STORAGE_KEY = 'terapix.journal.v1';

export type Visibility = 'local' | 'public';

export type MoodEntry = {
  id: string;
  kind: 'mood';
  mood: MoodKey;
  createdAt: string; // ISO 8601 — tarih + saat + dakika + saniye
};

export type ThoughtEntry = {
  id: string;
  kind: 'thought';
  text: string;
  visibility: Visibility;
  createdAt: string;
  cardId?: string; // metne eşlenen terapi kartı
  category?: TherapyCategory;
  audioUri?: string; // Ses kaydı eklendiyse lokal URI
};

export type GuideEntry = {
  id: string;
  kind: 'guide';
  topicId: string;
  topicTitle: string;
  resultTitle: string;
  tone: GuideTone;
  createdAt: string;
};

export type Entry = MoodEntry | ThoughtEntry | GuideEntry;

type JournalContextValue = {
  entries: Entry[]; // en yeni en başta
  isLoading: boolean;
  addMood: (mood: MoodKey) => Promise<void>;
  addThought: (text: string, visibility: Visibility, audioUri?: string) => Promise<void>;
  addGuideResult: (
    topicId: string,
    topicTitle: string,
    resultTitle: string,
    tone: GuideTone
  ) => Promise<void>;
  clearAll: () => Promise<void>;
};

const JournalContext = createContext<JournalContextValue | undefined>(undefined);

function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEntries(JSON.parse(raw) as Entry[]);
      } catch {
        // yok say
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const persist = async (next: Entry[], newEntry?: Entry) => {
    setEntries(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    // Firebase açıksa buluta yaz; kapalıysa sessizce geç
    if (newEntry) {
      void syncEntry(newEntry);
    }
  };

  const addMood = (mood: MoodKey) => {
    const entry: Entry = { id: makeId(), kind: 'mood', mood, createdAt: new Date().toISOString() };
    return persist([entry, ...entries], entry);
  };

  const addThought = async (text: string, visibility: Visibility, audioUri?: string) => {
    const card = text ? matchTherapyCard(text) : undefined;
    const entry: Entry = {
      id: makeId(),
      kind: 'thought',
      text,
      visibility,
      createdAt: new Date().toISOString(),
      cardId: card?.id,
      category: card?.category,
      audioUri,
    };
    return persist([entry, ...entries], entry);
  };

  const addGuideResult = (
    topicId: string,
    topicTitle: string,
    resultTitle: string,
    tone: GuideTone
  ) => {
    const entry: Entry = {
      id: makeId(),
      kind: 'guide',
      topicId,
      topicTitle,
      resultTitle,
      tone,
      createdAt: new Date().toISOString(),
    };
    return persist([entry, ...entries], entry);
  };

  const clearAll = () => persist([]);

  return (
    <JournalContext.Provider
      value={{ entries, isLoading, addMood, addThought, addGuideResult, clearAll }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) {
    throw new Error('useJournal, JournalProvider içinde kullanılmalı');
  }
  return ctx;
}
