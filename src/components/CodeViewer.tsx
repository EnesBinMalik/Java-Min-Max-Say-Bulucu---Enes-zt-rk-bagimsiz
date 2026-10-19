import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { JAVA_VARIANTS, JavaCodeVariant } from '../data/javaCode';

export const CodeViewer: React.FC = () => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const currentVariant = JAVA_VARIANTS.find((v) => v.id === selectedVariantId) || JAVA_VARIANTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentVariant.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentVariant.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentVariant.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Simple clean syntax tokenizer for Java
  const renderHighlightedJava = (codeText: string) => {
    const lines = codeText.split('\n');
    return lines.map((line, idx) => {
      // Check if comment
      const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().endsWith('*/');

      return (
        <div key={idx} className="table-row font-mono text-xs sm:text-sm leading-6">
          <span className="table-cell pr-4 text-right select-none text-slate-600 font-mono text-xs">
            {idx + 1}
          </span>
          <span className="table-cell whitespace-pre">
            {isComment ? (
              <span className="text-slate-500 italic">{line}</span>
            ) : (
              highlightLine(line)
            )}
          </span>
        </div>
      );
    });
  };

  const highlightLine = (line: string) => {
    // Regex for Java tokens
    const parts = line.split(/("(?:[^"\\]|\\.)*"|\/\/.*$|\b(?:public|class|static|void|int|double|for|if|else|return|new|import|package|break|continue)\b|\b(?:System|Scanner|String|Integer|Arrays|Math|out|in)\b)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Strings
      if (part.startsWith('"') && part.endsWith('"')) {
        return <span key={index} className="text-amber-300">{part}</span>;
      }
      // Comments
      if (part.startsWith('//')) {
        return <span key={index} className="text-slate-500 italic">{part}</span>;
      }
      // Keywords
      if (['public', 'class', 'static', 'void', 'int', 'double', 'for', 'if', 'else', 'return', 'new', 'import', 'package'].includes(part)) {
        return <span key={index} className="text-indigo-400 font-semibold">{part}</span>;
      }
      // Built-in Classes & Objects
      if (['System', 'Scanner', 'String', 'Integer', 'Arrays', 'Math', 'out', 'in'].includes(part)) {
        return <span key={index} className="text-cyan-300">{part}</span>;
      }
      // Method calls like nextInt, println
      if (['nextInt', 'print', 'println', 'close', 'stream', 'max', 'min', 'getAsInt'].includes(part)) {
        return <span key={index} className="text-emerald-300">{part}</span>;
      }

      return <span key={index} className="text-slate-200">{part}</span>;
    });
  };

  return (
    <div id="code" className="space-y-4">
      {/* Header and Variant Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Java Kaynak Kodu</span>
            <span className="text-xs font-normal text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              Enes Öztürk İmzalı
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ödevler, projeler ve Java derleyicileri için hemen kopyalayabilir veya indirebilirsiniz.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{currentVariant.filename} İndir</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {JAVA_VARIANTS.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariantId(variant.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedVariantId === variant.id
                ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{variant.title}</span>
          </button>
        ))}
      </div>

      {/* Description info */}
      <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg text-xs text-slate-300 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">{currentVariant.filename}: </span>
          {currentVariant.description}
        </div>
      </div>

      {/* Code Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span>{currentVariant.filename}</span>
          </div>
          <span className="text-[11px] text-amber-400/90">Yazar: Enes Öztürk</span>
        </div>

        <div className="p-4 overflow-x-auto terminal-scroll max-h-[520px]">
          <div className="table w-full">
            {renderHighlightedJava(currentVariant.code)}
          </div>
        </div>
      </div>
    </div>
  );
};
