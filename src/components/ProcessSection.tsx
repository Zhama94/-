import React from 'react';
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProcessSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  timelineDisclaimer: string;
  steps: {
    num: string;
    title: string;
    desc: string;
    outcome: string;
  }[];
  onRequestClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  kicker,
  title,
  subtitle,
  timelineDisclaimer,
  steps,
  onRequestClick,
}) => {
  return (
    <section id="process" className="py-16 md:py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
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

        {/* 4 Steps Bento / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors relative"
            >
              {/* Connector line on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-slate-200 z-10" />
              )}

              <div className="space-y-4">
                {/* Step Number Badge */}
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                  {step.num}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable result container */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{step.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Clear timing disclaimer callout */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
          <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Сроки и график выполнения работ:</span>
            <p className="text-amber-900 leading-relaxed">
              {timelineDisclaimer}
            </p>
          </div>
        </div>

        {/* Interactive CTA trigger */}
        <div className="mt-10 text-center">
          <button
            onClick={onRequestClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <span>Начать процедуру оценки</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
