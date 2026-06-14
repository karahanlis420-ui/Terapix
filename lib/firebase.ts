import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Firestore } from 'firebase/firestore';

/**
 * Firebase yapılandırması .env'deki EXPO_PUBLIC_FIREBASE_* değişkenlerinden okunur.
 * Anahtar yoksa firebase paketi HİÇ yüklenmez (tembel import) — uygulama yerel çalışır,
 * Expo Go'da gereksiz hata/uyarı çıkmaz.
 */
const config = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(
  config.apiKey && config.projectId && config.appId
);

let dbPromise: Promise<Firestore | null> | null = null;

async function getDb(): Promise<Firestore | null> {
  if (!firebaseEnabled) return null;
  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        const { getApp, getApps, initializeApp } = await import('firebase/app');
        const { initializeFirestore } = await import('firebase/firestore');
        const app = getApps().length ? getApp() : initializeApp(config);
        // React Native ortamında bağlantı için long-polling önerilir
        return initializeFirestore(app, { experimentalForceLongPolling: true });
      } catch (e) {
        console.log('Firebase başlatma hatası:', e);
        return null;
      }
    })();
  }
  return dbPromise;
}

const DEVICE_KEY = 'terapix.deviceId';
let deviceIdCache: string | null = null;

async function getDeviceId(): Promise<string> {
  if (deviceIdCache) return deviceIdCache;
  let id = await AsyncStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = `dev-${Date.now()}-${Math.floor(Math.random() * 1_000_000_000)}`;
    await AsyncStorage.setItem(DEVICE_KEY, id);
  }
  deviceIdCache = id;
  return id;
}

/** Bir kaydı buluta yazar. Firebase kapalıysa sessizce hiçbir şey yapmaz. */
export async function syncEntry(entry: { id: string }) {
  const db = await getDb();
  if (!db) return;
  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const uid = await getDeviceId();
    await setDoc(doc(db, 'users', uid, 'entries', entry.id), {
      ...(entry as Record<string, unknown>),
      _syncedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.log('Bulut senkron hatası:', e);
  }
}

/** Profil bilgisini buluta yazar (opsiyonel). */
export async function syncProfile(profile: object) {
  const db = await getDb();
  if (!db) return;
  try {
    const { doc, setDoc } = await import('firebase/firestore');
    const uid = await getDeviceId();
    await setDoc(
      doc(db, 'users', uid),
      { profile, _syncedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (e) {
    console.log('Profil senkron hatası:', e);
  }
}
