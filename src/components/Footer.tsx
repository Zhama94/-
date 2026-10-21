import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  companyName: string;
  footerTexts: {
    companyPlaceholderNotice: string;
    disclaimerText: string;
    copyright: string;
    allRightsReserved: string;
    quickLinks: string;
    servicesList: string;
    legalNotice: string;
  };
  onOpenPrivacyPolicy: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  companyName,
  footerTexts,
  onOpenPrivacyPolicy,
  onSelectService,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-7 h-7 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xs">
                ОК
              </span>
              <span>{companyName}</span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              {footerTexts.companyPlaceholderNotice}
            </p>

            <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>{footerTexts.disclaimerText}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              {footerTexts.quickLinks}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Виды оценочных услуг
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-amber-300 transition-colors">
                  Порядок взаимодействия
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  О компании и квалификации
                </a>
              </li>
              <li>
                <a href="#regions" className="hover:text-amber-300 transition-colors">
                  География обслуживания
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  Вопросы и ответы
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Контакты и реквизиты
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Areas Links */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              {footerTexts.servicesList}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
              <button 
                onClick={() => onSelectService('residential')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Жилая недвижимость
              </button>
              <button 
                onClick={() => onSelectService('commercial')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Коммерческие объекты
              </button>
              <button 
                onClick={() => onSelectService('land')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Земельные участки
              </button>
              <button 
                onClick={() => onSelectService('vehicles')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Автотранспорт
              </button>
              <button 
                onClick={() => onSelectService('business')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Бизнес и предприятия
              </button>
              <button 
                onClick={() => onSelectService('machinery')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Машины и оборудование
              </button>
              <button 
                onClick={() => onSelectService('court')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Для судебных споров
              </button>
              <button 
                onClick={() => onSelectService('inheritance_collateral')}
                className="text-left hover:text-amber-300 transition-colors"
              >
                Залог и наследство
              </button>
            </div>

            <div className="pt-3 border-t border-slate-900">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline underline-offset-2"
              >
                Политика обработки персональных данных (КР)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {footerTexts.copyright}
          </div>
          <div>
            {footerTexts.allRightsReserved}
          </div>
        </div>

      </div>
    </footer>
  );
};
