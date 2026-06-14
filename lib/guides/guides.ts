import { Ionicons } from '@expo/vector-icons';

export type GuideOption = { label: string; a: number; b: number };
export type GuideQuestion = { id: string; text: string; options: GuideOption[] };
export type GuideTone = 'warning' | 'reflect' | 'calm';
export type GuideResult = {
  title: string;
  body: string;
  tips: string[];
  tone: GuideTone;
};

export type GuideTopic = {
  id: string;
  group: string; // listede gruplama başlığı
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  title: string;
  teaser: string;
  intro: string;
  /** A boyutu: dış/ilişkiye dair uyarı işaretleri */
  dimensionA: string;
  /** B boyutu: kişinin kendi örüntüsü / geçici durum */
  dimensionB: string;
  questions: GuideQuestion[];
  results: {
    aDominant: GuideResult;
    bDominant: GuideResult;
    both: GuideResult;
    neither: GuideResult;
  };
};

export const DISCLAIMER =
  'Bu bir teşhis ya da kesin yargı değildir; yalnızca düşünmen için bir ayna. Önemli kararları tek bir testin sonucuna dayandırma.';

export const GUIDE_TOPICS: GuideTopic[] = [
  /* ---------------- İLİŞKİLER ---------------- */
  {
    id: 'rel-cheating',
    group: 'İlişkiler',
    icon: 'heart-dislike-outline',
    accent: '#D98BA0',
    title: 'Sevgilim beni aldatıyor mu?',
    teaser: 'Şüphenin nereden geldiğini birlikte ayıralım.',
    intro:
      'Bu soruyu sormak bile zor ve cesaret ister. Amacımız “kesin cevap” vermek değil; şüphenin ne kadarı ilişkideki gerçek işaretlerden, ne kadarı kendi kaygından geliyor, bunu birlikte görmek.',
    dimensionA: 'İlişkideki uyarı işaretleri',
    dimensionB: 'Kendi kaygı ve güvensizliğin',
    questions: [
      {
        id: 'q1',
        text: 'Bu şüphe daha çok nereden geliyor?',
        options: [
          { label: 'Davranışlarında somut, fark edilir değişiklikler var', a: 2, b: 0 },
          { label: 'Net bir şey yok ama içimde bir huzursuzluk var', a: 0, b: 2 },
          { label: 'Biraz ikisi de', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Geçmişte, bu ilişkiden bağımsız olarak güven/terk kaygısı yaşar mıydın?',
        options: [
          { label: 'Evet, eski ilişkilerde de benzer şüpheler yaşadım', a: 0, b: 2 },
          { label: 'Hayır, ilk kez bu ilişkide hissediyorum', a: 2, b: 0 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Sorduğunda partnerin nasıl tepki veriyor?',
        options: [
          { label: 'Açık ve şeffaf; güven vermeye çalışıyor', a: 0, b: 1 },
          { label: 'Savunmacı, suçlayıcı ya da kaçamak', a: 2, b: 0 },
          { label: 'Hiç konuşmadım / soramıyorum', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Elinde somut bir şey mi var, yoksa daha çok varsayım mı?',
        options: [
          { label: 'Somut bir şey gördüm/öğrendim', a: 2, b: 0 },
          { label: 'Çoğunlukla senaryolar kuruyorum', a: 0, b: 2 },
          { label: 'Belirsiz işaretler', a: 1, b: 1 },
        ],
      },
      {
        id: 'q5',
        text: 'Bu şüphe günlük hayatını ne kadar ele geçiriyor?',
        options: [
          { label: 'Çok; sürekli kontrol etme isteği var', a: 0, b: 2 },
          { label: 'Tedirginim ama işlevselim', a: 1, b: 1 },
          { label: 'Çok az', a: 0, b: 0 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Dikkate değer işaretler var gibi',
        body: 'Yanıtların, ilişkinde seni haklı olarak rahatsız eden somut işaretlere işaret ediyor. Bu kesin bir kanıt değil, ama hislerin önemli ve göz ardı edilmemeli.',
        tips: [
          'Suçlamadan, “ben dili” ile açık bir konuşma planla',
          'İhtiyaçların ve sınırların net olsun',
          'Tek başına taşıma; güvendiğin biriyle ya da bir uzmanla konuş',
        ],
      },
      bDominant: {
        tone: 'reflect',
        title: 'Şüphe daha çok içeriden geliyor olabilir',
        body: 'Yanıtların, somut işaretlerden çok kendi kaygı ve güven yaralarına işaret ediyor olabilir. Bu çok insani ve utanılacak bir şey değil; ama hem sana hem ilişkine yorabilir.',
        tips: [
          'Kaygı yükseldiğinde “kanıt mı, varsayım mı?” diye sor',
          'Geçmiş yaraların bugünü nasıl boyadığını fark et',
          'Kontrol dürtüsü güçlüyse bir uzmandan destek çok yardımcı olur',
        ],
      },
      both: {
        tone: 'warning',
        title: 'İki yön de güçlü görünüyor',
        body: 'Hem ilişkide seni rahatsız eden işaretler hem de yüksek bir kaygı bir arada. Bunları ayırmak önemli: bazı şeyler gerçekten konuşulmalı, bazıları kendi kaygınla ilgili olabilir.',
        tips: [
          'Önce somut olanları not et, varsayımlardan ayır',
          'Partnerinle sakin bir konuşma + kendi kaygınla çalışma',
          'Gerekirse çift veya birey terapisini düşün',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin bir alarm yok gibi',
        body: 'Yanıtların ne güçlü bir uyarı işaretine ne de yoğun bir kaygıya işaret ediyor. Bu daha çok anlık bir tedirginlik olabilir.',
        tips: [
          'Merakını küçük, açık bir soruyla paylaş',
          'Kendine de partnerine de zaman tanı',
          'Tedirginlik sürerse tekrar buraya dön',
        ],
      },
    },
  },

  {
    id: 'rel-health',
    group: 'İlişkiler',
    icon: 'people-outline',
    accent: '#D98BA0',
    title: 'İlişkim bana iyi mi geliyor?',
    teaser: 'Bu ilişki seni besliyor mu, yoruyor mu?',
    intro:
      'Hiçbir ilişki kusursuz değildir. Burada amaç, yaşadıklarının çözülebilir zorluklar mı yoksa süreklileşmiş sağlıksız bir örüntü mü olduğunu birlikte görmek.',
    dimensionA: 'Sağlıksız ilişki işaretleri',
    dimensionB: 'Geçici / çözülebilir zorluklar',
    questions: [
      {
        id: 'q1',
        text: 'Partnerinle birlikteyken çoğunlukla nasıl hissediyorsun?',
        options: [
          { label: 'Güvende ve değerli', a: 0, b: 0 },
          { label: 'Gergin, tedirgin ya da yetersiz', a: 2, b: 0 },
          { label: 'Değişken', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Anlaşmazlıklar nasıl çözülüyor?',
        options: [
          { label: 'Konuşup uzlaşmaya çalışıyoruz', a: 0, b: 1 },
          { label: 'Bağırma, küsme ya da aşağılama oluyor', a: 2, b: 0 },
          { label: 'Halı altına süpürülüyor', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Sınırların ve “hayır”ların ne kadar dinleniyor?',
        options: [
          { label: 'Genelde saygı görüyor', a: 0, b: 1 },
          { label: 'Sık sık çiğneniyor', a: 2, b: 0 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Son zamanlardaki zorluklar nasıl?',
        options: [
          { label: 'Belirli bir döneme/duruma bağlı (stres, mesafe)', a: 0, b: 2 },
          { label: 'Süreklileşmiş bir örüntü', a: 2, b: 0 },
          { label: 'Karışık', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Sağlıksız işaretler dikkat çekiyor',
        body: 'Yanıtların, ilişkinde kendini güvende ve değerli hissetmeni zorlaştıran sürekli işaretlere işaret ediyor. Sen saygı ve güven içinde bir ilişkiyi hak ediyorsun.',
        tips: [
          'Kendini nasıl hissettiğini somut örneklerle fark et',
          'Sınırlarını netleştir ve onları savun',
          'Güvendiğin biriyle ya da bir uzmanla konuşmaktan çekinme',
        ],
      },
      bDominant: {
        tone: 'reflect',
        title: 'Daha çok geçici bir zorluk gibi',
        body: 'Yanıtların, kalıcı bir sorundan çok belirli bir döneme bağlı zorluklara işaret ediyor. Bunlar açık iletişimle çözülebilir.',
        tips: [
          'Sorunu kişiye değil, duruma odaklayarak konuş',
          'İkinizin de ihtiyacını masaya koyun',
          'Birlikte küçük, somut bir adım belirleyin',
        ],
      },
      both: {
        tone: 'warning',
        title: 'Hem işaretler hem çözülebilir yanlar var',
        body: 'İlişkide hem gerçekten konuşulması gereken işaretler hem de düzeltilebilir yanlar var gibi. Ayrımı yapmak yön bulmana yardımcı olur.',
        tips: [
          'Hangi konular “anlaşmazlık”, hangileri “sınır ihlali” ayır',
          'Sınır ihlallerinde net ol',
          'Gerekirse profesyonel destek al',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'İlişki genel olarak sağlıklı görünüyor',
        body: 'Yanıtların belirgin bir sağlıksızlık işareti göstermiyor. Her ilişkinin inişli çıkışlı anları olur.',
        tips: [
          'İyi giden yanları da fark edip dile getir',
          'Küçük takdirler bağı güçlendirir',
          'İhtiyaçlarını paylaşmaya devam et',
        ],
      },
    },
  },

  /* ---------------- DUYGULAR ---------------- */
  {
    id: 'mood-depression',
    group: 'Duygular',
    icon: 'rainy-outline',
    accent: '#7FA9C9',
    title: 'Sadece üzgün müyüm, yoksa daha fazlası mı?',
    teaser: 'Geçici bir üzüntü mü, daha derin bir şey mi?',
    intro:
      'Üzüntü insani ve geçicidir. Ama bazı zamanlarda daha derin ve uzun sürer. Burada amaç, yaşadığının hangisine daha yakın olduğunu nazikçe anlamak.',
    dimensionA: 'Çökkünlük yönünde işaretler',
    dimensionB: 'Geçici, duruma bağlı üzüntü',
    questions: [
      {
        id: 'q1',
        text: 'Bu hâl ne kadar sürüyor?',
        options: [
          { label: 'Birkaç gün', a: 0, b: 2 },
          { label: 'İki haftadan uzun, çoğu gün', a: 2, b: 0 },
          { label: 'Gelip gidiyor', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Eskiden keyif aldığın şeyler şimdi nasıl?',
        options: [
          { label: 'Hâlâ keyif veriyor', a: 0, b: 1 },
          { label: 'Artık ilgimi çekmiyor', a: 2, b: 0 },
          { label: 'Keyfi azaldı', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Uyku, iştah ve enerjin?',
        options: [
          { label: 'Genel olarak normal', a: 0, b: 1 },
          { label: 'Belirgin değişti (çok/az)', a: 2, b: 0 },
          { label: 'Biraz değişti', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Kendine dair düşüncelerin?',
        options: [
          { label: 'Geçici bir moralsizlik', a: 0, b: 1 },
          { label: 'Sık sık değersizlik/umutsuzluk', a: 2, b: 0 },
          { label: 'Arada bir', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Bir uzmana danışmaya değer',
        body: 'İki haftadan uzun süren, keyfini, uykunu ve enerjini etkileyen bu işaretler depresyon yönünde olabilir. Bu bir zayıflık değil ve tedavi edilebilir bir şey. Bir ruh sağlığı uzmanıyla konuşman çok değerli olur.',
        tips: [
          'Bir psikolog/psikiyatristten randevu almayı düşün',
          'Zorlandığın anlarda 182 ALO Yaşam Hattı’nı arayabilirsin',
          'Küçük günlük rutinler ve sevdiklerinle temas iyi gelir',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Geçici bir üzüntü gibi',
        body: 'Yanıtların, daha çok duruma bağlı, geçici bir üzüntüye işaret ediyor. Bu hâl insanın doğal bir parçası ve genelde zamanla hafifler.',
        tips: [
          'Duyguna yer aç, bastırma',
          'Sana iyi gelen küçük şeyleri planla',
          'Uyku ve hareketi ihmal etme',
        ],
      },
      both: {
        tone: 'warning',
        title: 'Karışık ama izlemeye değer',
        body: 'Bazı işaretler geçici üzüntüye, bazıları daha derin bir hâle işaret ediyor. Birkaç gün kendini gözlemlemek ve gerekirse destek almak iyi olur.',
        tips: [
          'Ruh halini birkaç gün “Şimdi” sekmesinden kaydet',
          'Belirtiler ağırlaşırsa bir uzmana danış',
          'Kendine karşı sabırlı ol',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin bir çökkünlük yok gibi',
        body: 'Yanıtların yoğun ya da uzun süren bir çökkünlüğe işaret etmiyor. Yine de duygularını fark etmen çok değerli.',
        tips: [
          'Kendini düzenli kontrol etmeye devam et',
          'İyi hissettiren anları biriktir',
          'Gerektiğinde yardım istemekten çekinme',
        ],
      },
    },
  },

  {
    id: 'anx-normal',
    group: 'Duygular',
    icon: 'pulse-outline',
    accent: '#8B89C4',
    title: 'Endişelerim normal mi?',
    teaser: 'Kaygın duruma mı bağlı, yoksa sürekli mi?',
    intro:
      'Kaygı, bizi koruyan doğal bir duygudur. Ama bazen olması gerekenden çok yer kaplar. Birlikte, kaygının daha çok duruma mı bağlı yoksa süreklileşmiş mi olduğuna bakalım.',
    dimensionA: 'Yaygın / sürekli kaygı işaretleri',
    dimensionB: 'Duruma özgü, geçici kaygı',
    questions: [
      {
        id: 'q1',
        text: 'Endişen genelde neye bağlı?',
        options: [
          { label: 'Belirli bir olay/duruma (sınav, görüşme...)', a: 0, b: 2 },
          { label: 'Birçok farklı konuya, çoğu gün', a: 2, b: 0 },
          { label: 'Değişiyor', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Kaygıyı durdurmak/“kapatmak” ne kadar zor?',
        options: [
          { label: 'Durum geçince geçiyor', a: 0, b: 1 },
          { label: 'Kontrol etmekte çok zorlanıyorum', a: 2, b: 0 },
          { label: 'Bazen zor', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Bedeninde belirtiler var mı (çarpıntı, gerginlik, uykusuzluk)?',
        options: [
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Sık sık', a: 2, b: 0 },
          { label: 'Ara sıra', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Günlük hayatını (iş, ilişkiler) ne kadar etkiliyor?',
        options: [
          { label: 'Çok az', a: 0, b: 1 },
          { label: 'Belirgin şekilde', a: 2, b: 0 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Kaygı epey yer kaplıyor olabilir',
        body: 'Yanıtların, birçok alana yayılan ve kontrolü zor bir kaygıya işaret ediyor. Bununla yalnız başa çıkmak zorunda değilsin; destekle çok şey değişebilir.',
        tips: [
          'Düzenli nefes/topraklanma egzersizleri (Eşlikçi kartları)',
          'Kaygı günlük hayatını zorluyorsa bir uzmana danış',
          'Kafein ve uykusuzluk kaygıyı artırır, dikkat et',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Daha çok duruma bağlı kaygı',
        body: 'Yanıtların, belirli durumlara bağlı, geçici bir kaygıya işaret ediyor. Bu son derece normal ve yönetilebilir.',
        tips: [
          'Kaygı yükselince kutu nefesi dene',
          'Endişeni somut bir “yapılacak adıma” çevir',
          'Kendine “bu duygu geçici” diye hatırlat',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Hem durumsal hem yaygın yanlar var',
        body: 'Kaygının bir kısmı duruma bağlı, bir kısmı daha yaygın görünüyor. İzlemek ve teknik denemek iyi olur.',
        tips: [
          'Hangi kaygı duruma bağlı, hangisi sürekli ayır',
          'Düzenli rahatlama egzersizleri yap',
          'Sürerse profesyonel destek düşün',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Kaygın sağlıklı sınırlarda',
        body: 'Yanıtların yoğun ya da sürekli bir kaygıya işaret etmiyor. Kaygının normal seviyede.',
        tips: [
          'İyi gelen rutinlerini sürdür',
          'Zor anlarda nefes egzersizleri elinin altında',
          'Kendini dinlemeye devam et',
        ],
      },
    },
  },

  /* ---------------- KENDLİK ---------------- */
  {
    id: 'self-worth',
    group: 'Kendlik',
    icon: 'ribbon-outline',
    accent: '#6E8C6A',
    title: 'Yeterince iyi miyim?',
    teaser: 'İç sesin sana adil mi davranıyor?',
    intro:
      'Çoğumuz kendimize, bir başkasına asla söylemeyeceğimiz kadar sert davranırız. Bakalım iç sesin sana karşı ne kadar adil.',
    dimensionA: 'Katı öz-eleştiri / düşük öz-değer',
    dimensionB: 'Dengeli, gerçekçi bakış',
    questions: [
      {
        id: 'q1',
        text: 'Bir hata yaptığında kendine nasıl davranırsın?',
        options: [
          { label: 'Anlayışla; herkes hata yapar derim', a: 0, b: 2 },
          { label: 'Kendimi uzun süre yerden yere vururum', a: 2, b: 0 },
          { label: 'Duruma göre değişir', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Başarılarını nasıl değerlendirirsin?',
        options: [
          { label: 'Emeğimi takdir ederim', a: 0, b: 1 },
          { label: '“Şans/önemsiz” diye küçümserim', a: 2, b: 0 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Kendini başkalarıyla ne sıklıkta kıyaslarsın?',
        options: [
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Çok sık ve hep aleyhime', a: 2, b: 0 },
          { label: 'Ara sıra', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: '“Yeterince iyi değilim” düşüncesi ne kadar sık gelir?',
        options: [
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Neredeyse her gün', a: 2, b: 0 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'reflect',
        title: 'İç sesin sana karşı çok sert',
        body: 'Yanıtların, kendine karşı katı ve affetmeyen bir iç sese işaret ediyor. Bu ses gerçek değil, sadece alışkanlık; ve değiştirilebilir.',
        tips: [
          'Kendine söylediğini bir arkadaşına der miydin diye sor',
          'Her gün bir küçük başarını fark et',
          'Öz-şefkat pratikleri (Eşlikçi kartları) düzenli yap',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Kendine oldukça adil davranıyorsun',
        body: 'Yanıtların, dengeli ve şefkatli bir iç sese işaret ediyor. Bu güçlü bir koruyucu.',
        tips: [
          'Bu nazik tutumu zor günlerde de koru',
          'Kendine küçük takdirler vermeye devam et',
          'Çevrendekilere de aynı şefkati yansıt',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Dengeli ama bazı sert yanlar var',
        body: 'Genelde dengeli olsan da bazı alanlarda kendine fazla yükleniyor olabilirsin.',
        tips: [
          'En sert olduğun konuyu fark et',
          'O konuda kendine bir “izin cümlesi” yaz',
          'Kıyas tuzaklarına dikkat et',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Öz-değerin sağlam görünüyor',
        body: 'Yanıtların belirgin bir öz-eleştiri sorununa işaret etmiyor.',
        tips: [
          'Güçlü yanlarını hatırlamaya devam et',
          'Zor anlarda kendine nazik ol',
          'İlerlemeni kutla',
        ],
      },
    },
  },

  {
    id: 'burnout',
    group: 'Kendlik',
    icon: 'battery-dead-outline',
    accent: '#C9A94E',
    title: 'Tükenmiş miyim?',
    teaser: 'Geçici bir yorgunluk mu, tükenmişlik mi?',
    intro:
      'Yorgunluk dinlenince geçer; tükenmişlik ise daha derindir ve sürer. Birlikte hangisine daha yakın olduğuna bakalım.',
    dimensionA: 'Tükenmişlik işaretleri',
    dimensionB: 'Geçici yorgunluk',
    questions: [
      {
        id: 'q1',
        text: 'Dinlendikten sonra kendini nasıl hissediyorsun?',
        options: [
          { label: 'Toparlanıyorum', a: 0, b: 2 },
          { label: 'Dinlensem de bitkinim', a: 2, b: 0 },
          { label: 'Kısmen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'İşine/sorumluluklarına dair hislerin?',
        options: [
          { label: 'Genelde anlamlı buluyorum', a: 0, b: 1 },
          { label: 'Soğudum, mesafeliyim, anlamsız geliyor', a: 2, b: 0 },
          { label: 'Değişken', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Bu hâl ne kadar sürüyor?',
        options: [
          { label: 'Birkaç gün/hafta', a: 0, b: 2 },
          { label: 'Aylardır', a: 2, b: 0 },
          { label: 'Gelip gidiyor', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Sinirlilik, odaklanamama ya da bedensel belirtiler?',
        options: [
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Sık sık', a: 2, b: 0 },
          { label: 'Ara sıra', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Tükenmişlik işaretleri belirgin',
        body: 'Yanıtların, dinlenmenin yetmediği, anlamsızlık ve mesafeyle gelen bir tükenmişliğe işaret ediyor. Bu ciddiye alınmalı; sadece “daha çok çalışarak” çözülmez.',
        tips: [
          'Yükünü gözden geçir; devredebileceğin/erteleyebileceğin ne var?',
          'Sınır koy: çalışma ve dinlenme arasını netleştir',
          'Sürerse bir uzmandan destek al',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Daha çok geçici yorgunluk',
        body: 'Yanıtların, dinlenmeyle toparlanabilen geçici bir yorgunluğa işaret ediyor.',
        tips: [
          'Uykunu ve molalarını önceliklendir',
          'Küçük bir keyif aktivitesi planla',
          'Bedenini hareket ettir',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Yorgunluk derinleşiyor olabilir',
        body: 'Bazı işaretler geçici yorgunluğa, bazıları tükenmişliğe işaret ediyor. Şimdi önlem almak iyi olur.',
        tips: [
          'Önümüzdeki hafta gerçek bir dinlenme planla',
          'Yükünü azaltacak bir değişiklik yap',
          'Belirtiler sürerse destek al',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin tükenmişlik yok gibi',
        body: 'Yanıtların ciddi bir tükenmişliğe işaret etmiyor. Yine de kendine alan açman değerli.',
        tips: [
          'Dengeyi korumaya devam et',
          'Molaları ihmal etme',
          'Enerjini neyin doldurduğunu fark et',
        ],
      },
    },
  },

  {
    id: 'rel-breakup',
    group: 'İlişkiler',
    icon: 'exit-outline',
    accent: '#D98BA0',
    title: 'Ondan ayrılmalı mıyım?',
    teaser: 'Kalmak mı, gitmek mi — birlikte tartalım.',
    intro:
      'Bu karar tamamen sana ait; kimse senin yerine veremez. Amacımız kararını netleştirecek soruları birlikte düşünmek.',
    dimensionA: 'Ayrılığa işaret eden kalıcı sorunlar',
    dimensionB: 'Geçici / çözülebilir bir kriz',
    questions: [
      {
        id: 'q1',
        text: 'Temel ihtiyaçların (saygı, güven, sevgi) karşılanıyor mu?',
        options: [
          { label: 'Çoğunlukla hayır', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Değişken', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Aynı sorunları ne kadar süredir konuşuyorsunuz?',
        options: [
          { label: 'Uzun süredir, hiç değişmiyor', a: 2, b: 0 },
          { label: 'Yeni / belirli bir duruma bağlı', a: 0, b: 2 },
          { label: 'Arada', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Bu ilişkide kendin olabiliyor musun?',
        options: [
          { label: 'Nadiren', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Kalma sebebin daha çok ne?',
        options: [
          { label: 'Yalnız kalma korkusu / alışkanlık', a: 2, b: 0 },
          { label: 'Onunla gerçekten mutlu olmak', a: 0, b: 1 },
          { label: 'İkisi de', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Kalıcı sorunlar ağır basıyor',
        body: 'Yanıtların, zamanla değişmeyen ve temel ihtiyaçlarını karşılamayan bir örüntüye işaret ediyor. Ne karar verirsen ver, mutluluğu hak ettiğini unutma.',
        tips: [
          'Kalma sebeplerini “korku” mu “sevgi” mi diye ayır',
          'Kararını yazıya dök: artılar ve eksiler',
          'Güvendiğin biriyle ya da bir uzmanla konuş',
        ],
      },
      bDominant: {
        tone: 'reflect',
        title: 'Daha çok geçici bir kriz gibi',
        body: 'Yanıtların, kalıcı bir uyumsuzluktan çok geçici bir zorluğa işaret ediyor. Açık konuşmayla aşılabilir.',
        tips: [
          'Sorunu suçlamadan, birlikte konuş',
          'Somut bir değişiklik üzerinde anlaşın',
          'Acele karar verme, biraz zaman tanı',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Karışık; netleştirmek gerek',
        body: 'Hem kalıcı hem geçici görünen yanlar var. Ayrımı yapmak kararını kolaylaştırır.',
        tips: [
          'Hangi sorunlar kalıcı, hangileri geçici ayır',
          'Bir “deneme süresi” ve net sınır belirle',
          'Gerekirse çift terapisini düşün',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin bir ayrılık işareti yok',
        body: 'Yanıtların güçlü bir ayrılık gerekçesine işaret etmiyor. Bu daha çok geçici bir tedirginlik olabilir.',
        tips: [
          'İyi yanları da fark et',
          'İhtiyaçlarını açıkça paylaş',
          'Tedirginlik sürerse tekrar buraya dön',
        ],
      },
    },
  },

  {
    id: 'panic',
    group: 'Duygular',
    icon: 'alert-circle-outline',
    accent: '#8B89C4',
    title: 'Panik atak mı yaşıyorum?',
    teaser: 'O yoğun anları birlikte anlamlandıralım.',
    intro:
      'Panik atak korkutucudur ama tehlikeli değildir ve çok etkili biçimde yönetilebilir. Yaşadığının buna ne kadar uyduğuna bakalım.',
    dimensionA: 'Panik atak işaretleri',
    dimensionB: 'Yoğun ama farklı bir gerginlik',
    questions: [
      {
        id: 'q1',
        text: 'Ani, yoğun korku dalgaları geliyor mu?',
        options: [
          { label: 'Evet, birden bastırıyor', a: 2, b: 0 },
          { label: 'Daha çok sürekli bir tedirginlik var', a: 0, b: 2 },
          { label: 'Arada', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Bedensel belirtiler (çarpıntı, nefes darlığı, titreme)?',
        options: [
          { label: 'Güçlü şekilde oluyor', a: 2, b: 0 },
          { label: 'Hafif', a: 0, b: 1 },
          { label: 'Orta', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Atak sırasında “kontrolü kaybedeceğim” hissi?',
        options: [
          { label: 'Evet, sık', a: 2, b: 0 },
          { label: 'Hayır', a: 0, b: 2 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Bu ataklar tekrarlıyor mu?',
        options: [
          { label: 'Evet, tekrar tekrar', a: 2, b: 0 },
          { label: 'Tek / çok nadir', a: 0, b: 1 },
          { label: 'Ara sıra', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Panik atak tablosuna benziyor',
        body: 'Yanıtların panik atak deneyimine uyuyor. İyi haber: panik ataklar çok etkili biçimde tedavi edilebilir. Tekrarlıyorsa bir uzmana danışman çok değerli.',
        tips: [
          'Atak anında kutu nefesi ya da 5-4-3-2-1 dene',
          '“Bu geçecek ve bana zarar vermeyecek” diye hatırla',
          'Sık tekrarlıyorsa psikolog/psikiyatrist desteği al',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Daha çok yaygın gerginlik',
        body: 'Yanıtların ani panik ataklardan çok sürekli bir gerginliğe işaret ediyor.',
        tips: [
          'Düzenli nefes egzersizleri yap',
          'Kafein ve uykusuzluğa dikkat et',
          'Gerginlik sürerse “Endişelerim normal mi?” konusuna bak',
        ],
      },
      both: {
        tone: 'warning',
        title: 'Hem panik hem gerginlik var gibi',
        body: 'Hem ani ataklar hem de sürekli bir gerginlik bir arada görünüyor.',
        tips: [
          'Atak anı için nefes tekniğini hazır tut',
          'Genel kaygıyı da düzenli çalış',
          'Uzman desteğini düşün',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin panik işareti yok',
        body: 'Yanıtların panik atak tablosuna işaret etmiyor.',
        tips: [
          'Zor anlarda nefes teknikleri elinin altında',
          'Kendini gözlemlemeye devam et',
          'Tedirginlik sürerse tekrar dön',
        ],
      },
    },
  },

  {
    id: 'anger-control',
    group: 'Duygular',
    icon: 'flame-outline',
    accent: '#E0915C',
    title: 'Öfkemi kontrol edebiliyor muyum?',
    teaser: 'Öfken sana mı hizmet ediyor, zarar mı veriyor?',
    intro:
      'Öfke doğal ve gerekli bir duygudur; sorun, onu nasıl ifade ettiğimizde başlar. Birlikte bakalım.',
    dimensionA: 'Kontrol kaybı işaretleri',
    dimensionB: 'Sağlıklı ifade',
    questions: [
      {
        id: 'q1',
        text: 'Öfkelendiğinde sonradan pişman olduğun şeyler yapıyor musun?',
        options: [
          { label: 'Sık sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Öfke anında durabiliyor musun?',
        options: [
          { label: 'Hayır, kendimi kaptırıyorum', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Öfken ilişkilerine zarar veriyor mu?',
        options: [
          { label: 'Evet, belirgin şekilde', a: 2, b: 0 },
          { label: 'Pek değil', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Öfkeni genelde nasıl ifade ediyorsun?',
        options: [
          { label: 'Bağırma / kırma / saldırı', a: 2, b: 0 },
          { label: 'Konuşarak', a: 0, b: 2 },
          { label: 'Karışık', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Öfke zaman zaman dümeni ele alıyor',
        body: 'Yanıtların, öfkenin bazen kontrolü ele aldığına ve sana zarar verdiğine işaret ediyor. Bu, öğrenilebilir bir beceri ve değiştirilebilir.',
        tips: [
          'İlk işaret geldiğinde “mola” ver, ortamdan uzaklaş',
          'Öfkenin altındaki ihtiyacı adlandır',
          'Sürekli kontrol kaybı varsa uzman desteği al',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Öfkeni sağlıklı ifade ediyorsun',
        body: 'Yanıtların, öfkeyle sağlıklı bir ilişkiye işaret ediyor.',
        tips: [
          'Bu farkındalığı koru',
          'Sınırlarını sakin bir dille söyle',
          'Biriken gerginliği egzersizle boşalt',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Çoğunlukla iyi ama bazı patlamalar var',
        body: 'Genelde iyi yönetsen de bazı anlarda öfke taşabiliyor.',
        tips: [
          'Tetikleyicilerini fark et',
          'Patlama öncesi mola tekniğini kullan',
          'Önemli konuşmaları sakinken yap',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Öfke kontrolün iyi durumda',
        body: 'Yanıtların belirgin bir öfke sorununa işaret etmiyor.',
        tips: ['Dengeyi koru', 'Duygunu erken ifade et', 'Kendine de nazik ol'],
      },
    },
  },

  {
    id: 'procrastination',
    group: 'Kendlik',
    icon: 'time-outline',
    accent: '#C9A94E',
    title: 'Erteleme sorunum mu var?',
    teaser: 'Tembellik mi, yoksa başka bir şey mi?',
    intro:
      'Erteleme çoğu zaman tembellik değil; kaygı, mükemmeliyetçilik ya da bunalmışlıkla baş etme biçimidir.',
    dimensionA: 'Kronik erteleme / kaçınma',
    dimensionB: 'Durumsal, zaman zaman',
    questions: [
      {
        id: 'q1',
        text: 'Önemli işleri ne sıklıkta son ana bırakıyorsun?',
        options: [
          { label: 'Neredeyse her zaman', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Erteleme yüzünden sorun yaşıyor musun (stres, kaçan fırsat)?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Bir işe başlamak neden zor geliyor?',
        options: [
          { label: 'Bunaltıyor / korkutuyor', a: 2, b: 0 },
          { label: 'Sadece keyifsiz', a: 0, b: 1 },
          { label: 'Değişir', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Ertelediğinde kendine nasıl davranıyorsun?',
        options: [
          { label: 'Kendimi sert biçimde suçluyorum', a: 2, b: 0 },
          { label: 'Anlayışla yaklaşıyorum', a: 0, b: 1 },
          { label: 'Arada', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'reflect',
        title: 'Erteleme bir örüntü haline gelmiş olabilir',
        body: 'Yanıtların, ertelemenin alışkanlığa dönüştüğüne işaret ediyor. Bu çoğu zaman kaygı ya da mükemmeliyetçilikle ilgilidir; çözümü de buradan geçer.',
        tips: [
          'Görevi gülünç derecede küçük bir ilk adıma böl',
          '2 dakika kuralı: sadece 2 dakika başla',
          'Suçlamak yerine “neyden kaçıyorum?” diye sor',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Daha çok zaman zaman oluyor',
        body: 'Yanıtların, kronik bir sorundan çok durumsal ertelemeye işaret ediyor.',
        tips: [
          'Önceliklerini sabah belirle',
          'En zor işi güne yay',
          'Bittiğinde kendini ödüllendir',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Belirgin ama yönetilebilir',
        body: 'Erteleme bazı alanlarda öne çıkıyor ama yönetilebilir görünüyor.',
        tips: [
          'Tetikleyici görevleri fark et',
          'Küçük adımlara böl',
          'Odak süreleri (örn. 25 dk) dene',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Belirgin erteleme sorunu yok',
        body: 'Yanıtların ciddi bir erteleme sorununa işaret etmiyor.',
        tips: ['İşleyen sistemini koru', 'Ara ara kendini kontrol et', 'Esnek ol'],
      },
    },
  },

  {
    id: 'boundaries',
    group: 'Kendlik',
    icon: 'shield-outline',
    accent: '#6E8C6A',
    title: 'Hayır demekte zorlanıyor muyum?',
    teaser: 'Sınırların seni koruyor mu?',
    intro:
      'Sürekli “evet” demek zamanla insanı tüketir ve sessizce öfke biriktirir. Sınır koymak bencillik değil, öz-bakımdır.',
    dimensionA: 'İnsanları memnun etme / sınır eksikliği',
    dimensionB: 'Durumsal nezaket',
    questions: [
      {
        id: 'q1',
        text: 'İstemediğin bir şeye “hayır” diyebiliyor musun?',
        options: [
          { label: 'Çok zorlanıyorum', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Başkalarını kırmamak için kendi ihtiyaçlarını erteliyor musun?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: '“Hayır” dediğinde suçluluk hissi?',
        options: [
          { label: 'Yoğun', a: 2, b: 0 },
          { label: 'Pek yok', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Bu durum seni tüketiyor / öfke biriktiriyor mu?',
        options: [
          { label: 'Evet', a: 2, b: 0 },
          { label: 'Hayır', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'reflect',
        title: 'Sınır koymak sana zor geliyor',
        body: 'Yanıtların, başkalarını memnun etme eğiliminin kendi ihtiyaçlarının önüne geçtiğine işaret ediyor. Sınırlar öğrenilebilir bir beceridir.',
        tips: [
          'Küçük “hayır”larla başla',
          'Açıklama zorunluluğun yok: “Maalesef uygun değilim” yeter',
          'İhtiyacını söylemenin bencillik olmadığını hatırla',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Sınırların oldukça sağlıklı',
        body: 'Yanıtların, sağlıklı bir sınır anlayışına işaret ediyor.',
        tips: [
          'Bu dengeyi koru',
          'Gerektiğinde “hayır” demeye devam et',
          'Kendine de alan aç',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Bazı alanlarda zorlanıyorsun',
        body: 'Genelde dengeli olsan da bazı kişi ya da konularda zorlanıyorsun.',
        tips: [
          'En zorlandığın kişi/konuyu fark et',
          'Önceden bir “hayır cümlesi” hazırla',
          'Suçluluk geçicidir, hatırla',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Sınır koymada rahatsın',
        body: 'Yanıtların belirgin bir sınır sorununa işaret etmiyor.',
        tips: ['Dengeyi sürdür', 'İhtiyaçlarını paylaş', 'Esnek ama net ol'],
      },
    },
  },

  {
    id: 'perfectionism',
    group: 'Kendlik',
    icon: 'diamond-outline',
    accent: '#8B89C4',
    title: 'Mükemmeliyetçi miyim?',
    teaser: 'Yüksek standart mı, kendine eziyet mi?',
    intro:
      'Yüksek standartlar iyidir; ama “asla yeterince iyi değil” hissi tüketir. Aradaki farkı görelim.',
    dimensionA: 'Sağlıksız mükemmeliyetçilik',
    dimensionB: 'Sağlıklı yüksek standart',
    questions: [
      {
        id: 'q1',
        text: 'Bir işi “yeterince iyi” bırakabiliyor musun?',
        options: [
          { label: 'Hayır, hep eksik görürüm', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Hata yaptığında?',
        options: [
          { label: 'Uzun süre kendimi yerim', a: 2, b: 0 },
          { label: 'Ders çıkarır geçerim', a: 0, b: 1 },
          { label: 'Arada', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Mükemmel olmayacak diye başlamaktan kaçındığın olur mu?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Başarın seni tatmin ediyor mu?',
        options: [
          { label: 'Asla yeterli gelmiyor', a: 2, b: 0 },
          { label: 'Genelde evet', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'reflect',
        title: 'Mükemmeliyetçilik sana yük oluyor olabilir',
        body: 'Yanıtların, standartlarının seni motive etmekten çok yıprattığına işaret ediyor. “Yeterince iyi” çoğu zaman gerçekten yeterlidir.',
        tips: [
          '“Bitmiş, mükemmelden iyidir” ilkesini dene',
          'Kendine bir “yeterli” eşiği belirle',
          'Hataları öğrenme verisi olarak gör',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Sağlıklı bir standardın var',
        body: 'Yanıtların, dengeli ve sağlıklı bir standart anlayışına işaret ediyor.',
        tips: ['Bu dengeyi koru', 'Emeğini takdir et', 'Molaya izin ver'],
      },
      both: {
        tone: 'reflect',
        title: 'Yüksek standart + bazı sert yanlar',
        body: 'Standartların genelde sağlıklı ama bazı alanlarda kendine fazla yükleniyorsun.',
        tips: [
          'En çok hangi alanda zorladığını fark et',
          'O alanda eşiğini düşür',
          'Sadece sonucu değil, süreci de kutla',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Mükemmeliyetçilik bir sorun değil gibi',
        body: 'Yanıtların belirgin bir mükemmeliyetçilik sorununa işaret etmiyor.',
        tips: ['Dengeli yaklaşımını sürdür', 'Kendine nazik ol', 'Başarılarını fark et'],
      },
    },
  },

  {
    id: 'phone-overuse',
    group: 'Yaşam',
    icon: 'phone-portrait-outline',
    accent: '#6C7BB0',
    title: 'Telefona fazla mı bağlıyım?',
    teaser: 'Sen mi telefonu kullanıyorsun, o mu seni?',
    intro:
      'Telefon hayatı kolaylaştırır ama bazen dikkatimizi ve huzurumuzu çalar. Kullanımının nerede durduğuna bakalım.',
    dimensionA: 'Aşırı kullanım işaretleri',
    dimensionB: 'Normal / işlevsel kullanım',
    questions: [
      {
        id: 'q1',
        text: 'Niyetlenmeden, refleksle telefonu eline alıyor musun?',
        options: [
          { label: 'Çok sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Planladığından çok daha uzun süre kaydığın oluyor mu?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Telefonsuz kaldığında huzursuzluk?',
        options: [
          { label: 'Belirgin', a: 2, b: 0 },
          { label: 'Yok', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Uyku, iş ya da ilişkilerini etkiliyor mu?',
        options: [
          { label: 'Evet', a: 2, b: 0 },
          { label: 'Hayır', a: 0, b: 1 },
          { label: 'Biraz', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'reflect',
        title: 'Telefon dengesi kaymış olabilir',
        body: 'Yanıtların, telefon kullanımının zaman zaman kontrolü ele aldığına işaret ediyor. Küçük sınırlar büyük fark yaratır.',
        tips: [
          'Gereksiz bildirimleri kapat',
          'Yatak odasını telefonsuz bölge yap',
          'Belirli “ekransız” saatler belirle',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Kullanımın dengeli görünüyor',
        body: 'Yanıtların, sağlıklı bir telefon kullanımına işaret ediyor.',
        tips: ['Bu dengeyi koru', 'Ara ara ekran molası ver', 'Uyumadan önce ekranı bırak'],
      },
      both: {
        tone: 'reflect',
        title: 'Bazı alanlarda fazla kaçıyor',
        body: 'Kullanımın genelde dengeli ama bazı zamanlarda fazlalaşıyor.',
        tips: [
          'En çok hangi uygulamada vakit gittiğini fark et',
          'O uygulamaya günlük sınır koy',
          'Sıkıldığında alternatif bir aktivite hazırla',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Telefonla aran sağlıklı',
        body: 'Yanıtların belirgin bir aşırı kullanım sorununa işaret etmiyor.',
        tips: ['Farkındalığını koru', 'Molaları sürdür', 'Gerçek hayatla dengeyi koru'],
      },
    },
  },

  {
    id: 'social-anxiety',
    group: 'Sosyal',
    icon: 'people-circle-outline',
    accent: '#A98BC4',
    title: 'Sosyal ortamlarda neden zorlanıyorum?',
    teaser: 'İçe dönüklük mü, sosyal kaygı mı?',
    intro:
      'Kalabalıkta yorulmak ile kaygı duymak farklı şeylerdir. Hangisine daha yakın olduğuna bakalım.',
    dimensionA: 'Sosyal kaygı işaretleri',
    dimensionB: 'İçe dönüklük / kişisel tercih',
    questions: [
      {
        id: 'q1',
        text: 'Sosyal ortamlarda asıl zorlayan ne?',
        options: [
          { label: 'Yargılanma / rezil olma korkusu', a: 2, b: 0 },
          { label: 'Sadece enerjimi tüketmesi', a: 0, b: 2 },
          { label: 'İkisi de', a: 1, b: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Öncesinde yoğun endişe / “ya kötü olursa” düşüncesi?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Pek yok', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q3',
        text: 'Sosyal ortamlardan kaçınıyor musun?',
        options: [
          { label: 'Evet, çoğunlukla', a: 2, b: 0 },
          { label: 'Hayır, sadece tercih etmiyorum', a: 0, b: 2 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Sonrasında konuşmaları zihninde tekrar tekrar eleştiriyor musun?',
        options: [
          { label: 'Sık', a: 2, b: 0 },
          { label: 'Nadiren', a: 0, b: 1 },
          { label: 'Bazen', a: 1, b: 1 },
        ],
      },
    ],
    results: {
      aDominant: {
        tone: 'warning',
        title: 'Sosyal kaygı belirtileri var gibi',
        body: 'Yanıtların, sosyal ortamlarda yargılanma korkusunun öne çıktığına işaret ediyor. Sosyal kaygı çok yaygın ve tedavi edilebilir.',
        tips: [
          'Küçük, güvenli ortamlarda kademeli pratik yap',
          'Öncesinde bir nefes egzersizi yap',
          'Hayatını belirgin kısıtlıyorsa uzman desteği al',
        ],
      },
      bDominant: {
        tone: 'calm',
        title: 'Daha çok içe dönüklük gibi',
        body: 'Yanıtların, kaygıdan çok kişisel bir tercihe ve enerji yönetimine işaret ediyor. İçe dönük olmak bir sorun değildir.',
        tips: [
          'Sosyal sonrası kendine dinlenme zamanı tanı',
          'Sana uygun küçük ortamları seç',
          'Enerjini neyin doldurduğunu fark et',
        ],
      },
      both: {
        tone: 'reflect',
        title: 'Hem kaygı hem tercih var gibi',
        body: 'Hem sosyal kaygı hem de içe dönük bir tarafın bir arada görünüyor.',
        tips: [
          'Kaçınma mı, tercih mi olduğunu ayır',
          'Kaygı veren ortamlarda kademeli ilerle',
          'Kendine baskı yapma',
        ],
      },
      neither: {
        tone: 'calm',
        title: 'Sosyal hayatın dengeli',
        body: 'Yanıtların belirgin bir sosyal kaygıya işaret etmiyor.',
        tips: ['Sana iyi gelen dozu koru', 'Bağlarını besle', 'Kendine de zaman ayır'],
      },
    },
  },
];

export function getTopic(id: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((t) => t.id === id);
}

/** Cevaplara göre sonucu sentezler */
export function evaluateGuide(
  topic: GuideTopic,
  answers: Record<string, number>
): GuideResult {
  let a = 0;
  let b = 0;
  let maxA = 0;
  let maxB = 0;
  for (const q of topic.questions) {
    const idx = answers[q.id];
    const opt = idx != null ? q.options[idx] : undefined;
    if (opt) {
      a += opt.a;
      b += opt.b;
    }
    maxA += Math.max(...q.options.map((o) => o.a));
    maxB += Math.max(...q.options.map((o) => o.b));
  }
  const aRatio = maxA ? a / maxA : 0;
  const bRatio = maxB ? b / maxB : 0;
  const TH = 0.45;
  const aHigh = aRatio >= TH;
  const bHigh = bRatio >= TH;
  if (aHigh && bHigh) return topic.results.both;
  if (aHigh) return topic.results.aDominant;
  if (bHigh) return topic.results.bDominant;
  return topic.results.neither;
}
