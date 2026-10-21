import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  categories: {
    all: string;
    general: string;
    documents: string;
    timing: string;
    legal: string;
  };
  faqs: FAQItem[];
  onRequestClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  kicker,
  title,
  subtitle,
  categories,
  faqs,
  onRequestClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const categoryTabs = [
    { key: 'all', label: categories.all },
    { key: 'general', label: categories.general },
    { key: 'documents', label: categories.documents },
    { key: 'timing', label: categories.timing },
    { key: 'legal', label: categories.legal },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            {kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control - Allowed by Zero-Pill rules) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl mb-8">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === tab.key
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Остались вопросы по вашему объекту?</h4>
              <p className="text-xs text-slate-300">Задайте вопрос эксперту и получите предварительную консультацию бесплатно.</p>
            </div>
          </div>

          <button
            onClick={onRequestClick}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors"
          >
            Задать вопрос оценщику
          </button>
        </div>

      </div>
    </section>
  );
};
