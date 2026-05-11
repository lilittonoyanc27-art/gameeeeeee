import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Rocket, 
  RotateCcw, Sparkles, 
  ArrowLeft, Gem,
  Zap, MapPin
} from 'lucide-react';
import { SPACE_VERBS } from './vocabData';

interface Player {
  name: string;
  position: number; // 0 to 5 (planetary stages)
  color: string;
  avatar: string;
  id: string;
}

const PLANETS = [
  { name: 'Moon', emoji: '🌑', color: 'bg-slate-300' },
  { name: 'Mars', emoji: '🔴', color: 'bg-orange-500' },
  { name: 'Jupiter', emoji: '🟠', color: 'bg-amber-600' },
  { name: 'Saturn', emoji: '🪐', color: 'bg-yellow-500' },
  { name: 'Neptune', emoji: '🔵', color: 'bg-blue-600' },
  { name: 'Sun', emoji: '☀️', color: 'bg-yellow-400' }
];

export default function SpaceGameView({ onBack }: { onBack: () => void }) {
  const [players, setPlayers] = useState<Player[]>([
    { id: 'gor', name: 'Գոռ', position: 0, color: 'bg-cyan-500', avatar: '🚀' },
    { id: 'gayane', name: 'Գայանե', position: 0, color: 'bg-rose-500', avatar: '🛸' }
  ]);
  
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [currentVerbIdx, setCurrentVerbIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);

  const currentVerb = SPACE_VERBS[currentVerbIdx % SPACE_VERBS.length];
  const shuffledOptions = useMemo(() => {
    return [...currentVerb.options].sort(() => Math.random() - 0.5);
  }, [currentVerb]);

  const handleAnswer = (option: string) => {
    if (isCorrect !== null) return;
    
    const correct = option === currentVerb.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        const newPlayers = [...players];
        newPlayers[currentPlayerIdx].position += 1;
        
        if (newPlayers[currentPlayerIdx].position >= PLANETS.length - 1) {
          setWinner(newPlayers[currentPlayerIdx]);
        }
        
        setPlayers(newPlayers);
        nextTurn();
      }, 1500);
    } else {
      setTimeout(() => {
        nextTurn();
      }, 2500);
    }
  };

  const nextTurn = () => {
    setIsCorrect(null);
    setCurrentPlayerIdx(prev => (prev === 0 ? 1 : 0));
    setCurrentVerbIdx(prev => prev + 1);
  };

  const resetGame = () => {
    setPlayers(p => p.map(player => ({ ...player, position: 0 })));
    setWinner(null);
    setCurrentPlayerIdx(0);
    setCurrentVerbIdx(0);
    setIsCorrect(null);
  };

  if (winner) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[64px] p-12 shadow-2xl border-4 border-slate-100 space-y-8"
        >
          <div className="relative inline-block">
             <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
             <div className="absolute inset-0 animate-ping opacity-20"><Trophy className="w-24 h-24 text-yellow-400" /></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-slate-900 uppercase italic">ՀԱՂԹԱՆՈՑ!</h2>
            <p className={`${winner.color.replace('bg-', 'text-')} text-6xl font-black uppercase italic tracking-tighter`}>
               {winner.name} {winner.avatar}
            </p>
          </div>

          <p className="text-xl font-bold text-slate-500">Դուք առաջինը հասաք Արեգակին:</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={resetGame}
              className="bg-indigo-600 text-white py-6 rounded-3xl font-black italic uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl"
            >
              <RotateCcw className="w-6 h-6" /> Նորից խաղալ
            </button>
            <button onClick={onBack} className="text-slate-400 font-black uppercase text-xs tracking-widest hover:text-slate-900">
               Գլխավոր Մենյու
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentPlayer = players[currentPlayerIdx];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center py-12 px-4">
      {/* 3D-ish Cosmic Background */}
      <div className="fixed inset-0 bg-[#020617] pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-40" />
         {[...Array(50)].map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               opacity: [0.2, 0.8, 0.2],
               scale: [1, 1.2, 1] 
             }}
             transition={{ 
               duration: 2 + Math.random() * 3, 
               repeat: Infinity,
               delay: Math.random() * 2
             }}
             style={{ 
               left: `${Math.random() * 100}%`, 
               top: `${Math.random() * 100}%` 
             }}
             className="absolute w-1 h-1 bg-white rounded-full"
           />
         ))}
      </div>

      {/* Race Progress Track */}
      <div className="relative w-full max-w-5xl h-32 sm:h-48 mb-12 flex items-center justify-between px-10">
         <div className="absolute inset-x-8 h-1 bg-white/10 rounded-full top-1/2 -translate-y-1/2" />
         
         {PLANETS.map((planet, i) => (
           <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                className={`w-12 h-12 sm:w-20 sm:h-20 rounded-full ${planet.color} flex items-center justify-center text-2xl sm:text-4xl shadow-2xl border-4 border-white/20`}
              >
                {planet.emoji}
              </motion.div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{planet.name}</span>
           </div>
         ))}

         {/* Players Rockets */}
         <AnimatePresence>
            {players.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={false}
                animate={{ 
                  left: `${(p.position / (PLANETS.length - 1)) * 100}%`,
                  y: i === 0 ? -40 : 20,
                  rotate: currentPlayerIdx === i ? [0, 5, -5, 0] : 0,
                  scale: currentPlayerIdx === i ? 1.2 : 0.8
                }}
                className={`absolute z-30 transition-all duration-1000 ease-out`}
                style={{ marginLeft: '-30px' }}
              >
                <div className={`${p.color} p-4 rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-3xl sm:text-5xl`}>
                   {p.avatar}
                </div>
                {currentPlayerIdx === i && (
                   <motion.div 
                     animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="absolute inset-0 bg-white/30 rounded-full -z-10"
                   />
                )}
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Game Card */}
      <motion.div
        key={currentVerbIdx}
        initial={{ y: 50, opacity: 0, rotateX: 45 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        className="relative z-20 w-full max-w-3xl perspective-1000"
      >
        <div className="bg-white/10 backdrop-blur-3xl p-8 sm:p-20 rounded-[64px] border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.05)] text-center space-y-12">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-[0.3em]">
                 <Zap className="w-3 h-3 text-yellow-400" /> {currentPlayer.name}-ի հերթն է
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight glow-text px-4">
                {currentVerb.sentence}
              </h2>
              <p className="text-indigo-200 font-bold italic text-lg uppercase tracking-wider">
                {currentVerb.translation}
              </p>
              <div className="h-1 bg-white/10 w-32 mx-auto rounded-full" />
           </div>

           {/* Feedback Overlay */}
           <AnimatePresence>
             {isCorrect !== null && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 className={`absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[64px] ${isCorrect ? 'bg-green-500' : 'bg-rose-600'} text-white space-y-4`}
               >
                 {isCorrect ? (
                    <>
                      <Sparkles className="w-24 h-24" />
                      <h3 className="text-6xl font-black uppercase italic">ՃԻՇՏ Է!</h3>
                      <p className="text-xl font-bold opacity-80">Թռիչք դեպի հաջորդ մոլորակ...</p>
                    </>
                 ) : (
                    <>
                      <AlertCircle className="w-24 h-24" />
                      <h3 className="text-6xl font-black uppercase italic">ՍԽԱԼ Է!</h3>
                      <div className="text-center">
                        <p className="text-sm opacity-60 uppercase font-black tracking-widest">Ճիշտ տարբերակը`</p>
                        <p className="text-4xl font-black uppercase text-yellow-300">{currentVerb.correctAnswer}</p>
                      </div>
                    </>
                 )}
               </motion.div>
             )}
           </AnimatePresence>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {shuffledOptions.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white/5 hover:bg-white/20 border border-white/20 text-white p-8 rounded-[32px] text-xl sm:text-2xl font-black transition-all hover:shadow-2xl hover:shadow-white/10 italic uppercase tracking-tight"
                >
                  {opt}
                </motion.button>
              ))}
           </div>
        </div>
      </motion.div>

      {/* Info */}
      <div className="mt-12 flex gap-8 text-white/30 text-xs font-black uppercase tracking-[0.4em]">
         <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> ՆՊԱՏԱԿԱԿԵՏ` ԱՐԵԳԱԿ
         </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .glow-text { text-shadow: 0 0 30px rgba(255,255,255,0.5); }
      `}</style>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
