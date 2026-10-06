import React, { useState, useEffect } from 'react';
import { CharacterMood } from '../types';
import { sounds } from '../utils/soundEffects';

interface CharacterAvatarProps {
  mood?: CharacterMood;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showInteractiveTooltip?: boolean;
  onCharacterClick?: () => void;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  mood = 'curious',
  isSpeaking = false,
  size = 'hero',
  showInteractiveTooltip = false,
  onCharacterClick,
  className = '',
}) => {
  const [blink, setBlink] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [reactionBubble, setReactionBubble] = useState<string | null>(null);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3800 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playChirp(1400);
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (onCharacterClick) {
      onCharacterClick();
    }

    // Reaction sequence based on clicks
    const reactions = [
      '⚡ "Ready to build something insane?"',
      '🔥 "Checking neural sync... 100% focused!"',
      '👋 "Namaste! Don\'t stare too hard, start coding!"',
      '🤖 "My cooling fans just ramped up. Easy on the clicks!"',
      '🧠 "Pro tip: An AI only solves what you dare to prompt."',
      '🚀 "3 challenges. 500 engineers. Are you in the top 1%?"'
    ];
    setReactionBubble(reactions[nextCount % reactions.length]);
    setTimeout(() => {
      setReactionBubble(null);
    }, 3000);
  };

  // Dimensions
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-48 h-48',
    hero: 'w-72 h-84 md:w-88 md:h-104 max-w-full',
  };

  // Head tilt based on mood
  const headTransform = mood === 'confused' || mood === 'thinking' ? 'rotate(4deg)' : 'rotate(0deg)';

  return (
    <div 
      className={`relative inline-block select-none cursor-pointer group ${sizeMap[size]} ${className}`}
      onClick={handleClick}
      title="Click Veer for reactive dialogue!"
    >
      {/* Floating Reaction Pill */}
      {reactionBubble && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-indigo-950/90 text-amber-300 text-xs font-mono px-3 py-1.5 rounded-full border border-amber-400/40 shadow-xl backdrop-blur-md animate-bounce">
          {reactionBubble}
        </div>
      )}

      {/* Interactive Tooltip Hint */}
      {showInteractiveTooltip && !reactionBubble && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-40 bg-black/80 text-cyan-300 text-[11px] font-mono px-2.5 py-1 rounded border border-cyan-500/30 whitespace-nowrap pointer-events-none">
          Click Veer to interact ⚡
        </div>
      )}

      {/* Ambient Cyber Aura Behind Veer */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-indigo-600/30 via-cyan-500/10 to-amber-500/20 blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

      {/* SVG Original Cinematic Indian AI Character: VEER (वीर) */}
      <svg
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ transformOrigin: 'bottom center' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c68a4c" />
            <stop offset="50%" stopColor="#b47b40" />
            <stop offset="100%" stopColor="#965f2c" />
          </linearGradient>

          <linearGradient id="cyberSuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <linearGradient id="saffronGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- BREATHING TORSO / JACKET --- */}
        <g className="animate-breathe" style={{ transformOrigin: '160px 300px' }}>
          {/* Cybernetic Sherwani Armor / Jacket */}
          <path
            d="M80 260 L60 400 L260 400 L240 260 L200 235 L160 250 L120 235 Z"
            fill="url(#cyberSuitGrad)"
            stroke="#4338ca"
            strokeWidth="2"
          />

          {/* Shoulders & Arm pads */}
          <path d="M75 260 L50 310 L70 330 L95 270 Z" fill="#1e1b4b" stroke="url(#saffronGold)" strokeWidth="1.5" />
          <path d="M245 260 L270 310 L250 330 L225 270 Z" fill="#1e1b4b" stroke="url(#saffronGold)" strokeWidth="1.5" />

          {/* High Mandarian Cyber-Collar */}
          <path
            d="M115 220 L110 248 L160 262 L210 248 L205 220 L160 232 Z"
            fill="#111827"
            stroke="url(#saffronGold)"
            strokeWidth="2"
          />

          {/* Luminous Neo-Mandala Arc Energy Core (Chest) */}
          <g transform="translate(160, 310)">
            <circle r="26" fill="#030712" stroke="url(#neonCyan)" strokeWidth="2.5" />
            <circle r="19" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Geometric Mandala Rays */}
            <path d="M-12 0 L12 0 M0 -12 L0 12 M-8 -8 L8 8 M-8 8 L8 -8" stroke="#38bdf8" strokeWidth="1.5" />
            <circle r="6" fill="#38bdf8" filter="url(#cyberGlow)" className="animate-pulse" />
          </g>

          {/* Golden Circuit Inlays on Torso */}
          <path
            d="M130 260 L130 360 L145 380"
            stroke="url(#saffronGold)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <path
            d="M190 260 L190 360 L175 380"
            stroke="url(#saffronGold)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
        </g>

        {/* --- NECK & HEAD GROUP (Allows tilting) --- */}
        <g style={{ transform: headTransform, transformOrigin: '160px 200px', transition: 'transform 0.4s ease' }}>
          {/* Neck */}
          <path d="M142 195 L142 235 L178 235 L178 195 Z" fill="url(#skinGrad)" />
          {/* Neck cybernetic fiber wiring */}
          <path d="M145 210 Q160 220 175 210" stroke="#06b6d4" strokeWidth="1.5" opacity="0.8" />

          {/* Head & Face Contour (Strong jawline, athletic cinematic look) */}
          <path
            d="M118 135 C118 90 202 90 202 135 C202 175 185 205 160 215 C135 205 118 175 118 135 Z"
            fill="url(#skinGrad)"
          />

          {/* Ears */}
          <path d="M114 135 C110 130 110 150 116 155 Z" fill="#b47b40" />
          <path d="M206 135 C210 130 210 150 204 155 Z" fill="#b47b40" />
          {/* Cyber Commlink Earring (Right Ear) */}
          <circle cx="206" cy="150" r="3" fill="#f59e0b" filter="url(#cyberGlow)" />

          {/* Modern Cinematic Hair & Beard Trim */}
          {/* Hair: Voluminous fade, sleek styled top */}
          <path
            d="M112 130 C112 85 130 65 160 62 C190 65 208 85 208 130 C204 110 185 92 160 92 C135 92 116 110 112 130 Z"
            fill="#18181b"
          />
          {/* Hair front strands */}
          <path d="M145 70 C155 82 170 82 178 72 C168 64 152 64 145 70 Z" fill="#27272a" />

          {/* Sleek Sharply Groomed Beard / Stubble */}
          <path
            d="M130 170 C130 195 145 208 160 212 C175 208 190 195 190 170 C185 180 175 195 160 195 C145 195 135 180 130 170 Z"
            fill="#1c1917"
            opacity="0.85"
          />

          {/* Eyebrows */}
          <path d="M132 130 Q145 125 152 129" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M168 129 Q175 125 188 130"
            stroke="#18181b"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transform: mood === 'curious' ? 'translateY(-2px)' : 'none' }}
          />

          {/* Eyes (Left Human Eye, Right Eye with Subtle Neural HUD Glow) */}
          {/* Left Eye */}
          <ellipse cx="143" cy="138" rx="8" ry={blink ? '1' : '4.5'} fill="#ffffff" />
          {!blink && (
            <>
              <circle cx="144" cy="138" r="3.2" fill="#3b2d18" />
              <circle cx="145" cy="137" r="1.2" fill="#ffffff" />
            </>
          )}

          {/* Right Eye (Augmented Optical Sensor) */}
          <ellipse cx="177" cy="138" rx="8" ry={blink ? '1' : '4.5'} fill="#ffffff" />
          {!blink && (
            <>
              <circle cx="176" cy="138" r="3.4" fill="#0284c7" />
              <circle cx="176" cy="138" r="1.8" fill="#38bdf8" filter="url(#cyberGlow)" />
              {/* Subtle HUD ring around iris */}
              <circle cx="176" cy="138" r="5" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 1" fill="none" />
            </>
          )}

          {/* Nose */}
          <path d="M160 134 L157 156 L163 156 Z" fill="#965f2c" />

          {/* Mouth (Synchronized speaking / smile based on mood) */}
          {isSpeaking ? (
            <ellipse cx="160" cy="176" rx="6" ry="4" fill="#5c2626" className="animate-pulse" />
          ) : mood === 'excited' || mood === 'celebratory' ? (
            <path d="M150 173 Q160 183 170 173" stroke="#451a1a" strokeWidth="2.5" strokeLinecap="round" fill="#ffffff" />
          ) : mood === 'confused' ? (
            <path d="M152 176 Q160 172 168 177" stroke="#451a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M152 175 Q160 178 168 175" stroke="#451a1a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          )}

          {/* Forehead Neo-Vedic Neural Circuit / Cyber-Tilak */}
          <g transform="translate(160, 110)">
            <path d="M0 -12 L0 6" stroke="url(#saffronGold)" strokeWidth="2" strokeLinecap="round" filter="url(#cyberGlow)" />
            <circle cx="0" cy="0" r="2.5" fill="#f59e0b" filter="url(#cyberGlow)" />
            <circle cx="0" cy="8" r="1.5" fill="#38bdf8" />
          </g>
        </g>

        {/* Futuristic Floating HUD Elements around Veer */}
        <g opacity="0.6">
          <text x="35" y="75" fill="#38bdf8" fontSize="8" fontFamily="monospace">SYNC: 99.8%</text>
          <path d="M35 80 L80 80" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="220" y="75" fill="#f59e0b" fontSize="8" fontFamily="monospace">VEER // ARCHITECT</text>
          <path d="M220 80 L285 80" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 2" />
        </g>
      </svg>
    </div>
  );
};
