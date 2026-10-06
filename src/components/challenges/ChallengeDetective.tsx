import React, { useState } from 'react';
import { VeerCharacter } from '../VeerCharacter';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { ShieldAlert, CheckCircle2, AlertTriangle, Bug, Award, Sparkles, RefreshCw, Search, KeyRound } from 'lucide-react';

interface ChallengeDetectiveProps {
  onScoreEarned: (score: number) => void;
}

export const ChallengeDetective: React.FC<ChallengeDetectiveProps> = ({ onScoreEarned }) => {
  const [selectedFlaw, setSelectedFlaw] = useState<number | null>(null);
  const [studentDiagnosis, setStudentDiagnosis] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [activeLineInspect, setActiveLineInspect] = useState<number | null>(null);

  const flawOptions = [
    {
      id: 1,
      title: "Race Condition / Non-Atomic Multi-Step Execution",
      desc: "hgetall followed by hmset without Lua EVAL script creates a concurrency gap. Two simultaneous requests read the same tokens and double-spend.",
      isCorrect: true,
      points: 100,
      lines: [24, 41],
    },
    {
      id: 2,
      title: "Arithmetic Millisecond Floor Error in Math.min",
      desc: "The elapsed time arithmetic is missing Math.floor() for Redis millisecond timestamps.",
      isCorrect: false,
      points: 30,
      lines: [33],
    },
    {
      id: 3,
      title: "Redis Key Naming Pattern Collision",
      desc: "rate_limit:userId format is incompatible with Redis cluster hash slots.",
      isCorrect: false,
      points: 20,
      lines: [21],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFlaw === null || submitted) return;

    sounds.playClick();
    const chosen = flawOptions.find((f) => f.id === selectedFlaw);
    let finalScore = chosen?.isCorrect ? 94 : 35;

    if (studentDiagnosis.trim().length > 25 && chosen?.isCorrect) {
      finalScore = Math.min(100, finalScore + 6);
    }

    setScore(finalScore);
    setSubmitted(true);
    onScoreEarned(finalScore);

    if (chosen?.isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    } else {
      sounds.playError();
    }
  };

  const handleReset = () => {
    setSelectedFlaw(null);
    setStudentDiagnosis('');
    setSubmitted(false);
    setScore(null);
    setActiveLineInspect(null);
  };

  return (
    <div className="space-y-6 select-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC FORENSIC LAB SCENE (Like Landing Scene)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4A855] shadow-lg bg-[#FAF6EE]">
        
        {/* Lab Scene Stone Background & Architectural Header */}
        <div className="h-14 bg-[#C7B18E] border-b-2 border-[#AB9571] flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-mono text-xs font-black tracking-widest text-[#4A321B]">
              SCENE 01 // THE AI CODE AUDIT CHAMBER
            </span>
          </div>
          <span className="font-mono text-xs text-[#694A2D] font-bold">
            BOUNTY: ₹300 INR
          </span>
        </div>

        {/* Scene Interior: Walls, Code Monitor, Floor, and VEER STANDING INSIDE */}
        <div className="relative p-6 sm:p-8 min-h-[380px] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
          
          {/* Subtle Wall Blueprint Lines */}
          <div className="absolute inset-0 warm-grid opacity-30 pointer-events-none" />

          {/* 1. Interactive Terminal Workstation (The Code Evidence) */}
          <div className="relative z-10 w-full lg:max-w-xl bg-[#2D2319] border-2 border-[#8C6D53] rounded-2xl shadow-xl overflow-hidden">
            {/* Monitor Chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#231A12] border-b border-[#3D3025] text-xs font-mono text-[#D4C3A3]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-bold text-[#EFE5D3]">rateLimiter.ts (LLM-Generated)</span>
              </div>
              <span className="text-amber-300 font-bold flex items-center space-x-1">
                <Bug size={13} />
                <span>1 Concurrency Bug</span>
              </span>
            </div>

            {/* Code Lines with Clickable Inspection Pins */}
            <div className="p-4 text-xs font-mono text-[#EFE5D3] leading-relaxed max-h-72 overflow-y-auto">
              <div className="text-[#8C6D53] italic">// AI Prompt: "Write a thread-safe token bucket limiter in Redis"</div>
              <div>async function checkRateLimit(userId, maxTokens = 10) &#123;</div>
              <div className="text-stone-400">  const key = `rate_limit:$&#123;userId&#125;`;</div>
              
              {/* Vulnerable Read Line */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveLineInspect(24);
                }}
                className={`p-1 rounded cursor-pointer transition-colors flex items-center justify-between ${
                  activeLineInspect === 24 ? 'bg-amber-800/60 text-white font-bold' : 'hover:bg-stone-800/60'
                }`}
              >
                <span>  const data = await redis.hgetall(key); <span className="text-amber-400 font-bold">// Line 24</span></span>
                <span className="text-[10px] text-amber-300 bg-amber-900/80 px-1.5 py-0.5 rounded">INSPECT</span>
              </div>

              <div className="text-stone-400">  const now = Date.now();</div>
              <div className="text-stone-400">  // compute elapsedSec and currentTokens...</div>
              
              {/* Vulnerable Write Line */}
              <div
                onClick={() => {
                  sounds.playClick();
                  setActiveLineInspect(41);
                }}
                className={`p-1 rounded cursor-pointer transition-colors flex items-center justify-between ${
                  activeLineInspect === 41 ? 'bg-amber-800/60 text-white font-bold' : 'hover:bg-stone-800/60'
                }`}
              >
                <span>  await redis.hmset(key, &#123; tokens: currentTokens - 1 &#125;); <span className="text-amber-400 font-bold">// Line 41</span></span>
                <span className="text-[10px] text-amber-300 bg-amber-900/80 px-1.5 py-0.5 rounded">INSPECT</span>
              </div>

              <div>  return true;</div>
              <div>&#125;</div>
            </div>

            {/* Inspection Pin Banner */}
            {activeLineInspect && (
              <div className="p-2.5 bg-amber-900/90 border-t border-amber-700 text-amber-100 text-xs font-mono flex items-center justify-between">
                <span>🔍 Inspecting Line {activeLineInspect}: Notice how reading and writing are two disconnected Redis network calls!</span>
                <button onClick={() => setActiveLineInspect(null)} className="underline cursor-pointer">Close</button>
              </div>
            )}
          </div>

          {/* 2. VEER STANDING PROUDLY IN THE SCENE BESIDE THE WORKBENCH */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Veer's Speech Bubble in Scene */}
            <div className="mb-2 bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-3 shadow-md text-center max-w-[260px]">
              <p className="text-xs font-semibold text-[#432810] leading-snug">
                {submitted
                  ? (score && score >= 80 ? "Shabash! You found the race condition! That's real AI engineering!" : "Good attempt! Notice lines 24 and 41!")
                  : "A junior dev trusted the LLM blindly. Tap the code lines or pick the flaw below!"}
              </p>
              <div className="w-2.5 h-2.5 bg-[#FFFDF9] border-r-2 border-b-2 border-[#D4A855] rotate-45 mx-auto -mb-4.5 mt-1" />
            </div>

            {/* Cute Veer in the scene */}
            <VeerCharacter
              mood={submitted ? (score && score >= 80 ? 'celebratory' : 'thinking') : 'curious'}
              size={130}
              isSpeaking={false}
            />

            <div className="mt-[-2px] bg-[#E5A93C] text-[#3B210B] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
              VEER // FORENSIC AUDITOR
            </div>
          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* DIAGNOSTIC FORM & FLUID SELECTION                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <form onSubmit={handleSubmit} className="warm-card rounded-3xl p-6 border border-[#E8DFD5] space-y-4 shadow-sm">
        <div className="text-sm font-heading font-black text-[#2D2319] tracking-wider uppercase">
          CHOOSE YOUR ARCHITECTURAL DIAGNOSIS:
        </div>

        <div className="grid grid-cols-1 gap-3">
          {flawOptions.map((opt) => (
            <label
              key={opt.id}
              onClick={() => sounds.playClick()}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                selectedFlaw === opt.id
                  ? 'bg-amber-50 border-amber-500 shadow-xs'
                  : 'bg-[#FFFDF9] border-[#E8DFD5] hover:border-[#D4A855]'
              }`}
            >
              <input
                type="radio"
                name="flaw"
                checked={selectedFlaw === opt.id}
                onChange={() => setSelectedFlaw(opt.id)}
                disabled={submitted}
                className="mt-1 text-amber-600 focus:ring-amber-500"
              />
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#2D2319]">{opt.title}</div>
                <div className="text-xs text-[#5E4F41] leading-relaxed">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Bonus fix input */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-mono text-[#5E4F41] font-semibold flex items-center justify-between">
            <span>YOUR DIAGNOSIS & FIX (Bonus points for explanation):</span>
            <span className="text-amber-800 text-[11px]">+6 Bonus Points</span>
          </label>
          <textarea
            value={studentDiagnosis}
            onChange={(e) => setStudentDiagnosis(e.target.value)}
            disabled={submitted}
            rows={2}
            placeholder="Explain how you would fix it (e.g., execute atomically via a Redis EVAL Lua script)..."
            className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
          />
        </div>

        {/* Submit or Result state */}
        {!submitted ? (
          <button
            type="submit"
            disabled={selectedFlaw === null}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-heading font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
          >
            <ShieldAlert size={16} />
            <span>SUBMIT ARCHITECTURAL AUDIT</span>
          </button>
        ) : (
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-amber-400 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>CHALLENGE COMPLETE</span>
              </div>
              <div className="font-heading font-black text-xl text-amber-800">
                SCORE: {score}/100 PTS
              </div>
            </div>
            <p className="text-xs text-[#5E4F41] leading-relaxed">
              {score && score >= 80
                ? "Perfect diagnosis! In distributed Redis architectures, multi-step checks and writes must be atomic. Running an EVAL Lua script solves the double-spend vulnerability."
                : "Good attempt! The correct vulnerability is the race condition gap between hgetall and hmset."}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-amber-800 hover:text-amber-900 font-bold underline flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Retry Scene</span>
            </button>
          </div>
        )}
      </form>

    </div>
  );
};
