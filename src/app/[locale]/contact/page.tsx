import { translations, Locale } from "@/lib/translations";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];

  return (
    <>
      <div className="bg-gradient-to-b from-[#0b0f1c] via-[#111827] to-[#0a0d17] text-white py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contactUs}
          </h1>
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded" style={{backgroundColor: '#F8E48B'}}></div>
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#F8E48B'}}></div>
              <div className="h-1 w-12 rounded" style={{backgroundColor: '#F8E48B'}}></div>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t.contactIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t.sendMessage}
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  {t.formName}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/50 rounded-lg focus:border-transparent outline-none transition focus:ring-4 focus:ring-[#F8E48B]/30"
                  placeholder={t.formNamePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  {t.formEmail}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/50 rounded-lg focus:border-transparent outline-none transition focus:ring-4 focus:ring-[#F8E48B]/30"
                  placeholder={t.formEmailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  {t.formPhone}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/50 rounded-lg focus:border-transparent outline-none transition focus:ring-4 focus:ring-[#F8E48B]/30"
                  placeholder={t.formPhonePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  {t.formMessage}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/50 rounded-lg focus:border-transparent outline-none transition resize-none focus:ring-4 focus:ring-[#F8E48B]/30"
                  placeholder={t.formMessagePlaceholder}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full text-gray-900 font-bold py-4 rounded-full transition-colors shadow-lg hover:brightness-110"
                style={{backgroundColor: '#F8E48B'}}
              >
                {t.formSubmit}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg border-t-4" style={{borderTopColor: '#F8E48B'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">📍</div>
                <h3 className="text-xl font-bold text-white">{t.address}</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                2nd Floor, Al Saqr Business Tower<br />
                Sheikh Zayed Rd, DIFC<br />
                Dubai, United Arab Emirates
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg border-t-4" style={{borderTopColor: '#BF9C4A'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">📧</div>
                <h3 className="text-xl font-bold text-white">{t.email}</h3>
              </div>
              <p className="text-white/80">
                <a href="mailto:info@almahy.com" className="transition" style={{color: '#F2D56D'}}>
                  info@almahy.com
                </a>
                <br />
                <a href="mailto:legal@almahy.com" className="transition" style={{color: '#F2D56D'}}>
                  legal@almahy.com
                </a>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg border-t-4" style={{borderTopColor: '#808080'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">📞</div>
                <h3 className="text-xl font-bold text-white">{t.phone}</h3>
              </div>
              <p className="text-white/80">
                <a href="tel:+97142648831" className="transition text-lg font-semibold" style={{color: '#F2D56D'}}>
                  +971 4264 8831
                </a>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg border-t-4" style={{borderTopColor: '#181818'}}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">🕒</div>
                <h3 className="text-xl font-bold text-white">{t.hours}</h3>
              </div>
              <p className="text-white/80">
                {t.hoursWeekdays}<br />
                {t.hoursWeekend}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Google Maps Section - Full Width */}
      <div className="w-full bg-[#0a0d17] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {lang === 'en' ? 'Find Us on the Map' : 'اعثر علينا على الخريطة'}
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-20 rounded" style={{backgroundColor: '#F8E48B'}}></div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.684205591655!2d55.27354838885498!3d25.213870100000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f5fdaba03%3A0x37097f69d9d98181!2sAlmahy%20Legal%20Services!5e0!3m2!1sen!2sae!4v1771139862934!5m2!1sen!2sae" 
            width="100%" 
            height="450" 
            style={{border: 0}} 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
