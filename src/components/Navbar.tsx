import React from 'react';
import { Download, Code2, Sparkles } from 'lucide-react';
import { JAVA_VARIANTS } from '../data/javaCode';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const handleDownloadJava = () => {
    const mainCode = JAVA_VARIANTS[0].code;
    const blob = new Blob([mainCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Main.java';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap block">
              Java MinMax Bulucu
            </span>
            <span className="text-[11px] text-amber-400/90 font-medium tracking-wide">
              İmza: Enes Öztürk
            </span>
          </div>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavigate('console')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'console' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Konsol Simülatörü
          </button>
          <button
            onClick={() => onNavigate('code')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'code' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Java Kaynak Kodu
          </button>
          <button
            onClick={() => onNavigate('inspector')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'inspector' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Adım Adım İzleyici
          </button>
          <button
            onClick={() => onNavigate('algorithm')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'algorithm' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Algoritma Analizi
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadJava}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm shadow-amber-500/10 active:scale-[0.98] whitespace-nowrap shrink-0"
            title="Main.java dosyasını bilgisayarınıza indirin"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Main.java İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
