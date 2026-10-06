/**
 * DoorIntro — Cinematic Gateway to AI Builder League.
 * 
 * Features:
 * - Natural warm cream & sandstone colors (No neon, no dark void).
 * - Sound button cleanly integrated into top bar (NO overlap with header text).
 * - Veer stands NEAR the door on the stone floor, completely clear of the prompt bar.
 * - DIRECT PROMPTING ONLY (No test choice buttons, as requested).
 * - Veer expresses clear emotions (puzzled/confused on invalid prompt, beaming smile on valid prompt).
 * - When door unlocks:
 *   1. Veer walks into the center of the doorway.
 *   2. Door swings open revealing warm golden light.
 *   3. Entire door scene scales up towards screen and slowly disappears into the content page.
 */
import React, { useState, useEffect, useRef } from 'react';
import { VeerCharacter } from './VeerCharacter';
import { CharacterMood } from '../types';
import { sounds } from '../utils/soundEffects';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight, Volume2, VolumeX, KeyRound, Lightbulb } from 'lucide-react';

interface DoorIntroProps {
  onEnterLeague: () => void;
}

type IntroPhase =
  | 'char-enters'       // Veer walks in from right to beside the door
  | 'greeting-hey'      // "Hey…"
  | 'greeting-fyear'    // "Final year?"
  | 'greeting-choice'   // "I want to show you something" + YES / JUST LOOKING
  | 'just-looking'      // Veer's witty reply
  | 'door-challenge'    // Direct prompt input, Veer standing beside door
  | 'door-opening'      // Veer walks toward door as it swings open
  | 'transition';       // Entire door scales up towards screen and fades out

export const DoorIntro: React.FC<DoorIntroProps> = ({ onEnterLeague }) => {
  const [phase, setPhase] = useState<IntroPhase>('char-enters');
  const [mood, setMood] = useState<CharacterMood>('curious');
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'error' | 'success' | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);
  const [portalBright, setPortalBright] = useState(false);
  
  // Veer's X position relative to door center:
  // Starts offscreen right (340px), walks to beside door (+180px), on unlock walks into doorway (0px)
  const [veerOffset, setVeerOffset] = useState(340);
  const [isWalking, setIsWalking] = useState(true);
  const [speechText, setSpeechText] = useState('Hey there...');
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Scripted Entrance Sequence ─────────────────────────────────────── */
  useEffect(() => {
    // 1. Veer walks from offscreen to standing beside the door (+180px)
    const t0 = setTimeout(() => {
      setVeerOffset(180);
      setIsWalking(true);
      sounds.playChirp(900);
    }, 200);

    // 2. Veer stops walking and arrives beside door
    const t1 = setTimeout(() => {
      setIsWalking(false);
      setPhase('greeting-hey');
      setSpeechText('"Hey..."');
      sounds.playChirp(1050);
    }, 1800);

    // 3. Question
    const t2 = setTimeout(() => {
      setPhase('greeting-fyear');
      setMood('curious');
      setSpeechText('"Final year student, right?"');
      sounds.playChirp(1150);
    }, 3600);

    // 4. Choice prompt
    const t3 = setTimeout(() => {
      setPhase('greeting-choice');
      setMood('proud');
      setSpeechText('"I want to show you something behind this door."');
      sounds.playChirp(1250);
    }, 5600);

    return () => { [t0, t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const toggleSound = () => setSoundOn(sounds.toggleMute());

  const goDoorChallenge = () => {
    sounds.playClick();
    setMood('curious');
    setPhase('door-challenge');
    setSpeechText('"Instruct the AI to open this door. Write your prompt below!"');
    setTimeout(() => inputRef.current?.focus(), 400);
  };

  const goJustLooking = () => {
    sounds.playClick();
    setMood('playful');
    setPhase('just-looking');
    setSpeechText('"Just looking? Looking won\'t build real projects! Come on."');
  };

  /* ── Trigger Door Open & Walk-in Transition ────────────────────────── */
  const triggerDoorUnlock = (customSuccessMsg?: string) => {
    sounds.playSuccess();
    setMood('celebratory'); // Big smile, cheerful hands!
    setFeedbackType('success');
    setFeedback(customSuccessMsg || "✨ Perfect prompt! The door is unlocking!");
    setSpeechText('"Shabash! That worked! Watch the door open—follow me!"');

    // 1. Veer starts walking towards the door center
    setTimeout(() => {
      setIsWalking(true);
      setVeerOffset(0); // walk directly into center of doorway
      sounds.playKnockKnock();
    }, 600);

    // 2. Door swings open as Veer reaches it
    setTimeout(() => {
      setPhase('door-opening');
      setDoorOpen(true);
      sounds.playDoorOpening();
    }, 1800);

    // 3. Portal light radiates
    setTimeout(() => {
      setIsWalking(false);
      setPortalBright(true);
      setSpeechText('"Welcome to the AI Builder League!"');
    }, 2800);

    // 4. Cinematic scale towards screen and fade out
    setTimeout(() => {
      setPhase('transition');
      sounds.playPortalTravel();
    }, 3800);

    // 5. Complete transition into the content page
    setTimeout(() => {
      onEnterLeague();
    }, 5500);
  };

  /* ── Direct Prompt Submission & Emotion Feedback ───────────────────── */
  const handleDirectPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || phase === 'door-opening' || phase === 'transition') return;

    sounds.playClick();
    const lower = prompt.toLowerCase().trim();
    const words = lower.split(/\s+/).filter(w => w.length > 1);

    const hasOpen = /\b(open|unlock|reveal|unseal|slide|swing|push|expand|split|breach)\b/.test(lower);
    const hasDoor = /\b(door|gate|portal|gateway|vault|entrance|hatch|barrier)\b/.test(lower);
    const hasDest = /\b(league|builder|ai|arena|challenge|inside|beyond|world|future|realm|show)\b/.test(lower);
    const longEnough = words.length >= 4;

    if (hasOpen && hasDoor && hasDest && longEnough) {
      triggerDoorUnlock("✓ Intent verified! Valid prompt received.");
    } else {
      sounds.playError();
      setMood('confused'); // Head tilt, wavy mouth, hand scratching head!
      setFeedbackType('error');

      if (!hasOpen) {
        setFeedback("Missing action! Tell the door to OPEN or UNLOCK.");
        setSpeechText('"Arre dost! Tell the AI what action to perform on the door!"');
      } else if (!hasDoor) {
        setFeedback("Missing target! Say the word 'door', 'portal', or 'gate'.");
        setSpeechText('"Open... what? Say the word door or gateway!"');
      } else if (!hasDest) {
        setFeedback("Missing destination! Mention 'the league', 'AI', or 'inside'.");
        setSpeechText('"Where does it lead? Mention what\'s inside the door!"');
      } else {
        setFeedback("Too short! Write a complete sentence (at least 4 words).");
        setSpeechText('"Write a complete instruction sentence with action, door, and destination!"');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none bg-[#F7F2E8]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ─── Dynamic Keyframe Styles ─────────────────────────────────── */}
      <style>{`
        @keyframes scene-zoom-transition {
          0% {
            transform: scale(1);
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            transform: scale(4.5);
            opacity: 0.9;
            filter: brightness(1.25);
          }
          100% {
            transform: scale(14);
            opacity: 0;
            filter: brightness(1.6);
          }
        }

        @keyframes door-light-radiate {
          0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.6)); }
          50% { opacity: 1; filter: drop-shadow(0 0 45px rgba(245, 158, 11, 0.9)); }
        }

        @keyframes speech-fade-in {
          0% { transform: scale(0.9) translateY(6px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TOP HEADER CORNICE (Sound button cleanly integrated, NO OVERLAP) */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50"
        style={{
          background: '#C7B18E',
          borderBottom: '3px solid #AB9571',
          boxShadow: '0 4px 14px rgba(70, 50, 30, 0.12)',
        }}
      >
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#4A321B]">
            GATEWAY // AI BUILDER LEAGUE
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline font-mono text-xs tracking-wider text-[#694A2D]">
            500 ENGINEERS • 7 DAYS • 3 CHALLENGES
          </span>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 bg-[#FFFDF9] hover:bg-[#FAF6EE] border border-[#AB9571] text-[#4A321B] px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-xs cursor-pointer transition-colors"
          >
            {soundOn ? <Volume2 size={15} className="text-emerald-700" /> : <VolumeX size={15} className="text-rose-700" />}
            <span>{soundOn ? 'SOUND ON' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ZOOMABLE SCENE CONTAINER (Scales toward screen when door opens)     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 origin-[50%_48%]"
        style={{
          animation: phase === 'transition' ? 'scene-zoom-transition 2s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
        }}
      >
        {/* 1. Warm Peaceful Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #FAF6EE 0%, #EFE5D3 45%, #DFD1B8 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(255, 230, 160, 0.5) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* 2. Full Sandstone Wall Structure */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '64px', height: '52vh' }}
        >
          {/* Left Wall Panel */}
          <div
            className="absolute left-0"
            style={{
              top: 0,
              bottom: 0,
              right: 'calc(50% + 120px)',
              background: '#D4C3A3',
              backgroundImage: `
                repeating-linear-gradient(transparent, transparent 38px, rgba(140, 115, 80, 0.18) 40px),
                repeating-linear-gradient(90deg, transparent, transparent 68px, rgba(140, 115, 80, 0.12) 70px)
              `,
              boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.06)',
            }}
          />

          {/* Right Wall Panel */}
          <div
            className="absolute right-0"
            style={{
              top: 0,
              bottom: 0,
              left: 'calc(50% + 120px)',
              background: '#D4C3A3',
              backgroundImage: `
                repeating-linear-gradient(transparent, transparent 38px, rgba(140, 115, 80, 0.18) 40px),
                repeating-linear-gradient(90deg, transparent, transparent 68px, rgba(140, 115, 80, 0.12) 70px)
              `,
              boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)',
            }}
          />

          {/* ── CENTER ARCH & WOODEN DOOR ────────────────────────────── */}
          <div
            className="absolute"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: 240,
              top: 0,
              bottom: 0,
            }}
          >
            {/* Stone Arch Top Header */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: -16,
                right: -16,
                height: '42%',
                background: '#C2AC87',
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                zIndex: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              {/* Arch Inset Ring */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  right: 8,
                  bottom: 0,
                  background: '#D4C3A3',
                  borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                  border: '3px solid #AB9571',
                  borderBottom: 'none',
                }}
              />
              {/* Keystone Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 34,
                  background: '#B89F77',
                  border: '2px solid #947B55',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                }}
              >
                <KeyRound size={16} className="text-[#4A321B]" />
              </div>
            </div>

            {/* Portal Light Inside (Revealed when door opens) */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                background: (doorOpen || phase === 'door-opening' || phase === 'transition')
                  ? 'radial-gradient(ellipse at center, #FFF6D6 0%, #FFDF85 45%, #E5A93C 100%)'
                  : '#241408',
                overflow: 'hidden',
                animation: portalBright ? 'door-light-radiate 1.5s ease-in-out infinite' : 'none',
              }}
            >
              {(doorOpen || phase === 'door-opening' || phase === 'transition') && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-heading font-black text-xl text-[#4A2800] tracking-wider">
                    AI BUILDER LEAGUE
                  </span>
                  <span className="font-mono text-xs text-[#7A4B12] mt-1 font-bold">
                    WELCOME INSIDE
                  </span>
                </div>
              )}
            </div>

            {/* Side Frame Pillars */}
            <div style={{ position: 'absolute', top: '20%', left: -14, bottom: 0, width: 14, background: '#AB9571', zIndex: 4 }} />
            <div style={{ position: 'absolute', top: '20%', right: -14, bottom: 0, width: 14, background: '#AB9571', zIndex: 4 }} />

            {/* ── THE WOODEN DOOR (Swings open) ──────────────────────── */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                transformOrigin: '2% 50%',
                transform: doorOpen ? 'perspective(900px) rotateY(-84deg)' : 'perspective(900px) rotateY(0deg)',
                transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)',
                background: 'linear-gradient(170deg, #966133 0%, #7B4B22 45%, #633A18 100%)',
                borderLeft: '4px solid #4D2B10',
                borderRight: '4px solid #4D2B10',
                boxShadow: doorOpen ? 'none' : '-6px 0 25px rgba(0,0,0,0.3)',
              }}
            >
              {/* Wood Panels */}
              <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: '38%', border: '3px solid #4D2B10', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }} />
              <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, height: '38%', border: '3px solid #4D2B10', borderRadius: 4, background: 'rgba(0,0,0,0.06)' }} />
              
              {/* Brass Door Handle */}
              <div
                style={{
                  position: 'absolute',
                  right: 18,
                  top: '52%',
                  transform: 'translateY(-50%)',
                  width: 18,
                  height: 34,
                  background: 'linear-gradient(135deg, #F0D060, #C9A44C, #967028)',
                  borderRadius: 8,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                }}
              />

              {/* Plaque */}
              <div
                style={{
                  position: 'absolute',
                  top: '46%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#C9A44C',
                  padding: '2px 8px',
                  borderRadius: 3,
                  fontSize: 10,
                  fontFamily: 'monospace',
                  color: '#3B210B',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                }}
              >
                LEAGUE-2026
              </div>
            </div>
          </div>
        </div>

        {/* 3. Stone Ground / Courtyard Floor */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: 'calc(64px + 52vh)',
            bottom: 0,
            background: 'linear-gradient(180deg, #C2AE88 0%, #AF9970 45%, #9E885F 100%)',
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(120, 95, 60, 0.12) 80px),
              repeating-linear-gradient(transparent, transparent 39px, rgba(120, 95, 60, 0.15) 40px)
            `,
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: '#A38E68', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 4. VEER CHARACTER — Standing PROPERLY NEAR the door, on floor */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute"
          style={{
            left: `calc(50% + ${veerOffset}px)`,
            top: 'calc(64px + 52vh - 128px)', // Firmly standing on the courtyard floor line!
            transform: 'translateX(-50%)',
            transition: 'left 1.4s cubic-bezier(0.25, 1, 0.5, 1)',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Veer's Speech Bubble (Always clearly above his head, zero overlap) */}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              marginBottom: 12,
              background: '#FFFDF9',
              border: '2px solid #D4A855',
              borderRadius: 16,
              padding: '10px 18px',
              maxWidth: 320,
              minWidth: 200,
              textAlign: 'center',
              boxShadow: '0 6px 24px rgba(90, 60, 20, 0.12)',
              animation: 'speech-fade-in 0.3s ease-out',
              zIndex: 30,
            }}
          >
            <p className="text-xs sm:text-sm font-semibold text-[#432810] leading-snug">
              {speechText}
            </p>
            {/* Bubble Tail */}
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #FFFDF9',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderTop: '10px solid #D4A855',
                zIndex: -1,
              }}
            />
          </div>

          {/* Cute Chibi Veer (Full body: head, body, arms, legs) */}
          <VeerCharacter
            mood={mood}
            isWalking={isWalking}
            isSpeaking={phase.startsWith('greeting') || phase === 'door-challenge'}
            size={135}
          />

          {/* Name Tag Badge */}
          <div
            style={{
              marginTop: -4,
              background: '#E5A93C',
              color: '#3B210B',
              fontFamily: 'monospace',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.12em',
              padding: '2px 10px',
              borderRadius: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            VEER (AI GUIDE)
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 5. INTERACTIVE DIRECT PROMPT UI (Sleek, bottom-aligned, NO overlap) */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-6 left-0 right-0 flex flex-col items-center px-4"
        style={{ zIndex: 40 }}
      >
        {/* ── Greeting Buttons ── */}
        {phase === 'greeting-choice' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={goDoorChallenge}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_6px_20px_rgba(217,119,6,0.35)] cursor-pointer flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            >
              <span>SHOW ME THE LEAGUE</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={goJustLooking}
              className="px-6 py-3.5 rounded-2xl bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] text-[#694A2D] font-mono text-xs border border-[#D4C3A3] shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              JUST LOOKING AROUND
            </button>
          </div>
        )}

        {/* ── Just Looking Response ── */}
        {phase === 'just-looking' && (
          <div className="bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-4 max-w-md text-center shadow-xl">
            <p className="text-xs sm:text-sm font-semibold text-[#432810] mb-3">
              "Looking won't get you hired or help you build anything. 500 engineers are stepping up right now."
            </p>
            <button
              onClick={goDoorChallenge}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-heading font-bold text-xs uppercase cursor-pointer"
            >
              ALRIGHT, LET'S SEE THE DOOR
            </button>
          </div>
        )}

        {/* ── DIRECT PROMPT BAR (Clean, Sleek, Direct Prompting Only) ── */}
        {phase === 'door-challenge' && (
          <div className="w-full max-w-xl flex flex-col space-y-2">
            
            {/* Feedback message banner if present */}
            {feedback && (
              <div
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-sm ${
                  feedbackType === 'success'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {feedbackType === 'success' ? (
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-rose-700 shrink-0" />
                )}
                <span>{feedback}</span>
              </div>
            )}

            {/* Direct Prompt Form */}
            <form onSubmit={handleDirectPromptSubmit}>
              <div className="flex items-center space-x-2 bg-[#FFFDF9] border-2 border-[#D4A855] rounded-2xl p-2 shadow-[0_8px_30px_rgba(90,60,20,0.14)] focus-within:border-amber-600 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Tell the AI what to do (e.g. Open the wooden door and reveal the AI Builder League)..."
                  className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-mono text-[#3B210B] outline-none placeholder-[#9E8268]"
                />
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-heading font-black text-xs uppercase tracking-wider cursor-pointer flex items-center space-x-1.5 transition-all shadow-md shrink-0"
                >
                  <span>UNLOCK DOOR</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>

            {/* Helpful Quick Autofill Hint */}
            <div className="flex items-center justify-between px-2 text-[11px] font-mono text-[#7A5B3D]">
              <span className="flex items-center space-x-1">
                <Lightbulb size={12} className="text-amber-700" />
                <span>Tip: Specify the action, the door, and the league!</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setPrompt('Open the wooden door and reveal the AI Builder League inside');
                  setTimeout(() => inputRef.current?.focus(), 100);
                }}
                className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
              >
                Use sample prompt
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
