import { Ionicons } from '@expo/vector-icons';

export type TherapyCategory =
  | 'crisis'
  | 'anxiety'
  | 'sadness'
  | 'anger'
  | 'stress'
  | 'loneliness'
  | 'selfCritic'
  | 'sleep'
  | 'relationship'
  | 'positive'
  | 'general';

export type BreathPhase = {
  kind: 'inhale' | 'hold' | 'exhale';
  seconds: number;
  label: string;
};

export type TherapyCard = {
  id: string;
  category: TherapyCategory;
  typeLabel: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  steps?: string[];
  breathing?: BreathPhase[]; // varsa kartta animasyonlu nefes egzersizi açılır
};

/** Kategori başına görsel kimlik */
export const CATEGORY_META: Record<
  TherapyCategory,
  { label: string; accent: string }
> = {
  crisis: { label: 'Acil destek', accent: '#D9534F' },
  anxiety: { label: 'Kaygı', accent: '#8B89C4' },
  sadness: { label: 'Üzüntü', accent: '#7FA9C9' },
  anger: { label: 'Öfke', accent: '#E0915C' },
  stress: { label: 'Yoğunluk', accent: '#C9A94E' },
  loneliness: { label: 'Yalnızlık', accent: '#A98BC4' },
  selfCritic: { label: 'Öz-eleştiri', accent: '#6E8C6A' },
  sleep: { label: 'Uyku', accent: '#6C7BB0' },
  relationship: { label: 'İlişki', accent: '#D98BA0' },
  positive: { label: 'Olumlu', accent: '#6E8C6A' },
  general: { label: 'Eşlik', accent: '#8FAE8B' },
};

/**
 * Kanıta dayalı tekniklere (CBT, topraklanma, nefes egzersizleri,
 * öz-şefkat, davranışsal aktivasyon) dayanan kart kütüphanesi.
 */
export const CARDS: Record<TherapyCategory, TherapyCard[]> = {
  crisis: [
    {
      id: 'crisis-support',
      category: 'crisis',
      typeLabel: 'Acil destek',
      icon: 'alert-circle',
      title: 'Yalnız değilsin, hemen destek al',
      body: 'Şu an çok ağır bir şey yaşıyor olabilirsin. Bu duygular geçici ve sen değerlisin. Yardım istemek güçlü bir adımdır — lütfen aşağıdaki hatlardan birine ya da güvendiğin birine hemen ulaş.',
      steps: [
        '182 — ALO Yaşam Hattı (7/24, ücretsiz, ruhsal kriz desteği)',
        '183 — ALO Sosyal Destek Hattı (7/24, ücretsiz)',
        'Hayati tehlike varsa hemen 112’yi ara',
        'Şu an yanında olabilecek birine ulaş',
      ],
    },
  ],

  anxiety: [
    {
      id: 'anx-54321',
      category: 'anxiety',
      typeLabel: 'Topraklanma',
      icon: 'eye-outline',
      title: '5-4-3-2-1 ile ana dön',
      body: 'Kaygı zihnini geleceğe sürüklerken duyularına dönmek seni şu ana getirir ve “tehlike” alarmını yavaşça kapatır.',
      steps: [
        'Gördüğün 5 şeyi say',
        'Dokunabildiğin 4 şeyi fark et',
        'Duyduğun 3 sesi dinle',
        'Aldığın 2 kokuyu fark et',
        'Tadabildiğin 1 şeyi fark et',
      ],
    },
    {
      id: 'anx-box',
      category: 'anxiety',
      typeLabel: 'Nefes egzersizi',
      icon: 'square-outline',
      title: 'Kutu nefesi',
      body: 'Kontrollü nefes kalp atışını yavaşlatır ve sakinleştiren sinir sistemini devreye sokar.',
      steps: [
        '4 sayarak burnundan nefes al',
        '4 sayarak nefesini tut',
        '4 sayarak ağzından ver',
        '4 sayarak tut — bunu 4 tur tekrarla',
      ],
      breathing: [
        { kind: 'inhale', seconds: 4, label: 'Nefes al' },
        { kind: 'hold', seconds: 4, label: 'Tut' },
        { kind: 'exhale', seconds: 4, label: 'Ver' },
        { kind: 'hold', seconds: 4, label: 'Tut' },
      ],
    },
    {
      id: 'anx-reframe',
      category: 'anxiety',
      typeLabel: 'Yeniden çerçeveleme',
      icon: 'help-circle-outline',
      title: 'Kaygılı düşünceyi nazikçe sına',
      body: 'Kaygı çoğu zaman “en kötü” senaryoyu gerçekmiş gibi sunar. Düşünceyi bir kanıt gibi değil, bir tahmin gibi ele al.',
      steps: [
        'Bu düşüncenin lehine kanıt ne?',
        'Aleyhine kanıt ne?',
        'En olası sonuç gerçekten ne?',
        'Aynı durumdaki bir arkadaşına ne söylerdin?',
      ],
    },
  ],

  sadness: [
    {
      id: 'sad-validate',
      category: 'sadness',
      typeLabel: 'Duyguya yer açma',
      icon: 'heart-outline',
      title: 'Üzgün olman çok normal',
      body: 'Duyguyu bastırmak yerine ona izin vermek, geçmesini kolaylaştırır. Hisler birer dalga gibidir; yükselir ve geçer.',
      steps: [
        'Elini kalbinin üzerine koy',
        '“Şu an zor ve bu sorun değil” de',
        'Birkaç yavaş nefes al, duyguya alan tanı',
      ],
    },
    {
      id: 'sad-activation',
      category: 'sadness',
      typeLabel: 'Küçük adım',
      icon: 'footsteps-outline',
      title: 'Minik bir hareket',
      body: 'Motivasyon çoğu zaman hareketten sonra gelir, önce değil. Tek bir küçük eylem, çökkün döngüyü kırabilir.',
      steps: [
        'Sana iyi gelen tek, küçük bir şey seç (su iç, pencereyi aç, 2 dk yürü)',
        'Şimdi, hevesin olmasa bile yap',
        'Yaptığın için kendini takdir et',
      ],
    },
    {
      id: 'sad-compassion',
      category: 'sadness',
      typeLabel: 'Öz-şefkat',
      icon: 'happy-outline',
      title: 'Kendine bir dost gibi davran',
      body: 'Kendine, zor anında sevdiğin birine göstereceğin sıcaklıkla yaklaş. Bu, toparlanmayı hızlandırır.',
      steps: [
        '“Bu zor bir an” de',
        '“Zorluk hayatın bir parçası, yalnız değilim” de',
        '“Şu an kendime nazik olabilir miyim?” diye sor',
      ],
    },
  ],

  anger: [
    {
      id: 'ang-pause',
      category: 'anger',
      typeLabel: 'Sakinleşme',
      icon: 'hand-left-outline',
      title: 'Önce dur ve nefes al',
      body: 'Öfke yükselirken beden tepki vermeye hazırlanır. Birkaç saniyelik duraksama, kontrolü sana geri verir.',
      steps: [
        'Durakla, hemen tepki verme',
        'Burnundan derin al, ağzından yavaşça ver',
        '10’dan geriye doğru say',
      ],
    },
    {
      id: 'ang-need',
      category: 'anger',
      typeLabel: 'Anlama',
      icon: 'search-outline',
      title: 'Öfkenin altında ne var?',
      body: 'Öfke çoğu zaman incinmenin, haksızlığın ya da karşılanmamış bir ihtiyacın habercisidir.',
      steps: [
        '“Beni asıl ne incitti?” diye sor',
        'Altındaki ihtiyacı adlandır (saygı, güven, dinlenme...)',
        'Bu ihtiyacı sakince nasıl ifade edebilirsin?',
      ],
    },
  ],

  stress: [
    {
      id: 'str-one',
      category: 'stress',
      typeLabel: 'Önceliklendirme',
      icon: 'list-outline',
      title: 'Tek bir şeye odaklan',
      body: 'Her şey aynı anda büyük görünür. Zihni yalnızca “bir sonraki adıma” indirgemek yükü hafifletir.',
      steps: [
        'Aklındaki her şeyi bir yere dök',
        'Sadece bir sonraki küçük adımı seç',
        'Gerisini şimdilik bir kenara bırak',
      ],
    },
    {
      id: 'str-relax',
      category: 'stress',
      typeLabel: 'Gevşeme',
      icon: 'body-outline',
      title: 'Bedenini gevşet',
      body: 'Stres bedende birikir. Kasları bilinçli gevşetmek, zihne de “güvendesin” sinyali gönderir.',
      steps: [
        'Omuzlarını 5 saniye sık, sonra bırak',
        'Ellerini yumruk yap, sonra gevşet',
        'Çeneni gevşet ve derin bir nefes al',
      ],
    },
  ],

  loneliness: [
    {
      id: 'lon-reach',
      category: 'loneliness',
      typeLabel: 'Bağlantı',
      icon: 'chatbubble-ellipses-outline',
      title: 'Küçük bir bağ kur',
      body: 'Yalnızlık hissi gerçek olsa da kalıcı değildir. Minik bir temas bile bu hissi yumuşatabilir.',
      steps: [
        'Aklına gelen bir kişiye kısa bir mesaj at',
        'İstersen sadece “aklıma geldin” de',
        'Ya da bir ortama/topluluğa küçük bir adım at',
      ],
    },
    {
      id: 'lon-validate',
      category: 'loneliness',
      typeLabel: 'Duyguya yer açma',
      icon: 'heart-outline',
      title: 'Yalnız hissetmek seni yalnız yapmaz',
      body: 'Bu duygu, insan olmanın bir parçası ve herkes zaman zaman yaşar. Onu fark edip ifade ettiğin için buradasın.',
    },
  ],

  selfCritic: [
    {
      id: 'sc-friend',
      category: 'selfCritic',
      typeLabel: 'Öz-şefkat',
      icon: 'people-outline',
      title: 'Bunu bir arkadaşına söyler miydin?',
      body: 'İç sesimiz bazen acımasız olur. Aynı cümleyi sevdiğin birine söylemezsen, kendine de söylemeyi hak etmiyorsun.',
      steps: [
        'Kendine söylediğin cümleyi fark et',
        '“Bunu bir arkadaşıma söyler miydim?” diye sor',
        'Onu daha nazik bir cümleyle değiştir',
      ],
    },
    {
      id: 'sc-distortion',
      category: 'selfCritic',
      typeLabel: 'Düşünce tuzağı',
      icon: 'construct-outline',
      title: 'Düşünce tuzağını yakala',
      body: '“Hep”, “asla”, “tamamen başarısızım” gibi ifadeler genellikle birer düşünce çarpıtmasıdır — gerçeğin tamamı değil.',
      steps: [
        'Abartan/genelleyen kelimeleri bul (hep, asla, hiç)',
        'Tek bir olayı tüm hayatına genellemiş olabilir misin?',
        'Daha dengeli ve gerçekçi bir cümle kur',
      ],
    },
  ],

  sleep: [
    {
      id: 'slp-478',
      category: 'sleep',
      typeLabel: 'Nefes egzersizi',
      icon: 'moon-outline',
      title: '4-7-8 nefesi',
      body: 'Bu yavaş nefes ritmi kalp atışını düşürür ve bedeni uykuya hazırlar.',
      steps: [
        '4 sayarak burnundan nefes al',
        '7 sayarak nefesini tut',
        '8 sayarak ağzından yavaşça ver',
        '3-4 kez tekrarla',
      ],
      breathing: [
        { kind: 'inhale', seconds: 4, label: 'Nefes al' },
        { kind: 'hold', seconds: 7, label: 'Tut' },
        { kind: 'exhale', seconds: 8, label: 'Ver' },
      ],
    },
    {
      id: 'slp-mind',
      category: 'sleep',
      typeLabel: 'Zihni yatıştırma',
      icon: 'bed-outline',
      title: 'Uyumaya çalışmayı bırak',
      body: 'Uyumaya “çalışmak” bazen seni daha çok uyanık tutar. Baskıyı azaltmak rahatlamayı getirir.',
      steps: [
        'Ekranı bir kenara bırak, ışıkları kıs',
        'Yarına dair düşünceleri bir kağıda not et, zihninden çıkar',
        'Dikkatini yalnızca nefesinin gidiş gelişine ver',
      ],
    },
  ],

  relationship: [
    {
      id: 'rel-ifeel',
      category: 'relationship',
      typeLabel: 'İletişim',
      icon: 'chatbubbles-outline',
      title: '“Ben dili” ile ifade et',
      body: 'Suçlamak yerine kendi duygunu anlatmak, karşındakini savunmaya geçirmeden seni duyulur kılar.',
      steps: [
        '“Sen hep...” yerine “Ben ... hissediyorum” de',
        'Hangi davranışın seni nasıl hissettirdiğini söyle',
        'Neye ihtiyacın olduğunu açıkça belirt',
      ],
    },
  ],

  positive: [
    {
      id: 'pos-savor',
      category: 'positive',
      typeLabel: 'Anı yakalama',
      icon: 'sparkles-outline',
      title: 'Bu güzel anı içine çek',
      body: 'İyi hisleri fark edip onlarda biraz oyalanmak, beynin bu anları daha güçlü kaydetmesini sağlar.',
      steps: [
        'Şu an iyi hissettiren şeyi fark et',
        'Bedeninde nasıl bir his bıraktığını gözlemle',
        'Bunu mümkün kılan şeye küçük bir teşekkür et',
      ],
    },
    {
      id: 'pos-gratitude',
      category: 'positive',
      typeLabel: 'Minnettarlık',
      icon: 'leaf-outline',
      title: 'Üç küçük şey',
      body: 'Minnettarlık, dikkati eksik olana değil, var olana çevirir.',
      steps: [
        'Bugün için minnettar olduğun 3 küçük şeyi düşün',
        'Her biri neden önemli, birkaç kelimeyle ekle',
      ],
    },
  ],

  general: [
    {
      id: 'gen-reflect',
      category: 'general',
      typeLabel: 'Eşlik',
      icon: 'sparkles-outline',
      title: 'Paylaştığın için teşekkürler',
      body: 'Hislerini yazmak bile başlı başına iyileştiricidir. Buradayım ve seni dinliyorum. 🤍',
      steps: ['Şu soruya da yanıt vermek ister misin: Şu an en çok neye ihtiyacın var?'],
    },
    {
      id: 'gen-checkin',
      category: 'general',
      typeLabel: 'Eşlik',
      icon: 'heart-outline',
      title: 'Bir an dur ve kendini dinle',
      body: 'Bedenine kulak ver; duygular bize hep bir şey anlatmaya çalışır.',
      steps: [
        'Şu an bedeninde ne hissediyorsun?',
        'Bu his sana ne söylemeye çalışıyor olabilir?',
      ],
    },
  ],
};

export const ALL_CARDS: TherapyCard[] = Object.values(CARDS).flat();

export function getCardById(id: string): TherapyCard | undefined {
  return ALL_CARDS.find((c) => c.id === id);
}
