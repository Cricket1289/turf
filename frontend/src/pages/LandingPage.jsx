import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Shield, Zap, Calendar, MapPin, QrCode, UserCheck, TrendingUp, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const InfoCard = ({ icon: Icon, label, value, detail }) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-3 group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">{label}</span>
    <span className="text-base font-bold text-white uppercase italic leading-tight">{value}</span>
    {detail && <span className="text-[10px] text-neon/80 font-bold mt-2 uppercase tracking-tight bg-neon/10 px-2 py-0.5 rounded">{detail}</span>}
  </div>
);

const InteractiveCard = ({ href, icon: Icon, title, colorClass, features }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative glass p-8 rounded-[32px] border-white/5 hover:border-${colorClass}/30 transition-all duration-500 flex flex-col justify-between overflow-hidden h-full min-h-[340px] shadow-lg`}
  >
    <div className={`absolute -top-12 -right-12 w-24 h-24 bg-${colorClass}/10 rounded-full blur-2xl group-hover:bg-${colorClass}/30 transition-colors`} />
    <div>
      <div className={`w-14 h-14 bg-${colorClass}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
        <Icon className={`w-7 h-7 text-${colorClass}`} />
      </div>
      <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">{title}</h4>

      <ul className="space-y-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-xs text-slate-400 font-bold leading-relaxed group/item hover:text-white transition-colors">
            <div className={`w-1.5 h-1.5 rounded-full bg-${colorClass} mt-1.5 border border-${colorClass}/50 shadow-[0_0_8px_${colorClass}] shrink-0`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between overflow-hidden">
      <div className="relative w-24 h-4 overflow-hidden mask-fade-edges">
        <div className={`absolute top-0 left-0 flex items-center gap-4 whitespace-nowrap animate-marquee group-hover:text-${colorClass} transition-colors`}>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Visit Site</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Visit Site</span>
        </div>
      </div>
      <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-${colorClass} group-hover:border-${colorClass} transition-all duration-500`}>
        <Zap className="w-5 h-5 text-white group-hover:scale-110 group-hover:animate-pulse" />
      </div>
    </div>
  </a>
);

const LandingPage = () => {
  return (
    <div className="">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 3s linear infinite;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000"
            alt="Cricket Stadium"
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse-slow">
            <Zap className="text-primary w-4 h-4" />
            <span className="text-sm font-bold tracking-widest uppercase">B.Tech Students 2026 ,2027 & 2028 batches only</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent italic tracking-tighter uppercase leading-none pr-8">
              OTTOBON
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ultimate precision, unmatched speed. Join the most intense box cricket tournament of the season.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="btn-primary">Register Your Squad</Link>
            <a href="#rules" className="glass px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">View Rules</a>
          </div>

          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-4">Event Starts In</p>
            <CountdownTimer />
          </div>
        </motion.div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Trophy, title: "Grand Prize", value: "Winners & Runners", color: "text-accent" },
          { icon: Users, title: "Teams", value: "Limited Slots", color: "text-primary" },
          { icon: Shield, title: "Format", value: "Knockout", color: "text-primary" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass p-8 rounded-3xl neon-border group hover:bg-white/10 transition-all"
          >
            <stat.icon className={`w-12 h-12 mb-6 ${stat.color} group-hover:scale-110 transition-transform`} />
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">{stat.title}</h3>
            <p className="text-3xl font-sports font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-24 px-6 bg-dark/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">TOURNAMENT <span className="text-neon">RULES</span></h2>
            <div className="h-1.5 w-24 bg-neon mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">1</span>
                  <p className="text-slate-300"><span className="text-white font-bold">Match Format:</span> 6 Overs per innings. Standard knockout rules apply.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">2</span>
                  <p className="text-slate-300"><span className="text-white font-bold">Squad Size:</span> Maximum 8 players per team.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">3</span>
                  <p className="text-slate-300"><span className="text-white font-bold">Single Team Rule:</span> A player MUST only represent one team. Violation will lead to <span className="text-red-400 font-bold uppercase">Disqualification</span> of both teams.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">4</span>
                  <p className="text-slate-300"><span className="text-white font-bold">Punctuality:</span> Teams must report at the venue at least <span className="text-neon font-bold">20 minutes</span> before their scheduled match time.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">5</span>
                  <p className="text-slate-300">Decision of the umpire is final and absolute.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">6</span>
                  <p className="text-slate-300">Entry fee must be cleared before the first match.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold shrink-0">7</span>
                  <p className="text-slate-300"><span className="text-white font-bold">Career Reward:</span> One participant from the Winning team and one from the Runner-up team will receive a <span className="text-neon font-bold uppercase">Free Internship</span> at Ottobon.</p>
                </li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-2xl font-sports mb-6 text-neon">Quick Info</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:gap-6 mt-12 w-full">
                  <InfoCard icon={Calendar} label="Date" value="May 15th , 2026" />
                  <InfoCard icon={MapPin} label="Venue" value="Vizag" detail="(Announce Soon)" />
                  <InfoCard
                    icon={UserCheck}
                    label="Eligibility"
                    value="B.Tech Only"
                    detail="2026 , 2027 & 2028 Graduates"
                  />
                  <InfoCard
                    icon={Trophy}
                    label="Prize Pool"
                    value="8,000 INR"
                    detail="Winners: 5K | Runners: 3K"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="py-24 px-6 bg-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase leading-none">
              Kickstart Your <br />
              <span className="text-primary">Career</span>
            </h2>
            <p className="text-slate-400 mb-10 max-w-md mx-auto md:mx-0 text-lg">
              Explore the opportunities in Ottobon and elevate your skills through our elite ecosystem.
            </p>
            <div className="flex flex-col gap-6 items-center md:items-start">
              <div className="bg-primary/5 border border-white/5 p-6 rounded-3xl w-full max-w-sm flex items-center gap-4 group hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Support Hotline</p>
                  <a href="tel:9398203083" className="text-2xl font-black text-white hover:text-neon transition-colors">9398203083</a>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-primary/60 tracking-widest px-4 py-2 bg-white/5 rounded-full">
                <Shield className="w-3 h-3" />
                Powered by Ottobon
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-[600px]">
            <InteractiveCard
              href="https://academy.ottobon.in"
              icon={Book}
              title="Academy"
              colorClass="accent"
              features={[
                "Industry-led Professional Training",
                "Live Capstone Projects & Labs",
                "Direct Placement Assistance",
                "High-end Skill Certification"
              ]}
            />
            <InteractiveCard
              href="https://learn.ottobon.in"
              icon={Zap}
              title="Course Platform"
              colorClass="neon"
              features={[
                "Self-paced Interactive Learning",
                "Master Trending Technologies",
                "Expert-curated Course Content",
                "Industry Ready Portfolio"
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
