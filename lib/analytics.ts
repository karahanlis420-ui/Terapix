import type { MoodKey } from '@/constants/palette';
import type { Entry } from '@/contexts/journal';

/** Ruh hallerinin sayısal karşılığı (tahmin için) */
export const MOOD_SCORE: Record<MoodKey, number> = {
  good: 4,
  ok: 3,
  tired: 2,
  hard: 1,
};

const WEEKDAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export type Band = 'good' | 'balanced' | 'tired' | 'hard';

export type DayBucket = {
  key: string;
  label: string; // haftanın günü kısaltması
  avg: number | null; // o günün ortalama ruh hali puanı
  count: number;
};

export type Prediction = {
  hasEnoughData: boolean;
  score: number; // 1..4
  band: Band;
  label: string;
  colorKey: MoodKey;
  confidence: 'low' | 'medium' | 'high';
  confidenceLabel: string;
  basis: string;
  precautions: string[];
};

const BAND_INFO: Record<
  Band,
  { label: string; colorKey: MoodKey; precautions: string[] }
> = {
  good: {
    label: 'İyi / pozitif',
    colorKey: 'good',
    precautions: [
      'Seni iyi hissettiren şeyleri not et, tekrar etmesi kolaylaşsın.',
      'Bu enerjiyle sevdiklerinle vakit geçir.',
      'Küçük bir hedef belirle ve başardığında kendini kutla.',
    ],
  },
  balanced: {
    label: 'Dengeli',
    colorKey: 'ok',
    precautions: [
      'Gün içinde kısa molalar vermeyi unutma.',
      '5 dakikalık bir nefes egzersizi dene.',
      'Su içmeyi ve kısa bir yürüyüşü ihmal etme.',
    ],
  },
  tired: {
    label: 'Yorgun / düşük enerji',
    colorKey: 'tired',
    precautions: [
      'Uykuna öncelik ver, erken dinlenmeyi dene.',
      'Ekran süreni biraz azalt.',
      'Kısa bir doğa yürüyüşü iyi gelebilir.',
      'Kendine karşı nazik ol, her şeyi bugün çözmek zorunda değilsin.',
    ],
  },
  hard: {
    label: 'Zorlu dönem',
    colorKey: 'hard',
    precautions: [
      'Bugün küçük adımlar atman yeterli.',
      'Güvendiğin biriyle konuşmayı dene.',
      'Bir nefes ya da meditasyon egzersizi yap.',
      'Zorlanmaya devam edersen bir uzmandan destek almayı düşün. 🤍',
    ],
  },
};

function dayKey(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function moodEntriesOf(entries: Entry[]) {
  return entries.filter((e): e is Extract<Entry, { kind: 'mood' }> => e.kind === 'mood');
}

/** Son n günün günlük ortalama ruh hali puanları */
export function lastNDays(entries: Entry[], n: number): DayBucket[] {
  const byDay = new Map<string, number[]>();
  for (const e of moodEntriesOf(entries)) {
    const k = dayKey(new Date(e.createdAt));
    const arr = byDay.get(k) ?? [];
    arr.push(MOOD_SCORE[e.mood]);
    byDay.set(k, arr);
  }

  const out: DayBucket[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = dayKey(d);
    const scores = byDay.get(k) ?? [];
    const avg = scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : null;
    out.push({ key: k, label: WEEKDAYS_TR[d.getDay()], avg, count: scores.length });
  }
  return out;
}

export function bandOfScore(score: number): Band {
  if (score >= 3.4) return 'good';
  if (score >= 2.6) return 'balanced';
  if (score >= 1.9) return 'tired';
  return 'hard';
}

export function colorKeyOfBand(band: Band): MoodKey {
  return BAND_INFO[band].colorKey;
}

function slopeOf(ys: number[]): number {
  const n = ys.length;
  if (n < 2) return 0;
  const xs = ys.map((_, i) => i);
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxx = xs.reduce((a, b) => a + b * b, 0);
  const sxy = xs.reduce((a, b, i) => a + b * ys[i], 0);
  const denom = n * sxx - sx * sx;
  if (denom === 0) return 0;
  return (n * sxy - sx * sy) / denom;
}

/**
 * Son verilere dayalı basit, şeffaf bir gelecek-duygu tahmini.
 * Tıbbi teşhis değildir; genel bir eğilim göstergesidir.
 */
export function predict(entries: Entry[]): Prediction {
  const moods = moodEntriesOf(entries);
  const buckets = lastNDays(entries, 7);
  const present = buckets.filter((b) => b.avg !== null) as (DayBucket & { avg: number })[];

  if (moods.length < 3 || present.length < 2) {
    return {
      hasEnoughData: false,
      score: 0,
      band: 'balanced',
      label: 'Yetersiz veri',
      colorKey: 'ok',
      confidence: 'low',
      confidenceLabel: 'Düşük',
      basis:
        'Tahmin için en az birkaç gün ruh hali kaydı gerekiyor. “Şimdi” sekmesinden kendini kaydetmeye devam et.',
      precautions: [],
    };
  }

  const avgs = present.map((b) => b.avg);
  const slope = slopeOf(avgs);
  const lastAvg = avgs[avgs.length - 1];
  const mean = avgs.reduce((a, b) => a + b, 0) / avgs.length;

  // Tahmin: son güne ağırlık + genel ortalama + bir günlük eğilim
  let score = lastAvg * 0.6 + mean * 0.4 + slope;
  score = Math.max(1, Math.min(4, score));

  const band = bandOfScore(score);
  const info = BAND_INFO[band];

  const confidence: Prediction['confidence'] =
    present.length >= 5 && moods.length >= 8
      ? 'high'
      : present.length >= 3
        ? 'medium'
        : 'low';
  const confidenceLabel =
    confidence === 'high' ? 'Yüksek' : confidence === 'medium' ? 'Orta' : 'Düşük';

  const trendWord = slope > 0.12 ? 'yükselişte' : slope < -0.12 ? 'düşüşte' : 'sabit';

  return {
    hasEnoughData: true,
    score,
    band,
    label: info.label,
    colorKey: info.colorKey,
    confidence,
    confidenceLabel,
    basis: `Son 7 günün ${present.length} gününde toplam ${moods.length} ruh hali kaydına göre. Eğilim: ${trendWord}.`,
    precautions: info.precautions,
  };
}
