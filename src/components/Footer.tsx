import React from 'react';
import { Heart, Terminal, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200">Java MinMax Algoritması</span>
          <span aria-hidden="true">·</span>
          <span>JDK 8 / 11 / 17 / 21 Uyumlu</span>
        </div>

        {/* Signature watermark */}
        <div className="flex items-center gap-2 text-slate-300">
          <span>Hazırlayan ve Kodlayan:</span>
          <span className="font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            Enes Öztürk
          </span>
        </div>
      </div>
    </footer>
  );
};
