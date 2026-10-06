import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import { Trophy, School, Users, AlertCircle, Search, TrendingUp, Award, Star, CheckCircle2 } from 'lucide-react';
import { IndividualLeaderboardEntry, CollegeLeaderboardEntry, ReferralLeaderboardEntry } from '../types';

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'college' | 'referral'>('individual');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. INDIVIDUAL LEADERBOARD DATA
  const individualData: IndividualLeaderboardEntry[] = [
    { rank: 1, name: "Aarav Sharma", college: "IIT Madras", score: 294, badge: "Master Architect", challengesCompleted: 3, avatarSeed: "aarav" },
    { rank: 2, name: "Ananya Iyer", college: "NIT Trichy", score: 288, badge: "Prompt Vanguard", challengesCompleted: 3, avatarSeed: "ananya" },
    { rank: 3, name: "Rishi Nambiar", college: "BITS Pilani", score: 282, badge: "Speed Demon", challengesCompleted: 3, avatarSeed: "rishi" },
    { rank: 4, name: "Tanvi Deshmukh", college: "COEP Pune", score: 276, badge: "Bug Hunter", challengesCompleted: 3, avatarSeed: "tanvi" },
    { rank: 5, name: "Kabir Verma", college: "DTU Delhi", score: 269, badge: "Creator Specialist", challengesCompleted: 2, avatarSeed: "kabir" },
    { rank: 6, name: "Sneha Reddy", college: "RVCE Bengaluru", score: 261, badge: "Prompt Pioneer", challengesCompleted: 2, avatarSeed: "sneha" },
    { rank: 7, name: "Devansh Roy", college: "IIIT Hyderabad", score: 254, badge: "AI Auditor", challengesCompleted: 2, avatarSeed: "devansh" },
    { rank: 8, name: "Pooja Hegde", college: "BMSCE Bengaluru", score: 247, badge: "Logic Solver", challengesCompleted: 2, avatarSeed: "pooja" },
  ];

  // 2. COLLEGE LEADERBOARD DATA
  const collegeData: CollegeLeaderboardEntry[] = [
    { rank: 1, college: "IIT Madras", builders: 46, challengePoints: 4210, trending: 'up' },
    { rank: 2, college: "RVCE Bengaluru", builders: 41, challengePoints: 3950, trending: 'up' },
    { rank: 3, college: "BITS Pilani", builders: 38, challengePoints: 3780, trending: 'stable' },
    { rank: 4, college: "NIT Trichy", builders: 34, challengePoints: 3410, trending: 'up' },
    { rank: 5, college: "COEP Tech University Pune", builders: 29, challengePoints: 2980, trending: 'stable' },
    { rank: 6, college: "DTU Delhi", builders: 27, challengePoints: 2790, trending: 'down' },
    { rank: 7, college: "IIIT Hyderabad", builders: 24, challengePoints: 2560, trending: 'up' },
  ];

  // 3. REFERRAL LEADERBOARD DATA
  const referralData: ReferralLeaderboardEntry[] = [
    { rank: 1, name: "Pranav Mathur", college: "DTU Delhi", qualifiedReferrals: 14, estimatedPrize: "₹249 (1st Place)" },
    { rank: 2, name: "Megha Sunder", college: "RVCE Bengaluru", qualifiedReferrals: 11, estimatedPrize: "₹199 (2nd Place)" },
    { rank: 3, name: "Aditya Nair", college: "IIT Madras", qualifiedReferrals: 9, estimatedPrize: "₹152 (3rd Place)" },
    { rank: 4, name: "Kiran Patil", college: "COEP Pune", qualifiedReferrals: 7, estimatedPrize: "Squad Honor" },
    { rank: 5, name: "Sanya Roy", college: "BITS Pilani", qualifiedReferrals: 6, estimatedPrize: "Squad Honor" },
    { rank: 6, name: "Vikas Rao", college: "NIT Surathkal", qualifiedReferrals: 5, estimatedPrize: "Squad Honor" },
  ];

  const filteredIndividual = individualData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCollege = collegeData.filter((item) =>
    item.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReferral = referralData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="leaderboard" className="relative py-20 px-4 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4A855] text-amber-900 text-xs font-mono font-bold mb-4 shadow-xs">
          <Trophy size={14} className="text-amber-600" />
          <span>COHORT STANDINGS // HEALTHY CAMPUS RIVALRY</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#2D2319] tracking-tight">
          BUILDER LEAGUE
        </h2>
        <p className="mt-2 text-[#5E4F41] text-sm sm:text-base font-sans">
          Individual Builders • College Leaderboard • Top Squads
        </p>
      </div>

      {/* Contextual Your Builder Score Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4A855] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold shrink-0">
            <Star size={18} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#8C6D53] font-bold uppercase">YOUR BUILDER SCORE</div>
            <div className="font-heading font-black text-base sm:text-lg text-[#2D2319]">
              READY TO COMPETE // 0 PTS
            </div>
          </div>
        </div>
        <div className="text-xs font-mono text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 font-bold flex items-center space-x-1.5">
          <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
          <span>Complete challenges in the 3 Arenas to move up the ranks!</span>
        </div>
      </div>

      {/* Tabs & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        
        <div className="flex p-1 rounded-2xl bg-[#EFE8DD] border border-[#D4C3A3] w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('individual');
            }}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl font-heading text-xs font-black tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeTab === 'individual'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-[#6E5A47] hover:text-[#2D2319]'
            }`}
          >
            <Trophy size={14} />
            <span>INDIVIDUAL BUILDERS</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('college');
            }}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl font-heading text-xs font-black tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeTab === 'college'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-[#6E5A47] hover:text-[#2D2319]'
            }`}
          >
            <School size={14} />
            <span>COLLEGE LEADERBOARD</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('referral');
            }}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl font-heading text-xs font-black tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeTab === 'referral'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-[#6E5A47] hover:text-[#2D2319]'
            }`}
          >
            <Users size={14} />
            <span>TOP SQUADS</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8268]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or college..."
            className="w-full bg-[#FFFDF9] border border-[#D4C3A3] rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-[#2D2319] placeholder-[#9E8268] focus:outline-none focus:border-amber-600 shadow-xs"
          />
        </div>

      </div>

      {/* Mandatory Referral Qualification Rule Banner */}
      {activeTab === 'referral' && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm font-sans flex items-start space-x-3 shadow-xs">
          <AlertCircle size={20} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-heading font-black text-amber-900 tracking-wider uppercase">
              CRITICAL RULE: HOW QUALIFIED REFERRALS COUNT
            </span>
            <p className="text-[#5E4F41]">
              A referral is strictly marked <strong className="text-[#2D2319]">QUALIFIED</strong> only when:
            </p>
            <ol className="list-decimal pl-5 space-y-0.5 text-[#5C3A1E] font-mono text-xs">
              <li>The referred student completes their League Pass registration.</li>
              <li>The referred student <strong>attends the Day-7 Live AI Workshop</strong> ("Build Your First AI Project in 60 Minutes").</li>
            </ol>
            <p className="text-[11px] text-[#8C6D53] pt-1">
              Zero fake signups or unverified email farming will count toward squad prizes.
            </p>
          </div>
        </div>
      )}

      {/* LEADERBOARD TABLE CONTAINER */}
      <div className="warm-card rounded-3xl border border-[#E8DFD5] overflow-hidden shadow-md">
        
        {/* 1. INDIVIDUAL TAB */}
        {activeTab === 'individual' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead className="bg-[#FAF6EE] text-[11px] font-mono uppercase text-[#6E5A47] border-b border-[#E8DFD5]">
                <tr>
                  <th className="py-3.5 px-4">RANK</th>
                  <th className="py-3.5 px-4">NAME</th>
                  <th className="py-3.5 px-4">COLLEGE</th>
                  <th className="py-3.5 px-4 text-center">CHALLENGES</th>
                  <th className="py-3.5 px-4 text-right">TOTAL SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DD] font-mono">
                {filteredIndividual.map((row) => (
                  <tr key={row.rank} className="hover:bg-[#FAF6EE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-heading font-black text-xs ${
                        row.rank === 1 ? 'bg-amber-400 text-[#3B210B] shadow-xs' :
                        row.rank === 2 ? 'bg-stone-300 text-[#2D2319]' :
                        row.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-[#EFE8DD] text-[#6E5A47]'
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-[#2D2319] flex items-center space-x-2">
                      <span>{row.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                        {row.badge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E4F41] font-sans text-xs">{row.college}</td>
                    <td className="py-3.5 px-4 text-center text-xs text-[#6E5A47]">{row.challengesCompleted} / 3</td>
                    <td className="py-3.5 px-4 text-right font-heading font-black text-amber-800 text-base">
                      {row.score} PTS
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. COLLEGE TAB */}
        {activeTab === 'college' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead className="bg-[#FAF6EE] text-[11px] font-mono uppercase text-[#6E5A47] border-b border-[#E8DFD5]">
                <tr>
                  <th className="py-3.5 px-4">RANK</th>
                  <th className="py-3.5 px-4">COLLEGE</th>
                  <th className="py-3.5 px-4 text-center">REGISTERED BUILDERS</th>
                  <th className="py-3.5 px-4 text-right">CHALLENGE POINTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DD] font-mono">
                {filteredCollege.map((row) => (
                  <tr key={row.rank} className="hover:bg-[#FAF6EE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-heading font-black text-xs ${
                        row.rank === 1 ? 'bg-amber-500 text-white shadow-xs' :
                        row.rank === 2 ? 'bg-stone-300 text-[#2D2319]' :
                        row.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-[#EFE8DD] text-[#6E5A47]'
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-[#2D2319] flex items-center space-x-2">
                      <School size={16} className="text-amber-700 shrink-0" />
                      <span>{row.college}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-xs text-amber-900 font-bold">
                      {row.builders} Builders
                    </td>
                    <td className="py-3.5 px-4 text-right font-heading font-black text-amber-800 text-base">
                      {row.challengePoints} PTS
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. REFERRAL TAB */}
        {activeTab === 'referral' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead className="bg-[#FAF6EE] text-[11px] font-mono uppercase text-[#6E5A47] border-b border-[#E8DFD5]">
                <tr>
                  <th className="py-3.5 px-4">RANK</th>
                  <th className="py-3.5 px-4">STUDENT</th>
                  <th className="py-3.5 px-4">COLLEGE</th>
                  <th className="py-3.5 px-4 text-center">QUALIFIED REFERRALS</th>
                  <th className="py-3.5 px-4 text-right">PRIZE POOL STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DD] font-mono">
                {filteredReferral.map((row) => (
                  <tr key={row.rank} className="hover:bg-[#FAF6EE]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-heading font-black text-xs ${
                        row.rank === 1 ? 'bg-amber-500 text-white shadow-xs' :
                        row.rank === 2 ? 'bg-stone-300 text-[#2D2319]' :
                        row.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-[#EFE8DD] text-[#6E5A47]'
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-[#2D2319]">{row.name}</td>
                    <td className="py-3.5 px-4 text-[#5E4F41] font-sans text-xs">{row.college}</td>
                    <td className="py-3.5 px-4 text-center text-xs font-black text-amber-800">
                      {row.qualifiedReferrals} Verified
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-800 font-bold text-xs">
                      {row.estimatedPrize}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </section>
  );
};
