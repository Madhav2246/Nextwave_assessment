/**
 * VeerCharacter — Full-body cute chibi Indian AI guide.
 * Natural warm colors. Big head, arms with hands, legs with feet.
 * Responsive facial expressions (beaming smile, puzzled/confused, thinking, cheering).
 * Pure natural warm palette: saffron kurta, deep blue trousers, brass accents.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { CharacterMood } from '../types';
import { sounds } from '../utils/soundEffects';

interface VeerCharacterProps {
  mood?: CharacterMood;
  isSpeaking?: boolean;
  isWalking?: boolean;
  /** Height in px, width auto-proportional (viewBox 100x185) */
  size?: number;
  onCharacterClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const VeerCharacter: React.FC<VeerCharacterProps> = ({
  mood = 'curious',
  isSpeaking = false,
  isWalking = false,
  size = 130,
  onCharacterClick,
  className = '',
  style = {},
}) => {
  const [blink, setBlink] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);

  /* Natural random blinking */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        scheduleBlink();
      }, 2600 + Math.random() * 2400);
    };
    scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playChirp(1200 + Math.random() * 200);
    const n = clickCount + 1;
    setClickCount(n);
    onCharacterClick?.();
    const lines = [
      '😄 "Arre dost! Ready to build real AI apps?"',
      '✨ "Final year is all about shipping live code!"',
      '🧠 "Prompt engineering is a real superpower."',
      '🚪 "Step through the doorway into the League!"',
      '🎯 "500 engineers. 7 days. Let\'s conquer it!"',
    ];
    setBubble(lines[n % lines.length]);
    setTimeout(() => setBubble(null), 3000);
  }, [clickCount, onCharacterClick]);

  /* Mouth path by mood */
  const mouthPaths: Record<CharacterMood, string> = {
    curious:     'M 42 38 Q 50 43 58 38',
    thinking:    'M 43 39 Q 50 36 57 38',
    excited:     'M 38 35 Q 50 48 62 35 Z', // wide open smile
    proud:       'M 40 37 Q 50 45 60 37',
    confused:    'M 41 41 Q 46 36 52 40 Q 57 44 61 39', // wavy puzzled mouth
    celebratory: 'M 36 34 Q 50 50 64 34 Z', // huge joyful beaming smile
    playful:     'M 40 37 Q 50 45 60 37',
    intense:     'M 42 38 Q 50 41 58 38',
  };

  /* Eyebrows adjustments */
  const eyebrowLeft = mood === 'confused' ? 4 : (mood === 'excited' || mood === 'celebratory' ? -4 : (mood === 'thinking' ? 1 : -2));
  const eyebrowRight = mood === 'confused' ? -4 : (mood === 'excited' || mood === 'celebratory' ? -4 : (mood === 'thinking' ? -3 : -2));

  const svgW = 100;
  const svgH = 185;
  const renderW = size * (svgW / svgH);
  const walkDur = isWalking ? '0.55s' : '3.6s';

  const isHappy = mood === 'excited' || mood === 'celebratory' || mood === 'proud';

  return (
    <div
      className={`relative inline-block select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{ width: renderW, height: size, ...style }}
      onClick={handleClick}
      title="Veer — Your AI Builder Companion"
    >
      {/* Speech bubble */}
      {bubble && (
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap text-xs font-sans px-3.5 py-2 rounded-2xl border shadow-xl pointer-events-none"
          style={{ background: '#FFFDF9', borderColor: '#D4A855', color: '#432810', fontSize: 12, fontWeight: 600 }}
        >
          {bubble}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2"
            style={{ background: '#FFFDF9', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>
      )}

      <style>{`
        @keyframes veer-walk-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${isWalking ? 6 : 3}px); }
        }
        @keyframes veer-cheer-arm {
          0%, 100% { transform: rotate(-35deg); }
          50% { transform: rotate(-55deg); }
        }
        @keyframes veer-confused-tilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width={renderW}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* Whole body bobs */}
        <g style={{
          animationName: 'veer-walk-bob',
          animationDuration: walkDur,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          transformOrigin: '50px 185px'
        }}>

          {/* ════ FEET / SHOES ════ */}
          <g style={{
            transform: isWalking ? 'rotate(14deg)' : 'rotate(0deg)',
            transformOrigin: '37px 152px',
            transition: 'transform 0.25s ease'
          }}>
            <rect x="25" y="152" width="24" height="14" rx="7" fill="#3E2108" />
            <ellipse cx="32" cy="155" rx="4" ry="2" fill="rgba(255,255,255,0.18)" />
          </g>

          <g style={{
            transform: isWalking ? 'rotate(-14deg)' : 'rotate(0deg)',
            transformOrigin: '63px 152px',
            transition: 'transform 0.25s ease'
          }}>
            <rect x="51" y="152" width="24" height="14" rx="7" fill="#3E2108" />
            <ellipse cx="58" cy="155" rx="4" ry="2" fill="rgba(255,255,255,0.18)" />
          </g>

          {/* ════ LEGS (Trousers) ════ */}
          <g style={{
            transform: isWalking ? 'rotate(12deg)' : 'rotate(0deg)',
            transformOrigin: '37px 115px',
            transition: 'transform 0.25s ease'
          }}>
            <rect x="29" y="110" width="16" height="47" rx="8" fill="#3B4580" />
            <line x1="37" y1="115" x2="37" y2="150" stroke="#2B3468" strokeWidth="0.8" />
          </g>

          <g style={{
            transform: isWalking ? 'rotate(-12deg)' : 'rotate(0deg)',
            transformOrigin: '63px 115px',
            transition: 'transform 0.25s ease'
          }}>
            <rect x="55" y="110" width="16" height="47" rx="8" fill="#3B4580" />
            <line x1="63" y1="115" x2="63" y2="150" stroke="#2B3468" strokeWidth="0.8" />
          </g>

          {/* ════ BODY / KURTA ════ */}
          {/* Main saffron kurta */}
          <path
            d="M 24 65 C 18 75 18 110 22 115 L 78 115 C 82 110 82 75 76 65 Z"
            fill="#E88235"
          />
          {/* Kurta depth shading */}
          <path
            d="M 60 65 C 68 72 74 95 76 115 L 78 115 C 82 110 82 75 76 65 Z"
            fill="rgba(0,0,0,0.08)"
          />
          {/* Collar */}
          <path
            d="M 40 65 L 44 78 L 50 73 L 56 78 L 60 65"
            fill="#F7F1DE"
            stroke="#D4C8A0"
            strokeWidth="0.5"
          />
          {/* Kurta buttons */}
          <circle cx="50" cy="83" r="2.2" fill="#B86E20" />
          <circle cx="50" cy="93" r="2.2" fill="#B86E20" />
          <circle cx="50" cy="103" r="2.2" fill="#B86E20" />
          {/* Mandala accent */}
          <circle cx="50" cy="83" r="7" stroke="#D4A855" strokeWidth="0.8" fill="none" opacity="0.6" />

          {/* ════ ARMS + HANDS ════ */}
          {/* Left arm */}
          <g style={{
            transform: isHappy
              ? 'rotate(-30deg)'
              : (isWalking ? 'rotate(16deg)' : 'rotate(0deg)'),
            transformOrigin: '26px 70px',
            transition: 'transform 0.3s ease'
          }}>
            <path d="M 26 70 Q 14 85 10 100" stroke="#D4924E" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 10 100 Q 7 112 8 118" stroke="#D4924E" strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="9" cy="121" r="7" fill="#D4924E" />
            <ellipse cx="12" cy="103" rx="6" ry="3" fill="#D4823A" opacity="0.6" />
          </g>

          {/* Right arm (waving / gesturing if happy or cheering) */}
          <g style={{
            transform: isHappy
              ? 'rotate(35deg)'
              : (mood === 'thinking' ? 'rotate(-25deg)' : (isWalking ? 'rotate(-16deg)' : 'rotate(0deg)')),
            transformOrigin: '74px 70px',
            transition: 'transform 0.3s ease'
          }}>
            <path d="M 74 70 Q 86 85 90 100" stroke="#D4924E" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path d="M 90 100 Q 93 112 92 118" stroke="#D4924E" strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="91" cy="121" r="7" fill="#D4924E" />
            <ellipse cx="88" cy="103" rx="6" ry="3" fill="#D4823A" opacity="0.6" />
          </g>

          {/* ════ NECK ════ */}
          <rect x="44" y="55" width="12" height="12" rx="5" fill="#C4803C" />

          {/* ════ HEAD GROUP (can tilt if confused) ════ */}
          <g style={{
            transform: mood === 'confused' ? 'rotate(5deg)' : 'rotate(0deg)',
            transformOrigin: '50px 30px',
            transition: 'transform 0.3s ease'
          }}>
            {/* Ears */}
            <circle cx="24" cy="30" r="5" fill="#C4803C" />
            <circle cx="24" cy="30" r="2.5" fill="#B87030" />
            <circle cx="76" cy="30" r="5" fill="#C4803C" />
            <circle cx="76" cy="30" r="2.5" fill="#B87030" />

            {/* Cute big round head */}
            <circle cx="50" cy="28" r="30" fill="#D4924E" />

            {/* Rosy cute cheeks if happy/smiling */}
            {isHappy && (
              <>
                <ellipse cx="34" cy="34" rx="4.5" ry="3" fill="#E87652" opacity="0.45" />
                <ellipse cx="66" cy="34" rx="4.5" ry="3" fill="#E87652" opacity="0.45" />
              </>
            )}

            {/* Head depth shading */}
            <path
              d="M 50 28 m 0 -30 a 30 30 0 0 1 30 30 a 30 30 0 0 1 -9 21 a 25 25 0 0 0 0 -39 a 25 25 0 0 0 -21 -12 Z"
              fill="rgba(0,0,0,0.06)"
            />

            {/* Hair */}
            <path
              d="M 20 22 C 20 -2 80 -2 80 22 C 76 10 70 3 50 2 C 30 3 24 10 20 22 Z"
              fill="#1A0D05"
            />
            <path d="M 20 22 C 18 28 19 34 22 38" stroke="#1A0D05" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 80 22 C 82 28 81 34 78 38" stroke="#1A0D05" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 32 8 Q 40 4 50 3 Q 60 4 68 8" stroke="#2D1A08" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Forehead gold bindi / tilak dot */}
            <circle cx="50" cy="14" r="2.2" fill="#D4A855" />

            {/* Eyebrows */}
            <g style={{ transform: `translateY(${eyebrowLeft}px)`, transition: 'transform 0.3s ease' }}>
              <path d="M 34 20 Q 40 17 45 20" stroke="#1A0D05" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>
            <g style={{ transform: `translateY(${eyebrowRight}px)`, transition: 'transform 0.3s ease' }}>
              <path d="M 55 20 Q 60 17 66 20" stroke="#1A0D05" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </g>

            {/* Left Eye */}
            <ellipse cx="40" cy="27" rx="6.5" ry={blink ? 0.8 : 5} fill="white" />
            {!blink && (
              <>
                <circle cx="41" cy="27" r="3.5" fill="#1A0D05" />
                <circle cx="42" cy="25.5" r="1.3" fill="white" />
                {isHappy && (
                  <circle cx="39" cy="28.5" r="0.9" fill="white" />
                )}
              </>
            )}

            {/* Right Eye */}
            <ellipse cx="60" cy="27" rx="6.5" ry={blink ? 0.8 : 5} fill="white" />
            {!blink && (
              <>
                <circle cx="59" cy="27" r="3.5" fill="#1A0D05" />
                <circle cx="60" cy="25.5" r="1.3" fill="white" />
                {isHappy && (
                  <circle cx="61" cy="28.5" r="0.9" fill="white" />
                )}
              </>
            )}

            {/* Nose */}
            <path d="M 50 30 L 47 36 L 53 36" stroke="#B87030" strokeWidth="1.2" fill="none" strokeLinejoin="round" />

            {/* Mouth */}
            {isSpeaking ? (
              <ellipse cx="50" cy="40" rx="5" ry="3.5" fill="#7A3010" className="animate-pulse" />
            ) : isHappy ? (
              // Big smiling open mouth with teeth
              <g>
                <path d={mouthPaths[mood]} fill="#7A2810" stroke="#5A1C0A" strokeWidth="1" />
                <path d="M 42 36 Q 50 39 58 36" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              <path d={mouthPaths[mood]} stroke="#7A3010" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            )}

            {/* Subtle beard stubble */}
            <path
              d="M 37 43 Q 50 51 63 43"
              stroke="#3D2010"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
          </g>

        </g>
      </svg>
    </div>
  );
};
