import React, { useRef, useState } from 'react';
import { Participant } from '../types';
import { ShieldCheck, Sparkles, QrCode, Cpu, Copy, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface BuilderPassProps {
  participant: Participant;
}

export const BuilderPass: React.FC<BuilderPassProps> = ({ participant }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const passId = participant.passId || "BL-2026-CADET-883";

  const handleCopyCode = () => {
    sounds.playClick();
    navigator.clipboard?.writeText(passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="perspective-1000 flex flex-col items-center select-none">
      
      {/* 3D Warm Certificate Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full max-w-md h-64 sm:h-72 rounded-3xl p-6 overflow-hidden border-2 border-[#D4A855] shadow-[0_15px_35px_rgba(90,60,20,0.12)] bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#EFE5D3] text-[#2D2319] cursor-grab active:cursor-grabbing"
      >
        {/* Subtle Warm Linen Texture Overlay */}
        <div className="absolute inset-0 warm-grid-dense opacity-25 pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-heading font-black text-xs shadow-xs">
              ABL
            </div>
            <div>
              <div className="font-heading font-black text-sm text-[#2D2319] tracking-wider">
                AI BUILDER LEAGUE
              </div>
              <div className="text-[9px] font-mono text-amber-800 font-bold">
                OFFICIAL PARTICIPANT PASS // 2026
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[10px] font-mono text-emerald-900 font-bold">
            <ShieldCheck size={12} className="text-emerald-700" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Participant Bio Info */}
        <div className="mt-4 flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#8C6D53] uppercase font-bold">CADET BUILDER</div>
            <div className="font-heading text-xl sm:text-2xl font-black text-[#2D2319] tracking-wide">
              {participant.name || "Aarav Sharma"}
            </div>
            <div className="text-xs font-mono text-amber-900 font-bold">
              {participant.college || "IIT Madras"}
            </div>
            <div className="text-[11px] font-mono text-[#5E4F41]">
              Graduation: {participant.gradYear || "2026"} • Engineering
            </div>
          </div>

          {/* QR / Chip */}
          <div className="flex flex-col items-end space-y-2">
            <div className="w-14 h-14 rounded-xl border border-amber-300 bg-[#FFFDF9] flex items-center justify-center p-2 shadow-xs">
              <QrCode size={36} className="text-[#432810]" />
            </div>
            <div className="flex items-center space-x-1 text-[9px] font-mono text-[#8C6D53] font-bold">
              <Cpu size={10} />
              <span>PASS CHIP</span>
            </div>
          </div>
        </div>

        {/* Card Footer with Serial Code & Workshop Entitlement */}
        <div className="absolute bottom-4 left-6 right-6 pt-3 border-t border-[#E8DFD5] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-[#8C6D53]">ID:</span>
            <span className="text-amber-900 font-black tracking-wider">{passId}</span>
          </div>
          <div className="text-emerald-800 font-bold text-[10px]">
            DAY-7 WORKSHOP TICKET ACTIVE
          </div>
        </div>

      </div>

      {/* Copy Pass ID Pill */}
      <div className="mt-4 flex items-center space-x-3">
        <button
          onClick={handleCopyCode}
          className="px-4 py-2 rounded-full bg-[#FFFDF9] hover:bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-mono text-[#432810] font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
        >
          {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} className="text-amber-700" />}
          <span>{copied ? 'Pass ID Copied!' : `Copy Pass ID (${passId})`}</span>
        </button>
      </div>

    </div>
  );
};
