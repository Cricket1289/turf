import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, LogOut, ShieldCheck, UserPlus } from 'lucide-react';

const TeamDashboard = () => {
  const [team, setTeam] = useState({
    id: '123',
    teamName: 'Ottobon Strikers',
    teamCode: 'OBX-99',
    players: [
      { id: 1, full_name: 'Abhiram Krishna', is_captain: true },
      { id: 2, full_name: 'John Doe', is_captain: false },
      { id: 3, full_name: 'Sarah Connor', is_captain: false },
    ]
  });

  const [copied, setCopied] = useState(false);
  const maxPlayers = 8;
  const joinedCount = team.players.length;

  const copyCode = () => {
    navigator.clipboard.writeText(team.teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Team Summary Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 glass p-8 rounded-3xl neon-border relative h-fit"
        >
          <div className="absolute top-4 right-4 bg-neon text-background text-xs font-bold px-3 py-1 rounded-full">
            TEAM SQUAD
          </div>
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">{team.teamName}</h2>
          <p className="text-slate-400 mb-8 flex items-center gap-2">
            <ShieldCheck size={18} className="text-neon" /> Official Team
          </p>

          <div className="space-y-6">
            <div className="bg-dark/50 p-4 rounded-2xl border border-white/5">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Team Invite Code</label>
              <div className="flex items-center justify-between">
                <code className="text-2xl font-sports text-neon">{team.teamCode}</code>
                <button onClick={copyCode} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  {copied ? <Check size={20} className="text-neon" /> : <Copy size={20} className="text-slate-400" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold uppercase">
                <span>Total Squad</span>
                <span className={joinedCount >= maxPlayers ? "text-red-400" : "text-neon"}>
                  {joinedCount}/{maxPlayers} Players
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${joinedCount >= maxPlayers ? "bg-red-400" : "bg-neon"}`}
                  style={{ width: `${(joinedCount / maxPlayers) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <button className="w-full mt-10 border border-red-500/30 text-red-400 py-3 rounded-2xl hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
            <LogOut size={18} /> Leave Team
          </button>
        </motion.div>

        {/* Player List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-black">ACTIVE <span className="text-neon">SQUAD</span></h3>
            {joinedCount < maxPlayers && (
              <span className="text-sm text-slate-500 italic">Waiting for {maxPlayers - joinedCount} more...</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.players.map((player, i) => (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${player.is_captain ? "bg-neon text-background" : "bg-dark shadow-inner text-slate-400"}`}>
                    {player.full_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{player.full_name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                      {player.is_captain ? 'Captain' : 'Member'}
                    </p>
                  </div>
                </div>
                {player.is_captain && <Trophy size={18} className="text-amber-400" />}
              </motion.div>
            ))}

            {Array.from({ length: maxPlayers - joinedCount }).map((_, i) => (
              <div key={i} className="border-2 border-dashed border-white/5 p-5 rounded-2xl flex items-center justify-center gap-2 text-slate-600 grayscale opacity-40">
                <UserPlus size={20} />
                <span className="text-sm font-bold tracking-widest">OPEN SLOT</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
