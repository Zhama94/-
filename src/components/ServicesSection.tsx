import React, { useState } from 'react';
import { ServiceDetail } from '../types';
import { 
  Home, 
  Building2, 
  MapPin, 
  Car, 
  TrendingUp, 
  Cpu, 
  Scale, 
  Briefcase, 
  ArrowRight, 
  X, 
  FileText, 
  CheckCircle, 
  UserCheck, 
  Info,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  viewDetailsLabel: string;
  closeDetailsLabel: string;
  orderServiceLabel: string;
  modalHeaders: {
    whatIsValued: string;
    whoNeeds: string;
    purposes: string;
    documents: string;
    process: string;
    legalDisclaimer: string;
  };
  services: ServiceDetail[];
  onSelectServiceToOrder: (serviceId: string, serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  kicker,
  title,
  subtitle,
  viewDetailsLabel,
  closeDetailsLabel,
  orderServiceLabel,
  modalHeaders,
  services,
  onSelectServiceToOrder,
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  // Map icon name to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Briefcase':
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            {kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header of card with human editorial numbering */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-semibold text-slate-900 hover:text-amber-700 flex items-center gap-1 transition-colors"
                >
                  <span>{viewDetailsLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectServiceToOrder(service.id, service.title)}
                  className="text-[11px] font-semibold text-slate-700 hover:text-slate-950 px-2.5 py-1 rounded bg-slate-200/80 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Comprehensive Service Detail Modal */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-300 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                  {getIcon(activeModalService.iconName)}
                </div>
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-400 block">
                    Паспорт направления оценки
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label={closeDetailsLabel}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 divide-y divide-slate-100">
              
              {/* 1. What is valued */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                  <span>{modalHeaders.whatIsValued}</span>
                </h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  {activeModalService.targetObject}
                </p>
              </div>

              {/* 2. Who needs the service */}
              <div className="pt-5">
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>{modalHeaders.whoNeeds}</span>
                </h4>
                <ul className="space-y-1.5">
                  {activeModalService.whoNeeds.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Common purposes */}
              <div className="pt-5">
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{modalHeaders.purposes}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.purposes.map((p, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-50 border border-slate-200/80 text-xs text-slate-800">
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Required documents */}
              <div className="pt-5">
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{modalHeaders.documents}</span>
                </h4>
                <ul className="space-y-2">
                  {activeModalService.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-amber-700 font-bold shrink-0">{i + 1}.</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Process */}
              <div className="pt-5">
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2">
                  {modalHeaders.process}
                </h4>
                <div className="space-y-2">
                  {activeModalService.processSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Note if present */}
              {activeModalService.legalNote && (
                <div className="pt-4 flex items-start gap-2 text-xs text-slate-500 bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{activeModalService.legalNote}</span>
                </div>
              )}

              <div className="pt-4 text-xs text-slate-400 italic">
                {modalHeaders.legalDisclaimer}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                {closeDetailsLabel}
              </button>

              <button
                type="button"
                onClick={() => {
                  const service = activeModalService;
                  setActiveModalService(null);
                  onSelectServiceToOrder(service.id, service.title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <span>{orderServiceLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
