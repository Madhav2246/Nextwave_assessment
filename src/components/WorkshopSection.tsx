import React from 'react';
import { sounds } from '../utils/soundEffects';
import { Terminal, Clock, Code, Cpu, Cloud, CheckCircle2, ArrowRight } from 'lucide-react';

interface WorkshopSectionProps {
  onUnlockPassClick: () => void;
  isRegistered?: boolean;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = ({ onUnlockPassClick, isRegistered }) => {
  const schedule = [
    {
      time: "00 – 15 MIN",
      title: "Architecture & Agent Skeleton",
      desc: "Setting up lightweight API keys, orchestrating system prompts, and designing tool definitions.",
      icon: Terminal,
    },
    {
      time: "15 – 35 MIN",
      title: "Multi-Turn RAG & Function Calling",
      desc: "Connecting the LLM to real external APIs so it takes concrete actions instead of just chatting.",
      icon: Code,
    },
    {
      time: "35 – 50 MIN",
      title: "Interactive Web UI & Realtime Streaming",
      desc: "Hooking up a fast frontend with streaming response tokens and tactile feedback.",
      icon: Cpu,
    },
    {
      time: "50 – 60 MIN",
      title: "Live Production Cloud Deployment",
      desc: "Pushing to a live public URL that any recruiter or teammate can test instantly on their phone.",
      icon: Cloud,
    },
  ];

  return (
    <section id="workshop" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Container */}
      <div className="warm-card rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] shadow-lg space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#E8DFD5] gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold mb-2 shadow-xs">
              <Clock size={14} className="text-amber-700" />
              <span>DAY 7 CAPSTONE // 60-MINUTE BUILD SPRINT</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#2D2319] tracking-tight">
              BUILD YOUR FIRST AI PROJECT IN 60 MINUTES
            </h2>
          </div>

          <div className="bg-[#FAF6EE] px-5 py-3 rounded-2xl border border-[#D4C3A3] shrink-0 shadow-xs">
            <span className="text-[10px] font-mono text-[#6E5A47] uppercase font-bold">SEATS ALLOCATED</span>
            <div className="font-heading text-2xl font-black text-amber-900">327 / 500 ENGINEERS</div>
          </div>
        </div>

        {/* Veer Character Commentary Quote */}
        <div className="p-4 rounded-2xl bg-[#FAF6EE] border-l-4 border-amber-500 flex items-start sm:items-center space-x-3 shadow-xs">
          <span className="font-heading text-lg font-bold text-amber-900 shrink-0">वीर:</span>
          <p className="text-sm text-[#4A321B] italic font-sans">
            "This is where you actually build. Zero college slides. Zero endless theory. Just 60 minutes of hands-on shipping."
          </p>
        </div>

        {/* 60-Minute Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {schedule.map((slot, idx) => {
            const Icon = slot.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8DFD5] space-y-3 shadow-xs hover:border-[#D4A855] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-900">{slot.time}</span>
                  <Icon size={16} className="text-amber-700" />
                </div>
                <h4 className="font-heading font-black text-base text-[#2D2319]">
                  {slot.title}
                </h4>
                <p className="text-xs text-[#5E4F41] font-sans leading-relaxed">
                  {slot.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* What You Walk Away With */}
        <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] space-y-4 shadow-xs">
          <h4 className="font-heading font-black text-lg text-[#2D2319] tracking-wider uppercase">
            WHAT YOU WALK AWAY WITH IN YOUR PORTFOLIO:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#5C3A1E] font-medium">
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Live Public Production URL</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Full GitHub Repository Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Verified Builder Credential Badge</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-[#6E5A47]">
            {isRegistered ? "✓ Your workshop seat is confirmed on your Builder Pass." : "Included 100% free with your Builder League Pass registration."}
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onUnlockPassClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 hover:scale-105 active:scale-95 text-white font-heading font-black text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{isRegistered ? "VIEW MY WORKSHOP PASS" : "UNLOCK PASS & RESERVE SEAT"}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </section>
  );
};
