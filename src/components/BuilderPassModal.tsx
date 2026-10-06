import React, { useState } from 'react';
import { Participant, GeneratedProject } from '../types';
import { BuilderPass } from './BuilderPass';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { X, KeyRound, Sparkles, CheckCircle2, ArrowRight, Flame } from 'lucide-react';

interface BuilderPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (participant: Participant) => void;
  initialParticipant?: Participant | null;
  suggestedProject?: GeneratedProject | null;
}

export const BuilderPassModal: React.FC<BuilderPassModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
  initialParticipant,
  suggestedProject,
}) => {
  const [formData, setFormData] = useState<Participant>(
    initialParticipant || {
      name: '',
      email: '',
      college: '',
      gradYear: '2026',
      referralCode: '',
      selectedProject: suggestedProject?.title,
      builderType: suggestedProject?.builderType,
    }
  );

  const [unlocked, setUnlocked] = useState(!!initialParticipant);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.college) return;

    sounds.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomSerial = `BL-2026-${Math.floor(100 + Math.random() * 900)}`;
      const completedParticipant = {
        ...formData,
        passId: randomSerial,
        joinedAt: new Date().toISOString(),
      };

      setFormData(completedParticipant);
      setUnlocked(true);
      setIsSubmitting(false);
      onRegistered(completedParticipant);

      sounds.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md select-none">
      
      <div className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-8 shadow-[0_15px_50px_rgba(90,60,20,0.2)] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-[#8C6D53] hover:text-[#2D2319] p-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#EFE8DD] border border-[#D4C3A3] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!unlocked ? (
          /* ==================================================== */
          /* FORM: UNLOCK YOUR BUILDER LEAGUE PASS                */
          /* ==================================================== */
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-amber-800 font-mono text-xs uppercase font-bold">
                <KeyRound size={14} />
                <span>EXPERIENCE ACCESS KEY</span>
              </div>
              <h3 className="font-heading text-3xl font-black text-[#2D2319] tracking-tight">
                UNLOCK YOUR BUILDER LEAGUE PASS
              </h3>
              <p className="text-[#5E4F41] text-xs sm:text-sm font-sans leading-relaxed">
                Confirm your seat for the Day-7 Grand Workshop (<em>"Build Your First AI Project in 60 Minutes"</em>) to unlock the full competitive league arena and personal squad codes.
              </p>
            </div>

            {formData.selectedProject && (
              <div className="p-3.5 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center justify-between text-xs font-mono shadow-xs">
                <div className="flex items-center space-x-2 truncate">
                  <Flame size={14} className="text-amber-700 shrink-0" />
                  <span className="font-bold text-[#3B210B] truncate">PROJECT: {formData.selectedProject}</span>
                </div>
                {formData.builderType && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 text-[10px] font-black shrink-0 ml-2">
                    {formData.builderType}
                  </span>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">College Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@college.edu / gmail"
                    className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">Graduation Year</label>
                  <select
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#2D2319] focus:border-amber-600 focus:outline-none shadow-xs"
                  >
                    <option value="2026">2026 (Final Year Engineering)</option>
                    <option value="2025">2025 (Immediate Graduate)</option>
                    <option value="2027">2027 (Pre-Final Year Engineering)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">Engineering College Name *</label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. IIT Madras, RVCE, NIT Trichy, BITS Pilani..."
                  className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">Squad / Referral Code (Optional)</label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. SQUAD-BL-402"
                  className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none tracking-widest uppercase shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 rounded-2xl bg-amber-500 hover:bg-amber-400 hover:scale-[1.01] active:scale-[0.99] text-white font-heading font-black text-base tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <Sparkles size={18} className="animate-spin" />
                    <span>GENERATING CERTIFIED PASS...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <KeyRound size={18} />
                    <span>UNLOCK BUILDER LEAGUE PASS</span>
                  </span>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* ==================================================== */
          /* SUCCESS STATE: BUILDER PASS UNLOCKED                 */
          /* ==================================================== */
          <div className="space-y-6 text-center">
            
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-xs font-bold shadow-xs">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>REGISTRATION COMPLETE // SEAT SECURED</span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#2D2319] tracking-tight">
                BUILDER PASS UNLOCKED
              </h3>
              <p className="text-[#5E4F41] text-xs sm:text-sm font-sans max-w-md mx-auto">
                Welcome to the cohort. Your Day-7 workshop reservation is confirmed, and your personal squad code is ready.
              </p>
            </div>

            {/* The Warm Pass View */}
            <div className="py-2">
              <BuilderPass participant={formData} />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-heading font-black text-sm tracking-wider uppercase hover:scale-105 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md"
              >
                <span>ENTER ARENA & COMPETE</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
