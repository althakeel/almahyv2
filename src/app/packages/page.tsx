'use client';

import Link from 'next/link';
import { useState } from 'react';
import FormModal from '@/components/FormModal';

const packagesData = {
  'Legal Services': [
    {
      name: 'Gold Plan',
      price: '10K',
      currency: 'AED',
      period: '/Monthly',
      icon: '⏰',
      features: [
        'Free Debtors Info. Collection',
        'Free Legal Notices',
        'Free Drafting Agreement',
        'Free Providing Legal Advice'
      ]
    },
    {
      name: 'VIP Plan',
      price: '15K',
      currency: 'AED',
      period: '/Monthly',
      icon: '🔒',
      featured: true,
      features: [
        'Include Gold Plan',
        'Free Notarized Legal Notice',
        'Free Cheque Execution',
        'Free Labor Case'
      ]
    },
    {
      name: 'Diamond Plan',
      price: 'Custom',
      currency: 'AED',
      period: '',
      icon: '🛡️',
      features: [
        'Contact our Sales Team'
      ]
    }
  ],
  'Corporate Services': [
    {
      name: 'Basic Plan',
      price: '4K',
      currency: 'AED',
      period: '/Monthly',
      icon: '⏰',
      features: [
        'License registration',
        'Immigration services',
        'Tax Consultancy',
        'Others'
      ]
    },
    {
      name: 'Premium Plan',
      price: '6K',
      currency: 'AED',
      period: '/Monthly',
      icon: '📋',
      featured: true,
      features: [
        'Basic Plan',
        'Tax filing',
        'VAT registration',
        'Trademark registration'
      ]
    },
    {
      name: 'Diamond Plan',
      price: '10K',
      currency: 'AED',
      period: '/Monthly',
      icon: '🛡️',
      features: [
        'Accounting',
        'Collection services',
        'Notary services',
        'Bank account opening + more'
      ]
    }
  ],
  'Debit Collection': [
    {
      name: 'Golden Plan',
      price: '5K',
      currency: 'AED',
      period: '/Monthly',
      icon: '💾',
      features: [
        'Debtors Information Collection',
        'Collection Procedure',
        'Legal Notices'
      ]
    },
    {
      name: 'VIP Plan',
      price: '10K',
      currency: 'AED',
      period: '/Monthly',
      icon: '🏅',
      featured: true,
      features: [
        'Golden Plan',
        'Notarized legal notice',
        'Others'
      ]
    },
    {
      name: 'Diamond Plan',
      price: '15K',
      currency: 'AED',
      period: '/Monthly',
      icon: '⭐',
      features: [
        'Golden & Vip Plan',
        'Cheques Execution:',
        'Performance Orders'
      ]
    }
  ]
};

export default function PackagesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const openForm = (planName: string) => {
    setSelectedPlan(planName);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedPlan('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormModal isOpen={isFormOpen} onClose={closeForm} planName={selectedPlan} />
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Flexible Pricing Plans
          </h1>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your legal needs
          </p>
        </div>
      </section>

      {/* Packages Sections */}
      {Object.entries(packagesData).map(([category, plans]) => (
        <section key={category} className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 underline decoration-[#d4a574] decoration-4 underline-offset-8">
              {category === 'Legal Services' && 'Legal Packages'}
              {category === 'Corporate Services' && 'Corporate Packages'}
              {category === 'Debit Collection' && 'Debit Collection Packages'}
            </h2>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    plan.featured
                      ? 'bg-white shadow-2xl border-2 border-[#d4a574] transform md:scale-105'
                      : 'bg-white shadow-lg border border-gray-200 hover:shadow-xl'
                  }`}
                >
                  {/* Card Content */}
                  <div className="p-8">
                    {/* Icon */}
                    <div className="text-5xl mb-4 text-center">{plan.icon}</div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-baseline">
                        <span className="text-sm text-gray-600 mr-1">{plan.currency}</span>
                        <span className="text-4xl md:text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">{plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-[#d4a574] mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => openForm(plan.name)}
                      className="w-full py-3 px-6 border-2 border-[#d4a574] text-[#d4a574] font-semibold rounded hover:bg-[#d4a574] hover:text-white transition-all duration-200 uppercase text-sm tracking-wide"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-[#1c1e2b] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our team can create a tailored solution that fits your specific legal requirements
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#d4a574] hover:bg-[#c9985f] text-white font-semibold rounded transition-all duration-200 uppercase tracking-wide shadow-lg"
          >
            Contact Our Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
}
