"use client";

import Image from "next/image";
import { useState } from "react";
import { Locale } from "@/lib/translations";

interface ClientLogosMarqueeProps {
  locale: Locale;
}

const clientLogos = [
  "040031_4e4c054a279d43dbbb2e32def9e72924mv2-768x274.png",
  "1.png",
  "1613050665_logo.png",
  "1685008699800.png",
  "Asset-1-3-1-768x286.png",
  "ax-768x280.png",
  "BHM-capital-Logo-768x232.png",
  "Bonyan-Holding-Logo-sq-01-e1623654456180.png",
  "cropped-respect-services-logo-3.png",
  "da4hrg7jK2jcFpBjt6JYw5XMcWlBW9bMwfWf8mPx.png",
  "download-1.png",
  "download.png",
  "dsi-logo-dark-2020.png",
  "f8160898-1de9-4e45-8a47-6c3d54f86a3e_16x9_1200x676-768x432.png",
  "IMG-20241120-WA0060.png",
  "IMG-20241120-WA0067.png",
  "IMG-20241120-WA0075 (1).png",
  "IMG-20241120-WA0077 (1).png",
  "IMG-20241120-WA0078 (1).png",
  "IMG-20241121-WA0000 (1).png",
  "jointscopetechnologies_logo (1).png",
  "logo-1.png",
  "logo-2-768x146 (1).png",
  "logo-2-768x146.png",
  "logo-400-px.png",
  "Mansory-logo-1600x400-1-768x192.png",
  "Masha-Text-horizontal-logo-768x179.png",
  "Novo-Nordisk-Logo-768x480.png",
  "PGI-Group-Logo-01-1-768x630.png",
  "R.png",
  "Schneider-Electric-768x388.png",
  "tabarak_logo_03.png",
  "Tadbery-150-x-60-px.png",
  "the-ONE-Clinic-logo-768x463.png",
  "white_logo_transparent_background-2048x1229-1-768x461.png",
];

function LogoPill({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <li className="flex h-24 min-w-[220px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 shadow-sm">
      <img
        src={imgSrc}
        alt={alt}
        width={180}
        height={70}
        className="object-contain max-h-20 w-auto"
        onError={() => setImgSrc("/assets/logos/fallback.png")}
      />
    </li>
  );
}

export default function ClientLogosMarquee({ locale }: ClientLogosMarqueeProps) {
  const isArabic = locale === "ar";

  // duplicate logos for smooth infinite scroll
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">

        {/* Heading */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {isArabic ? "عملاؤنا" : "Our Clients"}
        </p>

        <h2 className="mt-3 text-center text-2xl md:text-3xl font-bold text-gray-900">
          {isArabic ? "موثوقون من شركات رائدة" : "Trusted by leading companies"}
        </h2>

        {/* Marquee */}
        <div className="relative mt-10 overflow-hidden h-32">
          {/* gradient fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ overflow: "hidden" }}
          >
            <ul
              className={`flex gap-4 mt-4 whitespace-nowrap ${isArabic ? 'flex-row-reverse' : ''}`}
              style={{
                width: '200%',
                animation: `${isArabic ? 'marquee-rtl' : 'marquee'} 40s linear infinite`
              }}
            >
              {logos.map((logo, index) => (
                <LogoPill
                  key={`${logo}-${index}`}
                  src={`/assets/logos/${logo}`}
                  alt={logo}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}