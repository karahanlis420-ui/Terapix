import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * Galeriden tek bir profil fotoğrafı seçtirir.
 * İptal edilir / izin verilmezse null döner.
 */
export async function pickProfileImage(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      'İzin gerekli',
      'Profil fotoğrafı seçebilmek için galeri erişimine izin vermelisin.'
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
