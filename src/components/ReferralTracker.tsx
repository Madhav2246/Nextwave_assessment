import React, { useState } from 'react';
import { Participant } from '../types';
import { sounds } from '../utils/soundEffects';
import { Users, Share2, Copy, Check, AlertCircle, Trophy, Sparkles, MessageCircle } from 'lucide-react';

interface ReferralTrackerProps {
  participant?: Participant | null;
  onOpenPassModal: () => void;
}

export const ReferralTracker: React.FC<ReferralTrackerProps> = ({ participant, onOpenPassModal }) => {
  const [copied, setCopied] = useState(false);

  const squadCode = participant?.passId ? `SQUAD-${participant.passId.replace('BL-2026-', '')}` : 'SQUAD-BL-CADET';
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?ref=${squadCode}` : `https://aibuilderleague.dev?ref=${squadCode}`;

  const handleCopyLink = () => {
    sounds.playClick();
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    sounds.playClick();
    const text = `Hey, 500 final-year engineers are competing in the AI BUILDER LEAGUE — 7 days, 3 real AI challenges, and a 60-min live build workshop. Join my squad with code ${squadCode}: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="referrals" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4A855] text-amber-900 text-xs font-mono font-bold mb-4 shadow-xs">
          <Users size={14} className="text-amber-700" />
          <span>TEAM RECOGNITION & REWARD POOL</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#2D2319] tracking-tight">
          BUILD YOUR SQUAD
        </h2>
        <p className="mt-2 text-[#5E4F41] text-sm sm:text-base font-sans">
          Great engineering is never a solo sport. Bring your batchmates, test ideas side-by-side, and climb the referral podium.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Personal Squad Tracker */}
        <div className="lg:col-span-7 warm-card rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-md space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E8DFD5] gap-3">
            <div>
              <div className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">YOUR SQUAD CODE</div>
              <div className="font-mono text-2xl font-black text-amber-800 tracking-wider">
                {squadCode}
              </div>
            </div>

            {participant ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#6E5A47]">QUALIFIED REFERRALS</div>
                  <div className="font-heading text-xl font-black text-[#2D2319]">0 VERIFIED</div>
                </div>
                <div className="text-right border-l border-[#E8DFD5] pl-4">
                  <div className="text-[10px] font-mono text-[#6E5A47]">REFERRAL RANK</div>
                  <div className="font-heading text-xl font-black text-amber-800">#--</div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenPassModal();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-heading font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-transform hover:scale-105"
              >
                Claim Pass to Activate Squad
              </button>
            )}
          </div>

          {/* Share Actions */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#6E5A47] font-semibold uppercase">PERSONAL INVITATION LINK:</span>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-xl px-4 py-3 text-xs font-mono text-[#2D2319] focus:outline-none shadow-xs"
              />
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer hover:scale-[1.01]"
            >
              <MessageCircle size={18} />
              <span>INVITE YOUR BUILDERS (WHATSAPP SQUAD)</span>
            </button>
          </div>

          {/* Strict Qualification Rule */}
          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-sans text-[#5E4F41] space-y-2 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-900 font-mono font-bold">
              <AlertCircle size={14} className="text-amber-700" />
              <span>VERIFICATION MANDATE:</span>
            </div>
            <p className="leading-relaxed">
              To prevent bot spam, a referral only qualifies when your teammate registers their pass <strong>AND attends the 60-minute live AI project workshop on Day 7</strong>. Real builders only.
            </p>
          </div>

        </div>

        {/* Right Column: Squad Prize Pool Breakdown */}
        <div className="lg:col-span-5 warm-card rounded-3xl p-6 sm:p-8 border-2 border-amber-400 space-y-5 shadow-md">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
            <div className="flex items-center space-x-2">
              <Trophy size={18} className="text-amber-700" />
              <span className="font-heading font-black text-[#2D2319] text-base">SQUAD PRIZE POOL</span>
            </div>
            <span className="font-heading font-black text-amber-800 text-lg">TOTAL ₹600</span>
          </div>

          <p className="text-xs text-[#5E4F41] font-sans leading-relaxed">
            Allocated from the verified ₹2,000 transparent campaign budget to reward community builders who bring real active peers:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-amber-300 flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-amber-400 text-[#3B210B] font-heading font-black flex items-center justify-center text-xs">
                  1ST
                </span>
                <div>
                  <div className="text-sm font-bold text-[#2D2319]">Squad Champion</div>
                  <div className="text-[10px] font-mono text-[#6E5A47]">Highest qualified attendees</div>
                </div>
              </div>
              <div className="font-heading font-black text-xl text-amber-800">₹249</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-stone-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-stone-200 text-[#2D2319] font-heading font-black flex items-center justify-center text-xs">
                  2ND
                </span>
                <div>
                  <div className="text-sm font-bold text-[#2D2319]">Squad Runner Up</div>
                  <div className="text-[10px] font-mono text-[#6E5A47]">2nd highest verified peers</div>
                </div>
              </div>
              <div className="font-heading font-black text-xl text-[#4A321B]">₹199</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-amber-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-amber-700 text-white font-heading font-black flex items-center justify-center text-xs">
                  3RD
                </span>
                <div>
                  <div className="text-sm font-bold text-[#2D2319]">Squad Vanguard</div>
                  <div className="text-[10px] font-mono text-[#6E5A47]">3rd highest verified peers</div>
                </div>
              </div>
              <div className="font-heading font-black text-xl text-amber-700">₹152</div>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] font-mono text-[#6E5A47]">
              ₹249 + ₹199 + ₹152 = <strong className="text-amber-800">₹600 Total Squad Pool</strong>
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
