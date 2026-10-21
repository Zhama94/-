import React from 'react';
import { ArrowRight, ShieldCheck, Check, Clock, FileCheck, PhoneCall, Building, Landmark, ChevronRight } from 'lucide-react';

interface HeroProps {
  kicker: string;
  headline: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  featureBadges: {
    standards: string;
    independence: string;
    coverage: string;
  };
  stats: {
    regionsTitle: string;
    regionsDesc: string;
    timingTitle: string;
    timingDesc: string;
    confidentialityTitle: string;
    confidentialityDesc: string;
  };
  onOrderClick: () => void;
  onConsultClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  kicker,
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  featureBadges,
  stats,
  onOrderClick,
  onConsultClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-slate-100 pt-12 pb-16 md:pt-18 md:pb-24 border-b border-slate-800">
      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed natural editorial kicker with subtle separator */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-amber-400">
              <span>{kicker}</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-slate-300">Кыргызская Республика</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              {headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* Editorial unboxed trust qualifiers (NO PILLS) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{featureBadges.standards}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{featureBadges.independence}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{featureBadges.coverage}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-lg hover:shadow-amber-400/10 transition-all whitespace-nowrap"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onConsultClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>{secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Architectural Asset Container */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/80 p-6 md:p-8 shadow-2xl overflow-hidden">
              {/* Decorative subtle ambient glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Visual architectural badge header */}
                <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Юридическая сила отчетов
                    </span>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-amber-400" />
                      <span>Признание институтами КР</span>
                    </h3>
                  </div>
                  <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                  </div>
                </div>

                {/* Structured list of verified appraisal criteria */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <FileCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 font-semibold block">Банковский залог</strong>
                      <span className="text-slate-300 text-xs">
                        Соответствие регламентам кредитных комитетов коммерческих банков КР.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <Building className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 font-semibold block">Судебные и нотариальные действия</strong>
                      <span className="text-slate-300 text-xs">
                        Оформление наследства, раздел имущества, взыскание ущерба и процессуальные споры.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100 font-semibold block">Финансовая отчетность & МСФО</strong>
                      <span className="text-slate-300 text-xs">
                        Переоценка основных средств, аудит и взносы в уставный капитал предприятий.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct quick action inside card */}
                <button
                  onClick={onOrderClick}
                  className="w-full py-2.5 px-4 bg-slate-700/50 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-semibold rounded-lg border border-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Рассчитать стоимость для вашего объекта</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 3-Column Key Signals Row Below Hero Split (Adhering to Section 5.13 layout rules) */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{stats.regionsTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stats.regionsDesc}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{stats.timingTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stats.timingDesc}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{stats.confidentialityTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stats.confidentialityDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
