import { Ionicons } from '@expo/vector-icons';

export type SceneKind = 'sunrise' | 'night' | 'sea' | 'forest';

export type Scene = {
  id: string;
  kind: SceneKind;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  title: string;
  teaser: string;
  prompt: string;
};

export const SCENES: Scene[] = [
  {
    id: 'scene-sunrise',
    kind: 'sunrise',
    icon: 'partly-sunny-outline',
    accent: '#E0915C',
    title: 'Gün doğumu',
    teaser: 'Yeni bir başlangıç',
    prompt: 'Bu gün doğumuna baktığında içinde ne uyanıyor?',
  },
  {
    id: 'scene-night',
    kind: 'night',
    icon: 'moon-outline',
    accent: '#8B89C4',
    title: 'Yıldızlı gece',
    teaser: 'Sessizlik ve dinginlik',
    prompt: 'Bu sakin gece sana ne fısıldıyor?',
  },
  {
    id: 'scene-sea',
    kind: 'sea',
    icon: 'water-outline',
    accent: '#5E9CA8',
    title: 'Sakin deniz',
    teaser: 'Gelgitler gibi duygular',
    prompt: 'Dalgaları izlerken neyi bırakmak istiyorsun?',
  },
  {
    id: 'scene-forest',
    kind: 'forest',
    icon: 'leaf-outline',
    accent: '#6E8C6A',
    title: 'Huzurlu orman',
    teaser: 'Köklenmek ve nefes almak',
    prompt: 'Bu ormanın içinde kendini nasıl hissediyorsun?',
  },
];

export type Feeling = { label: string; response: string };

export const FEELINGS: Feeling[] = [
  {
    label: 'Huzur',
    response: 'Huzuru fark etmen çok değerli. Bu hissi birkaç saniye daha içinde tut — bedeninde nerede hissediyorsun?',
  },
  {
    label: 'Umut',
    response: 'Umut, ileriye atılan sessiz bir adımdır. Bugün seni biraz umutlandıran küçük şey neydi?',
  },
  {
    label: 'Hüzün',
    response: 'Hüzün de bir misafir gibidir; gelir ve geçer. Ona yer açman, yargılamadan görmen yeterli.',
  },
  {
    label: 'Sakinlik',
    response: 'Sakinlik şu anda seninle. Yavaş bir nefes al ve bu dinginliğin tadını biraz çıkar.',
  },
  {
    label: 'Özlem',
    response: 'Özlem, değer verdiğin bir şeyin işaretidir. Neyi özlediğini fark etmek bile bir şefkattir.',
  },
  {
    label: 'Yorgunluk',
    response: 'Yorgunluk, bedeninin dinlenme isteğidir. Bugün kendine küçük bir mola verebilir misin?',
  },
];

export function getScene(id: string): Scene | undefined {
  return SCENES.find((s) => s.id === id);
}
