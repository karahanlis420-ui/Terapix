import { Ionicons } from '@expo/vector-icons';

export type ReadingSection = {
  heading?: string;
  body: string;
  bullets?: string[];
};

export type Reading = {
  id: string;
  group: string; // 'Bilgi' | 'Kalbe iyi gelen'
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  title: string;
  teaser: string;
  readMinutes: number;
  sections: ReadingSection[];
  source?: string; // kanıt/kaynak notu (bilgi kartları için)
};

export const READINGS: Reading[] = [
  /* ---------------- BİLGİ (kanıta dayalı) ---------------- */
  {
    id: 'info-anxiety-body',
    group: 'Bilgi',
    icon: 'pulse-outline',
    accent: '#8B89C4',
    title: 'Kaygı bedende ne yapar?',
    teaser: 'Çarpıntı, nefes darlığı... aslında ne oluyor?',
    readMinutes: 2,
    sections: [
      {
        heading: 'Bir alarm sistemi',
        body: 'Kaygı, beynin “tehlike olabilir” alarmıdır. Bedenini tehdide karşı hazırlar: kalp hızlanır, nefes sıklaşır, kaslar gerilir. Buna “savaş ya da kaç” tepkisi denir. Bu, bozulduğun anlamına gelmez — bedenin seni korumaya çalışıyordur.',
      },
      {
        heading: 'Neden bu kadar gerçek hissettiriyor?',
        body: 'Adrenalinin yarattığı belirtiler (çarpıntı, terleme, baş dönmesi) gerçek ve rahatsız edicidir. Ama tehlikeli değildir ve genelde dakikalar içinde geçer.',
      },
      {
        heading: 'Ne yardımcı olur?',
        body: 'Yavaş nefes, alarmı kapatan parasempatik sistemi devreye sokar.',
        bullets: [
          'Nefes verişini, alışından uzun tut',
          'Ayaklarını yere bas, çevrende 5 şey say',
          '“Bu bir dalga; yükselir ve geçer” diye hatırla',
        ],
      },
    ],
    source: 'Kanıta dayalı: kaygı fizyolojisi ve CBT',
  },
  {
    id: 'info-breathing',
    group: 'Bilgi',
    icon: 'leaf-outline',
    accent: '#6E8C6A',
    title: 'Nefes egzersizleri neden işe yarar?',
    teaser: 'Basit bir nefes seni nasıl sakinleştiriyor?',
    readMinutes: 2,
    sections: [
      {
        heading: 'Vagus siniri',
        body: 'Yavaş ve derin nefes, vagus sinirini uyarır. Bu sinir, kalp atışını yavaşlatan ve bedeni “güvendesin” moduna geçiren parasempatik sinir sisteminin ana yoludur.',
      },
      {
        heading: 'Nefes vermenin sırrı',
        body: 'Nefes verirken kalp atışı doğal olarak yavaşlar. Bu yüzden nefes verişini alışından uzun tutmak sakinleşmeyi hızlandırır.',
      },
      {
        heading: 'Deneyebileceklerin',
        body: '',
        bullets: ['Kutu nefesi: 4 al · 4 tut · 4 ver · 4 tut', '4-7-8: 4 al · 7 tut · 8 ver'],
      },
    ],
    source: 'Kanıta dayalı: otonom sinir sistemi araştırmaları',
  },
  {
    id: 'info-sleep',
    group: 'Bilgi',
    icon: 'bed-outline',
    accent: '#6C7BB0',
    title: 'Uyku neden bu kadar önemli?',
    teaser: 'Uyku ile duyguların gizli bağı',
    readMinutes: 2,
    sections: [
      {
        heading: 'Uyku duyguları onarır',
        body: 'Uyurken beyin günü işler ve duygusal yükü hafifletir. Uykusuzluk, ertesi gün kaygı ve sinirliliği belirgin şekilde artırır.',
      },
      {
        heading: 'Kısır döngü',
        body: 'Kaygı uykuyu kaçırır, uykusuzluk kaygıyı artırır. Bu döngü küçük alışkanlıklarla kırılabilir.',
        bullets: [
          'Yatmadan ~1 saat önce ekranı bırak',
          'Her gün benzer saatte yat ve kalk',
          'Uyuyamıyorsan kalk, sakin bir şey yap, sonra tekrar dene',
        ],
      },
    ],
    source: 'Kanıta dayalı: uyku bilimi',
  },
  {
    id: 'info-stress',
    group: 'Bilgi',
    icon: 'flame-outline',
    accent: '#E0915C',
    title: 'Stres her zaman kötü müdür?',
    teaser: 'Akut stres ile kronik stres farkı',
    readMinutes: 2,
    sections: [
      {
        heading: 'İyi stres',
        body: 'Kısa süreli stres seni odaklar ve performansını artırır (örn. sınav öncesi). Bu sağlıklıdır; iş bitince beden normale döner.',
      },
      {
        heading: 'Zararlı olan',
        body: 'Dinlenmeye fırsat vermeyen kronik stres bedeni yıpratır: uyku, sindirim, bağışıklık ve ruh hali etkilenir.',
      },
      {
        heading: 'Anahtar: toparlanma',
        body: 'Önemli olan stresi tamamen yok etmek değil, aralara gerçek dinlenme koymaktır.',
        bullets: ['Gün içinde kısa molalar', 'Hareket ve doğa', 'Sosyal bağ'],
      },
    ],
    source: 'Kanıta dayalı: stres fizyolojisi',
  },
  {
    id: 'info-distortions',
    group: 'Bilgi',
    icon: 'bulb-outline',
    accent: '#C9A94E',
    title: 'Her düşünce gerçek midir?',
    teaser: 'Zihnin sık düştüğü tuzaklar',
    readMinutes: 3,
    sections: [
      {
        heading: 'Düşünce, gerçek değildir',
        body: 'Zihnimiz bazen abartır, felaketleştirir ya da “zihin okur”. Bu düşünce çarpıtmaları herkeste olur ve çoğu zaman gerçeği yansıtmaz.',
      },
      {
        heading: 'Sık tuzaklar',
        body: '',
        bullets: [
          'Felaketleştirme: “Kesin en kötüsü olacak”',
          'Ya hep ya hiç: “Tamamen başarısızım”',
          'Zihin okuma: “Benden nefret ediyor”',
          'Aşırı genelleme: “Hep böyle oluyor”',
        ],
      },
      {
        heading: 'Ne yapmalı?',
        body: 'Düşünceyi bir gerçek gibi değil, bir tahmin gibi ele al ve sına: “Kanıt ne? Başka bir açıklama olabilir mi?”',
      },
    ],
    source: 'Kanıta dayalı: Bilişsel Davranışçı Terapi (CBT)',
  },
  {
    id: 'info-gratitude',
    group: 'Bilgi',
    icon: 'sparkles-outline',
    accent: '#6E8C6A',
    title: 'Şükür beyne ne yapar?',
    teaser: 'Minnettarlığın ölçülen etkisi',
    readMinutes: 2,
    sections: [
      {
        heading: 'Dikkati değiştirir',
        body: 'Minnettarlık, dikkati eksik olandan var olana çevirir. Düzenli şükür pratiği yapanlarda ruh hali ve uyku kalitesinde iyileşme gözlenmiştir.',
      },
      {
        heading: 'Küçük ama düzenli',
        body: 'Etkisi tek seferlik değil, tekrarla gelir.',
        bullets: ['Her akşam 3 küçük iyi şey yaz', 'Neden önemli olduklarını ekle', 'İnsanlara da teşekkür et'],
      },
    ],
    source: 'Kanıta dayalı: pozitif psikoloji araştırmaları',
  },
  {
    id: 'info-exercise',
    group: 'Bilgi',
    icon: 'walk-outline',
    accent: '#5E9CA8',
    title: 'Hareket ruh halini neden iyileştirir?',
    teaser: 'Bedenin doğal antidepresanı',
    readMinutes: 2,
    sections: [
      {
        heading: 'Doğal kimya',
        body: 'Egzersiz, ruh halini düzenleyen kimyasalları salgılatır. Düzenli hareketin hafif-orta düzey depresyon ve kaygıda belirgin fayda sağladığı gösterilmiştir.',
      },
      {
        heading: 'Az bile yeter',
        body: 'Maraton gerekmiyor; düzenlilik önemli.',
        bullets: ['Günde 10-20 dk yürüyüş', 'Sevdiğin bir hareket (dans, bisiklet)', 'Doğada olmak etkiyi artırır'],
      },
    ],
    source: 'Kanıta dayalı: egzersiz ve ruh sağlığı çalışmaları',
  },
  {
    id: 'info-breaks',
    group: 'Bilgi',
    icon: 'cafe-outline',
    accent: '#C9A24E',
    title: 'Mola vermenin bilimi',
    teaser: 'Mola tembellik değil, verimlilik',
    readMinutes: 2,
    sections: [
      {
        heading: 'Dikkat yenilenir',
        body: 'Zihin sürekli odaklanamaz; molalar dikkati ve yaratıcılığı geri getirir. Mola vermek, üretkenliğin bir parçasıdır.',
      },
      {
        heading: 'İyi bir mola',
        body: '',
        bullets: ['Ekrandan uzaklaş', 'Kısa bir yürüyüş ya da esneme', 'Pencereden uzağa bak', 'Birkaç derin nefes'],
      },
    ],
    source: 'Kanıta dayalı: dikkat ve bilişsel yorgunluk araştırmaları',
  },
  {
    id: 'info-suppress',
    group: 'Bilgi',
    icon: 'heart-outline',
    accent: '#7FA9C9',
    title: 'Duyguları bastırmak işe yarar mı?',
    teaser: 'Yer açmak neden daha iyi çalışır',
    readMinutes: 2,
    sections: [
      {
        heading: 'Bastırmak büyütür',
        body: 'Bir duyguyu yok saymak çoğu zaman onu büyütür. Duyguya yer açmak (kabul etmek), paradoksal biçimde geçmesini kolaylaştırır.',
      },
      {
        heading: 'Adlandır ki sakinleşsin',
        body: 'Bir duyguyu kelimelere dökmek (örn. “şu an kaygılıyım”) beynin duygu merkezini yatıştırır.',
        bullets: ['Duyguyu yargılamadan fark et', 'Ona bir isim koy', 'Geçici olduğunu hatırla'],
      },
    ],
    source: 'Kanıta dayalı: duygu düzenleme araştırmaları',
  },
  {
    id: 'info-selfcompassion',
    group: 'Bilgi',
    icon: 'happy-outline',
    accent: '#D98BA0',
    title: 'Öz-şefkat nedir?',
    teaser: 'Kendine dost olmanın gücü',
    readMinutes: 2,
    sections: [
      {
        heading: 'Kendine dost olmak',
        body: 'Öz-şefkat, zor anında kendine bir arkadaşına davranır gibi yaklaşmaktır. Araştırmalar, öz-şefkatin utanç, öz-eleştiri ve depresyonu azalttığını gösterir.',
      },
      {
        heading: 'Üç bileşeni',
        body: '',
        bullets: [
          'İyilik: kendine sert değil, nazik davran',
          'Ortak insanlık: “yalnız değilim, herkes zorlanır”',
          'Farkındalık: duyguyu abartmadan da bastırmadan gör',
        ],
      },
    ],
    source: 'Kanıta dayalı: öz-şefkat (self-compassion) araştırmaları',
  },
  {
    id: 'info-connection',
    group: 'Bilgi',
    icon: 'people-outline',
    accent: '#A98BC4',
    title: 'Sosyal bağ neden ilaç gibidir?',
    teaser: 'Yakınlık hem ruhu hem bedeni korur',
    readMinutes: 2,
    sections: [
      {
        heading: 'Bağlanma bir ihtiyaç',
        body: 'İnsan sosyal bir canlıdır; yakın bağlar hem ruh hem beden sağlığını korur. Yalnızlık, kronik stres kadar yıpratıcı olabilir.',
      },
      {
        heading: 'Küçük temaslar sayar',
        body: '',
        bullets: ['Kısa bir mesaj ya da arama', 'Birine içtenlikle “nasılsın?” sormak', 'Ortak bir aktivite'],
      },
    ],
    source: 'Kanıta dayalı: sosyal ilişkiler ve sağlık çalışmaları',
  },
  {
    id: 'info-nature',
    group: 'Bilgi',
    icon: 'flower-outline',
    accent: '#6E8C6A',
    title: 'Doğanın iyileştirici etkisi',
    teaser: 'Yeşil neden sakinleştirir?',
    readMinutes: 1,
    sections: [
      {
        heading: 'Yeşil sakinleştirir',
        body: 'Doğada kısa süre geçirmek bile stres hormonlarını düşürür, dikkati tazeler ve ruh halini iyileştirir.',
        bullets: ['Günde birkaç dakika dışarı çık', 'Bir bitkiye bak ya da dokun', 'Açık havada kısa bir yürüyüş'],
      },
    ],
    source: 'Kanıta dayalı: doğa ve ruh sağlığı (ecotherapy) araştırmaları',
  },

  /* ---------------- KALBE İYİ GELEN (dua + huzur veren sözler) ---------------- */
  {
    id: 'heart-peace',
    group: 'Kalbe iyi gelen',
    icon: 'moon-outline',
    accent: '#8B89C4',
    title: 'Huzur duası',
    teaser: 'Kalbe sükûnet dileği',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, kalbime huzur ver; içimdeki telaşı dindir. Daralan göğsümü genişlet, taşıdığım yükü hafiflet. Fırtınanın ortasında bile bana dinginlik bağışla.',
      },
      { body: 'Bu an da geçecek. Sen bana yetersin. 🤍' },
    ],
  },
  {
    id: 'heart-gratitude',
    group: 'Kalbe iyi gelen',
    icon: 'sparkles-outline',
    accent: '#6E8C6A',
    title: 'Şükür duası',
    teaser: 'Var olana bakan bir kalp için',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, sahip olduklarım için şükürler olsun. Gözümü görmediğim nimetlere aç; bana küçük güzellikleri fark eden bir kalp ver.',
      },
      { body: 'Bugün bana verilenler için minnettarım.' },
    ],
  },
  {
    id: 'heart-patience',
    group: 'Kalbe iyi gelen',
    icon: 'hourglass-outline',
    accent: '#C9A94E',
    title: 'Sabır duası',
    teaser: 'Zorluk karşısında metanet',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, zorlukların karşısında bana sabır ve metanet ver. Acele ettiğimde beni sakinleştir, ümidimi koru. Her gecenin bir sabahı olduğunu kalbime yerleştir.',
      },
    ],
  },
  {
    id: 'heart-healing',
    group: 'Kalbe iyi gelen',
    icon: 'heart-circle-outline',
    accent: '#D98BA0',
    title: 'Şifa ve umut',
    teaser: 'Yorgun kalpler için',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, yorgun kalbime şifa ver, umudumu tazele. Beni sevdiklerimle birlikte iyilik ve esenlik içinde tut. Karanlık göründüğünde bana ışığını hatırlat.',
      },
    ],
  },
  {
    id: 'heart-sleep',
    group: 'Kalbe iyi gelen',
    icon: 'bed-outline',
    accent: '#6C7BB0',
    title: 'Uyumadan önce',
    teaser: 'Günü huzurla bırakmak',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, günün yükünü senin huzurunda bırakıyorum. Zihnimi sakinleştir, bana dinlendirici bir uyku ver. Yarına umutla uyanmayı nasip et.',
      },
    ],
  },
  {
    id: 'heart-fear',
    group: 'Kalbe iyi gelen',
    icon: 'leaf-outline',
    accent: '#5E9CA8',
    title: 'Kaygı anında',
    teaser: 'Korktuğun anlar için',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, korktuğumda bana güven ver. Kontrol edemediğim şeyleri sana bırakabilmeyi öğret. Kalbime “her şey yoluna girecek” sükûnetini koy.',
      },
    ],
  },
  {
    id: 'heart-kind',
    group: 'Kalbe iyi gelen',
    icon: 'happy-outline',
    accent: '#6E8C6A',
    title: 'Kendine nazik ol',
    teaser: 'Bir hatırlatma',
    readMinutes: 1,
    sections: [
      {
        heading: 'Hatırla',
        body: 'Bugün elinden gelenin en iyisini yaptın. Yetersiz hissetmen, yetersiz olduğun anlamına gelmez. Bir çiçek bile açmak için zamana ihtiyaç duyar.',
      },
    ],
  },
  {
    id: 'heart-pass',
    group: 'Kalbe iyi gelen',
    icon: 'water-outline',
    accent: '#7FA9C9',
    title: 'Bu da geçecek',
    teaser: 'Duygular hava gibidir',
    readMinutes: 1,
    sections: [
      {
        body: 'Duygular hava gibidir; gelir ve geçer. Şu an zor olabilir ama bu an kalıcı değil. Sen bugüne kadar tüm zor günlerini atlattın — bunu da atlatacaksın.',
      },
    ],
  },
  {
    id: 'heart-notalone',
    group: 'Kalbe iyi gelen',
    icon: 'people-circle-outline',
    accent: '#A98BC4',
    title: 'Yalnız değilsin',
    teaser: 'Ne hissedersen hisset',
    readMinutes: 1,
    sections: [
      {
        body: 'Ne hissedersen hisset, bu duyguyu senden önce milyonlarca insan yaşadı ve atlattı. Yardım istemek güçsüzlük değil, cesarettir. Buradayım. 🤍',
      },
    ],
  },
  {
    id: 'heart-breath',
    group: 'Kalbe iyi gelen',
    icon: 'sunny-outline',
    accent: '#C9A24E',
    title: 'Küçük bir nefes',
    teaser: 'Sadece şu an için',
    readMinutes: 1,
    sections: [
      {
        body: 'Şimdi, sadece şu an için, derin bir nefes al. Omuzlarını gevşet. Kendine üç saniye izin ver: hiçbir şey yapmana gerek yok. Sadece nefes al.',
      },
    ],
  },

  {
    id: 'info-comparison',
    group: 'Bilgi',
    icon: 'people-outline',
    accent: '#A98BC4',
    title: 'Karşılaştırma tuzağı',
    teaser: 'Neden hep başkalarına bakıp üzülüyoruz?',
    readMinutes: 2,
    sections: [
      {
        heading: 'Eksik veriyle kıyas',
        body: 'Başkalarının yalnızca dışarı yansıttığı “en iyi anlarını” görür, kendi perde arkamızla kıyaslarız. Bu, baştan adil olmayan bir karşılaştırmadır.',
      },
      {
        heading: 'Akışlar birer vitrin',
        body: 'Sosyal medya özenle seçilmiş anlardan oluşur; gerçeğin tamamı değil. Kıyas arttıkça hoşnutluk azalır.',
        bullets: [
          'Kendini başkasıyla değil, dünkü halinle kıyasla',
          'Seni kötü hissettiren hesapları gözden geçir',
          'Kendi küçük ilerlemelerini fark et',
        ],
      },
    ],
    source: 'Kanıta dayalı: sosyal karşılaştırma araştırmaları',
  },
  {
    id: 'info-avoidance',
    group: 'Bilgi',
    icon: 'walk-outline',
    accent: '#C9A94E',
    title: 'Kaçınmak kaygıyı neden büyütür?',
    teaser: 'Korktuğumuzdan kaçmak işe yarar mı?',
    readMinutes: 2,
    sections: [
      {
        heading: 'Kısa rahatlama, uzun zarar',
        body: 'Korkulan şeyden kaçınmak anında rahatlatır; ama beyne “orası gerçekten tehlikeliydi” mesajını verir. Böylece korku zamanla büyür.',
      },
      {
        heading: 'Kademeli yaklaşma',
        body: 'Küçük ve güvenli adımlarla korkulan duruma yaklaşmak, kaygıyı zamanla söndürür.',
        bullets: ['En küçük adımdan başla', 'Kaçmak yerine kal ve nefes al', 'Her adımı kendine kutla'],
      },
    ],
    source: 'Kanıta dayalı: maruz bırakma (exposure), CBT',
  },
  {
    id: 'heart-courage',
    group: 'Kalbe iyi gelen',
    icon: 'sunny-outline',
    accent: '#E0915C',
    title: 'Cesaret duası',
    teaser: 'Zor bir şeye başlamadan önce',
    readMinutes: 1,
    sections: [
      {
        body: 'Rabbim, bana başlama cesareti ver. Korkum elimi kolumu bağladığında, küçük bir adım atacak gücü kalbime koy. Elimden geleni yapayım, gerisini sana bırakayım.',
      },
    ],
  },
  {
    id: 'heart-forgive',
    group: 'Kalbe iyi gelen',
    icon: 'heart-circle-outline',
    accent: '#6E8C6A',
    title: 'Kendini affet',
    teaser: 'Geçmişin yüküyle',
    readMinutes: 1,
    sections: [
      {
        heading: 'Hatırla',
        body: 'Geçmişte verdiğin kararlar, o günkü bilgin ve gücünle alınmıştı. Kendini affetmek olanı onaylamak değil; yükü bırakıp ileriye bakabilmektir.',
      },
      { body: 'Bugün, kendine biraz daha şefkat göstermeyi seç. 🤍' },
    ],
  },
];

export const READING_GROUPS = Array.from(new Set(READINGS.map((r) => r.group)));

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}
