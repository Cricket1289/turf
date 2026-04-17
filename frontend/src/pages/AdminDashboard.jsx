import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, XCircle, Users, Activity, ExternalLink } from 'lucide-react';
import TournamentBracket from '../components/TournamentBracket';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('registrations');
  const [players, setPlayers] = useState([
    { id: 1, full_name: 'Abhiram Krishna', phone: '9876543210', college: 'VIT', status: 'Pending' },
    { id: 2, full_name: 'John Smith', phone: '9888888888', college: 'IIT', status: 'Approved' },
    { id: 3, full_name: 'Mike Johnson', phone: '9777777777', college: 'BITS', status: 'Rejected' },
  ]);

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 uppercase">Admin <span className="text-neon">Console</span></h2>
          <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">Tournament Management & Oversight</p>
        </div>
        
        <div className="flex bg-dark/50 p-1.5 rounded-2xl border border-white/10">
          {['registrations', 'teams', 'bracket'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all uppercase ${activeTab === tab ? 'bg-neon text-background' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl overflow-hidden min-h-[500px]"
      >
        {activeTab === 'registrations' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="text-neon" /> ALL REGISTRATIONS
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-neon/30 rounded-xl text-neon hover:bg-neon/10 transition-colors text-sm font-bold">
                <Download size={18} /> EXPORT CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500 text-sm uppercase">
                    <th className="py-4 px-6">Player Name</th>
                    <th className="py-4 px-6">College</th>
                    <th className="py-4 px-6">Documents</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {players.map((player) => (
                    <tr key={player.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-5 px-6 font-bold">{player.full_name}</td>
                      <td className="py-5 px-6 text-slate-400">{player.college}</td>
                      <td className="py-5 px-6">
                        <div className="flex gap-4">
                          <button title="Student ID" className="text-neon hover:underline flex items-center gap-1 text-xs"><ExternalLink size={14} /> ID</button>
                          <button title="Marks Memo" className="text-accent hover:underline flex items-center gap-1 text-xs"><ExternalLink size={14} /> MEMO</button>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          player.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          player.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-400 transition-colors"><CheckCircle size={18} /></button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"><XCircle size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="p-20 text-center">
            <Users size={64} className="mx-auto text-slate-500 mb-6 opacity-20" />
            <h3 className="text-2xl font-bold mb-2">Team Overview coming soon</h3>
            <p className="text-slate-500">You will be able to manage squads and assign seeds here.</p>
          </div>
        )}

        {activeTab === 'bracket' && (
          <div className="p-8">
             <TournamentBracket />
          </div>
        )}
      </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
