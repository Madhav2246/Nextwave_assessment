import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import { Calendar, Search, Lightbulb, Zap, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Timeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const timelineSteps = [
    {
      days: "DAY 1–2",
      phase: "DISCOVER",
      title: "AI Detective",
      tagline: "Hallucination Auditing & Logical Defense",
      desc: "Receive flawed AI-generated production code and architecture designs. Detect subtle concurrency leaks, hallucinated APIs, and security vulnerabilities before shipping.",
      characterNote: '"Don\'t trust AI blindly. We train you to be the gatekeeper."',
      status: "COMPLETED / REPLAYABLE",
      icon: Search,
    },
    {
      days: "DAY 3–4",
      phase: "CREATE",
      title: "AI Creator Battle",
      tagline: "10-Minute Rapid System Prototyping",
      desc: "Given real-world societal problems (like vernacular prescription OCR for Indian clinics), engineer multimodal LLM workflows that actually deliver useful outputs.",
      characterNote: '"Anyone can ask ChatGPT for a poem. Builders create architectures people depend on."',
      status: "CURRENTLY LIVE",
      icon: Lightbulb,
    },
    {
      days: "DAY 5–6",
      phase: "COMPETE",
      title: "AI Speed Run & Leaderboards",
      tagline: "High-Pressure Incident Triage",
      desc: "Timed 60-second sprints where speed, correctness, and explanation determine who tops the campus leaderboard. Bragging rights for top engineering colleges.",
      characterNote: '"When production goes down, speed is the only metric that matters."',
      status: "UPCOMING SPRINT",
      icon: Zap,
    },
    {
      days: "DAY 7",
      phase: "BUILD",
      title: "Grand Workshop & Final Mission",
      tagline: "Build Your First AI Project in 60 Minutes",
      desc: "The culmination of the league. Join 500 final-year peers in a live 60-minute build session, write full-stack agentic code, and deploy your live AI project to production.",
      characterNote: '"This is where your career portfolio actually changes. Don\'t miss this."',
      status: "THE GRAND FINALE",
      icon: Rocket,
    },
  ];

  return (
    <section id="timeline" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4A855] text-amber-900 text-xs font-mono font-bold mb-4 shadow-xs">
          <Calendar size={14} className="text-amber-600" />
          <span>7-DAY FLIGHT PATH // SPRINT MILESTONES</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#2D2319] tracking-tight">
          THE 7-DAY JOURNEY
        </h2>
        <p className="mt-2 text-[#5E4F41] text-sm sm:text-base font-sans">
          A focused week engineered to transform passive AI consumers into confident, production-grade AI builders.
        </p>
      </div>

      {/* Visual Timeline Stepper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {timelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedDay === idx;

          return (
            <div
              key={idx}
              onClick={() => {
                sounds.playClick();
                setSelectedDay(idx);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'warm-card-glow border-amber-500 shadow-md scale-[1.02]'
                  : 'warm-card border-[#E8DFD5] hover:border-[#D4A855]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-amber-900">{step.days}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    {step.phase}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-1">
                  <Icon size={18} className="text-amber-700" />
                  <h4 className="font-heading font-black text-lg text-[#2D2319]">
                    {step.title}
                  </h4>
                </div>

                <p className="text-xs text-[#5E4F41] font-sans">
                  {step.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-[11px] font-mono text-[#8C6D53]">
                <span>{step.status}</span>
                <ChevronRight size={14} className={isSelected ? 'text-amber-800' : 'text-stone-400'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Card for Selected Milestone */}
      <div className="warm-card rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD5]">
          <div>
            <div className="text-xs font-mono text-amber-800 font-bold uppercase">
              DEEP DIVE // {timelineSteps[selectedDay].days} ({timelineSteps[selectedDay].phase})
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319] mt-1">
              {timelineSteps[selectedDay].title}
            </h3>
          </div>
          <div className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold shadow-xs">
            PHASE STATUS: {timelineSteps[selectedDay].status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-sm text-[#5E4F41] font-sans leading-relaxed">
              {timelineSteps[selectedDay].desc}
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] flex items-start space-x-3 shadow-xs">
              <span className="font-heading text-amber-900 font-bold shrink-0">वीर says:</span>
              <p className="text-xs sm:text-sm font-sans text-[#4A321B] italic">
                {timelineSteps[selectedDay].characterNote}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#FAF6EE] p-5 rounded-2xl border border-[#D4C3A3] space-y-2 shadow-xs">
            <div className="text-xs font-mono text-[#6E5A47] uppercase font-bold">
              KEY DELIVERABLE
            </div>
            <div className="text-sm font-bold text-[#2D2319]">
              {selectedDay === 0 && "1 Verified Hallucination Audit + Score"}
              {selectedDay === 1 && "1 Interactive Prototype Architecture"}
              {selectedDay === 2 && "Ranked Speed Incident Triage Badge"}
              {selectedDay === 3 && "Full Production AI Project Deployed"}
            </div>
            <div className="text-[11px] font-mono text-emerald-800 font-bold pt-1 flex items-center space-x-1">
              <CheckCircle2 size={13} />
              <span>Syncs directly to your portfolio pass</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
