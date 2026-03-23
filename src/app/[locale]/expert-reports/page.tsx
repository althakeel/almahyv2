
import Image from "next/image";
import { Locale, translations } from "@/lib/translations";


export default async function ExpertReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];
  const isRTL = lang === "ar";

  // Localized content for both languages
  const content = {
    en: {
      heroTitle: "Expert Financial & Legal Reports",
      heroDesc: "Professional, evidence-based reports for legal cases, arbitration, and corporate disputes.",
      servicesTitle: "Our Expert Services",
      servicesDesc: "We specialize in the preparation of <b>Expert Financial Reports</b> and <b>Expert Legal Reports</b> designed to support legal cases, arbitration proceedings, corporate disputes, and regulatory matters. Our reports are prepared with professional accuracy, detailed financial analysis, and clear documentation to ensure they meet the standards required by courts, law firms, and regulatory authorities.",
      deliverTitle: "What We Deliver",
      deliverList: [
        "Expert Financial Reports for Court and Arbitration",
        "Expert Legal Reports for Dispute Resolution",
        "Forensic Accounting and Financial Investigation",
        "Litigation Support and Financial Expert Analysis",
        "Business Valuation Reports",
        "Financial Damage and Loss Assessment",
        "Independent Financial Review for Legal Cases",
        "Corporate Financial Dispute Analysis",
      ],
      trustedTitle: "Trusted by Legal & Corporate Clients",
      trustedDesc1: "We assist law firms, corporations, government entities, and private clients by providing credible financial analysis and expert reporting. Our objective approach ensures that every report delivers clear financial insight, transparency, and professional integrity.",
      trustedDesc2: "Whether you require an Expert Financial Report for litigation, a forensic accounting analysis, or an independent expert legal opinion, our team provides reliable reporting to support your case and decision-making process.",
      whyTitle: "Why Choose Us?",
      whyList: [
        "Professionally structured, evidence-based, and clear reports",
        "Prepared by experienced financial and legal experts",
        "Objective, independent, and reliable findings",
        "Compliant with court and regulatory standards",
        "Trusted by law firms, corporations, and government entities",
      ],
      cta: "For expert reports, forensic analysis, or legal opinions, contact our team today.",
    },
    ar: {
      heroTitle: "تقارير مالية وقانونية خبرة",
      heroDesc: "تقارير مهنية قائمة على الأدلة لدعم القضايا القانونية والتحكيم والنزاعات التجارية.",
      servicesTitle: "خدماتنا المتخصصة",
      servicesDesc: "نحن متخصصون في إعداد <b>تقارير مالية خبرة</b> و<b>تقارير قانونية خبرة</b> لدعم القضايا القانونية، والتحكيم، والنزاعات التجارية، والمسائل التنظيمية. يتم إعداد تقاريرنا بدقة مهنية وتحليل مالي مفصل وتوثيق واضح لضمان مطابقتها للمعايير المطلوبة من المحاكم ومكاتب المحاماة والجهات التنظيمية.",
      deliverTitle: "ماذا نقدم",
      deliverList: [
        "تقارير مالية خبرة للمحاكم والتحكيم",
        "تقارير قانونية خبرة لحل النزاعات",
        "محاسبة جنائية وتحقيق مالي",
        "دعم القضايا وتحليل خبير مالي",
        "تقارير تقييم الأعمال",
        "تقييم الأضرار والخسائر المالية",
        "مراجعة مالية مستقلة للقضايا القانونية",
        "تحليل النزاعات المالية للشركات",
      ],
      trustedTitle: "موثوق به من قبل العملاء القانونيين والتجاريين",
      trustedDesc1: "نساعد مكاتب المحاماة والشركات والجهات الحكومية والعملاء الأفراد من خلال تقديم تحليل مالي موثوق وتقارير خبرة. يضمن نهجنا الموضوعي أن يقدم كل تقرير رؤية مالية واضحة وشفافية ونزاهة مهنية.",
      trustedDesc2: "سواء كنت بحاجة إلى تقرير مالي خبير للتقاضي، أو تحليل محاسبي جنائي، أو رأي قانوني خبير مستقل، فإن فريقنا يقدم تقارير موثوقة لدعم قضيتك وقراراتك.",
      whyTitle: "لماذا تختارنا؟",
      whyList: [
        "تقارير منظمة ومبنية على الأدلة وواضحة",
        "إعداد من قبل خبراء ماليين وقانونيين ذوي خبرة",
        "نتائج موضوعية ومستقلة وموثوقة",
        "مطابقة لمعايير المحاكم والجهات التنظيمية",
        "موثوق به من قبل مكاتب المحاماة والشركات والجهات الحكومية",
      ],
      cta: "للحصول على تقارير خبرة أو تحليل جنائي أو رأي قانوني، تواصل مع فريقنا اليوم.",
    },
  };
  const c = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181c23] to-[#23272f] py-0 px-0" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <div className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <Image src="/assets/expert-reports/hero-dark.jpg" alt="Expert Reports Banner" fill priority className="object-cover w-full h-full brightness-[.55]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{c.heroTitle}</h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-4 font-medium drop-shadow" dangerouslySetInnerHTML={{ __html: c.heroDesc }} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-10 pb-16 px-4 md:px-8">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">{c.servicesTitle}</h2>
          <p className="text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: c.servicesDesc }} />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6 justify-center">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#23272f] to-[#181c23] aspect-[4/3] flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=600&q=80" alt="Financial Analysis" fill className="object-cover w-full h-full" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#23272f] to-[#181c23] aspect-[4/3] flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80" alt="Legal Expert" fill className="object-cover w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-6 justify-center">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#23272f] to-[#181c23] aspect-[4/3] flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Forensic Accounting" fill className="object-cover w-full h-full" />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#23272f] to-[#181c23] aspect-[4/3] flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Arbitration" fill className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">{c.deliverTitle}</h2>
          <ul className="list-disc pl-6 text-gray-200 space-y-2">
            {c.deliverList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">{c.trustedTitle}</h2>
          <p className="text-gray-200 mb-4">{c.trustedDesc1}</p>
          <p className="text-gray-200 mb-4">{c.trustedDesc2}</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">{c.whyTitle}</h2>
          <ul className="list-disc pl-6 text-gray-200 space-y-2">
            {c.whyList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="text-center mt-12">
          <span className="inline-block bg-yellow-400/10 text-yellow-200 font-semibold px-6 py-3 rounded-full text-lg shadow">
            {c.cta}
          </span>
        </div>
      </div>
    </div>
  );
}
