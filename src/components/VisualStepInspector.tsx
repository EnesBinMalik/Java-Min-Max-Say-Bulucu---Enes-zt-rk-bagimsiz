import React from 'react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, TrendingDown, TrendingUp, Info } from 'lucide-react';
import { StepRecord } from '../data/javaCode';

interface VisualStepInspectorProps {
  steps: StepRecord[];
  finalMin: number | null;
  finalMax: number | null;
  numbers: number[];
}

export const VisualStepInspector: React.FC<VisualStepInspectorProps> = ({
  steps,
  finalMin,
  finalMax,
  numbers,
}) => {
  if (steps.length === 0) {
    return (
      <div id="inspector" className="p-8 rounded-xl border border-slate-800 bg-slate-900/40 text-center">
        <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <p className="text-sm text-slate-400">
          Konsolda sayıları girdikten sonra adım adım algoritma izleyicisi burada görüntülenecektir.
        </p>
      </div>
    );
  }

  // Calculate percentage positions for visual number line
  const minVal = finalMin !== null ? finalMin : 0;
  const maxVal = finalMax !== null ? finalMax : 0;
  const span = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  return (
    <div id="inspector" className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Count */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Girilen Adet (N)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {numbers.length}
            </span>
            <span className="text-xs text-slate-400">sayı</span>
          </div>
        </div>

        {/* Minimum Card */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300">En Küçük Sayı (Min)</span>
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 tabular-nums">
              {finalMin !== null ? finalMin : '-'}
            </span>
          </div>
        </div>

        {/* Maximum Card */}
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">En Büyük Sayı (Max)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300 tabular-nums">
              {finalMax !== null ? finalMax : '-'}
            </span>
          </div>
        </div>

        {/* Range / Difference */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Aralık Genişliği (Fark)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-200 tabular-nums">
              {finalMax !== null && finalMin !== null ? finalMax - finalMin : '-'}
            </span>
            <span className="text-xs text-slate-400">(Max - Min)</span>
          </div>
        </div>
      </div>

      {/* Visual Number Line */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-200">
            Sayı Doğrusu ve Dağılım Haritası
          </h3>
          <span className="text-xs text-slate-400">
            Sayıların sayı doğrusundaki konumu
          </span>
        </div>

        <div className="relative pt-8 pb-10 px-6">
          {/* Main axis line */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full relative">
            <div
              className="absolute h-full bg-gradient-to-r from-amber-500/60 to-emerald-500/60 rounded-full"
              style={{ left: '0%', width: '100%' }}
            />
          </div>

          {/* Points on axis */}
          {numbers.map((val, idx) => {
            const rawPercent = ((val - minVal) / span) * 100;
            // clamp for padding
            const clampedPercent = Math.max(4, Math.min(96, rawPercent));
            const isMin = val === finalMin;
            const isMax = val === finalMax;

            return (
              <div
                key={`point-${idx}-${val}`}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: `${clampedPercent}%` }}
              >
                {/* Value Label above */}
                <div
                  className={`mb-2 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-transform group-hover:scale-110 whitespace-nowrap ${
                    isMin
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : isMax
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {val}
                  {isMin && ' (Min)'}
                  {isMax && ' (Max)'}
                </div>

                {/* Point dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    isMin
                      ? 'bg-amber-400 border-amber-200 shadow-lg shadow-amber-500/50'
                      : isMax
                      ? 'bg-emerald-400 border-emerald-200 shadow-lg shadow-emerald-500/50'
                      : 'bg-slate-300 border-slate-900'
                  }`}
                />

                {/* Step index below */}
                <span className="mt-2 text-[10px] text-slate-400 font-mono whitespace-nowrap">
                  {idx + 1}. girdi
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Execution Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Döngü İzleme Tablosu (Adım Adım Değişken Durumları)
          </h3>
          <span className="text-xs text-slate-400">
            Java for döngüsü mantığı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-[11px] font-medium border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Adım</th>
                <th className="py-3 px-4">Girdi (sayi)</th>
                <th className="py-3 px-4">En Küçük (enKucuk)</th>
                <th className="py-3 px-4">En Büyük (enBuyuk)</th>
                <th className="py-3 px-4">Algoritmik Karar & Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {steps.map((s) => (
                <tr
                  key={s.step}
                  className={`hover:bg-slate-900/40 transition-colors ${
                    s.minChanged || s.maxChanged ? 'bg-slate-900/20' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-slate-400 font-sans font-medium">
                    {s.step}. Sayı
                  </td>
                  <td className="py-3 px-4 font-bold text-white tabular-nums">
                    {s.input}
                  </td>
                  <td className="py-3 px-4 tabular-nums">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                        s.minChanged
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                          : 'text-slate-300'
                      }`}
                    >
                      {s.newMin}
                      {s.minChanged && <ArrowDownRight className="w-3.5 h-3.5 text-amber-400" />}
                    </span>
                  </td>
                  <td className="py-3 px-4 tabular-nums">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                        s.maxChanged
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                          : 'text-slate-300'
                      }`}
                    >
                      {s.newMax}
                      {s.maxChanged && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-sans text-slate-300">
                    {s.explanation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
