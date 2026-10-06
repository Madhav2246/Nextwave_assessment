import React, { useState } from 'react';
import { VeerCharacter } from '../VeerCharacter';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Lightbulb, Sparkles, Send, CheckCircle2, Target, ArrowRight, Play, Cpu, Volume2, ShieldCheck, Check } from 'lucide-react';

interface ChallengeCreatorProps {
  onScoreEarned: (score: number) => void;
}

export const ChallengeCreator: React.FC<ChallengeCreatorProps> = ({ onScoreEarned }) => {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [pipelineOutput, setPipelineOutput] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  // 4 Interactive Architecture Stages on the Blueprint Table
  const stages = [
    {
      id: 0,
      title: "1. Multimodal OCR",
      tech: "Gemini Vision / TrOCR",
      desc: "Scans messy handwritten prescription image from Tier-2 clinic.",
      outputPreview: "Transcribed: 'Paracetamol 650mg TDS + Amoxicillin 500mg BD x 5 days'",
      color: "amber",
    },
    {
      id: 1,
      title: "2. Clinical RAG Guardrail",
      tech: "Vector Index + National Formulary",
      desc: "Cross-checks dosages against elderly patient contraindications.",
      outputPreview: "Formulary Safety Check: PASSED. Zero critical drug-drug conflicts.",
      color: "emerald",
    },
    {
      id: 2,
      title: "3. Vernacular Audio Engine",
      tech: "Bhashini / Indic-TTS",
      desc: "Translates dosage schedule into warm conversational regional voice.",
      outputPreview: "Hindi Script Generated: 'दादी जी, बुखार की गोली खाना खाने के बाद लें...'",
      color: "amber",
    },
    {
      id: 3,
      title: "4. WhatsApp Dispatcher",
      tech: "Twilio / Meta Cloud API",
      desc: "Triggers automatic scheduled audio note alarms for the patient.",
      outputPreview: "Schedule Queued: Daily audio alerts mapped at 8:00 AM & 8:00 PM.",
      color: "emerald",
    },
  ];

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSimulating) return;

    sounds.playClick();
    setIsSimulating(true);
    setPipelineOutput(null);

    // Pulse through each node sequentially
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < 4) {
        setActiveStage(current);
        sounds.playChirp(900 + current * 150);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        const earned = 96;
        setScore(earned);
        setPipelineOutput("SUCCESS: Multimodal audio notification synthesized and validated!");
        onScoreEarned(earned);
        sounds.playSuccess();

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.65 },
          });
        } catch {
          // ignore
        }
      }
    }, 600);
  };

  return (
    <div className="space-y-6 select-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC DRAFTING STUDIO SCENE (Like Landing Scene)               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4A855] shadow-lg bg-[#FAF6EE]">
        
        {/* Studio Scene Header */}
        <div className="h-14 bg-[#C7B18E] border-b-2 border-[#AB9571] flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-mono text-xs font-black tracking-widest text-[#4A321B]">
              SCENE 02 // CREATOR ARCHITECTURE STUDIO
            </span>
          </div>
          <span className="font-mono text-xs text-[#694A2D] font-bold">
            BOUNTY: ₹300 INR
          </span>
        </div>

        {/* Studio Interior with VEER STANDING AT THE WORKBENCH */}
        <div className="relative p-6 sm:p-8 min-h-[380px] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
          
          <div className="absolute inset-0 warm-grid opacity-30 pointer-events-none" />

          {/* Blueprint Drafting Table & Visual Pipeline Assembly */}
          <div className="relative z-10 w-full lg:max-w-xl space-y-4">
            
            <div className="bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-900 pb-2 border-b border-[#E8DFD5]">
                <span>BLUEPRINT: PROJECT AROGYA-AI (INDIAN HEALTHCARE)</span>
                <span className="text-emerald-700">4-STAGE PIPELINE</span>
              </div>
              <p className="text-xs text-[#5E4F41] mt-2 leading-relaxed">
                65% of handwritten clinical prescriptions are misunderstood by elderly patients in Tier-2 clinics. Design an AI agent pipeline that turns doctor handwriting into regional WhatsApp audio reminders.
              </p>
            </div>

            {/* 4 Pipeline Stage Nodes */}
            <div className="grid grid-cols-2 gap-2.5">
              {stages.map((st) => (
                <div
                  key={st.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveStage(st.id);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    activeStage === st.id
                      ? 'bg-amber-100/90 border-amber-600 shadow-sm scale-[1.02]'
                      : 'bg-[#FFFDF9] border-[#E8DFD5] hover:border-[#D4A855]'
                  }`}
                >
                  <div className="text-[11px] font-mono font-black text-amber-900">{st.title}</div>
                  <div className="text-[10px] font-mono text-[#8C6D53] truncate">{st.tech}</div>
                  <div className="text-[11px] text-[#4A321B] mt-1 line-clamp-1">{st.desc}</div>
                </div>
              ))}
            </div>

            {/* Stage Live Inspector */}
            <div className="p-3 bg-[#2D2319] border border-[#8C6D53] rounded-2xl text-xs font-mono text-[#EFE5D3] shadow-md">
              <span className="text-amber-400 font-bold">NODE READOUT: </span>
              <span>{stages[activeStage].outputPreview}</span>
            </div>

          </div>

          {/* VEER STANDING PROUDLY IN THE STUDIO SCENE */}
          <div className="relative z-10 flex flex-col items-center">
            
            <div className="mb-2 bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-3 shadow-md text-center max-w-[260px]">
              <p className="text-xs font-semibold text-[#432810] leading-snug">
                {score
                  ? "Wah! 96/100 from the jury! You connected vision, safety, and voice flawlessly!"
                  : "Click each node on the blueprint to inspect how it works, then run the simulation!"}
              </p>
              <div className="w-2.5 h-2.5 bg-[#FFFDF9] border-r-2 border-b-2 border-[#D4A855] rotate-45 mx-auto -mb-4.5 mt-1" />
            </div>

            <VeerCharacter
              mood={score ? 'celebratory' : (isSimulating ? 'excited' : 'proud')}
              size={135}
              isSpeaking={false}
            />

            <div className="mt-[-2px] bg-[#E5A93C] text-[#3B210B] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
              VEER // CREATIVE ARCHITECT
            </div>
          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SIMULATOR & PROMPT TUNER                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <form onSubmit={handleRunSimulation} className="warm-card rounded-3xl p-6 border border-[#E8DFD5] space-y-4 shadow-sm">
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-[#5E4F41] font-bold">
              AGENT SYSTEM INSTRUCTIONS (PROMPT COMPILER):
            </label>
            <button
              type="button"
              onClick={() => {
                setSystemPrompt(
                  `You are ArogyaGuard, an empathetic multilingual medical AI. Step 1: Transcribe the prescription image using Multimodal Vision. Step 2: Cross-check prescribed drugs against the National Formulary for contraindications. Step 3: Produce a 3-sentence summary in vernacular Hindi/Tamil audio script and trigger scheduled WhatsApp alerts.`
                );
                sounds.playClick();
              }}
              className="text-[11px] font-mono text-amber-800 font-bold underline cursor-pointer"
            >
              Insert proven template
            </button>
          </div>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={3}
            placeholder="Instruct the AI: define roles, multimodal OCR extraction, formulary safety check, and regional audio output format..."
            className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSimulating}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-heading font-black text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          {isSimulating ? (
            <span className="flex items-center space-x-2">
              <Sparkles size={16} className="animate-spin" />
              <span>TESTING MULTIMODAL PIPELINE NODES...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <Play size={16} />
              <span>RUN PIPELINE SIMULATION & VERIFY PROTOTYPE</span>
            </span>
          )}
        </button>

        {/* Output Verdict banner */}
        {pipelineOutput && (
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-emerald-500 shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs sm:text-sm">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>{pipelineOutput}</span>
            </div>
            <div className="font-heading font-black text-lg text-amber-800">
              SCORE: {score}/100 PTS
            </div>
          </div>
        )}

      </form>

    </div>
  );
};
