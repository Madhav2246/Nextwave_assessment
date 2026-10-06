/**
 * CharacterCompanion — Vertical Dynamic Scroll-Linked AI Guide (VEER).
 *
 * Requirements fulfilled:
 * - DYNAMICALLY VERTICAL (NOT horizontal): Linked directly with user scrolling.
 * - As user scrolls up or down, Veer glides vertically along the page, actively stepping & walking.
 * - When scrolling stops, Veer pauses, turns toward the content, and gives section advice.
 * - Speech bubble floats to the left of Veer, pointing right at him.
 * - Subtle vertical journey rail showing milestone checkpoints.
 * - Interactive: Click Veer to make him hop, smile, and share builder wisdom.
 */
import React, { useState, useEffect, useRef } from 'react';
import { VeerCharacter } from './VeerCharacter';
import { CharacterMood } from '../types';
import { sounds } from '../utils/soundEffects';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface CharacterCompanionProps {
  currentSection: string;
  onJumpToSection?: (sectionId: string) => void;
}

export const CharacterCompanion: React.FC<CharacterCompanionProps> = ({ currentSection, onJumpToSection }) => {
  const [mood, setMood] = useState<CharacterMood>('proud');
  const [speech, setSpeech] = useState<string>("I'm traveling with you down the League! Scroll to explore.");
  const [showBubble, setShowBubble] = useState(true);
  
  // Vertical position (px from viewport top)
  const [currentY, setCurrentY] = useState(120);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Milestone checkpoints for the vertical journey
  const milestones = [
    { id: 'hero', label: 'Start' },
    { id: 'project-generator', label: 'Discover' },
    { id: 'challenges', label: '3 Arenas' },
    { id: 'leaderboard', label: 'Ranks' },
    { id: 'timeline', label: '7 Days' },
    { id: 'workshop', label: 'Build' },
    { id: 'referrals', label: 'Squad' },
    { id: 'final-cta', label: 'Finale' },
  ];

  // Dynamic vertical tracking linked directly with user scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Determine scrolling direction
      if (scrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = scrollY;

      // Active walk animation while scrolling
      setIsScrolling(true);

      // Map progress to vertical viewport range (from 90px to windowHeight - 160px)
      const minTop = 90;
      const maxTop = Math.max(minTop + 50, window.innerHeight - 170);
      const targetTop = minTop + progress * (maxTop - minTop);
      setCurrentY(targetTop);

      // Clear scrolling state after scroll ends
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Section commentary
  useEffect(() => {
    const sectionMessages: Record<string, [CharacterMood, string]> = {
      hero: [
        'proud',
        "327 builders registered! 500 cap is closing fast."
      ],
      'project-generator': [
        'curious',
        "What would YOU build with AI? Discover your 60-minute project idea!"
      ],
      challenges: [
        'curious',
        "3 interactive challenge scenes! Inspect the Detective lab flaw!"
      ],
      leaderboard: [
        'intense',
        "Top engineering colleges are fighting for #1 rank!"
      ],
      timeline: [
        'thinking',
        "7 intensive days. Step-by-step from zero to shipping AI."
      ],
      workshop: [
        'celebratory',
        "The Capstone Workshop! 60 minutes to deploy your live AI app."
      ],
      referrals: [
        'playful',
        "Build your squad! Attending Day 7 unlocks squad prizes."
      ],
      'final-cta': [
        'excited',
        "Your move, engineer! Let's ship real AI code."
      ],
    };

    const target = sectionMessages[currentSection];
    if (target) {
      setMood(target[0]);
      setSpeech(target[1]);
      setShowBubble(true);
      sounds.playChirp(1200);
    }
  }, [currentSection]);

  const handleVeerClick = () => {
    sounds.playChirp(1350);
    setMood('celebratory');
    setShowBubble(true);
    const tips = [
      "🔥 \"Real engineers ship working code, not just textbook theory!\"",
      "💡 \"Inspect lines 24 and 41 in Challenge 01—find the concurrency gap!\"",
      "🎯 \"Challenge 02 tests your creative prompt skills—give it a shot!\"",
      "🚀 \"I'm gliding down the page with you! Keep scrolling!\"",
      "✨ \"500 spots are filling fast. Unlock your Builder Pass today!\"",
    ];
    setSpeech(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <div
      className="fixed right-3 sm:right-6 z-40 select-none pointer-events-none transition-all duration-150 ease-out flex items-center"
      style={{
        top: `${currentY}px`,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Speech Bubble (Floats to the LEFT of Veer, pointing directly at him!) */}
      {showBubble && (
        <div
          className="pointer-events-auto mr-3 bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl px-3.5 py-2.5 shadow-[0_8px_24px_rgba(90,60,20,0.14)] max-w-[220px] sm:max-w-[260px] text-right relative"
        >
          {/* Close tiny button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-600 flex items-center justify-center cursor-pointer shadow-xs"
            title="Dismiss bubble"
          >
            <X size={11} />
          </button>

          <p className="text-xs text-[#3D250E] font-semibold leading-relaxed text-left">
            "{speech}"
          </p>

          {/* Speech Bubble Tail pointing RIGHT to Veer */}
          <div
            className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#FFFDF9]"
          />
          <div
            className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[9px] border-l-[#D4A855] -z-1"
          />
        </div>
      )}

      {/* Vertical Roaming Full-Body Veer Character */}
      <div
        className="pointer-events-auto flex flex-col items-center cursor-pointer group"
        onClick={handleVeerClick}
        title="Veer is journeying vertically with your scroll! Click to chat."
      >
        <VeerCharacter
          mood={mood}
          isWalking={isScrolling}
          isSpeaking={false}
          size={110}
        />
        
        {/* Subtle name badge at his feet */}
        <div className="mt-[-4px] bg-[#E5A93C] text-[#3B210B] text-[9px] font-mono font-black px-2 py-0.5 rounded-full shadow-xs">
          वीर // SCROLL GUIDE
        </div>
      </div>

      {/* Subtle Vertical Milestone Track on the far right */}
      <div className="pointer-events-auto ml-2 hidden lg:flex flex-col items-center space-y-2 py-2 opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-1 h-32 bg-[#EADCCB] rounded-full relative overflow-hidden">
          <div
            className="w-full bg-amber-600 rounded-full transition-all duration-150"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

    </div>
  );
};
