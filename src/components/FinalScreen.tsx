/**
 * FinalScreen — Capstone Call-to-Action with Veer.
 * Natural warm & peaceful styling. No dark neon void.
 * Features cute full-body VeerCharacter in warm saffron kurta.
 */
import React from 'react';
import { VeerCharacter } from './VeerCharacter';
import { sounds } from '../utils/soundEffects';
import { ArrowRight, Swords, Sparkles, CheckCircle2, ShieldCheck, Trophy } from 'lucide-react';

interface FinalScreenProps {
  onEnterLeagueClick: () => void;
  onChallengeMeClick: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  onEnterLeagueClick,
  onChallengeMeClick,
}) => {
  return (
    <section id="final-cta" className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 py-24 overflow-hidden bg-[#FAF7F2] border-t border-[#E8DFD5]">
      
      {/* Warm Ambient Radial Radiance */}
      <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Character Veer standing proudly */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="p-3 rounded-3xl bg-[#FFFDF9] border-2 border-[#D4A855] shadow-lg">
            <VeerCharacter
              mood="celebratory"
              size={145}
              isSpeaking={false}
            />
          </div>
          <div className="mt-2 px-3.5 py-1 rounded-full bg-[#E5A93C] text-[#3B210B] text-xs font-mono font-bold tracking-wider shadow-md">
            VEER // YOUR AI CAMPUS GUIDE
          </div>
        </div>

        {/* Cinematic Headline Sequence */}
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xl sm:text-2xl md:text-3xl font-heading font-black text-[#5C3A1E]">
            <span className="text-amber-700">"Three challenges."</span>
            <span className="text-[#C4A874]">•</span>
            <span className="text-[#B85C20]">"500 engineers."</span>
            <span className="text-[#C4A874]">•</span>
            <span className="text-emerald-700">"One workshop."</span>
          </div>

          <div className="pt-2">
            <div className="text-xs font-mono text-amber-900 font-bold uppercase tracking-widest mb-1">
              THE CONCLUDING MANDATE
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-[#2D2319] tracking-tight leading-tight">
              YOU KNOW WHERE YOU STAND.<br />
              <span className="text-amber-800">NOW BUILD YOUR NEXT LEVEL.</span>
            </h2>
          </div>

          <p className="text-[#5E4F41] text-sm sm:text-base font-sans max-w-lg mx-auto pt-2 leading-relaxed">
            Don't leave campus with just resume buzzwords. Build working LLM pipelines, prompt architectures, and verified AI projects before the 500 spots close.
          </p>
        </div>

        {/* The Two Mandatory CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Button 1: JOIN THE AI BUILDER LEAGUE */}
          <button
            onClick={() => {
              sounds.playClick();
              onEnterLeagueClick();
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-heading font-black text-base sm:text-lg tracking-wider uppercase transition-all shadow-[0_6px_25px_rgba(217,119,6,0.35)] cursor-pointer flex items-center justify-center space-x-3 group hover:scale-105 active:scale-95"
          >
            <span>JOIN THE AI BUILDER LEAGUE</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: BUILD YOUR FIRST AI PROJECT IN 60 MINUTES */}
          <button
            onClick={() => {
              sounds.playClick();
              onChallengeMeClick();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF6EE] text-[#5C3A1E] font-heading font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-[#D4A855] hover:border-amber-600 transition-all cursor-pointer flex items-center justify-center space-x-2.5 shadow-md hover:scale-105 active:scale-95"
          >
            <Sparkles size={17} className="text-amber-700" />
            <span>BUILD YOUR FIRST AI PROJECT IN 60 MINUTES</span>
          </button>
        </div>

        {/* Warm Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#78614E]">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Zero College Fees</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck size={16} className="text-amber-600" />
            <span>Verified Builder Badge</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Trophy size={16} className="text-amber-700" />
            <span>Top 50 Campus Recognition</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-14 pt-8 border-t border-[#E8DFD5] w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8C7662]">
          <div>
            AI BUILDER LEAGUE © 2026 // ENGINEERING EXCELLENCE INITIATIVE
          </div>
          <div className="mt-2 sm:mt-0">
            HANDS-ON AI CHALLENGES FOR BATCH 2026
          </div>
        </div>

      </div>

    </section>
  );
};
