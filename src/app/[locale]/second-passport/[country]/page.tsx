import { Locale } from "@/lib/translations";
import Link from "next/link";
import FallbackImage from "@/components/FallbackImage";

const countryContent = {
  "antigua-barbuda": {
    en: {
      title: "Antigua & Barbuda CBI",
      subtitle: "A family-friendly Caribbean citizenship route with strong mobility and flexible investment pathways.",
      timeline: "Typical processing: around 3-6 months",
      benefits: [
        "Visa-free/visa-on-arrival access to 150+ destinations (including UK, Schengen area, Hong Kong, and Singapore)",
        "Potential zero personal income tax on worldwide income",
        "Dual citizenship generally permitted",
        "Main applicant should be 18+ and pass due diligence checks",
        "Popular for family applications",
      ],
      options: [
        "National Development Fund (NDF) contribution (starting from USD 230,000, non-refundable, plus applicable government fees)",
        "University of the West Indies (UWI) contribution (starting from USD 260,000, typically suitable for larger families)",
        "Government-approved luxury real estate route (starting from USD 300,000 with a typical 5-year holding period)",
      ],
      source: "https://advent-citizen.com/citizenship/antigua-barbuda/",
    },
    ar: {
      title: "جنسية أنتيغوا وبربودا عبر الاستثمار",
      subtitle: "مسار كاريبي مناسب للعائلات مع تنقل دولي قوي وخيارات استثمار مرنة.",
      timeline: "مدة المعالجة المتوقعة: تقريبًا 3-6 أشهر",
      benefits: [
        "دخول بدون تأشيرة/تأشيرة عند الوصول لأكثر من 150 وجهة (بما فيها المملكة المتحدة وشنغن وهونغ كونغ وسنغافورة)",
        "إمكانية الاستفادة من نظام ضريبي شخصي صفري على الدخل العالمي",
        "السماح بالجنسية المزدوجة غالبًا",
        "يشترط عادة أن يكون مقدم الطلب الرئيسي بعمر 18+ مع اجتياز الفحص الأمني",
        "خيار شائع للطلبات العائلية",
      ],
      options: [
        "مساهمة صندوق التنمية الوطني NDF (ابتداءً من 230,000 دولار غير مستردة مع رسوم حكومية حسب الحالة)",
        "مساهمة جامعة جزر الهند الغربية UWI (ابتداءً من 260,000 دولار وغالبًا مناسبة للعائلات الكبيرة)",
        "الاستثمار العقاري الفاخر المعتمد حكوميًا (ابتداءً من 300,000 دولار مع فترة احتفاظ تقارب 5 سنوات)",
      ],
      source: "https://advent-citizen.com/citizenship/antigua-barbuda/",
    },
  },
  "st-kitts-nevis": {
    en: {
      title: "St. Kitts & Nevis CBI",
      subtitle: "A legacy Caribbean citizenship program offering privacy, prestige, and strong global mobility.",
      timeline: "Typical processing: around 3 months (accelerated pathways may apply)",
      benefits: [
        "Visa-free or visa-on-arrival access to 150+ countries",
        "No personal income tax, wealth tax, or inheritance tax",
        "Dual citizenship generally permitted",
        "Confidential process with potential accelerated handling",
      ],
      options: [
        "Sustainable Island State Contribution (SISC) starting from USD 250,000 (non-refundable)",
        "Approved Public Benefit Project from USD 250,000 (non-refundable)",
        "Approved real estate route starting from USD 325,000 (holding period conditions apply)",
      ],
      source: "https://advent-citizen.com/citizenship/st-kitts-nevis/",
    },
    ar: {
      title: "جنسية سانت كيتس ونيفيس عبر الاستثمار",
      subtitle: "برنامج كاريبي عريق يمنحك الخصوصية والتميز وتنقلًا عالميًا قويًا.",
      timeline: "مدة المعالجة المتوقعة: حوالي 3 أشهر (قد تتوفر مسارات معجلة)",
      benefits: [
        "دخول بدون تأشيرة أو بتأشيرة عند الوصول لأكثر من 150 دولة",
        "لا توجد ضريبة دخل شخصية أو ضريبة ثروة أو ميراث",
        "السماح بالجنسية المزدوجة غالبًا",
        "إجراءات سرية مع إمكانية المعالجة السريعة",
      ],
      options: [
        "مساهمة الدولة الجزيرة المستدامة SISC ابتداءً من 250,000 دولار (غير مستردة)",
        "مشروع منفعة عامة معتمد ابتداءً من 250,000 دولار (غير مستردة)",
        "الاستثمار العقاري المعتمد ابتداءً من 325,000 دولار (مع شروط فترة احتفاظ)",
      ],
      source: "https://advent-citizen.com/citizenship/st-kitts-nevis/",
    },
  },
  "saint-lucia": {
    en: {
      title: "Saint Lucia CBI",
      subtitle: "The only Caribbean CBI route with a government bond option designed for capital security.",
      timeline: "Typical processing: around 18-24 months",
      benefits: [
        "Visa-free travel to 140+ countries including Schengen states, UK, Hong Kong, and Singapore",
        "No wealth tax, inheritance tax, or capital gains tax in Saint Lucia",
        "Dual citizenship generally permitted",
        "No education or managerial experience requirements",
        "Family inclusion for spouse, eligible children, and dependent parents",
      ],
      options: [
        "National Economic Fund contribution (starting from USD 240,000 for applicant and qualifying dependents)",
        "Approved real estate route (minimum USD 300,000; project availability may vary)",
        "Government Bond Investment (USD 300,000 with 5-year holding period)",
      ],
      source: "https://advent-citizen.com/citizenship/saint-lucia/",
    },
    ar: {
      title: "جنسية سانت لوسيا عبر الاستثمار",
      subtitle: "البرنامج الكاريبي الوحيد الذي يوفر خيار الاستثمار في السندات الحكومية.",
      timeline: "مدة المعالجة المتوقعة: حوالي 18-24 شهرًا",
      benefits: [
        "دخول بدون تأشيرة إلى أكثر من 140 دولة بما فيها شنغن والمملكة المتحدة وهونغ كونغ وسنغافورة",
        "لا توجد ضريبة ثروة أو ميراث أو أرباح رأسمالية في سانت لوسيا",
        "السماح بالجنسية المزدوجة غالبًا",
        "لا يشترط مؤهلًا تعليميًا أو خبرة إدارية",
        "إمكانية شمول الزوج/الزوجة والأبناء المؤهلين والوالدين المعالين",
      ],
      options: [
        "مساهمة الصندوق الاقتصادي الوطني (ابتداءً من 240,000 دولار للمتقدم ومن يعوله ضمن الشروط)",
        "الاستثمار العقاري المعتمد (حد أدنى 300,000 دولار مع اختلاف توفر المشاريع)",
        "الاستثمار في السندات الحكومية (300,000 دولار مع فترة احتفاظ 5 سنوات)",
      ],
      source: "https://advent-citizen.com/citizenship/saint-lucia/",
    },
  },
  dominica: {
    en: {
      title: "Dominica CBI",
      subtitle: "A well-known value-focused program with efficient processing.",
      timeline: "Typical processing: around 6 months",
      benefits: [
        "Competitive entry threshold",
        "Dual citizenship generally permitted",
        "Consistent demand among global investors",
      ],
      options: [
        "Economic Diversification Fund contribution (starting from USD 200,000)",
        "Approved real estate route (starting from USD 200,000)",
      ],
      source: "https://advent-citizen.com/citizenship/dominica/",
    },
    ar: {
      title: "جنسية دومينيكا عبر الاستثمار",
      subtitle: "برنامج معروف بقيمته الاقتصادية وسرعة إجراءاته.",
      timeline: "مدة المعالجة المتوقعة: تقريبًا 6 أشهر",
      benefits: [
        "حد دخول استثماري تنافسي",
        "السماح بالجنسية المزدوجة غالبًا",
        "طلب مستمر من المستثمرين الدوليين",
      ],
      options: [
        "مساهمة صندوق التنويع الاقتصادي (ابتداءً من 200,000 دولار)",
        "الاستثمار العقاري المعتمد (ابتداءً من 200,000 دولار)",
      ],
      source: "https://advent-citizen.com/citizenship/dominica/",
    },
  },
  turkiye: {
    en: {
      title: "Türkiye CBI",
      subtitle: "A high-demand program with real-estate led eligibility and fast processing.",
      timeline: "Typical processing: around 3-6 months",
      benefits: [
        "Visa-free or visa-on-arrival access to 110+ countries",
        "No residency requirement before or after citizenship grant",
        "Dual citizenship generally permitted",
      ],
      options: [
        "Real estate purchase starting from USD 400,000 (holding period applies)",
        "Fixed capital investment route from USD 500,000",
        "Bank deposit / bonds / fund routes from USD 500,000",
      ],
      source: "https://advent-citizen.com/citizenship/turkiye/",
    },
    ar: {
      title: "جنسية تركيا عبر الاستثمار",
      subtitle: "برنامج مطلوب يعتمد بشكل أساسي على الاستثمار العقاري مع معالجة سريعة.",
      timeline: "مدة المعالجة المتوقعة: تقريبًا 3-6 أشهر",
      benefits: [
        "دخول بدون تأشيرة أو بتأشيرة عند الوصول لأكثر من 110 دولة",
        "لا يشترط إقامة قبل أو بعد الحصول على الجنسية",
        "السماح بالجنسية المزدوجة غالبًا",
      ],
      options: [
        "شراء عقار ابتداءً من 400,000 دولار (مع فترة احتفاظ)",
        "مسار استثمار رأسمالي ثابت من 500,000 دولار",
        "مسارات الوديعة البنكية/السندات/الصناديق من 500,000 دولار",
      ],
      source: "https://advent-citizen.com/citizenship/turkiye/",
    },
  },
} as const;

type CountrySlug = keyof typeof countryContent;

const antiguaExtendedContent = {
  en: {
    eyebrow: "A World of Privilege, Freedom & Opportunity",
    heroTitle: "Antigua and Barbuda Citizenship by Investment",
    heroLead:
      "For the few, the exceptional, and the elite — offering 150+ visa-free destinations, family inclusion, and investment routes from USD 230,000.",
    heroBody:
      "This Caribbean program combines efficient processing, premium mobility, and lifestyle value. Antigua, known as the Land of 365 Beaches, offers a secure and business-friendly environment with attractive tax positioning.",
    ctaPrimary: "Speak with an expert",
    ctaSecondary: "Get Quote",
    eligibilityTitle: "Eligibility & Investment Options",
    eligibilityIntro:
      "Main applicants are generally expected to be at least 18 years old, clear due diligence, and select one approved investment route.",
    investmentCards: [
      {
        title: "National Development Fund (NDF) Contribution",
        minimum: "Minimum: USD 230,000 (non-refundable) + applicable government fees",
        desc: "A direct contribution route designed for applicants who prefer a straightforward process.",
        note: "",
      },
      {
        title: "University of the West Indies (UWI) Contribution",
        minimum: "Minimum: USD 260,000 (non-refundable)",
        desc: "Often suitable for larger families and includes one year of tuition for an eligible family member.",
        note: "",
      },
      {
        title: "Luxury Real Estate Investment",
        minimum: "Minimum: USD 300,000",
        desc: "Investment in government-approved luxury real estate projects such as resort residences and villas.",
        note: "Joint investment may be available (two applicants at USD 300,000 each). Typical holding period: 5 years.",
      },
    ],
    processTitle: "Application Process",
    processIntro: "Our team supports a secure and structured journey from onboarding to citizenship issuance.",
    processSteps: [
      "Initial consultation and pre-screening of eligibility and profile",
      "Document preparation, submission, and government due diligence checks",
      "Approval in principle and completion of investment/contribution",
      "Certificate of Naturalization issuance after final compliance",
    ],
    processTime: "Estimated timeline: around 8–10 months",
    finalTitle: "Unlock Your Future with Antigua and Barbuda Citizenship",
    finalText:
      "Start your application with expert guidance to secure global mobility, family inclusion, and long-term lifestyle flexibility.",
    faqTitle: "FAQs: Antigua and Barbuda Citizenship by Investment Program",
    faqs: [
      "What is the Antigua and Barbuda Citizenship by Investment Program?",
      "Who can be included in the citizenship application?",
      "Is there a residency requirement for Antigua and Barbuda citizenship?",
      "How long does the citizenship application process take?",
      "Can I apply for Antigua and Barbuda citizenship remotely?",
      "Is Antigua and Barbuda citizenship lifelong?",
      "Can I live or work in other Caribbean countries with this citizenship?",
      "Can Antigua and Barbuda citizenship be revoked?",
      "Is Antigua and Barbuda part of the Commonwealth?",
      "Is Antigua and Barbuda a safe place to invest and live?",
    ],
  },
  ar: {
    eyebrow: "عالم من الامتياز والحرية والفرص",
    heroTitle: "جنسية أنتيغوا وبربودا عبر الاستثمار",
    heroLead:
      "مسار مميز يوفر دخولًا بدون تأشيرة لأكثر من 150 وجهة، وإمكانية إدراج أفراد العائلة، واستثمارات تبدأ من 230,000 دولار.",
    heroBody:
      "هذا البرنامج الكاريبي يجمع بين المعالجة الفعالة، والتنقل العالمي، ونمط حياة راقٍ. وتُعرف أنتيغوا بأنها أرض 365 شاطئًا مع بيئة آمنة وملائمة للأعمال.",
    ctaPrimary: "تحدث مع خبير",
    ctaSecondary: "اطلب عرض سعر",
    eligibilityTitle: "الأهلية وخيارات الاستثمار",
    eligibilityIntro:
      "عادةً يجب أن يكون مقدم الطلب الرئيسي بعمر 18 سنة أو أكثر، ويجتاز الفحص الأمني، ويختار أحد مسارات الاستثمار المعتمدة.",
    investmentCards: [
      {
        title: "مساهمة صندوق التنمية الوطني (NDF)",
        minimum: "الحد الأدنى: 230,000 دولار (غير مستردة) + الرسوم الحكومية المطبقة",
        desc: "مسار مباشر ومناسب لمن يفضلون إجراءات واضحة وسلسة.",
        note: "",
      },
      {
        title: "مساهمة جامعة جزر الهند الغربية (UWI)",
        minimum: "الحد الأدنى: 260,000 دولار (غير مستردة)",
        desc: "خيار مناسب غالبًا للعائلات الأكبر، ويتضمن سنة دراسية لفرد مؤهل من العائلة.",
        note: "",
      },
      {
        title: "الاستثمار العقاري الفاخر",
        minimum: "الحد الأدنى: 300,000 دولار",
        desc: "الاستثمار في عقارات فاخرة معتمدة حكوميًا مثل المنتجعات والفيلات.",
        note: "قد يتوفر الاستثمار المشترك (300,000 دولار لكل متقدم). فترة الاحتفاظ المعتادة: 5 سنوات.",
      },
    ],
    processTitle: "خطوات التقديم",
    processIntro: "فريقنا يدير الملف بشكل مهني وآمن من البداية حتى إصدار الشهادة.",
    processSteps: [
      "استشارة أولية وتقييم الأهلية والملف",
      "تحضير المستندات والتقديم والفحص الأمني الحكومي",
      "موافقة مبدئية ثم استكمال الاستثمار/المساهمة",
      "إصدار شهادة التجنّس بعد استكمال المتطلبات",
    ],
    processTime: "المدة التقديرية: حوالي 8–10 أشهر",
    finalTitle: "افتح مستقبلك مع جنسية أنتيغوا وبربودا",
    finalText:
      "ابدأ طلبك اليوم مع إرشاد احترافي للحصول على تنقل عالمي أوسع وحلول مناسبة للعائلة.",
    faqTitle: "الأسئلة الشائعة: جنسية أنتيغوا وبربودا عبر الاستثمار",
    faqs: [
      "ما هو برنامج جنسية أنتيغوا وبربودا عبر الاستثمار؟",
      "من يمكن إضافته ضمن طلب الجنسية؟",
      "هل توجد متطلبات إقامة؟",
      "كم تستغرق المعالجة عادة؟",
      "هل يمكن التقديم عن بُعد؟",
      "هل الجنسية دائمة مدى الحياة؟",
      "هل يمكن العمل أو الإقامة في دول كاريبية أخرى؟",
      "هل يمكن سحب الجنسية في حالات معينة؟",
      "هل أنتيغوا وبربودا ضمن دول الكومنولث؟",
      "هل أنتيغوا وبربودا بيئة آمنة للاستثمار والعيش؟",
    ],
  },
} as const;

const stKittsExtendedContent = {
  en: {
    eyebrow: "Legacy of Prestige. A Future Without Borders.",
    heroTitle: "Saint Kitts and Nevis Citizenship by Investment Program",
    heroLead:
      "Exclusivity that defines you: secure one of the highest-ranked citizenship by investment programs with 150+ visa-free destinations and entry from USD 250,000.",
    heroBody:
      "Established in 1984, this prestigious Caribbean program enables qualified investors and their families to obtain citizenship through approved economic contribution routes, with privacy and long-term legacy planning benefits.",
    ctaPrimary: "Speak with an expert",
    ctaSecondary: "Get Quote",
    eligibilityTitle: "Eligibility & Investment Options",
    eligibilityIntro:
      "The main applicant should be 18+ years old, pass government due diligence, and choose one of the approved routes below.",
    investmentCards: [
      {
        title: "Sustainable Island State Contribution (SISC)",
        minimum: "Starting at USD 250,000 (non-refundable)",
        desc: "A direct contribution route with an accelerated process option (around 60 days in applicable cases).",
        note: "Can include dependent children (up to applicable age criteria) and eligible parents/grandparents.",
      },
      {
        title: "Approved Public Benefit Project",
        minimum: "Minimum: USD 250,000 (non-refundable)",
        desc: "Contribute to government-approved projects that support national development and long-term growth.",
        note: "Suitable for applicants who want investment impact aligned with national initiatives.",
      },
      {
        title: "Luxury Real Estate Investment",
        minimum: "Starting at USD 325,000",
        desc: "Invest in approved high-end properties such as luxury condominiums and private villas.",
        note: "Typical holding period: 7 years before resale (subject to program rules).",
      },
    ],
    processTitle: "Application Process",
    processIntro: "Our team ensures a fast, secure, and confidential process from start to finish.",
    processSteps: [
      "Initial consultation and pre-screening of profile and goals",
      "Document preparation, filing, and due diligence submission",
      "Approval-in-principle and completion of selected investment",
      "Certificate of citizenship and passport issuance",
    ],
    processTime: "Estimated timeline: around 3 months",
    finalTitle: "Unlock Your Future with Saint Kitts and Nevis Citizenship",
    finalText:
      "Gain global mobility, tax efficiency potential, and a secure family future through one of the Caribbean’s most established CBI programs.",
    faqTitle: "Frequently Asked Questions – St. Kitts and Nevis CBI Program",
    faqs: [
      "What is the St. Kitts and Nevis Citizenship by Investment Program?",
      "What are the benefits of St. Kitts and Nevis citizenship?",
      "Who is eligible to apply for citizenship by investment?",
      "How long does the citizenship process take?",
      "Is St. Kitts and Nevis citizenship permanent?",
      "Can I include my family in one application?",
      "Do I need to live in or visit St. Kitts and Nevis to apply?",
      "How strong is the St. Kitts and Nevis passport?",
      "Can I keep dual citizenship?",
      "Can I live or work in other countries with this passport?",
    ],
  },
  ar: {
    eyebrow: "إرث من المكانة.. ومستقبل بلا حدود",
    heroTitle: "برنامج جنسية سانت كيتس ونيفيس عبر الاستثمار",
    heroLead:
      "برنامج حصري يتيح لك الحصول على جنسية رفيعة التصنيف مع أكثر من 150 وجهة سفر بدون تأشيرة، واستثمار يبدأ من 250,000 دولار.",
    heroBody:
      "منذ 1984، يقدم هذا البرنامج الكاريبي المرموق مسارًا موثوقًا للمستثمرين وعائلاتهم للحصول على الجنسية عبر مساهمة اقتصادية معتمدة، مع خصوصية عالية ومزايا طويلة الأمد.",
    ctaPrimary: "تحدث مع خبير",
    ctaSecondary: "اطلب عرض سعر",
    eligibilityTitle: "الأهلية وخيارات الاستثمار",
    eligibilityIntro:
      "يشترط أن يكون مقدم الطلب الرئيسي بعمر 18 سنة أو أكثر، ويجتاز الفحص الأمني الحكومي، ويختار أحد المسارات المعتمدة.",
    investmentCards: [
      {
        title: "مساهمة الدولة الجزيرة المستدامة (SISC)",
        minimum: "تبدأ من 250,000 دولار (غير مستردة)",
        desc: "مسار مساهمة مباشر مع خيار معالجة معجل (حوالي 60 يومًا في الحالات المؤهلة).",
        note: "يمكن إضافة أبناء معالين ضمن الشروط، وكذلك والدين/أجداد مؤهلين.",
      },
      {
        title: "مشروع منفعة عامة معتمد",
        minimum: "الحد الأدنى: 250,000 دولار (غير مستردة)",
        desc: "استثمار يدعم المشاريع الوطنية المعتمدة ويساهم في التنمية الاقتصادية.",
        note: "خيار مناسب لمن يرغب بربط استثماره بمشاريع ذات أثر تنموي.",
      },
      {
        title: "الاستثمار العقاري الفاخر",
        minimum: "تبدأ من 325,000 دولار",
        desc: "استثمار في مشاريع عقارية فاخرة معتمدة مثل الشقق الراقية والفيلات الخاصة.",
        note: "فترة الاحتفاظ المعتادة: 7 سنوات قبل إعادة البيع (وفق الشروط).",
      },
    ],
    processTitle: "خطوات التقديم",
    processIntro: "فريقنا يضمن تنفيذ الملف بسرعة وخصوصية وأمان من البداية حتى الإصدار.",
    processSteps: [
      "استشارة أولية وتقييم الملف والأهداف",
      "تحضير المستندات والتقديم وإجراءات الفحص الأمني",
      "موافقة مبدئية ثم استكمال الاستثمار المختار",
      "إصدار شهادة الجنسية ثم جواز السفر",
    ],
    processTime: "المدة التقديرية: حوالي 3 أشهر",
    finalTitle: "افتح مستقبلك مع جنسية سانت كيتس ونيفيس",
    finalText:
      "احصل على تنقل عالمي أوسع، ومزايا مالية محتملة، ومستقبل أكثر أمانًا لعائلتك عبر أحد أعرق برامج الجنسية بالاستثمار.",
    faqTitle: "الأسئلة الشائعة – برنامج جنسية سانت كيتس ونيفيس عبر الاستثمار",
    faqs: [
      "ما هو برنامج جنسية سانت كيتس ونيفيس عبر الاستثمار؟",
      "ما أبرز مزايا هذه الجنسية؟",
      "من المؤهل للتقديم؟",
      "كم تستغرق المعالجة؟",
      "هل الجنسية دائمة؟",
      "هل يمكن إضافة الأسرة في نفس الطلب؟",
      "هل يجب الزيارة أو الإقامة للتقديم؟",
      "ما قوة جواز سانت كيتس ونيفيس؟",
      "هل يمكن الاحتفاظ بالجنسية المزدوجة؟",
      "هل يمكن العيش أو العمل في دول أخرى بهذا الجواز؟",
    ],
  },
} as const;

const saintLuciaExtendedContent = {
  en: {
    eyebrow: "Only Caribbean CIP with Government Bond Route",
    heroTitle: "Saint Lucia Citizenship by Investment",
    heroLead:
      "Open to government bond investment for capital security: invest USD 300,000, hold for 5 years, and pursue citizenship for generations.",
    heroBody:
      "Established in 2015, Saint Lucia’s CBI program is one of the newest in the Caribbean and is designed with efficient processing standards, transparent due diligence, and flexible investment pathways.",
    ctaPrimary: "Speak with an expert",
    ctaSecondary: "Get Quote",
    eligibilityTitle: "Eligibility & Investment Options",
    eligibilityIntro:
      "The main applicant should be at least 18 years old, pass due diligence, and select one approved route.",
    investmentCards: [
      {
        title: "National Economic Fund Contribution",
        minimum: "From USD 240,000",
        desc: "Base contribution route with additional fees based on dependent composition and age brackets.",
        note: "Includes structured add-on amounts for additional dependents, spouse pathways, and newborn-related cases.",
      },
      {
        title: "Real Estate Investment",
        minimum: "Minimum: USD 300,000",
        desc: "Investment in approved assets such as hotel shares, villas, and condominium units.",
        note: "Availability of eligible projects can change over time based on government approvals.",
      },
      {
        title: "Government Bond Investment",
        minimum: "USD 300,000 secured bond route",
        desc: "A risk-averse pathway for investors prioritizing capital preservation while qualifying for citizenship.",
        note: "Bond holding period: 5 years.",
      },
    ],
    processTitle: "Application Process",
    processIntro: "Our team manages a secure and confidential process from onboarding to passport issuance.",
    processSteps: [
      "Initial consultation and profile pre-screening",
      "Document preparation, submission, and due diligence checks",
      "Approval-in-principle and completion of selected investment",
      "Certificate of Naturalization and passport issuance",
    ],
    processTime: "Estimated timeline: around 18–24 months",
    finalTitle: "Unlock Your Future with Saint Lucia Citizenship",
    finalText:
      "Secure global mobility, family inclusion, and long-term planning flexibility through Saint Lucia’s structured CBI framework.",
    faqTitle: "Frequently Asked Questions: Saint Lucia Citizenship by Investment Program",
    faqs: [
      "What is the Saint Lucia Citizenship by Investment Program?",
      "What are the main benefits of Saint Lucia citizenship?",
      "What investment options are available under Saint Lucia CIP?",
      "How long does it take to obtain Saint Lucia citizenship?",
      "Is Saint Lucia citizenship permanent?",
      "Is travel or residence in Saint Lucia required to apply?",
      "Is Saint Lucia a safe country to invest in?",
      "How can advisory support help with the application process?",
      "Can Saint Lucia passport holders live or work in other Caribbean countries?",
    ],
  },
  ar: {
    eyebrow: "البرنامج الكاريبي الوحيد بخيار السندات الحكومية",
    heroTitle: "جنسية سانت لوسيا عبر الاستثمار",
    heroLead:
      "خيار استثمار آمن عبر السندات الحكومية: استثمر 300,000 دولار مع استرداد رأس المال بعد 5 سنوات وفق الشروط.",
    heroBody:
      "تم إطلاق برنامج سانت لوسيا عام 2015، ويُعد من أحدث برامج الجنسية بالاستثمار في الكاريبي مع معايير تدقيق واضحة ومسارات استثمار متنوعة.",
    ctaPrimary: "تحدث مع خبير",
    ctaSecondary: "اطلب عرض سعر",
    eligibilityTitle: "الأهلية وخيارات الاستثمار",
    eligibilityIntro:
      "يشترط أن يكون مقدم الطلب الرئيسي بعمر 18 سنة أو أكثر، ويجتاز الفحص الأمني، ويختار أحد المسارات المعتمدة.",
    investmentCards: [
      {
        title: "مساهمة الصندوق الاقتصادي الوطني",
        minimum: "ابتداءً من 240,000 دولار",
        desc: "مسار مساهمة أساسي مع رسوم إضافية حسب عدد المعالين وفئاتهم العمرية.",
        note: "يشمل مبالغ إضافية منظمة للمعالين الإضافيين وحالات الزوج/الزوجة والأطفال حديثي الولادة.",
      },
      {
        title: "الاستثمار العقاري",
        minimum: "الحد الأدنى: 300,000 دولار",
        desc: "الاستثمار في أصول معتمدة مثل حصص الفنادق والفيلات ووحدات الكوندومينيوم.",
        note: "توفر المشاريع العقارية المؤهلة قد يتغير حسب الاعتمادات الحكومية.",
      },
      {
        title: "الاستثمار في السندات الحكومية",
        minimum: "300,000 دولار في سندات حكومية",
        desc: "خيار منخفض المخاطر للمستثمرين الذين يفضلون الحفاظ على رأس المال مع التأهل للجنسية.",
        note: "فترة الاحتفاظ بالسندات: 5 سنوات.",
      },
    ],
    processTitle: "خطوات التقديم",
    processIntro: "فريقنا يدير الملف بشكل سري وآمن من البداية حتى إصدار الجواز.",
    processSteps: [
      "استشارة أولية وتقييم الملف",
      "تحضير المستندات والتقديم وإجراءات الفحص الأمني",
      "موافقة مبدئية ثم استكمال الاستثمار المختار",
      "إصدار شهادة التجنس ثم جواز السفر",
    ],
    processTime: "المدة التقديرية: حوالي 18–24 شهرًا",
    finalTitle: "افتح مستقبلك مع جنسية سانت لوسيا",
    finalText:
      "احصل على تنقل عالمي أوسع وحلول مناسبة للعائلة عبر إطار استثماري منظم في سانت لوسيا.",
    faqTitle: "الأسئلة الشائعة: برنامج جنسية سانت لوسيا عبر الاستثمار",
    faqs: [
      "ما هو برنامج جنسية سانت لوسيا عبر الاستثمار؟",
      "ما أهم مزايا جنسية سانت لوسيا؟",
      "ما خيارات الاستثمار المتاحة؟",
      "كم يستغرق الحصول على جنسية سانت لوسيا؟",
      "هل الجنسية دائمة؟",
      "هل يلزم السفر أو الإقامة للتقديم؟",
      "هل سانت لوسيا دولة آمنة للاستثمار؟",
      "كيف يمكن للدعم الاستشاري المساعدة في الملف؟",
      "هل يمكن العمل أو الإقامة في دول كاريبية أخرى بجواز سانت لوسيا؟",
    ],
  },
} as const;

const dominicaExtendedContent = {
  en: {
    eyebrow: "Powering Your Future with a Caribbean Citizenship",
    heroTitle: "Dominica Citizenship by Investment Program",
    heroLead:
      "One of the Caribbean’s most economical routes: invest from USD 200,000 and pursue a respected second citizenship pathway.",
    heroBody:
      "Since 1993, Dominica’s CBI framework has become known for affordability, efficiency, and global mobility potential. The program supports individuals and families seeking long-term security, flexibility, and international access.",
    ctaPrimary: "Speak with an expert",
    ctaSecondary: "Get Quote",
    eligibilityTitle: "Eligibility & Investment Options",
    eligibilityIntro:
      "The main applicant should be at least 18 years old, pass due diligence, and select one approved route.",
    investmentCards: [
      {
        title: "Economic Diversification Fund (EDF) Contribution",
        minimum: "USD 200,000 (single applicant) / USD 250,000 (family of four)",
        desc: "A non-refundable government contribution and the most affordable entry route into Dominica citizenship.",
        note: "Additional government fees vary by family size, dependent ages, and selected route.",
      },
      {
        title: "Government-Approved Real Estate Investment",
        minimum: "Minimum: USD 200,000",
        desc: "Invest in approved Caribbean real estate and combine citizenship eligibility with a tangible asset.",
        note: "Typical minimum holding period: 3 years before resale (conditions apply).",
      },
      {
        title: "Family-Focused Structuring",
        minimum: "Flexible planning based on applicant profile",
        desc: "Program structure can be tailored for individuals and families with dependent-related fee considerations.",
        note: "Our team can provide a personalized quote based on your exact family composition.",
      },
    ],
    processTitle: "Application Process",
    processIntro: "Our team delivers a secure and confidential end-to-end process.",
    processSteps: [
      "Initial consultation and pre-screening of eligibility and objectives",
      "Document preparation, submission, fees, and due diligence checks",
      "Approval in principle and completion of investment/contribution",
      "Certificate of Naturalization and passport issuance",
    ],
    processTime: "Estimated timeline: around 8–10 months",
    finalTitle: "Unlock Your Future with Dominica Citizenship",
    finalText:
      "Gain stronger global mobility, tax planning flexibility, and long-term security through a trusted Caribbean CBI program.",
    faqTitle: "Frequently Asked Questions: Dominica Citizenship by Investment",
    faqs: [
      "What is the Dominica Citizenship by Investment Program?",
      "How long does it take to obtain Dominica citizenship?",
      "Is Dominica citizenship permanent?",
      "Who can be included in the citizenship application?",
      "Is travel or residence in Dominica required to apply?",
      "Is Dominica a safe country to invest in?",
      "How strong is the Dominica passport for visa-free travel?",
      "How can professional advisory support help with my application?",
    ],
  },
  ar: {
    eyebrow: "صمّم مستقبلك بجنسية كاريبية",
    heroTitle: "برنامج جنسية دومينيكا عبر الاستثمار",
    heroLead:
      "من أكثر المسارات الاقتصادية في الكاريبي: استثمار يبدأ من 200,000 دولار للحصول على جنسية ثانية موثوقة.",
    heroBody:
      "منذ 1993، يُعرف برنامج دومينيكا بالكفاءة والتكلفة المناسبة وإتاحة تنقل عالمي أوسع. وهو مناسب للأفراد والعائلات الباحثين عن الأمان والمرونة على المدى الطويل.",
    ctaPrimary: "تحدث مع خبير",
    ctaSecondary: "اطلب عرض سعر",
    eligibilityTitle: "الأهلية وخيارات الاستثمار",
    eligibilityIntro:
      "يشترط أن يكون مقدم الطلب الرئيسي بعمر 18 سنة أو أكثر، ويجتاز الفحص الأمني، ويختار أحد المسارات المعتمدة.",
    investmentCards: [
      {
        title: "مساهمة صندوق التنويع الاقتصادي (EDF)",
        minimum: "200,000 دولار (فرد) / 250,000 دولار (عائلة من أربعة)",
        desc: "مساهمة حكومية غير مستردة وتُعد المسار الأكثر اقتصادية للحصول على جنسية دومينيكا.",
        note: "توجد رسوم حكومية إضافية حسب حجم الأسرة وأعمار المعالين ومسار الاستثمار.",
      },
      {
        title: "الاستثمار العقاري المعتمد حكوميًا",
        minimum: "الحد الأدنى: 200,000 دولار",
        desc: "الاستثمار في عقارات كاريبية معتمدة يجمع بين التأهل للجنسية وامتلاك أصل ملموس.",
        note: "فترة الاحتفاظ المعتادة: 3 سنوات قبل إعادة البيع (وفق الشروط).",
      },
      {
        title: "هيكلة مناسبة للعائلات",
        minimum: "تخطيط مرن حسب ملف المتقدم",
        desc: "يمكن تهيئة التكلفة وفق حالة المتقدم والعائلة مع احتساب الرسوم المرتبطة بالمعالين.",
        note: "يمكننا تزويدك بعرض سعر مخصص وفق تركيبة عائلتك.",
      },
    ],
    processTitle: "خطوات التقديم",
    processIntro: "فريقنا يدير العملية كاملة بسرية وأمان من البداية حتى الإصدار.",
    processSteps: [
      "استشارة أولية وتقييم الأهلية والأهداف",
      "تحضير المستندات والتقديم وسداد الرسوم وإجراءات الفحص الأمني",
      "موافقة مبدئية ثم استكمال الاستثمار/المساهمة",
      "إصدار شهادة التجنّس ثم جواز السفر",
    ],
    processTime: "المدة التقديرية: حوالي 8–10 أشهر",
    finalTitle: "افتح مستقبلك مع جنسية دومينيكا",
    finalText:
      "احصل على تنقل عالمي أوسع ومرونة مالية أكبر وأمان طويل الأمد عبر أحد برامج الكاريبي الموثوقة.",
    faqTitle: "الأسئلة الشائعة: برنامج جنسية دومينيكا عبر الاستثمار",
    faqs: [
      "ما هو برنامج جنسية دومينيكا عبر الاستثمار؟",
      "كم تستغرق المعالجة للحصول على جنسية دومينيكا؟",
      "هل جنسية دومينيكا دائمة؟",
      "من يمكن إضافته ضمن طلب الجنسية؟",
      "هل يتطلب التقديم السفر أو الإقامة في دومينيكا؟",
      "هل دومينيكا دولة آمنة للاستثمار؟",
      "ما قوة جواز دومينيكا من ناحية السفر بدون تأشيرة؟",
      "كيف يساعد الدعم الاستشاري في تسريع وتنظيم الملف؟",
    ],
  },
} as const;

const turkiyeExtendedContent = {
  en: {
    eyebrow: "Future with Turkish Citizenship: A Gateway to Europe and Beyond",
    heroTitle: "Turkey Citizenship by Investment Program",
    heroLead:
      "Secure Turkish citizenship with a direct real estate purchase from USD 400,000 and a pathway that can complete in 3-6 months.",
    heroBody:
      "Since launching in 2017, Turkey's citizenship by investment program has attracted global investors seeking expanded mobility, business growth, and a secure future. It offers access to 110+ visa-free or visa-on-arrival destinations, including Japan.",
    ctaPrimary: "Speak with an expert",
    ctaSecondary: "Get Quote",
    eligibilityTitle: "Eligibility & Investment Options",
    eligibilityIntro:
      "Applicants must be at least 18 years old, pass due diligence, and complete one approved investment route.",
    investmentCards: [
      {
        title: "Real Estate Purchase",
        minimum: "Minimum: USD 400,000",
        desc: "Acquire eligible real estate and hold the property for at least 3 years to qualify for citizenship.",
        note: "The investment can be a home, office, or approved property type.",
      },
      {
        title: "Fixed Capital Investment",
        minimum: "Minimum: USD 500,000",
        desc: "Make a qualifying capital investment that meets government program requirements.",
        note: "Subject to verification by relevant authorities.",
      },
      {
        title: "Bank Deposit, Bonds, or Funds",
        minimum: "Minimum: USD 500,000",
        desc: "Qualify via a bank deposit, government bonds, or approved investment funds.",
        note: "Holding periods apply based on the chosen route.",
      },
    ],
    processTitle: "Application Process",
    processIntro: "Our team delivers a fast, secure, and confidential process end-to-end.",
    processSteps: [
      "Initial consultation and eligibility assessment",
      "Document preparation, filing, and due diligence submission",
      "Approval in principle and completion of the investment",
      "Citizenship approval and passport issuance",
    ],
    processTime: "Estimated timeline: around 3-6 months",
    finalTitle: "Unlock Your Future with Turkish Citizenship",
    finalText:
      "Gain global mobility, dual citizenship, and access to a fast-growing economy through Turkey's flexible CBI framework.",
    faqTitle: "Frequently Asked Questions: Turkey Citizenship by Investment",
    faqs: [
      "What is the Turkey Citizenship by Investment Program?",
      "How long does it take to obtain Turkish citizenship?",
      "Is Turkish citizenship permanent?",
      "Who can be included in the application?",
      "Is residency in Turkey required before or after approval?",
      "How strong is the Turkish passport for travel?",
      "What investment routes are available?",
      "How can advisory support help with the application?",
    ],
  },
  ar: {
    eyebrow: "مستقبل بجنسية تركية: بوابة نحو اوروبا وما بعدها",
    heroTitle: "برنامج الجنسية التركية عبر الاستثمار",
    heroLead:
      "احصل على الجنسية التركية عبر شراء عقار بقيمة 400,000 دولار مع مسار يمكن ان يكتمل خلال 3-6 اشهر.",
    heroBody:
      "منذ اطلاقه في 2017، جذب البرنامج الاف المستثمرين الباحثين عن تنقل عالمي اوسع ونمو الاعمال ومستقبل اكثر امانا. يتيح الوصول الى اكثر من 110 دولة بدون تاشيرة او بتاشيرة عند الوصول بما فيها اليابان.",
    ctaPrimary: "تحدث مع خبير",
    ctaSecondary: "اطلب عرض سعر",
    eligibilityTitle: "الاهلية وخيارات الاستثمار",
    eligibilityIntro:
      "يشترط ان يكون مقدم الطلب الرئيسي بعمر 18 سنة او اكثر، ويجتاز الفحص الامني، ويكمل مسارا استثماريا معتمدا.",
    investmentCards: [
      {
        title: "شراء عقار",
        minimum: "الحد الادنى: 400,000 دولار",
        desc: "شراء عقار مؤهل مع الالتزام بفترة احتفاظ لا تقل عن 3 سنوات للتاهل للجنسية.",
        note: "يمكن ان يكون الاستثمار منزلا او مكتبا او عقارا معتمدا.",
      },
      {
        title: "استثمار راسمالي ثابت",
        minimum: "الحد الادنى: 500,000 دولار",
        desc: "استثمار راسمالي يطابق اشتراطات البرنامج وفق الضوابط الحكومية.",
        note: "يخضع للتحقق من الجهات المختصة.",
      },
      {
        title: "وديعة بنكية او سندات او صناديق",
        minimum: "الحد الادنى: 500,000 دولار",
        desc: "التاهل عبر وديعة بنكية او سندات حكومية او صناديق استثمار معتمدة.",
        note: "تطبق فترات احتفاظ حسب المسار المختار.",
      },
    ],
    processTitle: "خطوات التقديم",
    processIntro: "فريقنا يدير العملية بسرعة وامان وسرية من البداية حتى الاصدار.",
    processSteps: [
      "استشارة اولية وتقييم الاهلية",
      "تحضير المستندات والتقديم والفحص الامني",
      "موافقة مبدئية ثم استكمال الاستثمار",
      "اعتماد الجنسية واصدار الجواز",
    ],
    processTime: "المدة التقديرية: حوالي 3-6 اشهر",
    finalTitle: "افتح مستقبلك مع الجنسية التركية",
    finalText:
      "احصل على تنقل عالمي اوسع وجنسية مزدوجة والوصول الى اقتصاد سريع النمو عبر برنامج تركيا المرن.",
    faqTitle: "الاسئلة الشائعة: برنامج الجنسية التركية عبر الاستثمار",
    faqs: [
      "ما هو برنامج الجنسية التركية عبر الاستثمار؟",
      "كم تستغرق المعالجة للحصول على الجنسية التركية؟",
      "هل الجنسية التركية دائمة؟",
      "من يمكن اضافته ضمن الطلب؟",
      "هل تتطلب الجنسية اقامة قبل او بعد الموافقة؟",
      "ما قوة الجواز التركي للسفر؟",
      "ما هي مسارات الاستثمار المتاحة؟",
      "كيف يساعد الدعم الاستشاري في تنظيم الملف؟",
    ],
  },
} as const;

const antiguaVisuals = {
  hero: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1400&h=900&fit=crop",
  ndf: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=600&fit=crop",
  uwi: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&h=600&fit=crop",
  realEstate: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&h=600&fit=crop",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
};

const stKittsVisuals = {
  hero: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=1400&h=900&fit=crop",
  sisc: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=900&h=600&fit=crop",
  publicBenefit: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=600&fit=crop",
  realEstate: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&h=600&fit=crop",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=800&fit=crop",
};

const saintLuciaVisuals = {
  hero: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1400&h=900&fit=crop",
  nef: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=600&fit=crop",
  realEstate: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&h=600&fit=crop",
  bonds: "https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?w=900&h=600&fit=crop",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
};

const dominicaVisuals = {
  hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=900&fit=crop",
  edf: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=600&fit=crop",
  realEstate: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&h=600&fit=crop",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&h=600&fit=crop",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=800&fit=crop",
};

const turkiyeVisuals = {
  hero: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&h=900&fit=crop",
  realEstate: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&h=600&fit=crop",
  capital: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=900&h=600&fit=crop",
  bonds: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=600&fit=crop",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  lifestyle: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop",
};

const dailyVisualQueries: Record<string, Record<string, string>> = {
  "antigua-barbuda": {
    hero: "Antigua Barbuda beach aerial Caribbean",
    ndf: "investment documents finance consulting",
    uwi: "university education campus students",
    realEstate: "caribbean luxury villa beachfront",
    process: "business meeting consultation office",
    lifestyle: "caribbean yacht tropical sea luxury",
  },
  "st-kitts-nevis": {
    hero: "st kitts nevis caribbean island coastline",
    sisc: "government contribution finance strategy",
    publicBenefit: "infrastructure development city project",
    realEstate: "luxury condo villa caribbean",
    process: "passport application legal documents",
    lifestyle: "caribbean resort private beach lifestyle",
  },
  "saint-lucia": {
    hero: "saint lucia pitons beach tropical",
    nef: "economic fund finance planning",
    realEstate: "hotel villa condominium caribbean",
    bonds: "government bonds investment market",
    process: "application approval paperwork office",
    lifestyle: "saint lucia ocean sunset lifestyle",
  },
  dominica: {
    hero: "dominica caribbean rainforest coastline",
    edf: "economic diversification fund finance planning",
    realEstate: "dominica real estate caribbean villa",
    family: "family future planning lifestyle",
    process: "passport application compliance paperwork",
    lifestyle: "dominica nature hot springs tropical lifestyle",
  },
  turkiye: {
    hero: "turkey istanbul skyline bosphorus",
    realEstate: "istanbul modern apartment real estate",
    capital: "business investment finance turkey",
    bonds: "government bonds investment market",
    process: "citizenship application legal documents",
    lifestyle: "turkey culture city lifestyle",
  },
};

function getDailySeed() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return Number(`${y}${m}${d}`);
}

function getDailyUnsplashUrl(query: string, size: string, offset: number) {
  const seed = getDailySeed() + offset;
  return `https://source.unsplash.com/${size}/?${encodeURIComponent(query)}&sig=${seed}`;
}

function getDailyVisuals<T extends Record<string, string>>(country: string, fallback: T): T {
  const queries = dailyVisualQueries[country] ?? {};
  const keys = Object.keys(fallback) as (keyof T)[];

  const next = {} as T;
  keys.forEach((key, idx) => {
    const keyName = String(key);
    const query = queries[keyName] ?? `${country} citizenship by investment`;
    const size = keyName === "hero" || keyName === "process" || keyName === "lifestyle" ? "1400x900" : "900x600";
    next[key] = getDailyUnsplashUrl(query, size, idx) as T[keyof T];
  });

  return next;
}

type AntiguaNewsItem = {
  title: string;
  url: string;
  image: string;
  source?: string;
};

async function fetchAntiguaNews(): Promise<AntiguaNewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent('"Antigua and Barbuda citizenship by investment"')}&apiKey=${apiKey}&pageSize=6&sortBy=publishedAt&language=en`;

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      articles?: Array<{
        title?: string;
        url?: string;
        urlToImage?: string;
        source?: { name?: string };
      }>;
    };

    return (data.articles ?? [])
      .filter((a) => a.title && a.url && a.urlToImage)
      .slice(0, 6)
      .map((a) => ({
        title: a.title as string,
        url: a.url as string,
        image: a.urlToImage as string,
        source: a.source?.name,
      }));
  } catch {
    return [];
  }
}

async function fetchStKittsNews(): Promise<AntiguaNewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent('"St Kitts and Nevis citizenship by investment"')}&apiKey=${apiKey}&pageSize=6&sortBy=publishedAt&language=en`;

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      articles?: Array<{
        title?: string;
        url?: string;
        urlToImage?: string;
        source?: { name?: string };
      }>;
    };

    return (data.articles ?? [])
      .filter((a) => a.title && a.url && a.urlToImage)
      .slice(0, 6)
      .map((a) => ({
        title: a.title as string,
        url: a.url as string,
        image: a.urlToImage as string,
        source: a.source?.name,
      }));
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return [
    { country: "antigua-barbuda" },
    { country: "st-kitts-nevis" },
    { country: "saint-lucia" },
    { country: "dominica" },
    { country: "turkiye" },
  ];
}

export default async function SecondPassportCountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";

  const countryKey = country as CountrySlug;
  const countryData = countryContent[countryKey] ?? countryContent["antigua-barbuda"];
  const content = lang === "ar" ? countryData.ar : countryData.en;
  const isArabic = lang === "ar";
  const isAntigua = country === "antigua-barbuda";
  const isStKitts = country === "st-kitts-nevis";
  const isSaintLucia = country === "saint-lucia";
  const isDominica = country === "dominica";
  const isTurkiye = country === "turkiye";
  const isPremiumCountry = isAntigua || isStKitts || isSaintLucia || isDominica || isTurkiye;
  const extendedContent = isAntigua
    ? (isArabic ? antiguaExtendedContent.ar : antiguaExtendedContent.en)
    : isStKitts
      ? (isArabic ? stKittsExtendedContent.ar : stKittsExtendedContent.en)
      : isSaintLucia
        ? (isArabic ? saintLuciaExtendedContent.ar : saintLuciaExtendedContent.en)
        : isDominica
          ? (isArabic ? dominicaExtendedContent.ar : dominicaExtendedContent.en)
          : isTurkiye
            ? (isArabic ? turkiyeExtendedContent.ar : turkiyeExtendedContent.en)
            : null;
  const baseVisuals = isAntigua
    ? antiguaVisuals
    : isStKitts
      ? stKittsVisuals
      : isSaintLucia
        ? saintLuciaVisuals
        : isDominica
          ? dominicaVisuals
          : isTurkiye
            ? turkiyeVisuals
            : null;
  const visuals = baseVisuals ? getDailyVisuals(country, baseVisuals) : null;
  const antiguaNews = isAntigua ? await fetchAntiguaNews() : [];
  const stKittsNews = isStKitts ? await fetchStKittsNews() : [];
  const premiumNews = isAntigua ? antiguaNews : isStKitts ? stKittsNews : [];
  const whatsappHelpUrl = `https://wa.me/97142648831?text=${encodeURIComponent(
    `Hello, I want help with ${content.title}`
  )}`;
  const whatsappStartUrl = `https://wa.me/97142648831?text=${encodeURIComponent(
    `Hello, I want to start my ${content.title} citizenship application`
  )}`;
  const pageBgClass = isTurkiye
    ? "bg-white"
    : isPremiumCountry
      ? "bg-[#111111]"
      : "bg-gradient-to-b from-gray-50 to-white";
  const backLinkClass = isPremiumCountry
    ? isTurkiye
      ? "text-gray-600 hover:text-gray-900"
      : "text-[#808080] hover:text-[#F8E48B]"
    : "text-gray-600 hover:text-gray-900";
  const premiumTheme = isPremiumCountry
    ? isTurkiye
      ? {
          sectionBg: "#FFFFFF",
          sectionBorder: "#E5E7EB",
          cardBorder: "#E5E7EB",
          accent: "#C08B2D",
          heading: "#111827",
          lead: "#1F2937",
          body: "#4B5563",
          muted: "#6B7280",
          buttonBg: "#111827",
          buttonText: "#FFFFFF",
          outline: "#111827",
          heroOverlay: "linear-gradient(to left, rgba(255,255,255,0.15), rgba(255,255,255,0.85))",
          cardOverlay: "linear-gradient(to top, rgba(17,24,39,0.2), rgba(255,255,255,0.0))",
          processOverlay: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.75))",
        }
      : {
          sectionBg: "#181818",
          sectionBorder: "#BF9C4A66",
          cardBorder: "#BF9C4A55",
          accent: "#BF9C4A",
          heading: "#F2D56D",
          lead: "#F8E48B",
          body: "#808080",
          muted: "#808080",
          buttonBg: "#F2D56D",
          buttonText: "#181818",
          outline: "#BF9C4A",
          heroOverlay: "linear-gradient(to left, rgba(24,24,24,0.2), rgba(24,24,24,0.75))",
          cardOverlay: "linear-gradient(to top, rgba(24,24,24,0.7), rgba(24,24,24,0.15))",
          processOverlay: "linear-gradient(to right, rgba(24,24,24,0.1), rgba(24,24,24,0.65))",
        }
    : null;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`min-h-screen py-20 px-4 md:px-8 ${isArabic ? "text-right" : "text-left"} ${pageBgClass}`}
    >
      <div className="max-w-[1250px] mx-auto pt-16">
        <Link
          href={`/${lang}/second-passport`}
          className={`inline-flex items-center text-sm font-semibold mb-6 ${backLinkClass}`}
        >
          {isArabic ? "العودة إلى برامج الجواز الثاني →" : "← Back to second passport programs"}
        </Link>

        {!isPremiumCountry && (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{content.title}</h1>
            <p className="text-lg text-gray-600 mb-3">{content.subtitle}</p>
            <p className="text-sm font-semibold text-amber-700 mb-8">{content.timeline}</p>
          </>
        )}

        {isPremiumCountry && extendedContent && visuals && (
          <section
            className="mb-10 rounded-3xl border overflow-hidden"
            style={{ borderColor: premiumTheme?.sectionBorder, backgroundColor: premiumTheme?.sectionBg }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-8 lg:p-10">
                <p className="text-xs md:text-sm uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: premiumTheme?.accent }}>
                  {extendedContent.eyebrow}
                </p>
                <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: premiumTheme?.heading }}>{extendedContent.heroTitle}</h2>
                <p className="text-base md:text-lg mb-3" style={{ color: premiumTheme?.lead }}>{extendedContent.heroLead}</p>
                <p className="mb-6" style={{ color: premiumTheme?.body }}>{extendedContent.heroBody}</p>
                <p className="text-sm font-semibold mb-6" style={{ color: premiumTheme?.accent }}>{content.timeline}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappHelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full text-sm font-semibold px-5 py-2.5"
                    style={{ backgroundColor: premiumTheme?.buttonBg, color: premiumTheme?.buttonText }}
                  >
                    {extendedContent.ctaPrimary}
                  </a>
                  <a
                    href={`/${lang}/contact`}
                    className="inline-flex items-center rounded-full border text-sm font-semibold px-5 py-2.5"
                    style={{ borderColor: premiumTheme?.outline, color: premiumTheme?.heading }}
                  >
                    {extendedContent.ctaSecondary}
                  </a>
                </div>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full">
                <FallbackImage
                  src={visuals.hero}
                  fallbackSrc={baseVisuals?.hero}
                  alt={extendedContent.heroTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: premiumTheme?.heroOverlay }} />
              </div>
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            className={`rounded-2xl border p-6 ${isPremiumCountry ? "" : "bg-white border-gray-100 shadow"}`}
            style={isPremiumCountry ? { borderColor: premiumTheme?.cardBorder, backgroundColor: premiumTheme?.sectionBg } : undefined}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: isPremiumCountry ? premiumTheme?.heading : "#111827" }}>
              {isArabic ? "أهم المزايا" : "Key Benefits"}
            </h2>
            <ul className="space-y-3" style={{ color: isPremiumCountry ? premiumTheme?.body : "#374151" }}>
              {content.benefits.map((item) => (
                <li key={item} className="flex gap-2">
                  <span style={{ color: isPremiumCountry ? premiumTheme?.accent : "#f59e0b" }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-2xl border p-6 ${isPremiumCountry ? "" : "bg-white border-gray-100 shadow"}`}
            style={isPremiumCountry ? { borderColor: premiumTheme?.cardBorder, backgroundColor: premiumTheme?.sectionBg } : undefined}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: isPremiumCountry ? premiumTheme?.heading : "#111827" }}>
              {isArabic ? "خيارات الاستثمار" : "Investment Routes"}
            </h2>
            <ul className="space-y-3" style={{ color: isPremiumCountry ? premiumTheme?.body : "#374151" }}>
              {content.options.map((item) => (
                <li key={item} className="flex gap-2">
                  <span style={{ color: isPremiumCountry ? premiumTheme?.accent : "#f59e0b" }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isPremiumCountry && extendedContent && visuals && (
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: premiumTheme?.heading }}>{extendedContent.eligibilityTitle}</h2>
            <p className="mb-6" style={{ color: premiumTheme?.body }}>{extendedContent.eligibilityIntro}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {extendedContent.investmentCards.map((card, idx) => {
                const cardImg = isAntigua
                  ? (idx === 0 ? antiguaVisuals.ndf : idx === 1 ? antiguaVisuals.uwi : antiguaVisuals.realEstate)
                  : isStKitts
                    ? (idx === 0 ? stKittsVisuals.sisc : idx === 1 ? stKittsVisuals.publicBenefit : stKittsVisuals.realEstate)
                    : isSaintLucia
                      ? (idx === 0 ? saintLuciaVisuals.nef : idx === 1 ? saintLuciaVisuals.realEstate : saintLuciaVisuals.bonds)
                      : isDominica
                        ? (idx === 0 ? dominicaVisuals.edf : idx === 1 ? dominicaVisuals.realEstate : dominicaVisuals.family)
                        : (idx === 0 ? turkiyeVisuals.realEstate : idx === 1 ? turkiyeVisuals.capital : turkiyeVisuals.bonds);
                return (
                  <article
                    key={card.title}
                    className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: premiumTheme?.cardBorder, backgroundColor: premiumTheme?.sectionBg }}
                  >
                    <div className="relative h-40">
                      <img src={cardImg} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: premiumTheme?.cardOverlay }} />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2" style={{ color: premiumTheme?.heading }}>{card.title}</h3>
                      <p className="text-sm font-semibold mb-3" style={{ color: premiumTheme?.accent }}>{card.minimum}</p>
                      <p className="text-sm mb-2" style={{ color: premiumTheme?.body }}>{card.desc}</p>
                      {card.note && <p className="text-xs" style={{ color: premiumTheme?.muted }}>{card.note}</p>}
                    </div>
                  </article>
                );
              })}
            </div>

            <div
              className="rounded-2xl border overflow-hidden mb-8"
              style={{ borderColor: premiumTheme?.cardBorder, backgroundColor: premiumTheme?.sectionBg }}
            >
              <div className="grid lg:grid-cols-5">
                <div className="relative min-h-[240px] lg:col-span-2">
                  <FallbackImage
                    src={visuals.process}
                    fallbackSrc={baseVisuals?.process}
                    alt="Application process"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: premiumTheme?.processOverlay }} />
                </div>
                <div className="p-6 lg:col-span-3">
                  <h3 className="text-xl font-bold mb-2" style={{ color: premiumTheme?.heading }}>{extendedContent.processTitle}</h3>
                  <p className="mb-4" style={{ color: premiumTheme?.body }}>{extendedContent.processIntro}</p>
                  <ol className="space-y-2 list-decimal pl-5" style={{ color: premiumTheme?.body }}>
                    {extendedContent.processSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-4 text-sm font-semibold" style={{ color: premiumTheme?.accent }}>{extendedContent.processTime}</p>
                </div>
              </div>
            </div>

            <div
              className="relative rounded-2xl border overflow-hidden p-6 mb-8"
              style={{ borderColor: premiumTheme?.sectionBorder, backgroundColor: premiumTheme?.sectionBg }}
            >
              <div className="absolute inset-0">
                <FallbackImage
                  src={visuals.lifestyle}
                  fallbackSrc={baseVisuals?.lifestyle}
                  alt="Island lifestyle"
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  loading="lazy"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: premiumTheme?.heading }}>{extendedContent.finalTitle}</h3>
                <p className="mb-4" style={{ color: premiumTheme?.lead }}>{extendedContent.finalText}</p>
              </div>
              <a
                href={whatsappStartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center rounded-full text-sm font-semibold px-5 py-2.5"
                style={{ backgroundColor: premiumTheme?.buttonBg, color: premiumTheme?.buttonText }}
              >
                {extendedContent.ctaPrimary}
              </a>
            </div>

            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: premiumTheme?.cardBorder, backgroundColor: premiumTheme?.sectionBg }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: premiumTheme?.heading }}>{extendedContent.faqTitle}</h3>
              <ul className="space-y-2" style={{ color: premiumTheme?.body }}>
                {extendedContent.faqs.map((q) => (
                  <li key={q}><span style={{ color: premiumTheme?.accent }}>•</span> {q}</li>
                ))}
              </ul>
            </div>

          </section>
        )}

        <div
          className={`rounded-2xl border p-5 text-sm ${isPremiumCountry ? "" : "border-amber-200 bg-amber-50 text-amber-900"}`}
          style={
            isPremiumCountry
              ? { borderColor: premiumTheme?.sectionBorder, backgroundColor: premiumTheme?.sectionBg, color: premiumTheme?.body }
              : undefined
          }
        >
          <p className="mb-2">
            {isArabic
              ? "تنبيه: الشروط والمبالغ قابلة للتحديث من الجهات الرسمية."
              : "Note: Program rules and thresholds can change by official government updates."}
          </p>
        </div>

        {(isAntigua || isStKitts) && premiumNews.length > 0 && (
          <section className="mt-8 rounded-2xl border p-6" style={{ borderColor: "#BF9C4A55", backgroundColor: "#181818" }}>
            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#F2D56D" }}>
              {isArabic ? "الأخبار والتحديثات" : "News & Updates"}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {premiumNews.map((news) => (
                <article key={news.url} className="rounded-xl border overflow-hidden" style={{ borderColor: "#BF9C4A44", backgroundColor: "#111111" }}>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" aria-label={news.title}>
                    <img src={news.image} alt={news.title} className="w-full h-36 object-cover" loading="lazy" />
                  </a>
                  <div className="p-3">
                    <a href={news.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#F8E48B" }}>
                      <h4 className="font-semibold leading-snug line-clamp-3">{news.title}</h4>
                    </a>
                    {news.source && <p className="text-xs mt-2" style={{ color: "#808080" }}>{news.source}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
