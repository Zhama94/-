import React from 'react';
import { TeamMemberPlaceholder, CertificatePlaceholder } from '../types';
import { 
  ShieldCheck, 
  Award, 
  Check, 
  Lock, 
  Eye, 
  Scale, 
  User, 
  FileCheck2, 
  AlertCircle 
} from 'lucide-react';

interface AboutSectionProps {
  kicker: string;
  title: string;
  missionTitle: string;
  missionDesc: string;
  valuesTitle: string;
  values: {
    title: string;
    desc: string;
  }[];
  teamTitle: string;
  teamSubtitle: string;
  certTitle: string;
  certSubtitle: string;
  certDisclaimer: string;
  team: TeamMemberPlaceholder[];
  certificates: CertificatePlaceholder[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  kicker,
  title,
  missionTitle,
  missionDesc,
  valuesTitle,
  values,
  teamTitle,
  teamSubtitle,
  certTitle,
  certSubtitle,
  certDisclaimer,
  team,
  certificates,
}) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            {kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {title}
          </h2>
        </div>

        {/* Mission & 4 Core Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Mission Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Scale className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 block">
                {missionTitle}
              </span>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {missionDesc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Оценка в строгом соответствии со стандартами КР</span>
            </div>
          </div>

          {/* 4 Core Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200/90 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <h4>{val.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Team Section with Clearly Marked Placeholders */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              Команда специалистов
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {teamTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center border border-slate-300">
                    <User className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {member.namePlaceholder}
                    </h4>
                    <span className="text-xs text-amber-800 font-medium block mt-0.5">
                      {member.role}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60 text-[11px] font-mono text-amber-900">
                    {member.qualificationPlaceholder}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.specialization}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-400">
                  <span>Статус: Аттестованный специалист</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section with Clearly Marked Placeholders */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              Стандарты и лицензирование
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {certTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {certSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <FileCheck2 className="w-5 h-5 text-amber-600" />
                    <span className="text-[10px] font-mono uppercase text-slate-400">Сертификат</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {cert.title}
                  </h4>

                  <div className="space-y-1 font-mono text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                    <div className="text-amber-900 font-semibold">{cert.registryPlaceholder}</div>
                    <div className="text-slate-500 text-[10px]">{cert.issuingBodyPlaceholder}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Действителен в реестре</span>
                </div>
              </div>
            ))}
          </div>

          {/* Explicit disclaimer container */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>{certDisclaimer}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
