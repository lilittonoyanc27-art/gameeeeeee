import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, ArrowLeft,
  Sparkles, Gem
} from 'lucide-react';
import { A1_VOCAB } from './vocabData';

export default function VocabView({ onBack, onPlay }: { onBack: () => void, onPlay: () => void }) {
  const tables = [
    {
      verb: "LLEVAR",
      meaning: "Տանել / Կրել",
      color: "cyan",
      rows: [
        { p: "Yo", c: "llevo" },
        { p: "Tú", c: "llevas" },
        { p: "Él/Ella/Ud.", c: "lleva" },
        { p: "Nosotros", c: "llevamos" },
        { p: "Vosotros", c: "lleváis" },
        { p: "Ellos/as/Uds.", c: "llevan" }
      ]
    },
    {
      verb: "TRAER",
      meaning: "Բերել",
      color: "rose",
      rows: [
        { p: "Yo", c: "traigo" },
        { p: "Tú", c: "traes" },
        { p: "Él/Ella/Ud.", c: "trae" },
        { p: "Nosotros", c: "traemos" },
        { p: "Vosotros", c: "traéis" },
        { p: "Ellos/as/Uds.", c: "traen" }
      ]
    },
    {
      verb: "SOLER",
      meaning: "Սովորաբար անել",
      color: "indigo",
      rows: [
        { p: "Yo", c: "suelo" },
        { p: "Tú", c: "sueles" },
        { p: "Él/Ella/Ud.", c: "suele" },
        { p: "Nosotros", c: "solemos" },
        { p: "Vosotros", c: "soléis" },
        { p: "Ellos/as/Uds.", c: "suelen" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-32 pt-8 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl shadow-inner">
           <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
          ԲԱՑԱՏՐՈՒԹՅՈՒՆ
        </h2>
        <p className="text-slate-500 font-bold italic max-w-xl mx-auto uppercase tracking-widest text-xs">
          LLEVAR, TRAER & SOLER
        </p>
      </section>

      {/* Tables Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {tables.map((table, i) => (
          <motion.div 
            key={table.verb}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white rounded-[48px] p-6 border border-slate-100 space-y-6 shadow-2xl relative overflow-hidden group`}
          >
            <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${
              table.color === 'cyan' ? 'from-cyan-400 to-blue-500' : 
              table.color === 'rose' ? 'from-rose-400 to-pink-500' :
              'from-indigo-400 to-violet-500'
            }`} />
            
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 italic uppercase">{table.verb}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{table.meaning}</p>
            </div>

            <div className="bg-slate-50 shadow-inner rounded-3xl overflow-hidden font-sans border border-slate-100">
               {table.rows.map((row) => (
                 <div key={row.p} className="flex border-b border-slate-100 last:border-0 hover:bg-white transition-colors">
                    <div className="w-5/12 p-3 font-black underline decoration-slate-200 italic text-slate-400 uppercase text-[9px] tracking-widest">{row.p}</div>
                    <div className="w-7/12 p-3 font-black text-slate-900 italic text-lg uppercase">{row.c}</div>
                 </div>
               ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Word Grid */}
      <h3 className="text-center font-black text-slate-300 uppercase tracking-[0.3em] text-xs">Լրացուցիչ Բառեր</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {A1_VOCAB.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-4 rounded-3xl border border-slate-50 shadow-lg text-center"
          >
            <div className="text-2xl mb-1">{word.emoji}</div>
            <p className="text-[10px] font-black italic text-slate-900 uppercase leading-none">{word.spanish}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-indigo-600 rounded-[48px] p-8 sm:p-12 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Sparkles className="w-32 h-32 rotate-12" />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter leading-tight">Պատրա՞ստ են Գոռն ու Գայանեն</h3>
          <p className="text-indigo-100 font-bold opacity-80 italic uppercase tracking-widest text-xs">Սկսեք մրցույթը և ստուգեք ձեր գիտելիքները:</p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onPlay}
            className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ
          </button>
          <button 
            onClick={onBack}
            className="bg-indigo-500/30 backdrop-blur-md text-white border border-indigo-400 px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest hover:bg-indigo-500/50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> ՀԵՏ
          </button>
        </div>
      </section>
    </div>
  );
}
