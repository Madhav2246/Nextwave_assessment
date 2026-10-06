import React, { useState } from 'react';
import { ChallengeDetective } from './ChallengeDetective';
import { ChallengeCreator } from './ChallengeCreator';
import { ChallengeSpeedRun } from './ChallengeSpeedRun';
import { sounds } from '../../utils/soundEffects';
import { Search, Lightbulb, Zap, Award, CheckCircle2 } from 'lucide-react';

interface ChallengeSectionProps {
  onChallengeCompleted: (challengeId: string, score: number) => void;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onChallengeCompleted }) => {
  const [activeTab, setActiveTab] = useState<'detective' | 'creator' | 'speed'>('detective');
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const handleScore = (challengeKey: string, score: number) => {
    setScores((prev) => ({ ...prev, [challengeKey]: score }));
    onChallengeCompleted(challengeKey, score);
  };

  const totalEarned = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <section id="challenges" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4A855] text-amber-900 text-xs font-mono font-bold mb-4 shadow-xs">
          <Award size={14} className="text-amber-600" />
          <span>THREE CAMPAIGN ARENAS // TARGET PERSONALITIES</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#2D2319] tracking-tight">
          THE THREE AI CHALLENGES
        </h2>
        <p className="mt-3 text-[#5E4F41] text-base font-sans">
          Engineered deliberately for distinct engineering archetypes. Complete all three to maximize your league standing before the Day 7 Grand Workshop.
        </p>

        {/* Total Challenge Prize Pool Banner */}
        <div className="mt-5 inline-flex items-center space-x-3 bg-amber-100/70 border border-amber-300 px-5 py-2.5 rounded-2xl shadow-xs">
          <span className="text-xs font-mono text-[#5C3A1E] font-medium">TOTAL CHALLENGE PRIZE POOL:</span>
          <span className="font-heading text-lg font-black text-amber-900">₹1,000 INR</span>
          <span className="text-amber-400">•</span>
          <span className="text-xs font-mono text-emerald-800 font-bold">YOUR SCORE: {totalEarned} PTS</span>
        </div>
      </div>

      {/* Challenge Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        
        {/* Tab 1 */}
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('detective');
          }}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'detective'
              ? 'warm-card-glow border-amber-500 shadow-md'
              : 'warm-card border-[#E8DFD5] hover:border-[#D4A855]'
          }`}
        >
          {scores.detective && (
            <div className="absolute top-2 right-2 text-emerald-700 flex items-center space-x-1 text-[10px] font-mono font-bold">
              <CheckCircle2 size={13} />
              <span>{scores.detective} pts</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold mb-1">
            <Search size={14} />
            <span>01 // ANALYTICAL</span>
          </div>
          <div className="font-heading font-black text-lg text-[#2D2319]">AI DETECTIVE</div>
          <div className="text-xs text-[#5E4F41] mt-1">Spot hallucinated bugs. Prove the LLM wrong.</div>
          <div className="text-[11px] font-mono text-amber-800 font-bold mt-2">REWARD: ₹300</div>
        </button>

        {/* Tab 2 */}
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('creator');
          }}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'creator'
              ? 'warm-card-glow border-amber-500 shadow-md'
              : 'warm-card border-[#E8DFD5] hover:border-[#D4A855]'
          }`}
        >
          {scores.creator && (
            <div className="absolute top-2 right-2 text-emerald-700 flex items-center space-x-1 text-[10px] font-mono font-bold">
              <CheckCircle2 size={13} />
              <span>{scores.creator} pts</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold mb-1">
            <Lightbulb size={14} />
            <span>02 // CREATIVE</span>
          </div>
          <div className="font-heading font-black text-lg text-[#2D2319]">CREATOR BATTLE</div>
          <div className="text-xs text-[#5E4F41] mt-1">10 Minutes. Build solutions people want.</div>
          <div className="text-[11px] font-mono text-amber-800 font-bold mt-2">REWARD: ₹300</div>
        </button>

        {/* Tab 3 */}
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('speed');
          }}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeTab === 'speed'
              ? 'warm-card-glow border-amber-500 shadow-md'
              : 'warm-card border-[#E8DFD5] hover:border-[#D4A855]'
          }`}
        >
          {scores.speed && (
            <div className="absolute top-2 right-2 text-emerald-700 flex items-center space-x-1 text-[10px] font-mono font-bold">
              <CheckCircle2 size={13} />
              <span>{scores.speed} pts</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs font-bold mb-1">
            <Zap size={14} />
            <span>03 // COMPETITIVE</span>
          </div>
          <div className="font-heading font-black text-lg text-[#2D2319]">AI SPEED RUN</div>
          <div className="text-xs text-[#5E4F41] mt-1">60s Clock. Correctness + Speed + Logic.</div>
          <div className="text-[11px] font-mono text-amber-800 font-bold mt-2">REWARD: ₹400</div>
        </button>

      </div>

      {/* Active Challenge Arena Container */}
      <div className="warm-card rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-lg">
        {activeTab === 'detective' && (
          <ChallengeDetective onScoreEarned={(s) => handleScore('detective', s)} />
        )}
        {activeTab === 'creator' && (
          <ChallengeCreator onScoreEarned={(s) => handleScore('creator', s)} />
        )}
        {activeTab === 'speed' && (
          <ChallengeSpeedRun onScoreEarned={(s) => handleScore('speed', s)} />
        )}
      </div>

    </section>
  );
};
