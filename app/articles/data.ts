export type LangText = { en: string; he: string; ar: string };

export type Article = {
  slug: string;
  product: "B-YNG" | "X-GRN" | "INDIGO";
  productId: string;
  readTime: number;
  gradient: string;
  accentColor: string;
  image: string;
  heroImage: string;
  title: LangText;
  excerpt: LangText;
  intro: LangText;
  benefits: { title: LangText; text: LangText }[];
  howTo: LangText[];
  tags: string[];
};

export const articles: Article[] = [
  {
    slug: "fish-collagen",
    product: "B-YNG",
    productId: "1",
    readTime: 5,
    gradient: "from-red-900/70 via-orange-800/50 to-transparent",
    accentColor: "#e07040",
    image: "https://admin.bhipone.com/assets/uploads/articles/fish-collagen.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/fish-collagen-hero-02.jpg",
    title: {
      en: "Fish Collagen: The Beauty Secret from the Sea",
      he: "קולגן דגים: סוד היופי מהים",
      ar: "كولاجين السمك: سر الجمال من البحر",
    },
    excerpt: {
      en: "Discover how Fish Collagen Peptide supports youthful skin, stronger nails, and joint health — straight from the ocean to your daily routine.",
      he: "גלו כיצד פפטיד קולגן דגים תומך בעור צעיר, ציפורניים חזקות ובריאות המפרקים — ישירות מהאוקיינוס לשגרת היומיום שלכם.",
      ar: "اكتشف كيف يدعم ببتيد كولاجين السمك بشرة شابة وأظافر أقوى وصحة المفاصل — مباشرة من المحيط إلى روتينك اليومي.",
    },
    intro: {
      en: "In the realm of skincare and health supplements, the quest for natural and effective ingredients is a constant journey. One such remarkable discovery is Fish Collagen Peptide — a powerful supplement derived from fish collagen. Rich in key amino acids like proline, glycine, and hydroxyproline, it is gaining popularity for its potential to promote youthful skin, joint health, and overall well-being. B-YNG harnesses this marine powerhouse in every sachet.",
      he: "בעולם מוצרי הטיפוח והתוספי הבריאות, החיפוש אחר מרכיבים טבעיים ויעילים הוא מסע מתמשך. אחת התגליות המרשימות היא פפטיד קולגן דגים — תוסף רב עוצמה המופק מקולגן דגים. עשיר בחומצות אמינו מפתח כמו פרולין, גליצין והידרוקסיפרולין, הוא צובר פופולריות בזכות יכולתו לקדם עור צעיר, בריאות מפרקים ורווחה כללית. B-YNG מרתום את כוחו של הים הזה בכל שקית.",
      ar: "في عالم منتجات العناية بالبشرة والمكملات الصحية، يُعدّ البحث عن المكونات الطبيعية الفعّالة رحلةً لا تنتهي. ومن أبرز هذه الاكتشافات ببتيد كولاجين السمك — مكمل قوي مستخلص من كولاجين الأسماك. غني بالأحماض الأمينية الأساسية كالبرولين والغلايسين والهيدروكسيبرولين، يكتسب شهرةً واسعةً لقدرته على تعزيز نضارة البشرة وصحة المفاصل والعافية العامة. تُحضر B-YNG هذه القوة البحرية في كل كيس.",
    },
    benefits: [
      {
        title: { en: "Skin Rejuvenation", he: "התחדשות העור", ar: "تجديد البشرة" },
        text: {
          en: "Fish Collagen Peptide is rich in amino acids that play a crucial role in collagen synthesis. Regular supplementation may help improve skin elasticity, reduce fine lines, and promote a smoother complexion — contributing to a more youthful appearance.",
          he: "פפטיד קולגן דגים עשיר בחומצות אמינו הממלאות תפקיד מכריע בסינתזת הקולגן. נטילה קבועה עשויה לסייע בשיפור גמישות העור, להפחית קמטים עדינים ולקדם מראה חלק ורענן יותר.",
          ar: "يحتوي ببتيد كولاجين السمك على أحماض أمينية تؤدي دوراً محورياً في تخليق الكولاجين. قد تُساعد المكملة المنتظمة في تحسين مرونة البشرة والحد من الخطوط الدقيقة وتعزيز نعومة البشرة ومظهرها الشبابي.",
        },
      },
      {
        title: { en: "Joint Health", he: "בריאות המפרקים", ar: "صحة المفاصل" },
        text: {
          en: "Collagen is a key component of cartilage, the tissue that cushions joints. Fish Collagen Peptide may support joint health by promoting the regeneration of cartilage and reducing joint discomfort over time.",
          he: "קולגן הוא מרכיב מפתח בסחוס, הרקמה שמרפדת את המפרקים. פפטיד קולגן דגים עשוי לתמוך בבריאות המפרקים על ידי קידום התחדשות הסחוס והפחתת אי הנוחות במפרקים לאורך זמן.",
          ar: "الكولاجين مكوّن رئيسي في الغضروف، النسيج الذي يُحيط بالمفاصل. قد يدعم ببتيد كولاجين السمك صحة المفاصل بتعزيز تجديد الغضروف والحد من آلام المفاصل على المدى البعيد.",
        },
      },
      {
        title: { en: "Antioxidant Protection", he: "הגנה נוגדת חמצון", ar: "حماية مضادة للأكسدة" },
        text: {
          en: "Fish Collagen Peptide contains peptides with antioxidant properties, helping to combat oxidative stress and protect the skin from damage caused by free radicals — a key factor in premature aging.",
          he: "פפטיד קולגן דגים מכיל פפטידים בעלי תכונות נוגדות חמצון, המסייעות במאבק בעקה חמצונית ובהגנה על העור מנזק הנגרם מרדיקלים חופשיים — גורם מפתח בהזדקנות מוקדמת.",
          ar: "يحتوي ببتيד كولاجين السمك على ببتيدات بخصائص مضادة للأكسدة، تُساعد في مكافحة الإجهاد التأكسدي وحماية البشرة من الأضرار الناجمة عن الجذور الحرة — وهو عامل رئيسي في الشيخوخة المبكرة.",
        },
      },
      {
        title: { en: "Hair & Nail Strength", he: "חוזק שיער וציפורניים", ar: "قوة الشعر والأظافر" },
        text: {
          en: "Collagen provides the structural proteins that hair and nails need to grow strong and resilient. Consistent intake supports thickness and reduces brittleness in both.",
          he: "הקולגן מספק את החלבונים המבניים שהשיער והציפורניים זקוקים להם כדי לגדול חזקים ועמידים. נטילה עקבית תומכת בעובי ומפחיתה שבירות בשניהם.",
          ar: "يوفر الكولاجين البروتينات البنيوية التي يحتاجها الشعر والأظافر لينموا بشكل قوي ومتين. تدعم المكملة المستمرة السماكة وتقلل من الهشاشة في كليهما.",
        },
      },
    ],
    howTo: [
      { en: "Mix one sachet of B-YNG (8g) with 300ml of water and consume once daily for best results.", he: "ערבבו שקית B-YNG אחת (8 גרם) עם 300 מ״ל מים ושתו פעם ביום לתוצאות מיטביות.", ar: "اخلط كيساً واحداً من B-YNG (8 غرام) مع 300 مل من الماء وتناوله مرة يومياً للحصول على أفضل النتائج." },
      { en: "For an extra beauty boost, add B-YNG to your morning smoothie alongside berries and yogurt.", he: "לתוספת יופי, הוסיפו B-YNG לשייק הבוקר שלכם עם פירות יער ויוגורט.", ar: "لتعزيز الجمال، أضف B-YNG إلى عصير الصباح مع التوت والزبادي." },
      { en: "Consistency is key — collagen benefits build up over weeks, so make it part of your daily ritual.", he: "עקביות היא המפתח — יתרונות הקולגן מצטברים לאורך שבועות, אז הפכו אותו לחלק מהטקס היומי שלכם.", ar: "الاستمرارية هي المفتاح — تتراكم فوائد الكولاجين على مدى أسابيع، لذا اجعله جزءاً من روتينك اليومي." },
    ],
    tags: ["Collagen", "Skin", "Beauty", "Anti-aging", "B-YNG"],
  },
  {
    slug: "d-biotin",
    product: "B-YNG",
    productId: "1",
    readTime: 4,
    gradient: "from-rose-900/70 via-pink-800/40 to-transparent",
    accentColor: "#c0516a",
    image: "https://admin.bhipone.com/assets/uploads/articles/d-biotin-100.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/d-biotin-100.jpg",
    title: {
      en: "D-Biotin: The Vitamin Your Hair & Nails Have Been Waiting For",
      he: "D-ביוטין: הוויטמין שהשיער והציפורניים שלכם חיכו לו",
      ar: "D-بيوتين: الفيتامين الذي ينتظره شعرك وأظافرك",
    },
    excerpt: {
      en: "Known as Vitamin H or B7, D-Biotin is essential for hair growth, nail strength, and healthy skin — and it is a core ingredient in B-YNG.",
      he: "המכונה ויטמין H או B7, D-ביוטין חיוני לצמיחת שיער, חוזק ציפורניים ועור בריא — והוא מרכיב מרכזי ב-B-YNG.",
      ar: "المعروف بفيتامين H أو B7، يُعدّ D-بيوتين ضرورياً لنمو الشعر وتقوية الأظافر والحفاظ على بشرة صحية — وهو مكوّن أساسي في B-YNG.",
    },
    intro: {
      en: "D-Biotin, also known as Vitamin H or Vitamin B7, is a water-soluble B-vitamin that plays a crucial role in various physiological processes. It is often referred to as the beauty vitamin for its remarkable ability to strengthen hair, nails, and support radiant skin. B-YNG contains D-Biotin at 100% of the recommended daily intake, making it a cornerstone of the formula.",
      he: "D-ביוטין, המכונה גם ויטמין H או ויטמין B7, הוא ויטמין B מסיס במים הממלא תפקיד מכריע בתהליכים פיזיולוגיים רבים. הוא נקרא לעתים קרובות ויטמין היופי בזכות יכולתו המרשימה לחזק שיער וציפורניים ולתמוך בעור קורן. B-YNG מכיל D-ביוטין ב-100% מהצריכה היומית המומלצת, מה שהופך אותו לאבן יסוד בפורמולה.",
      ar: "D-بيوتين، المعروف أيضاً بفيتامين H أو فيتامين B7، هو فيتامين B قابل للذوبان في الماء يؤدي دوراً حيوياً في العمليات الفيزيولوجية المتعددة. يُسمى في أحيان كثيرة فيتامين الجمال لقدرته المذهلة على تقوية الشعر والأظافر ودعم البشرة المشرقة. تحتوي B-YNG على D-بيوتين بنسبة 100% من الاحتياج اليومي الموصى به، مما يجعله حجر الأساس في الفورمولا.",
    },
    benefits: [
      {
        title: { en: "Stronger, Thicker Hair", he: "שיער חזק ועבה יותר", ar: "شعر أقوى وأكثف" },
        text: {
          en: "Biotin is essential for keratin production — the structural protein that makes up hair. Adequate biotin levels are linked to reduced hair loss and improved hair density and texture.",
          he: "ביוטין חיוני לייצור קרטין — החלבון המבני המרכיב את השיער. רמות ביוטין מספיקות קשורות לירידה בנשירת שיער ולשיפור צפיפותו ומרקמו.",
          ar: "البيوتين ضروري لإنتاج الكيراتين — البروتين البنيوي الذي يُشكّل الشعر. ترتبط مستويات البيوتين الكافية بانخفاض تساقط الشعر وتحسين كثافته وملمسه.",
        },
      },
      {
        title: { en: "Nail Resilience", he: "חוסן ציפורניים", ar: "مقاومة الأظافر" },
        text: {
          en: "Clinical studies have shown that biotin supplementation can significantly increase nail plate thickness and reduce nail splitting and breakage in people with brittle nails.",
          he: "מחקרים קליניים הראו כי תוסף ביוטין יכול להגביר משמעותית את עובי לוחית הציפורן ולהפחית פיצולים ושבירות אצל אנשים עם ציפורניים שבריריות.",
          ar: "أثبتت الدراسات السريرية أن مكملات البيوتين يمكن أن تزيد بشكل ملحوظ من سماكة صفيحة الظفر وتقلل من تقصفها وانكسارها لدى ذوي الأظافر الهشة.",
        },
      },
      {
        title: { en: "Healthy Skin", he: "עור בריא", ar: "بشرة صحية" },
        text: {
          en: "Biotin supports the metabolism of fatty acids that are essential for maintaining healthy skin. Deficiency often manifests as dry or irritated skin — supplementation helps restore balance.",
          he: "ביוטין תומך בחילוף החומרים של חומצות שומן החיוניות לשמירה על עור בריא. מחסור מתבטא לרוב בעור יבש או מגורה — תוסף מסייע להחזיר את האיזון.",
          ar: "يدعم البيوتين استقلاب الأحماض الدهنية الضرورية للحفاظ على بشرة صحية. كثيراً ما يتجلى النقص في جفاف البشرة أو تهيجها — والمكملة تساعد في استعادة التوازن.",
        },
      },
      {
        title: { en: "Energy Metabolism", he: "חילוף חומרים ואנרגיה", ar: "التمثيل الغذائي والطاقة" },
        text: {
          en: "Beyond beauty, biotin plays a key role in converting carbohydrates, fats, and proteins into usable energy — keeping you fueled and focused throughout the day.",
          he: "מעבר ליופי, ביוטין ממלא תפקיד מפתח בהמרת פחמימות, שומנים וחלבונים לאנרגיה שמישה — ומשאיר אתכם ממוקדים ומלאי אנרגיה לאורך כל היום.",
          ar: "بعيداً عن الجمال، يؤدي البيوتين دوراً رئيسياً في تحويل الكربوهيدرات والدهون والبروتينات إلى طاقة قابلة للاستخدام — مما يجعلك نشيطاً ومركّزاً طوال اليوم.",
        },
      },
    ],
    howTo: [
      { en: "B-YNG delivers your daily D-Biotin alongside collagen and Vitamin C — one sachet covers all three.", he: "B-YNG מספק את ה-D-ביוטין היומי שלכם יחד עם קולגן וויטמין C — שקית אחת מכסה את שלושתם.", ar: "تُقدّم B-YNG جرعتك اليومية من D-بيوتين مع الكولاجين وفيتامين C — كيس واحد يغطي الثلاثة." },
      { en: "Take consistently every morning; biotin benefits for hair and nails typically become visible after 8-12 weeks.", he: "קחו עקבית כל בוקר; יתרונות הביוטין לשיער וציפורניים נעשים גלויים בדרך כלל לאחר 8-12 שבועות.", ar: "تناوله بانتظام كل صباح؛ تظهر فوائد البيوتين للشعر والأظافر عادةً بعد 8-12 أسبوعاً." },
      { en: "Pair with a zinc-rich diet (nuts, seeds, legumes) to amplify hair and nail benefits.", he: "שלבו עם תזונה עשירה באבץ (אגוזים, זרעים, קטניות) להגברת יתרונות השיער והציפורניים.", ar: "اقرنه بنظام غذائي غني بالزنك (مكسرات، بذور، بقوليات) لتعزيز فوائد الشعر والأظافر." },
    ],
    tags: ["Biotin", "Hair", "Nails", "B-Vitamins", "B-YNG"],
  },
  {
    slug: "spirulina-powder",
    product: "X-GRN",
    productId: "2",
    readTime: 6,
    gradient: "from-emerald-900/70 via-green-800/50 to-transparent",
    accentColor: "#22c55e",
    image: "https://admin.bhipone.com/assets/uploads/articles/spirulina-powder.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/spirulina-hero.jpg",
    title: {
      en: "Spirulina: The Green Superfood That Changes Everything",
      he: "ספירולינה: הסופרפוד הירוק שמשנה הכל",
      ar: "سبيرولينا: الغذاء الخارق الأخضر الذي يغير كل شيء",
    },
    excerpt: {
      en: "Packed with protein, vitamins, and powerful antioxidants, Spirulina is one of the most nutrient-dense foods on earth — and it is the heart of X-GRN.",
      he: "עמוסה בחלבון, ויטמינים ונוגדי חמצון חזקים, ספירולינה היא אחת המזונות הצפופים ביותר בחומרי תזונה על פני כדור הארץ — וליבה של X-GRN.",
      ar: "مليئة بالبروتين والفيتامينات ومضادات الأكسدة القوية، تُعدّ السبيرولينا من أكثر الأطعمة كثافةً بالمغذيات على وجه الأرض — وهي قلب X-GRN.",
    },
    intro: {
      en: "In the world of nutrition and wellness, one superfood stands above the rest: Spirulina. Derived from the microscopic blue-green algae Arthrospira platensis, Spirulina has a rich history of use dating back centuries across different cultures. Today, its modern popularity is driven by its exceptional nutritional profile and impressive health benefits. X-GRN puts this ancient superfood front and center in its clean, daily greens blend.",
      he: "בעולם התזונה והבריאות, אחד הסופרפודים הבולטים ביותר הוא: ספירולינה. המופקת מאצות כחוליות זעירות בשם Arthrospira platensis, לספירולינה היסטוריה עשירה של שימוש שמשתרעת על פני מאות שנים בתרבויות שונות. כיום, הפופולריות המודרנית שלה נובעת מפרופיל התזונה יוצא הדופן ומהיתרונות הבריאותיים המרשימים שלה. X-GRN מציב את הסופרפוד הקדום הזה בחזית התמהיל היומי הנקי שלו.",
      ar: "في عالم التغذية والعافية، يبرز غذاء خارق واحد على الجميع: السبيرولينا. مستخلصة من طحالب زرقاء-خضراء مجهرية تُعرف بـ Arthrospira platensis، تتمتع بتاريخ طويل من الاستخدام عبر قرون في ثقافات مختلفة. تعود شهرتها الحديثة إلى تركيبها الغذائي الاستثنائي وفوائدها الصحية المذهلة. تضع X-GRN هذا الغذاء الخارق العتيق في صدارة مزيجها اليومي النظيف.",
    },
    benefits: [
      {
        title: { en: "Nutritional Powerhouse", he: "מקור תזונה עצמתי", ar: "مصدر غذائي قوي" },
        text: {
          en: "Spirulina is a complete protein source containing all essential amino acids, making it ideal for vegetarians and vegans. It is also packed with vitamin B12, iron, calcium, magnesium, and chlorophyll.",
          he: "ספירולינה היא מקור חלבון מלא המכיל את כל חומצות האמינו החיוניות, מה שהופך אותה לאידיאלית לצמחוניים וטבעוניים. היא גם עשירה בוויטמין B12, ברזל, סידן, מגנזיום וכלורופיל.",
          ar: "السبيرولينا مصدر بروتين متكامل يحتوي على جميع الأحماض الأمينية الأساسية، مما يجعلها مثالية للنباتيين والبيتاريين. كما أنها غنية بفيتامين B12 والحديد والكالسيوم والمغنيسيوم والكلوروفيل.",
        },
      },
      {
        title: { en: "Antioxidant & Anti-Inflammatory", he: "נוגד חמצון ואנטי-דלקתי", ar: "مضاد للأكسدة ومضاد للالتهابات" },
        text: {
          en: "Spirulina is rich in phycocyanin and beta-carotene, antioxidants that combat oxidative stress and inflammation. These properties contribute to reduced risk of chronic disease and support long-term health.",
          he: "ספירולינה עשירה בפיקוציאנין ובטא-קרוטן, נוגדי חמצון הנלחמים בעקה חמצונית ודלקת. תכונות אלו תורמות להפחתת הסיכון למחלות כרוניות ולתמיכה בבריאות לטווח ארוך.",
          ar: "تحتوي السبيرولينا على الفيكوسيانين والبيتا كاروتين، مضادات أكسدة تكافح الإجهاد التأكسدي والالتهاب. تُساهم هذه الخصائص في تقليل خطر الأمراض المزمنة ودعم الصحة على المدى البعيد.",
        },
      },
      {
        title: { en: "Immune System Support", he: "תמיכה במערכת החיסון", ar: "دعم الجهاز المناعي" },
        text: {
          en: "Its high concentration of vitamins, minerals, and antioxidants makes Spirulina a powerful immune booster — helping the body defend itself more effectively against infections and environmental stressors.",
          he: "ריכוז הויטמינים, המינרלים ונוגדי החמצון הגבוה הופך את הספירולינה לממריץ חיסוני חזק — מסייע לגוף להתגונן ביעילות רבה יותר מפני זיהומים ולחצים סביבתיים.",
          ar: "يجعل تركيز الفيتامينات والمعادن ومضادات الأكسدة المرتفع من السبيرولينا مُعزّزاً قوياً للمناعة — يُساعد الجسم على الدفاع عن نفسه بفعالية أكبر ضد الالتهابات والضغوط البيئية.",
        },
      },
      {
        title: { en: "Natural Detox & Gut Health", he: "ניקוי טבעי ובריאות המעי", ar: "تطهير طبيعي وصحة الأمعاء" },
        text: {
          en: "Chlorophyll-rich Spirulina helps cleanse the digestive tract, promotes the growth of beneficial gut bacteria, and supports the body natural detoxification processes.",
          he: "ספירולינה עשירה בכלורופיל מסייעת בניקוי מערכת העיכול, מקדמת צמיחת חיידקי מעי מועילים ותומכת בתהליכי הניקוי הטבעיים של הגוף.",
          ar: "تُساعد السبيرولينا الغنية بالكلوروفيل في تنظيف الجهاز الهضمي وتعزيز نمو بكتيريا الأمعاء النافعة ودعم عمليات التطهير الطبيعية في الجسم.",
        },
      },
    ],
    howTo: [
      { en: "Mix one sachet of X-GRN (8g) with 300ml cold water and drink in the morning — best on an empty stomach.", he: "ערבבו שקית X-GRN אחת (8 גרם) עם 300 מ״ל מים קרים ושתו בבוקר — עדיף על קיבה ריקה.", ar: "اخلط كيساً واحداً من X-GRN (8 غرام) مع 300 مل من الماء البارد واشربه في الصباح — يُفضَّل على معدة فارغة." },
      { en: "Add X-GRN to a green smoothie with banana, cucumber, and coconut water for a refreshing energy boost.", he: "הוסיפו X-GRN לשייק ירוק עם בננה, מלפפון ומים קוקוס לדחיפת אנרגיה מרעננת.", ar: "أضف X-GRN إلى عصير أخضر مع الموز والخيار وماء جوز الهند لدفعة طاقة منعشة." },
      { en: "Spirulina has a distinct earthy taste — X-GRN balanced formula makes for a smooth introduction.", he: "לספירולינה טעם אדמתי ייחודי — הפורמולה המאוזנת של X-GRN מאפשרת היכרות חלקה.", ar: "للسبيرولينا طعم ترابي مميز — تجعل فورمولا X-GRN المتوازنة التعرف عليها سلساً." },
    ],
    tags: ["Spirulina", "Superfoods", "Detox", "Immunity", "X-GRN"],
  },
  {
    slug: "matcha-green-tea",
    product: "X-GRN",
    productId: "2",
    readTime: 4,
    gradient: "from-teal-900/70 via-emerald-800/40 to-transparent",
    accentColor: "#14b8a6",
    image: "https://admin.bhipone.com/assets/uploads/articles/matcha-tea.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/matcha-tea-hero.jpg",
    title: {
      en: "Matcha & Green Tea: Ancient Energy for the Modern World",
      he: "מאצ'ה ותה ירוק: אנרגיה עתיקה לעולם המודרני",
      ar: "الماتشا والشاي الأخضر: طاقة قديمة لعالم حديث",
    },
    excerpt: {
      en: "Two of the world most celebrated teas come together in X-GRN for clean, sustained energy without the crash.",
      he: "שניים מהתיאים המפורסמים ביותר בעולם מתאחדים ב-X-GRN לאנרגיה נקייה ומתמשכת ללא נפילה.",
      ar: "يجتمع اثنان من أشهر الشايات في العالم في X-GRN لتقديم طاقة نظيفة ومستدامة دون انهيار.",
    },
    intro: {
      en: "Steeped in Japanese tradition and celebrated for centuries, Matcha and Green Tea are two of the most researched and revered botanicals in the world. Unlike coffee, they provide energy through a unique combination of caffeine and L-theanine — an amino acid that promotes calm focus without jitters or crashes. X-GRN blends both into its formula to deliver sustained, clean energy as part of your daily wellness ritual.",
      he: "ספוגה במסורת יפנית ומפורסמת מאות שנים, מאצ'ה ותה ירוק הם שניים מהצמחים הנחקרים והמוערכים ביותר בעולם. בניגוד לקפה, הם מספקים אנרגיה דרך שילוב ייחודי של קפאין ו-L-תיאנין — חומצת אמינו המקדמת ריכוז רגוע ללא עצבנות או נפילות. X-GRN משלב את שניהם בפורמולה שלו לאנרגיה נקייה ומתמשכת כחלק מהטקס הבריאותי היומי שלכם.",
      ar: "مغموسة في التقاليد اليابانية ومُحتفى بها منذ قرون، تُعدّ الماتشا والشاي الأخضر من أكثر النباتات الطبية بحثاً وتقديراً في العالم. بخلاف القهوة، يوفران طاقةً من خلال مزيج فريد من الكافيين واللثيانين — حمض أميني يُعزز التركيز الهادئ دون توتر أو انهيار. تجمع X-GRN بينهما في فورمولتها لتقديم طاقة نظيفة ومستدامة كجزء من طقوسك الصحية اليومية.",
    },
    benefits: [
      {
        title: { en: "Clean, Sustained Energy", he: "אנרגיה נקייה ומתמשכת", ar: "طاقة نظيفة ومستدامة" },
        text: {
          en: "The unique combination of natural caffeine and L-theanine in Matcha creates a state of calm alertness — energized but not wired. This is why Matcha energy feels smoother and lasts longer than coffee.",
          he: "השילוב הייחודי של קפאין טבעי ו-L-תיאנין במאצ'ה יוצר מצב של ערנות רגועה — מאנרגטי אבל לא מתוח. זה הסיבה שאנרגיית המאצ'ה מרגישה חלקה יותר ומחזיקה זמן ארוך יותר מקפה.",
          ar: "يخلق المزيج الفريد من الكافيين الطبيعي واللثيانين في الماتشا حالةً من اليقظة الهادئة — نشيط لكن غير متوتر. لهذا السبب تبدو طاقة الماتشا أكثر سلاسةً وتدوم أطول من القهوة.",
        },
      },
      {
        title: { en: "Rich in Antioxidants (EGCG)", he: "עשיר בנוגדי חמצון (EGCG)", ar: "غني بمضادات الأكسدة (EGCG)" },
        text: {
          en: "Green Tea is one of the richest dietary sources of EGCG, a catechin linked to reduced inflammation, improved heart health, and potential cancer-protective properties.",
          he: "תה ירוק הוא אחד ממקורות התזונה העשירים ביותר ב-EGCG, קטכין הקשור להפחתת דלקות, שיפור בריאות הלב ותכונות פוטנציאליות נגד סרטן.",
          ar: "الشاي الأخضر أحد أغنى المصادر الغذائية بـ EGCG، وهو كاتشين مرتبط بتقليل الالتهابات وتحسين صحة القلب وخصائص وقائية محتملة ضد السرطان.",
        },
      },
      {
        title: { en: "Metabolic Support", he: "תמיכה מטבולית", ar: "دعم التمثيل الغذائي" },
        text: {
          en: "Both Matcha and Green Tea have been shown to support fat oxidation and improve metabolic rate — making them a popular choice in weight management protocols.",
          he: "הוכח כי הן מאצ'ה והן תה ירוק תומכים בחמצון שומנים ושיפור קצב חילוף החומרים — מה שהופך אותם לבחירה פופולרית בפרוטוקולי ניהול משקל.",
          ar: "ثبت أن الماتشا والشاي الأخضر يدعمان أكسدة الدهون ويحسّنان معدل الأيض — مما يجعلهما خياراً شائعاً في بروتوكولات إدارة الوزن.",
        },
      },
      {
        title: { en: "Brain & Mood", he: "מוח ומצב רוח", ar: "الدماغ والمزاج" },
        text: {
          en: "L-theanine promotes the production of alpha brain waves associated with a relaxed yet alert mental state — improving focus, memory, and mood without sedation.",
          he: "L-תיאנין מקדם ייצור גלי מוח אלפא הקשורים לכוננות מנטלית רגועה אך ערנית — משפר ריכוז, זיכרון ומצב רוח ללא הרדמה.",
          ar: "يُعزز اللثيانين إنتاج موجات ألفا الدماغية المرتبطة بحالة ذهنية هادئة ومتيقظة — مما يُحسّن التركيز والذاكرة والمزاج دون إحداث نعاس.",
        },
      },
    ],
    howTo: [
      { en: "X-GRN makes it easy — one sachet delivers Matcha, Green Tea, and Spirulina all in one clean blend.", he: "X-GRN מקל על זה — שקית אחת מספקת מאצ'ה, תה ירוק וספירולינה בתמהיל נקי אחד.", ar: "X-GRN يجعل الأمر سهلاً — كيس واحد يقدم الماتشا والشاي الأخضر والسبيرولينا في مزيج نظيف واحد." },
      { en: "Best enjoyed in the morning or early afternoon; avoid in the evening due to natural caffeine content.", he: "עדיף לשתות בבוקר או מוקדם בצהריים; הימנעו בערב עקב תכולת קפאין טבעית.", ar: "يُفضَّل تناوله في الصباح أو أوائل فترة بعد الظهر؛ تجنّبه مساءً بسبب محتوى الكافيين الطبيعي." },
      { en: "Chill with ice and a squeeze of lemon for a refreshing afternoon pick-me-up.", he: "קררו עם קרח ומעט לימון לטעם מרענן בשעות אחר הצהריים.", ar: "برّده مع الثلج وعصير الليمون لمشروب منعش في فترة ما بعد الظهر." },
    ],
    tags: ["Matcha", "Green Tea", "Energy", "Focus", "X-GRN"],
  },
  {
    slug: "acai-berries",
    product: "INDIGO",
    productId: "3",
    readTime: 5,
    gradient: "from-indigo-900/70 via-violet-800/50 to-transparent",
    accentColor: "#8b5cf6",
    image: "https://admin.bhipone.com/assets/uploads/articles/acai-berries-01.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/acai-berries-hero.jpg",
    title: {
      en: "Acai Berries: The Antioxidant Powerhouse from the Amazon",
      he: "פירות אסאי: מחזק נוגדי החמצון מהאמזונס",
      ar: "توت الأساي: قوة مضادات الأكسدة من الأمازون",
    },
    excerpt: {
      en: "Native to the Amazon rainforest, Acai berries are one of the world most antioxidant-rich superfoods — a key ingredient powering INDIGO.",
      he: "ילידי יערות הגשם האמזוניים, פירות האסאי הם אחד הסופרפודים העשירים ביותר בנוגדי חמצון בעולם — מרכיב מפתח המניע את INDIGO.",
      ar: "توت الأساي، ابن غابات الأمازون المطيرة، يُعدّ من أغنى الأطعمة الخارقة بمضادات الأكسدة في العالم — وهو مكوّن رئيسي يُشغّل INDIGO.",
    },
    intro: {
      en: "In recent years, there has been a growing interest in superfoods and their potential health benefits. Among these, the Acai berry has gained considerable attention for its rich nutritional profile and exceptional antioxidant properties. Native to the Amazon rainforest in Brazil and a staple in indigenous diets for centuries, Acai is now widely celebrated for its health-promoting effects. INDIGO taps into this ancient superfruit to deliver clean, powerful energy.",
      he: "בשנים האחרונות גבר העניין בסופרפודים ויתרונותיהם הבריאותיים הפוטנציאליים. בין אלה, פירות האסאי זכו לתשומת לב ניכרת בזכות פרופיל התזונה העשיר ותכונות נוגדות החמצון היוצאות מהכלל שלהם. ילידים ליערות הגשם האמזוניים בברזיל ומזון עיקרי בתזונת העמים הילידיים במשך מאות שנים, פירות האסאי מפורסמים כיום בעולם כולו בזכות השפעותיהם המקדמות את הבריאות. INDIGO מנצל את הפרי העתיק הזה לאספקת אנרגיה נקייה וחזקה.",
      ar: "في السنوات الأخيرة، تنامى الاهتمام بالأطعمة الخارقة وفوائدها الصحية المحتملة. ومن أبرزها، توت الأساي الذي استقطب اهتماماً واسعاً بفضل تركيبته الغذائية الغنية وخصائصه الاستثنائية المضادة للأكسدة. وهو ابن غابات الأمازون المطيرة في البرازيل وغذاء أساسي في تقاليد السكان الأصليين لقرون، يُحتفى به اليوم عالمياً لتأثيراته في تعزيز الصحة. تستغل INDIGO هذه الفاكهة العتيقة لتقديم طاقة نظيفة وقوية.",
    },
    benefits: [
      {
        title: { en: "Rich in Antioxidants", he: "עשיר בנוגדי חמצון", ar: "غني بمضادات الأكسدة" },
        text: {
          en: "Acai berries are packed with anthocyanins, flavonoids, and polyphenols. These compounds neutralize harmful free radicals, reduce oxidative stress and inflammation, and may lower the risk of chronic diseases.",
          he: "פירות האסאי עמוסים אנתוציאנינים, פלבונואידים ופוליפנולים. תרכובות אלו מנטרלות רדיקלים חופשיים מזיקים, מפחיתות עקה חמצונית ודלקת, ועשויות להוריד את הסיכון למחלות כרוניות.",
          ar: "توت الأساي محمّل بالأنثوسيانين والفلافونويد والبوليفينول. تُعادل هذه المركبات الجذور الحرة الضارة وتقلل الإجهاد التأكسدي والالتهابات، وقد تُخفّض خطر الأمراض المزمنة.",
        },
      },
      {
        title: { en: "Heart Health", he: "בריאות הלב", ar: "صحة القلب" },
        text: {
          en: "Acai berries contain omega-3, -6, and -9 fatty acids alongside plant sterols that help reduce LDL cholesterol, improve blood circulation, and lower blood pressure.",
          he: "פירות האסאי מכילים חומצות שומן אומגה 3, 6 ו-9 לצד פיטוסטרולים המסייעים בהפחתת כולסטרול LDL, שיפור זרימת הדם והורדת לחץ הדם.",
          ar: "يحتوي توت الأساي على أحماض أوميغا 3 و6 و9 الدهنية إلى جانب فيتوسترولات تُساعد في تقليل الكوليسترول الضار (LDL) وتحسين الدورة الدموية وخفض ضغط الدم.",
        },
      },
      {
        title: { en: "Improved Digestive Health", he: "שיפור בריאות מערכת העיכול", ar: "تحسين صحة الجهاز الهضمي" },
        text: {
          en: "As a good source of dietary fiber, Acai promotes regular bowel movements, supports beneficial gut bacteria, and helps prevent digestive disorders.",
          he: "כמקור טוב לסיבים תזונתיים, האסאי מקדם תנועתיות מעי סדירה, תומך בחיידקים מועילים במעי ומסייע במניעת הפרעות עיכול.",
          ar: "بوصفه مصدراً جيداً للألياف الغذائية، يُعزز الأساي انتظام حركة الأمعاء ويدعم بكتيريا الأمعاء النافعة ويُساعد في الوقاية من اضطرابات الجهاز الهضمي.",
        },
      },
      {
        title: { en: "Energy & Vitality", he: "אנרגיה וחיוניות", ar: "الطاقة والحيوية" },
        text: {
          en: "Acai natural nutrients support sustained physical energy and mental clarity, making it a go-to ingredient for athletes and those with demanding daily schedules.",
          he: "חומרי התזונה הטבעיים של האסאי תומכים בחיוניות פיזית ובהירות מנטלית מתמשכות, מה שהופך אותו למרכיב מבוקש לספורטאים ולאנשים עם לוח זמנים יומי דחוס.",
          ar: "تدعم المغذيات الطبيعية في الأساي الحيوية الجسدية المستدامة والوضوح الذهني، مما يجعله مكوناً مفضلاً للرياضيين ومن لديهم جدول يومي مزدحم.",
        },
      },
    ],
    howTo: [
      { en: "Mix one INDIGO sachet (8g) with 300ml of cold water for a clean, sugar-free energy boost.", he: "ערבבו שקית INDIGO אחת (8 גרם) עם 300 מ״ל מים קרים לדחיפת אנרגיה נקייה ללא סוכר.", ar: "اخلط كيساً واحداً من INDIGO (8 غرام) مع 300 مل من الماء البارد لدفعة طاقة نظيفة خالية من السكر." },
      { en: "Try blending INDIGO with frozen banana and almond milk for an antioxidant-packed smoothie.", he: "נסו לערבב INDIGO עם בננה קפואה וחלב שקדים לשייק עמוס נוגדי חמצון.", ar: "جرّب خلط INDIGO مع الموز المجمد وحليب اللوز للحصول على عصير غني بمضادات الأكسدة." },
      { en: "Take it 30 minutes before a workout or in the morning when you need sustained focus.", he: "קחו 30 דקות לפני אימון או בבוקר כשאתם זקוקים לריכוז מתמשך.", ar: "تناوله قبل 30 دقيقة من التمرين أو في الصباح عندما تحتاج إلى تركيز مستدام." },
    ],
    tags: ["Acai", "Antioxidants", "Energy", "Heart Health", "INDIGO"],
  },
  {
    slug: "maca-root",
    product: "INDIGO",
    productId: "3",
    readTime: 5,
    gradient: "from-purple-900/70 via-indigo-800/40 to-transparent",
    accentColor: "#a855f7",
    image: "https://admin.bhipone.com/assets/uploads/articles/maca-root-extract-lepidium-meyenii.jpg",
    heroImage: "https://admin.bhipone.com/assets/uploads/articles/maca-root-extract-lepidium-meyenii-hero.jpg",
    title: {
      en: "Maca Root: The Ancient Adaptogen for Modern Energy",
      he: "שורש מאקה: האדפטוגן העתיק לאנרגיה מודרנית",
      ar: "جذر الماكا: المُكيِّف القديم للطاقة الحديثة",
    },
    excerpt: {
      en: "Cultivated in the Andes for centuries, Maca Root is a powerful adaptogen that enhances stamina, balances hormones, and boosts vitality.",
      he: "מגודל בהרי האנדים מאות שנים, שורש מאקה הוא אדפטוגן חזק המשפר סיבולת, מאזן הורמונים ומגביר חיוניות.",
      ar: "مزروع في جبال الأنديز منذ قرون، يُعدّ جذر الماكا مُكيِّفاً قوياً يُعزز القدرة على التحمل ويوازن الهرمونات ويرفع الحيوية.",
    },
    intro: {
      en: "In the realm of natural remedies and wellness, Maca root extract stands out as a potent and time-honored superfood. Native to the high-altitude regions of the Andes in Peru, this cruciferous vegetable has been cultivated and consumed for centuries due to its remarkable health benefits. Today, Maca root extract is recognized worldwide as a nutritional powerhouse and adaptogenic herb — offering advantages for both physical and mental well-being.",
      he: "בתחום התרופות הטבעיות והבריאות, שורש מאקה בולט כסופרפוד עוצמתי ומכובד. ילידי אזורי הגובה הרם של האנדים בפרו, הירק הצלובן הזה גודל ונצרך מאות שנים בזכות יתרונותיו הבריאותיים המרשימים. כיום, תמצית שורש מאקה מוכרת ברחבי העולם כמזון-על עשיר בחומרי תזונה וכצמח אדפטוגני — המציעה יתרונות הן לרווחה גופנית והן לנפשית.",
      ar: "في مجال العلاجات الطبيعية والعافية، يبرز جذر الماكا باعتباره غذاءً خارقاً قوياً وراسخاً في التقاليد. وهو ابن المرتفعات الشاهقة في جبال الأنديز بالبيرو، زُرع هذا النبات الصليبي واستُهلك لقرون بفضل فوائده الصحية الرائعة. يُعترف اليوم بمستخلص جذر الماكا حول العالم بوصفه غذاءً مغذياً بامتياز وعشباً مُكيِّفاً — يُقدم فوائد للرفاهية الجسدية والنفسية معاً.",
    },
    benefits: [
      {
        title: { en: "Adaptogenic Properties", he: "תכונות אדפטוגניות", ar: "خصائص التكيّف" },
        text: {
          en: "Adaptogens help the body adapt to physical and mental stressors. Maca root supports the body ability to cope with stress, promotes energy and vitality, and enhances overall resilience — without stimulants.",
          he: "אדפטוגנים מסייעים לגוף להסתגל ללחצים גופניים ונפשיים. שורש מאקה תומך ביכולת הגוף להתמודד עם לחץ, מקדם אנרגיה וחיוניות ומשפר חוסן כולל — ללא ממריצים.",
          ar: "تُساعد المُكيِّفات الجسم على التكيف مع الضغوط الجسدية والنفسية. يدعم جذر الماكا قدرة الجسم على التعامل مع الضغط ويُعزز الطاقة والحيوية ويحسّن المرونة العامة — دون منبهات.",
        },
      },
      {
        title: { en: "Enhanced Energy & Stamina", he: "שיפור אנרגיה וסיבולת", ar: "تعزيز الطاقة والقدرة على التحمل" },
        text: {
          en: "Athletes and fitness enthusiasts turn to Maca root as a natural endurance booster. Bioactive compounds called macamides and macaenes contribute to increased energy levels and physical performance.",
          he: "ספורטאים ואנשי כושר פונים לשורש מאקה כמחזק סיבולת טבעי. תרכובות ביו-פעילות הנקראות מקאמידים ומקאנים תורמות להגברת רמות האנרגיה והביצועים הגופניים.",
          ar: "يلجأ الرياضيون وعشاق اللياقة البدنية إلى جذر الماكا بوصفه مُعزِّزاً طبيعياً للقدرة على التحمل. تُساهم المركبات الحيوية المعروفة بالماكاميدات والماكانين في رفع مستويات الطاقة وتحسين الأداء البدني.",
        },
      },
      {
        title: { en: "Hormonal Balance", he: "איזון הורמונלי", ar: "التوازن الهرموني" },
        text: {
          en: "Maca is renowned for its potential to balance hormones. It is often used to alleviate symptoms of hormonal imbalance, support mood stability, and improve reproductive health.",
          he: "מאקה מפורסמת בפוטנציאל שלה לאזן הורמונים. היא משמשת לרוב להקלת תסמיני חוסר איזון הורמונלי, לתמיכה ביציבות מצב הרוח ולשיפור בריאות הרבייה.",
          ar: "تشتهر الماكا بقدرتها المحتملة على موازنة الهرمونات. كثيراً ما تُستخدم لتخفيف أعراض الاختلال الهرموني ودعم استقرار المزاج وتحسين الصحة الإنجابية.",
        },
      },
      {
        title: { en: "Nutritional Richness", he: "עושר תזונתי", ar: "الثراء الغذائي" },
        text: {
          en: "Maca contains B vitamins, vitamin C, vitamin E, iron, potassium, calcium, amino acids, fatty acids, and fiber — making it one of the most nutrient-dense whole foods available.",
          he: "מאקה מכילה ויטמיני B, ויטמין C, ויטמין E, ברזל, אשלגן, סידן, חומצות אמינו, חומצות שומן וסיבים — מה שהופך אותה לאחד ממזונות השלמים הצפופים ביותר בחומרי תזונה הקיימים.",
          ar: "تحتوي الماكا على فيتامينات B وC وE والحديد والبوتاسيوم والكالسيوم والأحماض الأمينية والأحماض الدهنية والألياف — مما يجعلها من أكثر الأطعمة الكاملة كثافةً بالمغذيات المتاحة.",
        },
      },
    ],
    howTo: [
      { en: "INDIGO delivers your daily Maca alongside Acai, Guarana, and essential vitamins — just mix one sachet with water.", he: "INDIGO מספק את מנת המאקה היומית שלכם לצד אסאי, גוארנה וויטמינים חיוניים — פשוט ערבבו שקית אחת עם מים.", ar: "تُقدّم INDIGO جرعتك اليومية من الماكا جنباً إلى جنب مع الأساي والغوارانا والفيتامينات الأساسية — فقط اخلط كيساً واحداً مع الماء." },
      { en: "Take INDIGO in the morning or pre-workout for best performance and energy benefits.", he: "קחו INDIGO בבוקר או לפני אימון לביצועים ויתרונות אנרגיה מיטביים.", ar: "تناول INDIGO في الصباح أو قبل التمرين للحصول على أفضل الأداء وفوائد الطاقة." },
      { en: "Maca pairs especially well with a morning coffee or warm beverage if you prefer a hot ritual.", he: "מאקה מתאימה במיוחד עם קפה הבוקר או משקה חם אם אתם מעדיפים טקס חם.", ar: "تتناسب الماكا بشكل خاص مع قهوة الصباح أو مشروب ساخن إن كنت تفضّل طقوساً دافئة." },
    ],
    tags: ["Maca Root", "Adaptogens", "Stamina", "Hormones", "INDIGO"],
  },
];
