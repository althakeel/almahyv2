"use client";

import Link from "next/link";
import { Locale, translations } from "@/lib/translations";

interface CTAProps {
  locale?: string;
}

export default function CTA({ locale = "en" }: CTAProps) {
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];

  return (
    <section className="relative bg-[#1c1e2b] text-white py-14 md:py-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4a574]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d4a574]/10 border border-[#d4a574]/40 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-[#d4a574] rounded-full animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-[#d4a574] font-semibold">
                {t.gulfStar}
              </span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {t.servicesCTA}
              </h2>

              <p className="text-gray-400 max-w-xl">
                {t.servicesCTADesc}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"></span>
                {lang === 'ar' ? 'دعم 24/7' : '24/7 Support'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"></span>
                {lang === 'ar' ? 'فريق خبراء' : 'Expert Team'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"></span>
                {lang === 'ar' ? 'خدمة سريعة' : 'Fast Service'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"></span>
                {lang === 'ar' ? 'سرية' : 'Confidential'}
              </div>
            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="relative">

            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-10 text-center shadow-2xl hover:scale-105 transition">

              {/* ICON */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#d4a574]/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
              </div>

              {/* PHONE NUMBER */}
              <Link
                href="https://wa.me/971542185535?text=Hello%2C%20I%20would%20like%20to%20get%20accounting%20services"
                target="_blank"
                className="block text-3xl md:text-4xl font-bold mb-4 hover:opacity-90"
              >
                +971 5421 85535
              </Link>

              {/* TEXT */}
              <p className="text-sm uppercase tracking-widest text-white/80 mb-5">
                {lang === 'ar' ? 'تواصل معنا على واتساب' : 'Contact Us on WhatsApp'}
              </p>

              {/* BUTTON */}
              <Link
                href="https://wa.me/97142648831?text=Hello%2C%20I%20would%20like%20to%20get%20accounting%20services"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a574] rounded-lg font-semibold hover:bg-[#c9985f] transition"
              >
                {lang === 'ar' ? 'الدردشة على واتساب' : 'Chat on WhatsApp'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}