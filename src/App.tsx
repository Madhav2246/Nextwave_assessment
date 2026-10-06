import React, { useState, useEffect } from 'react';
import { DoorIntro } from './components/DoorIntro';
import { MainHero } from './components/MainHero';
import { ChallengeSection } from './components/challenges/ChallengeSection';
import { Leaderboard } from './components/Leaderboard';
import { ReferralTracker } from './components/ReferralTracker';
import { Timeline } from './components/Timeline';
import { WorkshopSection } from './components/WorkshopSection';
import { CampaignEconomics } from './components/CampaignEconomics';
import { FinalScreen } from './components/FinalScreen';
import { CharacterCompanion } from './components/CharacterCompanion';
import { BuilderPassModal } from './components/BuilderPassModal';
import { Participant } from './types';
import { sounds } from './utils/soundEffects';
import { Volume2, VolumeX, KeyRound, Sparkles, DoorOpen } from 'lucide-react';

export const App: React.FC = () => {
  const [hasEnteredLeague, setHasEnteredLeague] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [registeredParticipant, setRegisteredParticipant] = useState<Participant | null>(null);
  const [soundActive, setSoundActive] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  // Track scroll position to update companion guide context
  useEffect(() => {
    if (!hasEnteredLeague) return;

    const handleScroll = () => {
      const sections = ['hero', 'challenges', 'leaderboard', 'timeline', 'workshop', 'referrals', 'final-cta'];
      const scrollPosition = window.scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEnteredLeague]);

  const handleSoundToggle = () => {
    const next = sounds.toggleMute();
    setSoundActive(next);
  };

  const handleJumpToSection = (sectionId: string) => {
    sounds.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user hasn't completed the Door intro, show the full cinematic door experience!
  if (!hasEnteredLeague) {
    return <DoorIntro onEnterLeague={() => setHasEnteredLeague(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2319] selection:bg-amber-200 selection:text-[#2D2319]">
      
      {/* Background Subtle Warm Linen Ambience */}
      <div className="fixed inset-0 warm-grid opacity-40 pointer-events-none" />

      {/* Floating Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD5] px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Re-enter portal */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sounds.playClick();
                setHasEnteredLeague(false);
              }}
              className="flex items-center space-x-2 text-xs font-mono text-[#694A2D] hover:text-amber-800 transition-colors cursor-pointer group"
              title="Re-experience the cinematic Door entrance"
            >
              <DoorOpen size={16} className="text-amber-700 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">REVISIT PORTAL</span>
            </button>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <div className="font-heading font-black tracking-wider text-sm sm:text-base text-[#3D250E]">
              AI BUILDER LEAGUE
            </div>
          </div>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono font-medium text-[#5E4F41]">
            <button onClick={() => handleJumpToSection('challenges')} className="hover:text-amber-700 cursor-pointer transition-colors">
              CHALLENGES
            </button>
            <button onClick={() => handleJumpToSection('leaderboard')} className="hover:text-amber-700 cursor-pointer transition-colors">
              LEADERBOARD
            </button>
            <button onClick={() => handleJumpToSection('timeline')} className="hover:text-amber-700 cursor-pointer transition-colors">
              TIMELINE
            </button>
            <button onClick={() => handleJumpToSection('workshop')} className="hover:text-amber-700 cursor-pointer transition-colors">
              WORKSHOP
            </button>
            <button onClick={() => handleJumpToSection('referrals')} className="hover:text-amber-700 cursor-pointer transition-colors">
              SQUAD
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-xl bg-[#FFFDF9] border border-[#D4C3A3] text-[#5C3A1E] hover:text-black transition-colors cursor-pointer shadow-xs"
              title={soundActive ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundActive ? <Volume2 size={16} className="text-emerald-700" /> : <VolumeX size={16} className="text-rose-700" />}
            </button>

            {/* Pass CTA */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsPassModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-heading font-black text-xs tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(217,119,6,0.3)] cursor-pointer flex items-center space-x-1.5 hover:scale-105"
            >
              <KeyRound size={14} />
              <span>{registeredParticipant ? 'VIEW MY PASS' : 'UNLOCK PASS'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN SECTIONS */}
      <main className="relative z-10 pt-10">
        
        {/* 1. Main Hero with 327/500 Live Counter */}
        <MainHero
          onUnlockPassClick={() => setIsPassModalOpen(true)}
          onExploreClick={() => handleJumpToSection('challenges')}
        />

        {/* 2. The Three AI Challenges */}
        <ChallengeSection
          onChallengeCompleted={(challengeId, score) => {
            console.log(`Challenge ${challengeId} completed with score ${score}`);
          }}
        />

        {/* 3. Leaderboards (Individual, College, Referral) */}
        <Leaderboard />

        {/* 4. 7-Day Journey Visual Timeline */}
        <Timeline />

        {/* 5. Day-7 Capstone Workshop */}
        <WorkshopSection
          onUnlockPassClick={() => setIsPassModalOpen(true)}
          isRegistered={!!registeredParticipant}
        />

        {/* 6. Referral System & Squad Builder */}
        <ReferralTracker
          participant={registeredParticipant}
          onOpenPassModal={() => setIsPassModalOpen(true)}
        />

        {/* 7. Campaign Economics Transparency */}
        <CampaignEconomics />

        {/* 8. Final Screen with Veer */}
        <FinalScreen
          onEnterLeagueClick={() => setIsPassModalOpen(true)}
          onChallengeMeClick={() => handleJumpToSection('challenges')}
        />

      </main>

      {/* Contextual Wandering Guide (VEER) */}
      <CharacterCompanion
        currentSection={currentSection}
        onJumpToSection={handleJumpToSection}
      />

      {/* Builder Pass Modal */}
      <BuilderPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        onRegistered={(p) => setRegisteredParticipant(p)}
        initialParticipant={registeredParticipant}
      />

    </div>
  );
};
