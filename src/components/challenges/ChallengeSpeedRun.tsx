import React, { useState, useEffect, useRef } from 'react';
import { VeerCharacter } from '../VeerCharacter';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Zap, Timer, Play, CheckCircle2, RotateCcw, AlertTriangle, Trophy, Flame, Server, ShieldCheck } from 'lucide-react';

interface ChallengeSpeedRunProps {
  onScoreEarned: (score: number) => void;
}

export const ChallengeSpeedRun: React.FC<ChallengeSpeedRunProps> = ({ onScoreEarned }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedFix, setSelectedFix] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeExpire();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimeExpire();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    sounds.playClick();
    setTimeLeft(60);
    setIsRunning(true);
    setCompleted(false);
    setSelectedFix(null);
    setFinalScore(null);
  };

  const handleTimeExpire = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setCompleted(true);
    sounds.playError();
    setFinalScore(30);
    onScoreEarned(30);
  };

  const handlePullLever = (leverId: number) => {
    if (!isRunning) return;
    setSelectedFix(leverId);

    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setCompleted(true);

    if (leverId === 1) {
      sounds.playSuccess();
      const speedBonus = Math.round((timeLeft / 60) * 35);
      const scoreTotal = Math.min(100, 65 + speedBonus);
      setFinalScore(scoreTotal);
      onScoreEarned(scoreTotal);

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    } else {
      sounds.playError();
      setFinalScore(35);
      onScoreEarned(35);
    }
  };

  const levers = [
    {
      id: 1,
      name: "LEVER ALPHA (SCHEMA SAMPLER)",
      desc: "Enforce Structured Outputs via response_mime_type: 'application/json' + JSON Schema at model API config layer.",
      isCorrect: true,
    },
    {
      id: 2,
      name: "LEVER BETA (PROMPT YELLING)",
      desc: "Append 'PLEASE DO NOT USE BACKTICKS UNDER ANY CIRCUMSTANCE!!!' to the user prompt.",
      isCorrect: false,
    },
    {
      id: 3,
      name: "LEVER GAMMA (NODE RETRY LOOP)",
      desc: "Add a 2-second setTimeout sleep loop in Node.js until the LLM returns without markdown fences.",
      isCorrect: false,
    },
  ];

  return (
    <div className="space-y-6 select-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC SERVER COMMAND ROOM SCENE (Like Landing Scene)          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4A855] shadow-lg bg-[#FAF6EE]">
        
        {/* Command Room Header */}
        <div className="h-14 bg-[#C7B18E] border-b-2 border-[#AB9571] flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-rose-600 animate-ping' : 'bg-emerald-600'}`} />
            <span className="font-mono text-xs font-black tracking-widest text-[#4A321B]">
              SCENE 03 // EMERGENCY SERVER COMMAND ROOM
            </span>
          </div>
          <span className="font-mono text-xs text-[#694A2D] font-bold">
            BOUNTY: ₹400 INR
          </span>
        </div>

        {/* Command Room Interior with Chronometer, Server Rack, and VEER */}
        <div className="relative p-6 sm:p-8 min-h-[380px] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
          
          <div className="absolute inset-0 warm-grid opacity-30 pointer-events-none" />

          {/* Emergency Server Switchboard & Digital Chronometer */}
          <div className="relative z-10 w-full lg:max-w-xl space-y-4">
            
            {/* Giant Emergency Chronometer */}
            <div className="bg-[#2D2319] border-2 border-[#8C6D53] rounded-2xl p-5 shadow-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl ${isRunning ? 'bg-rose-900/80 text-rose-300 animate-pulse' : 'bg-[#3D3025] text-amber-400'}`}>
                  <Timer size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#D4C3A3] uppercase font-bold">OUTAGE RESOLUTION CLOCK</div>
                  <div className="font-heading text-4xl font-black text-[#FFFDF9] tracking-tight">
                    {timeLeft} <span className="text-sm font-mono text-amber-400">SECONDS</span>
                  </div>
                </div>
              </div>

              {!isRunning && !completed && (
                <button
                  onClick={handleStart}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  START SPRINT
                </button>
              )}

              {completed && (
                <button
                  onClick={handleStart}
                  className="px-5 py-2.5 rounded-xl bg-[#3D3025] hover:bg-[#4A3B2F] text-amber-300 font-mono text-xs font-bold border border-amber-600/40 cursor-pointer flex items-center space-x-1.5"
                >
                  <RotateCcw size={13} />
                  <span>RERUN</span>
                </button>
              )}
            </div>

            {/* Outage Incident Report */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4A855] text-xs font-sans text-[#5E4F41] space-y-1 shadow-xs">
              <div className="flex items-center justify-between text-amber-900 font-mono font-bold">
                <span className="flex items-center space-x-1">
                  <Flame size={14} className="text-amber-700" />
                  <span>INCIDENT #P1-09: BACKTICK INJECTION DROPPING UPI PAYMENTS</span>
                </span>
                <span className="text-rose-700">12% FAILURES</span>
              </div>
              <p className="leading-relaxed">
                The LLM is intermittently returning markdown fences (<code>```json ... ```</code>), breaking downstream <code>JSON.parse()</code>. Pull the right hotfix switchboard lever to stabilize production!
              </p>
            </div>

            {/* Hotfix Levers */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#6E5A47] font-bold uppercase">
                {isRunning ? "CHOOSE & PULL THE CORRECT RECOVERY LEVER NOW:" : "PRESS 'START SPRINT' ABOVE TO ACTIVATE LEVERS:"}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {levers.map((lev) => (
                  <button
                    key={lev.id}
                    type="button"
                    disabled={!isRunning}
                    onClick={() => handlePullLever(lev.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start space-x-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedFix === lev.id
                        ? (lev.isCorrect ? 'bg-emerald-100 border-emerald-600' : 'bg-rose-100 border-rose-600')
                        : 'bg-[#FFFDF9] border-[#E8DFD5] hover:border-[#D4A855]'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-md bg-[#FAF6EE] border border-[#D4C3A3] flex items-center justify-center font-mono font-black text-xs text-amber-900 shrink-0 mt-0.5">
                      {lev.id}
                    </div>
                    <div>
                      <div className="text-xs font-heading font-black text-[#2D2319]">{lev.name}</div>
                      <div className="text-[11px] text-[#5E4F41] leading-snug">{lev.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* VEER STANDING AT THE EMERGENCY SWITCHBOARD */}
          <div className="relative z-10 flex flex-col items-center">
            
            <div className="mb-2 bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-3 shadow-md text-center max-w-[260px]">
              <p className="text-xs font-semibold text-[#432810] leading-snug">
                {completed
                  ? (finalScore && finalScore >= 70 ? "Shabash! Outage resolved! Constrained decoding fixed the root cause!" : "Backtick prompts will always fail under edge-cases!")
                  : (isRunning ? "Clock is ticking! Pull Lever 1, 2, or 3!" : "Start the sprint! Real engineers fix production bugs in seconds.")}
              </p>
              <div className="w-2.5 h-2.5 bg-[#FFFDF9] border-r-2 border-b-2 border-[#D4A855] rotate-45 mx-auto -mb-4.5 mt-1" />
            </div>

            <VeerCharacter
              mood={completed ? (finalScore && finalScore >= 70 ? 'celebratory' : 'thinking') : (isRunning ? 'intense' : 'curious')}
              size={135}
              isSpeaking={false}
            />

            <div className="mt-[-2px] bg-[#E5A93C] text-[#3B210B] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
              VEER // INCIDENT COMMANDER
            </div>
          </div>

        </div>

      </div>

      {/* Outcome Banner */}
      {completed && finalScore && (
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-amber-400 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#2D2319]">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>
              {finalScore >= 70
                ? "PRODUCTION INCIDENT CLEARED! JSON Schema enforced at token sampler layer."
                : "Wrong fix applied! Free-form prompts cannot guarantee valid JSON under production scale."}
            </span>
          </div>
          <div className="font-heading font-black text-xl text-amber-800">
            SCORE: {finalScore}/100 PTS
          </div>
        </div>
      )}

    </div>
  );
};
