import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Users, ArrowRight, ShieldCheck, Flame, Play, Terminal, CheckCircle2, Trophy, Compass } from 'lucide-react';

interface MainHeroProps {
  onUnlockPassClick: () => void;
  onExploreClick: () => void;
}

export const MainHero: React.FC<MainHeroProps> = ({ onUnlockPassClick, onExploreClick }) => {
  const [buildersCount, setBuildersCount] = useState(327);
  const [recentNotification, setRecentNotification] = useState<string>("Siddharth from BITS Pilani unlocked League Pass");

  // Simulated live-looking builder updates (prominent and honest)
  useEffect(() => {
    const liveJoiners = [
      "Kavya from IIT Madras entered Challenge 01",
      "Rohan from RVCE Bengaluru unlocked League Pass",
      "Aditi from NIT Trichy solved AI Detective flaw",
      "Pranav from DTU Delhi invited 3 teammates",
      "Tanvi from COEP Pune scored 96 in Speed Run"
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.4 && buildersCount < 485) {
        setBuildersCount((prev) => prev + 1);
      }
      const randomJoin = liveJoiners[Math.floor(Math.random() * liveJoiners.length)];
      setRecentNotification(randomJoin);
    }, 9000);

    return () => clearInterval(interval);
  }, [buildersCount]);

  const maxBuilders = 500;
  const progressPercent = ((buildersCount / maxBuilders) * 100).toFixed(1);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-16 pb-16 overflow-hidden bg-[#FAF7F2]">
      
      {/* Warm Ambient Radiance */}
      <div className="absolute inset-0 bg-radial from-amber-100/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Campaign Stage Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D4A855] bg-[#FFFDF9] shadow-xs mb-6">
          <Flame size={15} className="text-amber-600" />
          <span className="text-xs font-mono font-bold text-[#5C3A1E] tracking-wider">
            CAMPUS GROWTH EXPERIMENT // FINAL-YEAR BATCH 2026
          </span>
        </div>

        {/* Cinematic Main Title */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#2D2319] drop-shadow-xs">
          AI BUILDER LEAGUE
        </h1>

        {/* Mission Statement */}
        <div className="mt-6 space-y-2 max-w-2xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-amber-800">
            500 final-year engineers. 3 AI challenges. 7 days. One mission.
          </p>
          <p className="text-sm sm:text-base text-[#5E4F41] font-sans leading-relaxed">
            Stop solving static textbook leetcode. Put your engineering instincts against actual LLM hallucinations, prompt architecture, and live deployment.
          </p>
        </div>

        {/* ==================================================== */}
        {/* LIVE BUILDER COUNTER (PROMINENT & WARM)              */}
        {/* ==================================================== */}
        <div className="mt-10 w-full max-w-lg warm-card rounded-3xl p-6 border-2 border-[#D4A855] shadow-[0_10px_35px_rgba(90,60,20,0.08)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#5C3A1E] uppercase font-bold">
                LIVE BUILDER REGISTRY
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
              <Users size={13} className="text-amber-800" />
              <span>COHORT CAP: {maxBuilders}</span>
            </div>
          </div>

          {/* Big Counter Digits */}
          <div className="flex items-baseline justify-center space-x-3 py-2">
            <span className="font-heading text-6xl sm:text-7xl font-black text-[#2D2319] tracking-tight">
              {buildersCount}
            </span>
            <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#8C7662]">
              / {maxBuilders}
            </span>
            <span className="font-mono text-sm text-amber-800 font-bold uppercase tracking-wider self-center">
              BUILDERS
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EFE8DD] rounded-full h-3.5 p-0.5 border border-[#DAC8B2] mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-full rounded-full transition-all duration-1000 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#6E5A47] mt-2 font-medium">
            <span>{progressPercent}% Cohort Confirmed</span>
            <span>{maxBuilders - buildersCount} Builder Slots Open</span>
          </div>

          {/* Live Activity Ticker */}
          <div className="mt-4 pt-3 border-t border-[#E8DFD5] flex items-center justify-center space-x-2 text-xs font-mono text-emerald-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span className="truncate max-w-sm">{recentNotification}</span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* CALL TO ACTION BUTTONS                               */}
        {/* ==================================================== */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Main CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onUnlockPassClick();
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white font-heading font-black text-lg tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[0_6px_25px_rgba(217,119,6,0.35)] flex items-center justify-center space-x-3 cursor-pointer group"
          >
            <span>ENTER THE LEAGUE</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Action */}
          <button
            onClick={() => {
              sounds.playClick();
              onExploreClick();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF6EE] text-[#5C3A1E] font-mono text-sm tracking-wider border-2 border-[#D4A855] hover:border-amber-600 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs hover:scale-105"
          >
            <Compass size={17} className="text-amber-700" />
            <span>SEE WHAT'S INSIDE</span>
          </button>
        </div>

        {/* Campaign Pillars */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
          <div className="warm-card p-5 rounded-2xl border border-[#E8DFD5]">
            <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold uppercase mb-2">
              <Terminal size={14} />
              <span>01 // 3 AI CHALLENGES</span>
            </div>
            <div className="text-[#2D2319] text-sm font-bold">Detective • Creator • Speed Run</div>
            <p className="text-xs text-[#5E4F41] mt-1">Real technical scenarios, not multiple choice questions.</p>
          </div>

          <div className="warm-card p-5 rounded-2xl border border-[#E8DFD5]">
            <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold uppercase mb-2">
              <Trophy size={14} />
              <span>02 // 7 DAYS TIMELINE</span>
            </div>
            <div className="text-[#2D2319] text-sm font-bold">Structured Sprint</div>
            <p className="text-xs text-[#5E4F41] mt-1">Daily progression synced with live campus rankings.</p>
          </div>

          <div className="warm-card p-5 rounded-2xl border border-[#E8DFD5]">
            <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold uppercase mb-2">
              <Sparkles size={14} />
              <span>03 // GRAND WORKSHOP</span>
            </div>
            <div className="text-[#2D2319] text-sm font-bold">60-Min AI Project Build</div>
            <p className="text-xs text-[#5E4F41] mt-1">Deploy your first real AI project from scratch.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
