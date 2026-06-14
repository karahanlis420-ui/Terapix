import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/** Expo Go, SDK 53+ ile bildirimleri tam desteklemez ve kırmızı uyarılar basar. */
function isExpoGo() {
  return Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
}

/**
 * Günlük hatırlatıcı bildirim kurar.
 * Web ve Expo Go'da çalışmaz (orada bildirim modülü desteklenmez).
 * Gerçek bir "development build" ya da derlenmiş uygulamada çalışır.
 */
export async function setupNotifications() {
  if (Platform.OS === 'web' || isExpoGo()) return;

  try {
    // Tembel import: Expo Go'da bu modül hiç yüklenmez
    const Notifications = await import('expo-notifications');

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return;

    // Önce mevcut bildirimleri temizle, üst üste binmesin
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Kendine zaman ayır 🌿',
        body: 'Bugün nasıl hissediyorsun? Eşlikçin seni dinlemek için burada.',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 20,
        minute: 0,
      },
    });
  } catch (e) {
    console.log('Bildirim kurulum hatası:', e);
  }
}
