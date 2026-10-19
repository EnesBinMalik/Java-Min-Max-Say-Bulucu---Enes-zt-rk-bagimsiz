import React from 'react';
import { AlertTriangle, Lightbulb, Clock, Database, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AlgorithmExplainer: React.FC = () => {
  return (
    <div id="algorithm" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Algoritma Analizi ve Dikkat Edilmesi Gereken Püf Noktaları
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Java mülakatlarında ve programlama ödevlerinde sıkça karşılaşılan kritik detaylar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pitfall Card: min = 0 Hatası */}
        <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-950/10 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Kritik Hata: Neden min = 0 veya max = 0 Yapılmamalı?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Yeni başlayan birçok yazılımcı <code className="text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded">int enKucuk = 0;</code> veya <code className="text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded">int enBuyuk = 0;</code> başlatma hatasına düşer.
          </p>
          <div className="p-3 bg-slate-900/60 rounded-lg text-xs space-y-1 font-mono text-slate-300">
            <p className="text-rose-400 font-bold">Örnek Hata Senaryosu:</p>
            <p>Girilen sayılar: 10, 20, 30</p>
            <p>Eğer <code className="text-rose-300">enKucuk = 0</code> ise sonuç: <span className="text-rose-400">0 çıkar! (Yanlış, 10 olmalıydı)</span></p>
            <p className="pt-1">Girilen sayılar: -22, -15, -50</p>
            <p>Eğer <code className="text-rose-300">enBuyuk = 0</code> ise sonuç: <span className="text-rose-400">0 çıkar! (Yanlış, -15 olmalıydı)</span></p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Enes Öztürk Çözümü:</strong> İlk girilen sayıyı hem en büyük hem en küçük olarak kabul etmek (veya <code className="text-amber-300">Integer.MAX_VALUE</code> / <code className="text-amber-300">Integer.MIN_VALUE</code> kullanmak) tüm negatif ve pozitif değerlerde %100 kusursuz çalışır.
          </p>
        </div>

        {/* Math nuance: Sayma sayısı vs Negatif tamsayılar */}
        <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Lightbulb className="w-4 h-4 shrink-0" />
            <span>Matematiksel Not: Sayma Sayıları ve Negatif Değerler</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Matematikte <em>sayma sayıları</em> kümesi 1'den başlar ($1, 2, 3, \dots$). Ancak verilen senaryoda <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded">-22</code> ve <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded">-15</code> gibi negatif tam sayılar verilmiştir.
          </p>
          <div className="p-3 bg-slate-900/60 rounded-lg text-xs space-y-1 font-mono text-slate-300">
            <p className="text-amber-300 font-bold">Senaryodaki Girdiler:</p>
            <p>1. Sayı: 16 (Pozitif)</p>
            <p>2. Sayı: -22 (Negatif)</p>
            <p>3. Sayı: -15 (Negatif)</p>
            <p>4. Sayı: 100 (Pozitif)</p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Yazdığımız Java programı tüm tam sayı kümesini (<code className="text-cyan-300">int: -2³¹ ile 2³¹-1</code>) kapsayacak esneklikte tasarlanmıştır.
          </p>
        </div>
      </div>

      {/* Complexity & Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Time Complexity */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Zaman Karmaşıklığı (Time)</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            O(N)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Döngü yalnızca 1 kez çalışır. Her sayı tek bir if kıyaslamasından geçtiği için N sayı için doğrusal zaman alır.
          </p>
        </div>

        {/* Space Complexity */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Alan Karmaşıklığı (Space)</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            O(1) Sabit
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sayılar diziye kaydedilmeden akış esnasında karşılaştırıldığı için N ne kadar büyük olursa olsun sabit bellek harcar.
          </p>
        </div>

        {/* Resource Management */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Bellek Güvenliği (Scanner)</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            scanner.close()
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Program sonunda standart girdi akışı (System.in) kapatılarak olası bellek sızıntıları (resource leaks) engellenir.
          </p>
        </div>
      </div>
    </div>
  );
};
