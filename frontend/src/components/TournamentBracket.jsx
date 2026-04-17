import React from 'react';
import { motion } from 'framer-motion';

const TournamentBracket = () => {
  const matches = [
    { id: 1, round: 'Quarter Final', teamA: 'Ottobon Strikers', teamB: 'Shadow Warriors', scoreA: '88/4', scoreB: '82/8', winner: 'teamA' },
    { id: 2, round: 'Quarter Final', teamA: 'Night Riders', teamB: 'Super Kings', scoreA: '95/2', scoreB: '99/3', winner: 'teamB' },
    { id: 3, round: 'Semi Final', teamA: 'Ottobon Strikers', teamB: 'Super Kings', scoreA: '-', scoreB: '-', winner: null },
    { id: 4, round: 'Final', teamA: 'TBD', teamB: 'TBD', scoreA: '-', scoreB: '-', winner: null },
  ];

  return (
    <div className="space-y-12 py-10">
       <div className="text-center mb-12">
          <h3 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">Live <span className="text-neon">Bracket</span></h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Ottobon Box Cricket Tournament Season 1</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden">
          {/* Round Labels */}
          <div className="space-y-8">
             <RoundColumn title="Quarter Finals" matches={matches.slice(0, 2)} />
          </div>

          <div className="space-y-8 flex flex-col justify-center">
             <RoundColumn title="Semi Finals" matches={[matches[2]]} />
          </div>

          <div className="space-y-8 flex flex-col justify-center">
             <RoundColumn title="Grand Finale" matches={[matches[3]]} isFinal />
          </div>
       </div>
    </div>
  );
};

const RoundColumn = ({ title, matches, isFinal }) => (
  <div className="space-y-6">
    <h4 className="text-center font-black uppercase text-xs tracking-[0.2em] text-neon mb-4 py-2 border-y border-neon/20">{title}</h4>
    <div className="space-y-8">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} isFinal={isFinal} />
      ))}
    </div>
  </div>
);

const MatchCard = ({ match, isFinal }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-1 rounded-2xl ${isFinal ? 'bg-gradient-to-br from-amber-400 to-neon shadow-[0_0_20px_rgba(255,191,0,0.3)]' : 'bg-white/5'}`}
  >
    <div className="bg-background/95 rounded-xl p-4 border border-white/5">
      <div className="space-y-3">
        <div className={`flex justify-between items-center p-2 rounded-lg ${match.winner === 'teamA' ? 'bg-neon/10 text-neon font-bold' : 'text-slate-400'}`}>
          <span className="text-sm truncate w-24">{match.teamA}</span>
          <span className="text-xs font-sports">{match.scoreA}</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="h-px flex-grow bg-white/5" />
           <span className="text-[10px] font-black text-slate-600 uppercase">VS</span>
           <div className="h-px flex-grow bg-white/5" />
        </div>
        <div className={`flex justify-between items-center p-2 rounded-lg ${match.winner === 'teamB' ? 'bg-neon/10 text-neon font-bold' : 'text-slate-400'}`}>
          <span className="text-sm truncate w-24">{match.teamB}</span>
          <span className="text-xs font-sports">{match.scoreB}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default TournamentBracket;
