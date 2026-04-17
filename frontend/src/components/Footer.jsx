import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark/80 border-t border-white/5 py-12 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-black italic tracking-tighter mb-4 text-white uppercase">OTTOBON</h2>
          <p className="text-slate-400 max-w-sm text-center md:text-left mb-4">
            Revolutionizing student sports management through technology and premium events.
          </p>
          <div className="space-y-1">
             <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">For Doubts & Support</p>
             <a href="tel:9398203083" className="text-neon font-black text-xl hover:scale-105 inline-block transition-transform">9398203083</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-sports text-lg mb-4 text-neon">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#rules" className="hover:text-white transition-colors">Rules & Regulations</a></li>
            <li><a href="#prizes" className="hover:text-white transition-colors">Prize Pool</a></li>
            <li><a href="/register" className="hover:text-white transition-colors">Register Player</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm text-slate-500 italic mb-2">Developed by Ottobon</p>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
