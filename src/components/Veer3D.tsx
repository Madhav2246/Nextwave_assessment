/**
 * Veer3D — Original Cinematic Indian AI Character
 * A fully animated 3D CSS character that floats, rotates,
 * and has orbiting particles, glowing effects, and mood states.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CharacterMood } from '../types';
import { sounds } from '../utils/soundEffects';

interface Veer3DProps {
  mood?: CharacterMood;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showInteractiveTooltip?: boolean;
  onCharacterClick?: () => void;
  className?: string;
  /** When true, character responds to mouse movement with 3D head tracking */
  trackMouse?: boolean;
}

export const Veer3D: React.FC<Veer3DProps> = ({
  mood = 'curious',
  isSpeaking = false,
  size = 'hero',
  showInteractiveTooltip = false,
  onCharacterClick,
  className = '',
  trackMouse = true,
}) => {
  const [blink, setBlink] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [reactionBubble, setReactionBubble] = useState<string | null>(null);
  const [headRotX, setHeadRotX] = useState(0);
  const [headRotY, setHeadRotY] = useState(0);
  const [bodyTiltX, setBodyTiltX] = useState(0);
  const [bodyTiltY, setBodyTiltY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRX = useRef(0);
  const targetRY = useRef(0);

  // ── Natural Blinking ───────────────────────────────────────────────────
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2800 + Math.random() * 2400;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        scheduleNextBlink();
      }, delay);
    };
    const t = scheduleNextBlink();
    return () => clearTimeout(t);
  }, []);

  // ── Mouse / pointer tracking for 3D head rotation ─────────────────────
  useEffect(() => {
    if (!trackMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;       // -1 … +1
      const dy = (e.clientY - cy) / cy;

      targetRX.current = -dy * 14;             // head nod
      targetRY.current = dx * 18;              // head turn
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth lerp loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let curRX = 0;
    let curRY = 0;

    const tick = () => {
      curRX = lerp(curRX, targetRX.current, 0.08);
      curRY = lerp(curRY, targetRY.current, 0.08);
      setHeadRotX(curRX);
      setHeadRotY(curRY);
      // Subtle body tilt (1/4 of head)
      setBodyTiltX(curRX * 0.25);
      setBodyTiltY(curRY * 0.25);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trackMouse]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playChirp(1400 + Math.random() * 200);
    const n = clickCount + 1;
    setClickCount(n);
    onCharacterClick?.();

    const lines = [
      '⚡ "Ready to build something insane?"',
      '🔥 "Your engineering degree — prove it."',
      '👋 "Namaste! Now stop staring and start coding."',
      '🤖 "My neural fan is spinning. Yours should be too."',
      '🧠 "Great prompt = great output. Always."',
      '🚀 "The #1 builder slot is still open. Or... is it?"',
      '💡 "AI won\'t replace you. A builder who uses AI will."',
    ];
    setReactionBubble(lines[n % lines.length]);
    setTimeout(() => setReactionBubble(null), 3200);
  }, [clickCount, onCharacterClick]);

  // ── Dimensions ────────────────────────────────────────────────────────
  const sizePx = { sm: 100, md: 180, lg: 300, hero: 380 }[size];

  // ── Mood-derived values ───────────────────────────────────────────────
  const moodAura: Record<CharacterMood, string> = {
    curious:     'rgba(99,102,241,0.45)',
    thinking:    'rgba(56,189,248,0.40)',
    excited:     'rgba(245,158,11,0.55)',
    proud:       'rgba(16,185,129,0.40)',
    confused:    'rgba(249,115,22,0.35)',
    celebratory: 'rgba(168,85,247,0.50)',
    playful:     'rgba(236,72,153,0.40)',
    intense:     'rgba(239,68,68,0.50)',
  };

  const auraColor = moodAura[mood];

  const mouthPath: Record<CharacterMood, string> = {
    curious:     'M76 112 Q90 120 104 112',
    thinking:    'M78 114 Q90 110 102 114',
    excited:     'M73 110 Q90 125 107 110',
    proud:       'M75 112 Q90 122 105 112',
    confused:    'M78 114 Q90 108 102 117',
    celebratory: 'M70 109 Q90 128 110 109',
    playful:     'M74 111 Q90 122 106 111',
    intense:     'M76 113 Q90 118 104 113',
  };

  const eyebrowLift: Record<CharacterMood, number> = {
    curious: -3, thinking: -1, excited: -5, proud: -2,
    confused: 3, celebratory: -6, playful: -4, intense: -2,
  };

  const ebShift = eyebrowLift[mood];

  // ── Orbit particles config ─────────────────────────────────────────────
  const orbits = [
    { r: sizePx * 0.60, speed: 8,  offset: 0,    color: '#f59e0b', size: 5 },
    { r: sizePx * 0.72, speed: 12, offset: 120,  color: '#38bdf8', size: 4 },
    { r: sizePx * 0.80, speed: 18, offset: 240,  color: '#a78bfa', size: 3 },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
      style={{ width: sizePx, height: sizePx * 1.25 }}
      onClick={handleClick}
    >
      {/* ── Interactive Tooltip ──────────────────────────────────────── */}
      {showInteractiveTooltip && !reactionBubble && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-40 bg-black/80 text-cyan-300 text-[11px] font-mono px-2.5 py-1 rounded border border-cyan-500/30 whitespace-nowrap pointer-events-none">
          Click Veer to interact ⚡
        </div>
      )}

      {/* ── Reaction Bubble ──────────────────────────────────────────── */}
      {reactionBubble && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-indigo-950/95 text-amber-300 text-xs font-mono px-3 py-2 rounded-xl border border-amber-400/50 shadow-2xl backdrop-blur-md pointer-events-none"
          style={{ animation: 'fadeSlideUp 0.3s ease-out' }}
        >
          {reactionBubble}
        </div>
      )}

      {/* ── Ambient Aura Glow ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${auraColor} 0%, transparent 70%)`,
          transform: 'scale(1.4)',
          filter: 'blur(18px)',
          animation: 'cyber-pulse 3s ease-in-out infinite',
        }}
      />

      {/* ── Orbiting Particles ───────────────────────────────────────── */}
      {size !== 'sm' && orbits.map((orb, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ animation: `spin ${orb.speed}s linear infinite` }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: orb.size, height: orb.size,
              background: orb.color,
              top: `calc(50% - ${orb.r}px)`,
              left: `calc(50% - ${orb.size / 2}px)`,
              boxShadow: `0 0 8px ${orb.color}`,
              animationDelay: `${orb.offset / 360 * orb.speed}s`,
            }}
          />
        </div>
      ))}

      {/* ── HUD Ring ─────────────────────────────────────────────────── */}
      {size !== 'sm' && (
        <div
          className="absolute inset-0 rounded-full border border-dashed border-cyan-400/25 pointer-events-none"
          style={{ animation: 'spin 25s linear infinite reverse' }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* 3D CHARACTER BODY — uses CSS perspective + rotateY/X for depth */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          perspective: '800px',
          perspectiveOrigin: '50% 30%',
          transform: `rotateX(${bodyTiltX}deg) rotateY(${bodyTiltY}deg)`,
          transition: 'transform 0.05s linear',
          animation: 'character-breathe 4.5s ease-in-out infinite',
        }}
      >
        <svg
          viewBox="0 0 180 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: sizePx * 0.9, height: sizePx * 0.9 * 1.3 }}
          className="drop-shadow-2xl"
        >
          <defs>
            <radialGradient id="v3-skin" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#d4924e" />
              <stop offset="60%" stopColor="#b87a38" />
              <stop offset="100%" stopColor="#8a5a22" />
            </radialGradient>

            <linearGradient id="v3-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            <linearGradient id="v3-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <linearGradient id="v3-cyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <filter id="v3-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Face shadow for 3D depth illusion */}
            <radialGradient id="v3-face-shadow" cx="30%" cy="50%" r="70%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
            </radialGradient>
          </defs>

          {/* ── BODY / CYBER-SHERWANI ARMOR ─────────────────────────── */}
          <path d="M45 152 L30 240 L150 240 L135 152 L115 140 L90 150 L65 140 Z"
            fill="url(#v3-suit)" stroke="#4338ca" strokeWidth="1.5" />

          {/* Shoulder pad L */}
          <path d="M42 155 L25 195 L42 210 L58 162 Z"
            fill="#1e1b4b" stroke="url(#v3-gold)" strokeWidth="1" />
          {/* Shoulder pad R */}
          <path d="M138 155 L155 195 L138 210 L122 162 Z"
            fill="#1e1b4b" stroke="url(#v3-gold)" strokeWidth="1" />

          {/* Cyber Chest Core — neo-mandala energy disc */}
          <g transform="translate(90,185)">
            <circle r="18" fill="#030712" stroke="url(#v3-cyan)" strokeWidth="2" />
            <circle r="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
            {/* Mandala cross */}
            <path d="M-7 0 L7 0 M0 -7 L0 7 M-5 -5 L5 5 M-5 5 L5 -5"
              stroke="#38bdf8" strokeWidth="1.2" />
            <circle r="4" fill="#38bdf8" filter="url(#v3-glow)" className="animate-pulse" />
          </g>

          {/* Circuit inlays on torso */}
          <path d="M80 152 L80 220" stroke="url(#v3-gold)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
          <path d="M100 152 L100 220" stroke="url(#v3-gold)" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

          {/* Mandarin cyber collar */}
          <path d="M68 132 L65 148 L90 158 L115 148 L112 132 L90 140 Z"
            fill="#111827" stroke="url(#v3-gold)" strokeWidth="1.5" />

          {/* Neck */}
          <rect x="81" y="118" width="18" height="22" rx="4" fill="url(#v3-skin)" />
          {/* Neck accent wire */}
          <path d="M83 126 Q90 132 97 126" stroke="#06b6d4" strokeWidth="1" opacity="0.7" />

          {/* ── HEAD — rotates with mouse via parent transform ──────── */}
          <g style={{
            transform: `rotateX(${headRotX}deg) rotateY(${headRotY}deg)`,
            transformOrigin: '90px 90px',
            transition: 'transform 0.05s linear',
          }}>

            {/* Head base — strong cinematic jaw */}
            <path d="M58 72 C58 40 122 40 122 72 C122 105 108 125 90 132 C72 125 58 105 58 72 Z"
              fill="url(#v3-skin)" />

            {/* 3D face shadow for depth */}
            <path d="M58 72 C58 40 122 40 122 72 C122 105 108 125 90 132 C72 125 58 105 58 72 Z"
              fill="url(#v3-face-shadow)" />

            {/* Ears */}
            <path d="M55 73 C51 68 51 88 57 92 Z" fill="#b87a38" />
            <path d="M125 73 C129 68 129 88 123 92 Z" fill="#b87a38" />

            {/* Cyber earpiece R */}
            <circle cx="126" cy="88" r="2.5" fill="#f59e0b" filter="url(#v3-glow)" />
            <line x1="126" y1="88" x2="130" y2="82" stroke="#f59e0b" strokeWidth="0.8" />

            {/* Hair — modern fade + styled top */}
            <path d="M54 68 C54 30 72 18 90 17 C108 18 126 30 126 68 C122 48 108 32 90 32 C72 32 58 48 54 68 Z"
              fill="#18181b" />
            {/* Front strands */}
            <path d="M78 22 C84 33 96 33 102 22 C96 16 84 16 78 22 Z" fill="#27272a" />

            {/* Neo-Vedic Cyber Tilak (forehead) */}
            <g transform="translate(90,50)">
              <line x1="0" y1="-8" x2="0" y2="4" stroke="url(#v3-gold)" strokeWidth="1.8" strokeLinecap="round" filter="url(#v3-glow)" />
              <circle cx="0" cy="0" r="2" fill="#f59e0b" filter="url(#v3-glow)" />
              <circle cx="0" cy="6" r="1.2" fill="#38bdf8" />
            </g>

            {/* Beard / Stubble */}
            <path d="M68 102 C68 122 78 132 90 134 C102 132 112 122 112 102 C108 112 100 120 90 120 C80 120 72 112 68 102 Z"
              fill="#1c1917" opacity="0.8" />

            {/* ── EYEBROWS ──────────────────────────────────────────── */}
            <g style={{ transform: `translateY(${ebShift}px)`, transition: 'transform 0.4s ease' }}>
              <path d="M66 72 Q74 67 80 71" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M100 71 Q106 67 114 72" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>

            {/* ── LEFT EYE (natural) ────────────────────────────────── */}
            <ellipse cx="74" cy="80" rx="7" ry={blink ? 0.8 : 5} fill="white" />
            {!blink && <>
              <circle cx="75" cy="80" r="3.5" fill="#3b2d18" />
              <circle cx="76" cy="79" r="1.3" fill="white" />
              {/* subtle iris glint */}
              <circle cx="74" cy="80" r="3.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            </>}

            {/* ── RIGHT EYE (augmented AI optical sensor) ──────────── */}
            <ellipse cx="106" cy="80" rx="7" ry={blink ? 0.8 : 5} fill="white" />
            {!blink && <>
              <circle cx="105" cy="80" r="3.5" fill="#0284c7" />
              <circle cx="106" cy="80" r="2" fill="#38bdf8" filter="url(#v3-glow)" />
              {/* HUD ring */}
              <circle cx="106" cy="80" r="5.5" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="2 1" fill="none" className="animate-spin" style={{ animationDuration: '6s' }} />
            </>}

            {/* Nose */}
            <path d="M90 78 L87 96 L93 96" stroke="#8a5a22" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* ── MOUTH — changes per mood ──────────────────────────── */}
            {isSpeaking
              ? <ellipse cx="90" cy="112" rx="6" ry="4.5" fill="#5c2626" className="animate-pulse" />
              : <path d={mouthPath[mood]} stroke="#5c2626" strokeWidth="2" strokeLinecap="round" fill="none" />
            }

            {/* ── SPEAKING SOUND WAVE bars under mouth ─────────────── */}
            {isSpeaking && (
              <g transform="translate(90, 121)">
                {[-6, -3, 0, 3, 6].map((xOff, i) => (
                  <rect key={i}
                    x={xOff - 1} y="-3" width="2"
                    height={4 + Math.sin(i) * 2}
                    fill="#38bdf8" rx="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </g>
            )}
          </g>

          {/* ── HUD Text Elements ─────────────────────────────────── */}
          <text x="20" y="20" fill="#38bdf8" fontSize="5.5" fontFamily="monospace" opacity="0.7">
            SYNC: 99.8%
          </text>
          <path d="M18 22 L48 22" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.5" />

          <text x="110" y="20" fill="#f59e0b" fontSize="5.5" fontFamily="monospace" opacity="0.7">
            VEER // ARCHITECT
          </text>
          <path d="M108 22 L162 22" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.5" />

          {/* ── Mood glow ring at base ────────────────────────────── */}
          <ellipse cx="90" cy="238" rx="52" ry="5" fill={auraColor} opacity="0.4" />
        </svg>
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes character-breathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-6px) scale(1.01); }
        }
      `}</style>
    </div>
  );
};
