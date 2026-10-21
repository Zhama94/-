import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink,
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  addressLabel: string;
  addressValue: string;
  phoneLabel: string;
  phoneValue: string;
  emailLabel: string;
  emailValue: string;
  hoursLabel: string;
  hoursValue: string;
  whatsappBtnText: string;
  mapNotice: string;
  mapPlaceholderCity: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  kicker,
  title,
  subtitle,
  addressLabel,
  addressValue,
  phoneLabel,
  phoneValue,
  emailLabel,
  emailValue,
  hoursLabel,
  hoursValue,
  whatsappBtnText,
  mapNotice,
  mapPlaceholderCity,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Configurable company phone number for WhatsApp
  // (Can be overridden via VITE_COMPANY_WHATSAPP or prompt template)
  const defaultWhatsAppNumber = "996555000000"; // clearly identifiable Kyrgyzstan template number
  const whatsAppMessage = encodeURIComponent("Здравствуйте! Меня интересует независимая оценка имущества в Кыргызстане. Подскажите, пожалуйста, процедуру и стоимость.");
  const whatsAppLink = `https://wa.me/${defaultWhatsAppNumber}?text=${whatsAppMessage}`;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            {kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Coordinates & Information */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs uppercase tracking-wider font-semibold">{addressLabel}</span>
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-sm font-medium text-slate-100">
                  {addressValue}
                </div>
                <div className="text-[11px] text-slate-400">
                  {mapPlaceholderCity}
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs uppercase tracking-wider font-semibold">{phoneLabel}</span>
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-sm font-medium font-mono text-slate-100 flex items-center justify-between">
                  <span>{phoneValue}</span>
                  <button
                    onClick={() => copyToClipboard(phoneValue, 'phone')}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700"
                    title="Скопировать номер"
                  >
                    {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">
                  Многоканальный телефон в Бишкеке
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs uppercase tracking-wider font-semibold">{emailLabel}</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-sm font-medium font-mono text-slate-100 flex items-center justify-between">
                  <span>{emailValue}</span>
                  <button
                    onClick={() => copyToClipboard(emailValue, 'email')}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700"
                    title="Скопировать email"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">
                  Для официальных запросов и документов
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs uppercase tracking-wider font-semibold">{hoursLabel}</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xs font-medium text-slate-100">
                  {hoursValue}
                </div>
                <div className="text-[11px] text-slate-400">
                  Прием в офисе по предварительной записи
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-800/60 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Оперативная связь через WhatsApp
                  </h4>
                  <p className="text-xs text-slate-300">
                    Отправьте фото объекта или технический паспорт для экспресс-расчета стоимости оценки.
                  </p>
                </div>
              </div>

              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{whatsappBtnText}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Map Placeholder & Spatial Visual Container */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl h-[380px] flex flex-col justify-between p-6">
              {/* Map grid texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Map Top Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-200">
                    {mapNotice}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Бишкек, Кыргызстан</span>
              </div>

              {/* Center Map Graphic Representation */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                      ОК
                    </div>
                  </div>
                  {/* Subtle ripple rings */}
                  <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">
                    Центральный офис в г. Бишкек
                  </div>
                  <div className="text-xs text-slate-400 max-w-sm mx-auto">
                    {addressValue}
                  </div>
                </div>
              </div>

              {/* Map Bottom Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3 gap-2">
                <span className="text-[11px] text-slate-400">
                  Для осмотра объекта за пределами Бишкека оценщик выезжает по графику.
                </span>
                <span className="text-[11px] font-mono text-amber-400">
                  42.8746° N, 74.5698° E
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
