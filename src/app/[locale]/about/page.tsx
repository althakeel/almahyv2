import { translations, Locale } from "@/lib/translations";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <p className="font-semibold mb-2 tracking-wider uppercase text-sm" style={{color: '#F8E48B'}}>
            {lang === 'en' ? 'We Define The Success' : 'نحدد النجاح'}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {lang === 'en' ? 'About us' : 'من نحن'}
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {lang === 'en' ? 'Home / About us' : 'الرئيسية / من نحن'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href={`/${lang}/contact`}
              className="text-gray-900 font-bold px-8 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              style={{backgroundColor: '#F8E48B'}}
            >
              📅 {lang === 'en' ? 'Book Free Consultation' : 'احجز استشارة مجانية'}
            </Link>
            <a 
              href="tel:+97142648831"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-3 rounded-full transition-all flex items-center gap-2"
            >
              📞 {lang === 'en' ? 'Call Us' : 'اتصل بنا'}
            </a>
          </div>
        </div>
      </div>

      {/* Main About Section */}
      <div className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="font-semibold mb-3 tracking-wide uppercase text-sm" style={{color: '#F2D56D'}}>
                {lang === 'en' ? 'Welcome To Our Law Associates' : 'مرحبا بكم في شركة المحاماة'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {lang === 'en' ? 'Make your tax compliance the starting point for growing your business' : 'اجعل امتثالك الضريبي نقطة البداية لنمو عمل'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {t.aboutDesc1}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {t.aboutDesc2}
              </p>
              
              {/* Core Values */}
              <div className="space-y-3 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {lang === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F8E48B'}}></div>
                  <p className="text-gray-700 font-medium">{lang === 'en' ? 'Committed to delivering the finest' : 'ملتزمون بتقديم الأفضل'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F8E48B'}}></div>
                  <p className="text-gray-700 font-medium">{lang === 'en' ? 'Honest and transparent services' : 'خدمات صادقة وشفافة'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F8E48B'}}></div>
                  <p className="text-gray-700 font-medium">{lang === 'en' ? 'High marks of trust, business trust & integrity' : 'ثقة عالية ونزاهة'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F8E48B'}}></div>
                  <p className="text-gray-700 font-medium">{lang === 'en' ? 'Service' : 'خدمة'}</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800" 
                  alt="Team meeting" 
                  className="w-full h-[600px] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl -z-10" style={{backgroundColor: '#F8E48B'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800" 
                  alt="Professional workspace" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-2xl -z-10" style={{backgroundColor: '#BF9C4A'}}></div>
            </div>

            {/* Right Content */}
            <div className="order-1 lg:order-2">
              {/* Mission */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: 'rgba(248, 228, 139, 0.2)'}}>
                    🎯
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {t.missionTitle}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg pl-20">
                  {t.missionDesc}
                </p>
              </div>

              {/* Vision */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: 'rgba(191, 156, 74, 0.2)'}}>
                    👁️
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {t.visionTitle}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg pl-20">
                  {t.visionDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.whyChooseTitle}
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-24 rounded" style={{backgroundColor: '#F8E48B'}}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6" style={{backgroundColor: '#F8E48B'}}>
                ⚖️
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">{t.why1Title}</h4>
              <p className="text-gray-600 leading-relaxed">{t.why1Desc}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6" style={{backgroundColor: '#F8E48B'}}>
                🌍
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">{t.why2Title}</h4>
              <p className="text-gray-600 leading-relaxed">{t.why2Desc}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6" style={{backgroundColor: '#F8E48B'}}>
                💼
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">{t.why3Title}</h4>
              <p className="text-gray-600 leading-relaxed">{t.why3Desc}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6" style={{backgroundColor: '#F8E48B'}}>
                🤝
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-3">{t.why4Title}</h4>
              <p className="text-gray-600 leading-relaxed">{t.why4Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? 'Our Team' : 'فريقنا'}
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-24 rounded" style={{backgroundColor: '#F8E48B'}}></div>
            </div>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              {lang === 'en' ? 'Meet our dedicated staff who drive our success.' : 'تعرف على فريق العمل المتميز لدينا.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Example staff - replace with your real data and images */}
            {[
              {
                name: 'Ahmed Al Thakeel',
                position: lang === 'en' ? 'Managing Partner' : 'الشريك الإداري',
                photo: '/assets/team/ahmed.jpg',
              },
              {
                name: 'Sara Al Mansoori',
                position: lang === 'en' ? 'Senior Lawyer' : 'محامية أولى',
                photo: '/assets/team/sara.jpg',
              },
              {
                name: 'Mohammed Al Farsi',
                position: lang === 'en' ? 'Tax Consultant' : 'مستشار ضريبي',
                photo: '/assets/team/mohammed.jpg',
              },
              {
                name: 'Fatima Al Suwaidi',
                position: lang === 'en' ? 'Legal Advisor' : 'مستشارة قانونية',
                photo: '/assets/team/fatima.jpg',
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-[#F8E48B]">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-1">{member.name}</h4>
                <p className="text-gray-500 text-base">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 md:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {lang === 'en' ? 'Ready to Get Started?' : 'هل أنت مستعد للبدء؟'}
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {lang === 'en' ? 'Contact us today for a free consultation and discover how we can help your business succeed.' : 'اتصل بنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدة عملك على النجاح.'}
          </p>
          <Link 
            href={`/${lang}/contact`}
            className="inline-block text-gray-900 font-bold px-10 py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-lg"
            style={{backgroundColor: '#F8E48B'}}
          >
            {lang === 'en' ? 'CONNECT WITH US!' : 'تواصل معنا!'}
          </Link>
        </div>
      </div>
    </div>
  );
}
