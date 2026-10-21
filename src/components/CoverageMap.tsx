import React, { useState } from 'react';
import { RegionInfo } from '../types';
import { MapPin, Navigation, Info, Clock, CheckCircle2 } from 'lucide-react';

interface CoverageMapProps {
  regions: RegionInfo[];
  capitalTitle: string;
  regionalTitle: string;
  disclaimer: string;
}

export const CoverageMap: React.FC<CoverageMapProps> = ({
  regions,
  capitalTitle,
  regionalTitle,
  disclaimer,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('bishkek');

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Region Selector & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Navigation className="w-4 h-4" />
              <span>Зона охвата</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              {selectedRegion.name}
            </h3>
            <p className="text-sm text-slate-300">
              Административный центр: <strong className="text-white font-medium">{selectedRegion.center}</strong>
            </p>
          </div>

          {/* Status card */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-400">Статус выезда:</span>
              <span className={`text-xs px-2.5 py-1 rounded font-medium ${
                selectedRegion.status === 'regular' 
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' 
                  : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
              }`}>
                {selectedRegion.status === 'regular' ? 'Ежедневный выезд' : 'По согласованию'}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {selectedRegion.note}
            </p>

            <div className="pt-2 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Сроки выезда согласовываются при подаче заявки</span>
            </div>
          </div>

          {/* Quick list tabs */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Выберите регион для просмотра условий:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {regions.map((region) => {
                const isSelected = region.id === selectedRegionId;
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                        : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/40'
                    }`}
                  >
                    <span className="truncate">{region.name}</span>
                    {region.status === 'regular' && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1.5 ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{disclaimer}</p>
          </div>
        </div>

        {/* Right Side: Visual Graphical Map & Geographic Hub Layout */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
          <div className="relative bg-slate-950/90 rounded-xl p-6 border border-slate-800 min-h-[340px] flex flex-col justify-between">
            {/* Background grid matrix */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px] rounded-xl pointer-events-none" />

            {/* Header of the map */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-200">
                  Карта Республики Кыргызстан
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">42°52′N 74°36′E</span>
            </div>

            {/* Stylized Interactive Kyrgyzstan Regions Representation */}
            <div className="relative z-10 my-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* North & Capital cluster */}
                <div className="sm:col-span-3 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {capitalTitle}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Приоритетный сектор
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {regions.filter(r => r.status === 'regular').map(r => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRegionId(r.id)}
                        className={`px-3 py-1.5 rounded text-xs transition-colors ${
                          selectedRegionId === r.id
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional clusters */}
                <div className="sm:col-span-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    {regionalTitle}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {regions.filter(r => r.status === 'scheduled').map(r => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRegionId(r.id)}
                        className={`text-left p-2.5 rounded text-xs transition-all border ${
                          selectedRegionId === r.id
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/80 font-semibold'
                            : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-medium text-slate-200 truncate">{r.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{r.center}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer notes on the map */}
            <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Базовый выезд
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Выезд по согласованию
                </span>
              </div>
              <span className="text-[11px] text-slate-500">Все районы КР по согласованию сторон</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
