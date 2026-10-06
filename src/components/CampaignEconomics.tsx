import React from 'react';
import { ShieldCheck, Target, Clock, Award, DollarSign } from 'lucide-react';

export const CampaignEconomics: React.FC = () => {
  return (
    <section className="relative py-16 px-4 max-w-6xl mx-auto border-t border-[#E8DFD5]">
      
      <div className="warm-card rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-lg space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DFD5] gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-800 font-mono text-xs uppercase mb-1 font-bold">
              <ShieldCheck size={14} className="text-amber-700" />
              <span>RADICAL TRANSPARENCY // OPEN BUDGET</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319]">
              CAMPAIGN ECONOMICS & VALUE ARCHITECTURE
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-[#6E5A47] font-semibold">TOTAL ALLOCATED BUDGET</span>
            <div className="font-heading text-2xl font-black text-amber-800">₹2,000 INR TOTAL</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5E4F41] font-sans max-w-3xl leading-relaxed">
          The AI Builder League is not a commercial sales funnel or a pay-to-play scheme. Every rupee is openly allocated to validate peer talent, reward technical skill, and facilitate deep learning for 500 final-year engineers.
        </p>

        {/* 3 Pillar Allocations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Pillar 1: Challenge Rewards */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-amber-300 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-base text-[#2D2319]">CHALLENGE PRIZES</span>
              <span className="font-mono font-black text-amber-800 text-sm">₹1,000</span>
            </div>
            <div className="text-xs font-mono text-[#5E4F41] space-y-1">
              <div>• AI Detective: ₹300</div>
              <div>• AI Creator Battle: ₹300</div>
              <div>• AI Speed Run: ₹400</div>
            </div>
            <div className="text-[11px] text-[#8C6D53] pt-1">
              Direct merit rewards for top forensic code auditors and rapid hotfix engineers.
            </div>
          </div>

          {/* Pillar 2: Qualified Referral Rewards */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-amber-300 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-base text-[#2D2319]">QUALIFIED REFERRALS</span>
              <span className="font-mono font-black text-amber-800 text-sm">₹600</span>
            </div>
            <div className="text-xs font-mono text-[#5E4F41] space-y-1">
              <div>• Rank 1: ₹249</div>
              <div>• Rank 2: ₹199</div>
              <div>• Rank 3: ₹152</div>
            </div>
            <div className="text-[11px] text-[#8C6D53] pt-1">
              Tied strictly to verified peer workshop attendance and live active participation.
            </div>
          </div>

          {/* Pillar 3: Marketing */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-amber-300 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-base text-[#2D2319]">MARKETING</span>
              <span className="font-mono font-black text-amber-800 text-sm">₹400</span>
            </div>
            <div className="text-xs font-mono text-[#5E4F41] space-y-1">
              <div>• Campus Student Outreach</div>
              <div>• Student Creator Distribution</div>
              <div>• Engineering Network Growth</div>
            </div>
            <div className="text-[11px] text-[#8C6D53] pt-1">
              Engaging 500 final-year engineers across Tier-1/2 Indian campuses without bloated ad spend.
            </div>
          </div>

        </div>

        {/* Campaign Metrics Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#6E5A47] border-t border-[#E8DFD5]">
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-amber-700" />
            <span>CAMPAIGN DURATION: 7 DAYS</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target size={14} className="text-amber-700" />
            <span>COHORT SIZE: 500 FINAL-YEAR ENGINEERS</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award size={14} className="text-emerald-700" />
            <span>CORE PHILOSOPHY: BUILD, DON'T JUST CONSUME</span>
          </div>
        </div>

      </div>

    </section>
  );
};
