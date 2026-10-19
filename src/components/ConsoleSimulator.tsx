import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, FastForward, Check, Sparkles, Send } from 'lucide-react';
import { SAMPLE_SCENARIO, StepRecord } from '../data/javaCode';

interface TerminalLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'success' | 'signature';
  text: string;
}

interface ConsoleSimulatorProps {
  onStepsUpdated: (steps: StepRecord[], finalMin: number | null, finalMax: number | null, numbers: number[]) => void;
}

export const ConsoleSimulator: React.FC<ConsoleSimulatorProps> = ({ onStepsUpdated }) => {
  // Console state
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // 0 = asking N, 1..N = asking number i
  const [enteredNumbers, setEnteredNumbers] = useState<number[]>([]);
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [historyLines, setHistoryLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '$ javac Main.java' },
    { id: '2', type: 'system', text: '$ java Main' },
    { id: '3', type: 'prompt', text: 'Kaç tane sayı gireceksiniz: ' },
  ]);

  const [steps, setSteps] = useState<StepRecord[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historyLines, currentStepIndex, isCompleted]);

  // Focus input automatically
  useEffect(() => {
    if (!isCompleted && !isAutoPlaying) {
      inputRef.current?.focus();
    }
  }, [currentStepIndex, isCompleted, isAutoPlaying]);

  // Helper to recompute steps from numbers array
  const computeSteps = (numbersList: number[]) => {
    const records: StepRecord[] = [];
    if (numbersList.length === 0) return records;

    let currentMin = numbersList[0];
    let currentMax = numbersList[0];

    records.push({
      step: 1,
      input: numbersList[0],
      previousMin: null,
      previousMax: null,
      newMin: currentMin,
      newMax: currentMax,
      minChanged: true,
      maxChanged: true,
      explanation: `İlk sayı girildi (${numbersList[0]}). Başlangıçta hem en küçük hem en büyük kabul edilir.`,
    });

    for (let i = 1; i < numbersList.length; i++) {
      const val = numbersList[i];
      const prevMin = currentMin;
      const prevMax = currentMax;
      let minChanged = false;
      let maxChanged = false;

      if (val > currentMax) {
        currentMax = val;
        maxChanged = true;
      }
      if (val < currentMin) {
        currentMin = val;
        minChanged = true;
      }

      let explanation = `${val} değeri kontrol edildi. `;
      if (maxChanged && minChanged) {
        explanation += `Hem yeni en büyük (${val}) hem de yeni en küçük (${val}) oldu!`;
      } else if (maxChanged) {
        explanation += `${val} > ${prevMax} olduğu için en büyük sayı güncellendi.`;
      } else if (minChanged) {
        explanation += `${val} < ${prevMin} olduğu için en küçük sayı güncellendi.`;
      } else {
        explanation += `${prevMin} <= ${val} <= ${prevMax} aralığında kaldığından min ve max değişmedi.`;
      }

      records.push({
        step: i + 1,
        input: val,
        previousMin: prevMin,
        previousMax: prevMax,
        newMin: currentMin,
        newMax: currentMax,
        minChanged,
        maxChanged,
        explanation,
      });
    }

    return records;
  };

  const handleReset = () => {
    setIsAutoPlaying(false);
    setTotalCount(null);
    setCurrentStepIndex(0);
    setEnteredNumbers([]);
    setCurrentInputValue('');
    setIsCompleted(false);
    setSteps([]);
    setHistoryLines([
      { id: '1', type: 'system', text: '$ javac Main.java' },
      { id: '2', type: 'system', text: '$ java Main' },
      { id: '3', type: 'prompt', text: 'Kaç tane sayı gireceksiniz: ' },
    ]);
    onStepsUpdated([], null, null, []);
  };

  const handleCompleteExecution = (finalNumbers: number[]) => {
    setIsCompleted(true);
    const calculatedMin = Math.min(...finalNumbers);
    const calculatedMax = Math.max(...finalNumbers);
    const computed = computeSteps(finalNumbers);
    setSteps(computed);
    onStepsUpdated(computed, calculatedMin, calculatedMax, finalNumbers);

    setHistoryLines((prev) => [
      ...prev,
      { id: `${Date.now()}-out1`, type: 'output', text: `En büyük sayı: ${calculatedMax}` },
      { id: `${Date.now()}-out2`, type: 'output', text: `En küçük sayı: ${calculatedMin}` },
      { id: `${Date.now()}-div`, type: 'system', text: '------------------------------' },
      { id: `${Date.now()}-sig`, type: 'signature', text: 'Programcı: Enes Öztürk' },
    ]);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentInputValue.trim() === '') return;

    const val = Number(currentInputValue.trim());
    if (isNaN(val)) return;

    if (currentStepIndex === 0) {
      // Inputting N
      const n = Math.floor(val);
      if (n <= 0) {
        setHistoryLines((prev) => [
          ...prev,
          { id: `${Date.now()}-in`, type: 'input', text: currentInputValue },
          { id: `${Date.now()}-err`, type: 'output', text: "Lütfen 1 veya daha büyük bir sayı adedi giriniz!" },
          { id: `${Date.now()}-p`, type: 'prompt', text: 'Kaç tane sayı gireceksiniz: ' },
        ]);
        setCurrentInputValue('');
        return;
      }

      setTotalCount(n);
      setCurrentStepIndex(1);
      setHistoryLines((prev) => [
        ...prev,
        { id: `${Date.now()}-in`, type: 'input', text: String(n) },
        { id: `${Date.now()}-p1`, type: 'prompt', text: '1. Sayıyı giriniz: ' },
      ]);
      setCurrentInputValue('');
    } else {
      // Inputting number at step currentStepIndex
      const updatedNumbers = [...enteredNumbers, val];
      setEnteredNumbers(updatedNumbers);
      const nextStep = currentStepIndex + 1;

      if (totalCount !== null && nextStep <= totalCount) {
        setCurrentStepIndex(nextStep);
        setHistoryLines((prev) => [
          ...prev,
          { id: `${Date.now()}-in`, type: 'input', text: String(val) },
          { id: `${Date.now()}-p`, type: 'prompt', text: `${nextStep}. Sayıyı giriniz: ` },
        ]);
        setCurrentInputValue('');
      } else {
        // Last number entered!
        setHistoryLines((prev) => [
          ...prev,
          { id: `${Date.now()}-in`, type: 'input', text: String(val) },
        ]);
        setCurrentInputValue('');
        handleCompleteExecution(updatedNumbers);
      }
    }
  };

  // Run the exact scenario from user request: 4 numbers (16, -22, -15, 100)
  const handleRunSampleScenario = (animated = false) => {
    handleReset();
    const scenario = SAMPLE_SCENARIO;

    if (!animated) {
      // Instant execution
      setTotalCount(scenario.n);
      setEnteredNumbers(scenario.numbers);
      setIsCompleted(true);
      setCurrentStepIndex(scenario.n + 1);

      const computed = computeSteps(scenario.numbers);
      setSteps(computed);
      onStepsUpdated(computed, scenario.expectedMin, scenario.expectedMax, scenario.numbers);

      const lines: TerminalLine[] = [
        { id: '1', type: 'system', text: '$ javac Main.java' },
        { id: '2', type: 'system', text: '$ java Main' },
        { id: '3', type: 'prompt', text: 'Kaç tane sayı gireceksiniz: 4' },
      ];

      scenario.numbers.forEach((num, idx) => {
        lines.push({
          id: `step-${idx + 1}`,
          type: 'prompt',
          text: `${idx + 1}. Sayıyı giriniz: ${num}`,
        });
      });

      lines.push(
        { id: 'res-max', type: 'output', text: `En büyük sayı: ${scenario.expectedMax}` },
        { id: 'res-min', type: 'output', text: `En küçük sayı: ${scenario.expectedMin}` },
        { id: 'res-div', type: 'system', text: '------------------------------' },
        { id: 'res-sig', type: 'signature', text: 'Programcı: Enes Öztürk' }
      );

      setHistoryLines(lines);
      return;
    }

    // Animated typing flow
    setIsAutoPlaying(true);
    let currentNumbers: number[] = [];
    
    // Step 0: type N = 4
    setTimeout(() => {
      setTotalCount(4);
      setCurrentStepIndex(1);
      setHistoryLines([
        { id: '1', type: 'system', text: '$ javac Main.java' },
        { id: '2', type: 'system', text: '$ java Main' },
        { id: '3', type: 'prompt', text: 'Kaç tane sayı gireceksiniz: 4' },
        { id: '4', type: 'prompt', text: '1. Sayıyı giriniz: ' },
      ]);

      // Step 1: 16
      setTimeout(() => {
        currentNumbers = [16];
        setEnteredNumbers(currentNumbers);
        setCurrentStepIndex(2);
        setHistoryLines((prev) => [
          ...prev.slice(0, -1),
          { id: 'step-1', type: 'prompt', text: '1. Sayıyı giriniz: 16' },
          { id: 'prompt-2', type: 'prompt', text: '2. Sayıyı giriniz: ' },
        ]);

        // Step 2: -22
        setTimeout(() => {
          currentNumbers = [16, -22];
          setEnteredNumbers(currentNumbers);
          setCurrentStepIndex(3);
          setHistoryLines((prev) => [
            ...prev.slice(0, -1),
            { id: 'step-2', type: 'prompt', text: '2. Sayıyı giriniz: -22' },
            { id: 'prompt-3', type: 'prompt', text: '3. Sayıyı giriniz: ' },
          ]);

          // Step 3: -15
          setTimeout(() => {
            currentNumbers = [16, -22, -15];
            setEnteredNumbers(currentNumbers);
            setCurrentStepIndex(4);
            setHistoryLines((prev) => [
              ...prev.slice(0, -1),
              { id: 'step-3', type: 'prompt', text: '3. Sayıyı giriniz: -15' },
              { id: 'prompt-4', type: 'prompt', text: '4. Sayıyı giriniz: ' },
            ]);

            // Step 4: 100
            setTimeout(() => {
              currentNumbers = [16, -22, -15, 100];
              setEnteredNumbers(currentNumbers);
              setCurrentStepIndex(5);
              setIsAutoPlaying(false);
              setHistoryLines((prev) => [
                ...prev.slice(0, -1),
                { id: 'step-4', type: 'prompt', text: '4. Sayıyı giriniz: 100' },
                { id: 'res-max', type: 'output', text: 'En büyük sayı: 100' },
                { id: 'res-min', type: 'output', text: 'En küçük sayı: -22' },
                { id: 'res-div', type: 'system', text: '------------------------------' },
                { id: 'res-sig', type: 'signature', text: 'Programcı: Enes Öztürk' },
              ]);
              setIsCompleted(true);
              const computed = computeSteps(currentNumbers);
              setSteps(computed);
              onStepsUpdated(computed, -22, 100, currentNumbers);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    }, 400);
  };

  // Run sample scenario on initial mount
  useEffect(() => {
    handleRunSampleScenario(false);
  }, []);

  return (
    <div id="console" className="w-full">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Canlı Java Konsol Simülatörü</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Java Scanner davranışını doğrudan tarayıcınızda deneyimleyin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleRunSampleScenario(false)}
            disabled={isAutoPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap"
            title="Kullanıcının verdiği örnek senaryoyu yükle (4 sayı: 16, -22, -15, 100)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Örnek Senaryoyu Yükle (4 Sayı)</span>
          </button>

          <button
            onClick={() => handleRunSampleScenario(true)}
            disabled={isAutoPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Adım adım otomatik yazarak çalıştır"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Animasyonlu Oynat</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isAutoPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
            title="Konsolu temizle ve sıfırdan başla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Terminal Frame */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Terminal Header Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-xs font-mono text-slate-400 select-none">
              terminal: bash - java Main
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>JDK 21</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400/90 font-semibold">Enes Öztürk</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 font-mono text-xs sm:text-sm leading-relaxed max-h-[380px] min-h-[260px] overflow-y-auto terminal-scroll cursor-text space-y-1.5"
        >
          {historyLines.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-400">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'output') {
              const isMax = line.text.includes('En büyük');
              const isMin = line.text.includes('En küçük');
              return (
                <div
                  key={line.id}
                  className={`font-semibold py-0.5 ${
                    isMax
                      ? 'text-emerald-400'
                      : isMin
                      ? 'text-amber-400'
                      : 'text-slate-200'
                  }`}
                >
                  {line.text}
                </div>
              );
            }
            if (line.type === 'signature') {
              return (
                <div key={line.id} className="text-amber-300 font-bold tracking-wide pt-1">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-200">
                {line.text}
              </div>
            );
          })}

          {/* Active Input Line */}
          {!isCompleted && !isAutoPlaying && (
            <form onSubmit={handleInputSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-slate-200 select-none whitespace-nowrap">
                {currentStepIndex === 0
                  ? 'Kaç tane sayı gireceksiniz: '
                  : `${currentStepIndex}. Sayıyı giriniz: `}
              </span>
              <input
                ref={inputRef}
                type="number"
                value={currentInputValue}
                onChange={(e) => setCurrentInputValue(e.target.value)}
                placeholder={currentStepIndex === 0 ? "örn: 4" : "sayı girin"}
                className="bg-transparent text-amber-300 font-mono outline-none border-b border-amber-500/50 focus:border-amber-400 px-1 py-0.5 w-32 placeholder:text-slate-600 text-sm"
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded flex items-center gap-1 transition-colors"
              >
                <span>Enter</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}

          {isCompleted && (
            <div className="pt-3 pb-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Program başarıyla tamamlandı (exit code 0)
              </span>
              <span aria-hidden="true">·</span>
              <button
                onClick={handleReset}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Yeni Sayılarla Baştan Dene
              </button>
            </div>
          )}

          <div ref={terminalBottomRef} />
        </div>
      </div>
    </div>
  );
};
