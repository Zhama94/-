import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
  label: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ label }) => {
  const defaultWhatsAppNumber = "996555000000";
  const whatsAppMessage = encodeURIComponent("Здравствуйте! Хочу проконсультироваться по оценке имущества в Кыргызстане.");
  const whatsAppLink = `https://wa.me/${defaultWhatsAppNumber}?text=${whatsAppMessage}`;

  return (
    <aside aria-label="Быстрая связь" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp для консультации"
        className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide whitespace-nowrap">
          {label}
        </span>
      </a>
    </aside>
  );
};
