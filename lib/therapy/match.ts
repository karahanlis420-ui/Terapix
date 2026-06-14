import { CARDS, type TherapyCard, type TherapyCategory } from './cards';

/**
 * Türkçe anahtar kelime sözlüğü. Yazılan metni bir terapi kategorisine
 * eşlemek için kullanılır. (Cihaz üzerinde, çevrimdışı çalışır.)
 */
const LEXICON: Record<Exclude<TherapyCategory, 'general'>, string[]> = {
  crisis: [
    'intihar',
    'ölmek istiyorum',
    'yaşamak istemiyorum',
    'kendime zarar',
    'canıma kıy',
    'yok olmak istiyorum',
    'ölsem',
    'hayatıma son',
    'dayanamıyorum artık',
    'yaşamaya değmez',
    'bitsin artık her şey',
  ],
  anxiety: [
    'kaygı',
    'endişe',
    'gergin',
    'panik',
    'korku',
    'korkuyorum',
    'tedirgin',
    'huzursuz',
    'çarpıntı',
    'nefes alamıyorum',
    'kalbim hızlı',
  ],
  sadness: [
    'üzgün',
    'mutsuz',
    'ağlıyorum',
    'ağlamak',
    'kötü hissediyorum',
    'umutsuz',
    'boşluk',
    'keyifsiz',
    'çökkün',
    'moralim bozuk',
    'depresif',
    'hüzün',
    'içim sıkkın',
  ],
  anger: [
    'sinir',
    'öfke',
    'kızgın',
    'sinirliyim',
    'nefret',
    'bıktım',
    'sinirlendim',
    'gıcık',
    'kızdım',
    'çıldırıyorum',
  ],
  stress: [
    'stres',
    'bunaldım',
    'yetişemiyorum',
    'baskı',
    'çok iş',
    'tükenmiş',
    'tükendim',
    'yoğunluk',
    'yoğunum',
    'başa çıkamıyorum',
  ],
  loneliness: [
    'yalnız',
    'kimsesiz',
    'kimse yok',
    'kimsem yok',
    'anlaşılmıyorum',
    'kimse anlamıyor',
    'dışlanmış',
    'terk edil',
  ],
  selfCritic: [
    'beceriksiz',
    'yetersiz',
    'aptal',
    'başarısız',
    'işe yaramaz',
    'kendimi suçlu',
    'kendimden nefret',
    'salak',
    'berbatım',
    'yeterince iyi değilim',
  ],
  sleep: [
    'uyuyamıyorum',
    'uyku',
    'uykusuz',
    'uyuyamadım',
    'gece uyanık',
    'uykum kaçtı',
  ],
  relationship: [
    'sevgili',
    'eşim',
    'partner',
    'kavga',
    'ayrıldık',
    'ayrılık',
    'annem',
    'babam',
    'tartışma',
    'küstük',
    'aldat',
    'ilişki',
  ],
  positive: [
    'mutlu',
    'iyi hissediyorum',
    'huzur',
    'sevindim',
    'minnettar',
    'başardım',
    'gurur',
    'harika',
    'keyifli',
    'çok iyiyim',
  ],
};

// Eşit sayıda eşleşmede öncelik sırası (kriz her zaman önce)
const PRIORITY: TherapyCategory[] = [
  'crisis',
  'sadness',
  'anxiety',
  'selfCritic',
  'anger',
  'loneliness',
  'stress',
  'sleep',
  'relationship',
  'positive',
];

function pickRandom(cards: TherapyCard[]): TherapyCard {
  return cards[Math.floor(Math.random() * cards.length)];
}

export function detectCategory(text: string): TherapyCategory {
  const t = text.toLocaleLowerCase('tr-TR');

  // Güvenlik önce: kriz işareti varsa hemen döndür
  if (LEXICON.crisis.some((k) => t.includes(k))) return 'crisis';

  const scores = new Map<TherapyCategory, number>();
  (Object.keys(LEXICON) as (keyof typeof LEXICON)[]).forEach((cat) => {
    if (cat === 'crisis') return;
    const hits = LEXICON[cat].reduce((n, k) => (t.includes(k) ? n + 1 : n), 0);
    if (hits > 0) scores.set(cat, hits);
  });

  if (scores.size === 0) return 'general';

  let best: TherapyCategory = 'general';
  let bestScore = 0;
  for (const cat of PRIORITY) {
    const s = scores.get(cat) ?? 0;
    if (s > bestScore) {
      bestScore = s;
      best = cat;
    }
  }
  return best;
}

/** Yazılan metne en uygun terapi kartını seçer. */
export function matchTherapyCard(text: string): TherapyCard {
  const category = detectCategory(text);
  return pickRandom(CARDS[category]);
}
