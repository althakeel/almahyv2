'use client';

import { useState } from 'react';
import { Locale } from '@/lib/translations';

interface FAQProps {
  locale: Locale;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<Locale, FAQItem[]> = {
  en: [
    {
      question: "How much do your accounting or tax services cost?",
      answer: "Pricing depends on your company size, volume, and needs. Contact us for a custom quote."
    },
    {
      question: "Do you offer monthly or annual packages?",
      answer: "Yes, we offer both options tailored to your business."
    },
    {
      question: "Are you registered with the Federal Tax Authority (FTA)?",
      answer: "Yes, we are registered and approved by the FTA."
    },
    {
      question: "Will you represent us before the FTA in case of an audit?",
      answer: "Yes, we provide full representation before the FTA."
    },
    {
      question: "Do you accept electronic data?",
      answer: "Yes, we accept electronic data and work with all major accounting systems."
    },
    {
      question: "Do you help organize old or overdue files?",
      answer: "Yes, we can help you organize and digitize your records."
    },
  ],
  ar: [
    {
      question: "كم تكلف خدمات المحاسبة أو الضرائب؟",
      answer: "تختلف الأسعار حسب حجم الشركة واحتياجاتك. اتصل بنا للحصول على عرض سعر مخصص."
    },
    {
      question: "هل تقدمون باقات شهرية أو سنوية؟",
      answer: "نعم، نقدم باقات شهرية وسنوية حسب متطلبات عملك."
    },
    {
      question: "هل أنتم مسجلون لدى الهيئة الاتحادية للضرائب؟",
      answer: "نعم، نحن وكلاء ضرائب معتمدون لدى الهيئة الاتحادية للضرائب."
    },
    {
      question: "هل ستمثلوننا أمام الهيئة في حالة التدقيق؟",
      answer: "نعم، نقدم التمثيل الكامل أمام الهيئة الاتحادية للضرائب."
    },
    {
      question: "هل تقبلون البيانات إلكترونياً؟",
      answer: "نعم، نقبل البيانات الإلكترونية ونعمل مع جميع الأنظمة المحاسبية الرئيسية."
    },
    {
      question: "هل تساعدون في تنظيم الملفات القديمة أو المتأخرة؟",
      answer: "نعم، يمكننا مساعدتك في تنظيم وأرشفة سجلاتك."
    },
  ]
};

export default function FAQ({ locale }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = faqData[locale];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Title & Icon */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
              {locale === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-xl">
              {locale === 'en'
                ? 'Find answers to the most common questions about our accounting and tax services. If you need more help, contact us directly!'
                : 'اعثر على إجابات لأكثر الأسئلة شيوعًا حول خدماتنا المحاسبية والضريبية. إذا كنت بحاجة إلى مزيد من المساعدة، اتصل بنا مباشرة!'}
            </p>
          </div>
          <div className="hidden md:block">
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FEF3C7"/><text x="32" y="42" textAnchor="middle" fontSize="32" fill="#F59E42" fontFamily="Arial, sans-serif">?</text></svg>
          </div>
        </div>
        {/* FAQ Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white shadow-lg border border-gray-200 transition-all duration-300 overflow-hidden px-0 md:px-2"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-8 py-7 text-left group focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <span className="font-bold text-gray-900 text-lg md:text-xl pr-4 group-hover:text-yellow-700 transition-colors">
                  {faq.question}
                </span>
                <span className={`text-gray-400 text-3xl font-bold flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {/* Answer */}
              <div
                className={`px-8 pb-7 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                style={{overflow: 'hidden'}}
              >
                <p className="text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
