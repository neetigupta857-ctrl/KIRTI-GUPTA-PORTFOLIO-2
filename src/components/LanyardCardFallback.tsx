import React from 'react';
import kirtiPhoto from '../assets/kirti-gupta.jpg';

export const LanyardCardFallback: React.FC = () => (
  <div className="w-full h-full min-h-[450px] flex items-center justify-center p-4">
    <div className="relative w-64 h-[360px] rounded-3xl bg-[#0D0F0F]/90 border border-emerald-500/30 p-5 shadow-2xl flex flex-col items-center justify-between text-center overflow-hidden backdrop-blur-xl animate-pulse">
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
      <div className="w-8 h-2 rounded-full bg-emerald-500/40 my-1" />
      <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase font-mono">
        GRAPHIC DESIGNER
      </span>
      <div className="w-36 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-lg my-2 relative">
        <img src={kirtiPhoto} alt="Kirti Gupta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div>
        <h3 className="text-base font-bold text-white tracking-tight">KIRTI GUPTA</h3>
        <p className="text-xs text-emerald-400/80 font-mono mt-0.5">Brand Architect & Designer</p>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>Loading Interactive 3D...</span>
      </div>
    </div>
  </div>
);
