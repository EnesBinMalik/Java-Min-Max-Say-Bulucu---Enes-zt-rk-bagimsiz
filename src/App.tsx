import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ConsoleSimulator } from './components/ConsoleSimulator';
import { VisualStepInspector } from './components/VisualStepInspector';
import { CodeViewer } from './components/CodeViewer';
import { AlgorithmExplainer } from './components/AlgorithmExplainer';
import { Footer } from './components/Footer';
import { StepRecord, SAMPLE_SCENARIO } from './data/javaCode';
import { Sparkles, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('console');
  const [steps, setSteps] = useState<StepRecord[]>([]);
  const [finalMin, setFinalMin] = useState<number | null>(SAMPLE_SCENARIO.expectedMin);
  const [finalMax, setFinalMax] = useState<number | null>(SAMPLE_SCENARIO.expectedMax);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>(SAMPLE_SCENARIO.numbers);

  const handleStepsUpdated = (
    newSteps: StepRecord[],
    min: number | null,
    max: number | null,
    numbers: number[]
  ) => {
    setSteps(newSteps);
    setFinalMin(min);
    setFinalMax(max);
    setCurrentNumbers(numbers);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Navigation */}
      <Navbar activeSection={activeNav} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950 p-6 sm:p-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Java 101 · Temel Algoritma
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">İmza: Enes Öztürk</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Klavyeden Girilen N Sayıdan En Büyük ve En Küçük Değeri Bulma
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Kullanıcının belirlediği <code className="text-amber-300 bg-slate-800/80 px-1.5 py-0.5 rounded font-mono">N</code> adet sayıyı <code className="text-cyan-300 bg-slate-800/80 px-1.5 py-0.5 rounded font-mono">Scanner</code> ile alıp, <code className="text-emerald-300 bg-slate-800/80 px-1.5 py-0.5 rounded font-mono">O(1)</code> bellek karmaşıklığı ile en büyük ve en küçük değerleri anlık karşılaştıran Java programı.
            </p>

            {/* Target Scenario Quick Card */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 inline-flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <span className="font-semibold text-slate-400">İstenen Senaryo:</span>
                <span className="text-slate-300">
                  Adet: <strong className="text-white font-mono">4</strong>
                </span>
                <span aria-hidden="true" className="text-slate-700">|</span>
                <span className="text-slate-300">
                  Girdiler: <strong className="text-amber-300 font-mono">16, -22, -15, 100</strong>
                </span>
                <span aria-hidden="true" className="text-slate-700">|</span>
                <span className="text-slate-300">
                  En Büyük: <strong className="text-emerald-400 font-mono">100</strong>
                </span>
                <span aria-hidden="true" className="text-slate-700">|</span>
                <span className="text-slate-300">
                  En Küçük: <strong className="text-amber-400 font-mono">-22</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Interactive Console Simulator */}
        <section>
          <ConsoleSimulator onStepsUpdated={handleStepsUpdated} />
        </section>

        {/* Section 2: Visual Step Inspector & Number Line */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Algoritmik İzleme ve Sayı Analizi
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Konsoldaki değerlerin döngü içerisinde adım adım karşılaştırılma ve güncellenme süreci.
            </p>
          </div>
          <VisualStepInspector
            steps={steps}
            finalMin={finalMin}
            finalMax={finalMax}
            numbers={currentNumbers}
          />
        </section>

        {/* Section 3: Java Source Code Viewer */}
        <section>
          <CodeViewer />
        </section>

        {/* Section 4: Algorithm Deep Dive & Best Practices */}
        <section>
          <AlgorithmExplainer />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
