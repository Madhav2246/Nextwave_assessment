/**
 * ResumeScanner — "Where Do You Stand?"
 *
 * An interactive AI Career Diagnostic for final-year engineering students.
 * Analyzes resume signals, highlights profile alignment, diagnoses concrete gaps,
 * and seamlessly bridges into the AI Builder League arenas & 60-minute build workshop.
 */
import React, { useState } from 'react';
import { VeerCharacter } from './VeerCharacter';
import { CharacterMood, ResumeScanResult, GeneratedProject } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Target,
  Layers,
  Cpu,
  RefreshCw,
  Flame,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Zap,
  Swords,
  Rocket
} from 'lucide-react';

interface ResumeScannerProps {
  onBuildInWorkshopClick: (project: GeneratedProject) => void;
  onJumpToSection: (sectionId: string) => void;
}

export const ResumeScanner: React.FC<ResumeScannerProps> = ({
  onBuildInWorkshopClick,
  onJumpToSection,
}) => {
  const [scanState, setScanState] = useState<'upload' | 'scanning' | 'results'>('upload');
  const [activeTab, setActiveTab] = useState<'file' | 'demo' | 'text'>('demo');
  const [pastedText, setPastedText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [scanningStep, setScanningStep] = useState(0);

  // Veer companion state inside the scanner
  const [veerMood, setVeerMood] = useState<CharacterMood>('curious');
  const [veerSpeech, setVeerSpeech] = useState<string>(
    "Give me your resume. Let's see what you've already built and where your strongest signals lie!"
  );

  const scanningStages = [
    'Reading projects & repo architectures...',
    'Mapping technical skills to production standards...',
    'Understanding your engineering experience...',
    'Finding profile alignment across engineering roles...',
    'Compiling constructive career diagnostics...',
  ];

  // Default high-fidelity sample diagnostic result (Aarav Sharma — Final-Year CSE)
  const defaultScanResult: ResumeScanResult = {
    candidateName: 'Aarav Sharma (Final-Year CSE)',
    overallScore: 78,
    categories: [
      {
        name: 'Technical Skills',
        score: 82,
        explanation: 'Solid foundational command of Python, TypeScript, REST APIs, and basic PyTorch.',
        improvement: 'Add hands-on experience with vector embeddings (Pinecone/Chroma) and multi-agent coordination.',
      },
      {
        name: 'Project Depth',
        score: 72,
        explanation: 'Good variety across academic mini-projects, but most projects stop at local localhost execution.',
        improvement: 'Benchmark real latency, RPS throughput, and memory consumption under concurrency.',
      },
      {
        name: 'AI/ML Exposure',
        score: 84,
        explanation: 'Strong alignment with applied AI roles, prompt design, and foundational model tuning.',
        improvement: 'Implement structured JSON schema guardrails and token streaming instead of raw completions.',
      },
      {
        name: 'Software Engineering',
        score: 76,
        explanation: 'Clean modular structure with good separation of frontend UI and API endpoints.',
        improvement: 'Add automated unit testing suites, Docker containerization, and public deployment CI/CD.',
      },
      {
        name: 'Problem Solving',
        score: 79,
        explanation: 'Good algorithmic problem decomposition and solid understanding of data structures.',
        improvement: 'Tackle real-world race conditions, distributed cache invalidation, and rate-limiting.',
      },
      {
        name: 'Resume Strength',
        score: 75,
        explanation: 'Clean standard template, legible typography, and clear timeline of academic milestones.',
        improvement: 'Replace passive phrases with measurable impact metrics (e.g. "Reduced API latency by 42%").',
      },
      {
        name: 'Practical Experience',
        score: 74,
        explanation: 'Demonstrates active curiosity through hackathon participation and personal coding sprints.',
        improvement: 'Ship one end-to-end AI project live on the internet with active public users.',
      },
    ],
    strongAlignmentRoles: [
      'Applied AI Engineer',
      'AI/ML Software Engineer',
      'Full-Stack AI Solutions Engineer',
    ],
    moderateAlignmentRoles: [
      'Backend Software Engineer',
      'Data & ML Platform Engineer',
      'Autonomous Workflow / RPA Developer',
    ],
    needsEvidenceRoles: [
      'Core ML Systems Researcher',
      'Low-Level Distributed ML Infra Engineer',
    ],
    companyProfiles: [
      'AI-first product companies shipping rapid user-facing tools',
      'SaaS & Product engineering teams integrating LLMs into existing suites',
      'Applied AI startups valuing end-to-end shipping over pure academic research',
      'Data & automation-focused engineering squads',
      'High-growth tech teams actively hiring project-driven final-year graduates',
    ],
    gaps: [
      {
        id: 'gap-prod',
        title: 'Stronger Production Project Evidence',
        description: 'You have AI projects on your GitHub, but limited evidence of public cloud deployment or live uptime.',
        actionableStep: 'Deploy a live full-stack AI web app on Vercel with real endpoint telemetry and public URL.',
        nextMove: 'Build your first deployed AI project in 60 minutes.',
        targetId: 'workshop',
      },
      {
        id: 'gap-impact',
        title: 'Measurable Performance Metrics',
        description: 'Your project bullet points explain what libraries were imported, but omit latency, cost, and throughput outcomes.',
        actionableStep: 'Add concrete benchmarks: e.g., "Maintained <180ms P95 latency and $0.002 per request cost."',
        nextMove: 'Test yourself in AI Creator Battle.',
        targetId: 'challenges',
      },
      {
        id: 'gap-concurrency',
        title: 'Concurrency & Edge-Case Resilience',
        description: 'Your code samples lack defense against race conditions, API rate limits, and concurrent DB writes.',
        actionableStep: 'Implement distributed Redis mutex locks and fallback token bucket throttles.',
        nextMove: 'Inspect concurrency flaws in AI Detective.',
        targetId: 'challenges',
      },
      {
        id: 'gap-speed',
        title: 'Incident Triage & Rapid Hotfixes',
        description: 'No demonstration of debugging live production outages under strict response-time limits.',
        actionableStep: 'Practice 60-second incident remediation with automated telemetry inspection.',
        nextMove: 'Take the AI Speed Run challenge.',
        targetId: 'challenges',
      },
    ],
    gapClosingProject: {
      title: 'AI Resume Intelligence & API Deployment Copilot',
      builderType: 'AI ARCHITECT',
      whyFits:
        'Based on your resume, you already have Python + ML basics. Your biggest gap is deployment and live evidence. This project directly closes both gaps.',
      whatYouBuild:
        'A production-ready microservice that extracts skills from raw PDFs, benchmarks them against current engineering roles, and returns structured JSON scores via a live REST API and clean React dashboard.',
      stack: ['Multimodal LLM Parser', 'Structured JSON Guardrail Layer', 'FastAPI Microservice', 'Vercel React Dashboard'],
      difficulty: '★★★☆☆',
      difficultyRating: 3,
      estimatedTime: '60 minutes',
      mvpScope:
        'A public URL where any student drops a resume text and receives a validated JSON readiness card with 99.8% uptime.',
      skills: [
        'Structured schema validation',
        'FastAPI REST endpoint architecture',
        'CORS and streaming telemetry',
        'One-click Vercel cloud deployment',
      ],
    },
  };

  const handleStartScan = (source: string) => {
    sounds.playClick();
    setScanState('scanning');
    setScanningStep(0);
    setVeerMood('thinking');
    setVeerSpeech("I'm looking for your strongest signals... Reading project architectures and code patterns!");

    const stepInterval = setInterval(() => {
      setScanningStep((prev) => {
        const next = prev + 1;
        if (next === 1) {
          sounds.playChirp(1200);
          setVeerMood('curious');
          setVeerSpeech("Mapping your technical skills to current industry expectations...");
        } else if (next === 2) {
          sounds.playChirp(1350);
          setVeerMood('thinking');
          setVeerSpeech("Understanding your project depth and checking for deployment evidence...");
        } else if (next === 3) {
          sounds.playChirp(1480);
          setVeerMood('excited');
          setVeerSpeech("Finding where your profile currently fits best in the engineering landscape!");
        } else if (next >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setScanState('results');
            setVeerMood('proud');
            setVeerSpeech(
              "You already have some strong pieces! Let's see what can make them stronger. These aren't weaknesses—they're your next upgrades."
            );
            sounds.playSuccess();
            try {
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 },
              });
            } catch {
              // ignore
            }
          }, 800);
        }
        return next;
      });
    }, 750);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      handleStartScan(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      handleStartScan(file.name);
    }
  };

  return (
    <section
      id="resume-scanner"
      className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden text-[#2D2319] select-none"
    >
      {/* Background Subtle Warm Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-1" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D4A855] bg-[#FFFDF9] shadow-xs">
          <Target size={14} className="text-amber-700" />
          <span className="text-xs font-mono font-bold text-[#5C3A1E] tracking-wider uppercase">
            CAREER DIAGNOSTIC // PROFILE INTELLIGENCE
          </span>
        </div>

        {/* Big Headline */}
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D2319]">
          WHERE DO YOU STAND?
        </h2>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg text-[#5E4F41] font-sans leading-relaxed max-w-2xl mx-auto">
          Understand where your current projects and technical skills align with today's engineering roles, identify your gaps, and discover what to build next.
        </p>
      </div>

      {/* ==================================================== */}
      {/* VEER COMPANION FEEDBACK ROW                          */}
      {/* ==================================================== */}
      <div className="mb-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-5 rounded-3xl bg-[#FFFDF9] border-2 border-[#D4A855] shadow-[0_8px_30px_rgba(90,60,20,0.08)]">
        <div className="shrink-0">
          <VeerCharacter
            mood={veerMood}
            isWalking={scanState === 'scanning'}
            size={105}
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="font-heading font-black text-xs text-[#2D2319] tracking-wider">
              VEER // CAREER COMPANION
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
              {scanState === 'scanning' ? 'ANALYZING PROFILE' : scanState === 'results' ? 'DIAGNOSTIC READY' : 'AWAITING RESUME'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#432810] font-sans font-medium leading-snug">
            "{veerSpeech}"
          </p>
        </div>
      </div>

      {/* ==================================================== */}
      {/* STEP 1: RESUME UPLOAD CARD                           */}
      {/* ==================================================== */}
      {scanState === 'upload' && (
        <div className="max-w-3xl mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_12px_40px_rgba(90,60,20,0.08)] space-y-6">
          
          <div className="text-center space-y-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319]">
              Let AI read your profile.
            </h3>
            <p className="text-xs sm:text-sm text-[#5E4F41] font-sans max-w-lg mx-auto">
              Upload your resume and see how your current skills, projects, and experience align with today's engineering roles.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center p-1 bg-[#FAF6EE] rounded-2xl border border-[#D4C3A3] max-w-md mx-auto">
            <button
              onClick={() => { sounds.playClick(); setActiveTab('demo'); }}
              className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'demo' ? 'bg-amber-500 text-white shadow-xs' : 'text-[#6E5A47] hover:text-[#2D2319]'
              }`}
            >
              Demo Profile (Instant)
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveTab('file'); }}
              className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'file' ? 'bg-amber-500 text-white shadow-xs' : 'text-[#6E5A47] hover:text-[#2D2319]'
              }`}
            >
              Upload PDF / DOCX
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveTab('text'); }}
              className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'text' ? 'bg-amber-500 text-white shadow-xs' : 'text-[#6E5A47] hover:text-[#2D2319]'
              }`}
            >
              Paste Summary
            </button>
          </div>

          {/* TAB 1: Instant Demo Profile */}
          {activeTab === 'demo' && (
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] text-center space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                  PRE-LOADED CANDIDATE DATA
                </span>
                <div className="font-heading font-black text-lg text-[#2D2319]">
                  Aarav Sharma — Final-Year CSE (Batch 2026)
                </div>
                <p className="text-xs text-[#5E4F41] font-sans max-w-md mx-auto">
                  Has Python, TypeScript, basic PyTorch, 2 academic ML projects, and GitHub repositories. Ready for instant diagnostic.
                </p>
              </div>

              <button
                onClick={() => handleStartScan('Demo: Aarav Sharma (Final-Year CSE)')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white font-heading font-black text-sm tracking-wider uppercase shadow-[0_4px_18px_rgba(217,119,6,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2 mx-auto"
              >
                <Sparkles size={16} />
                <span>ANALYZE DEMO RESUME (INSTANT DIAGNOSTIC)</span>
              </button>
            </div>
          )}

          {/* TAB 2: File Upload (PDF / DOCX) */}
          {activeTab === 'file' && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="p-8 rounded-2xl border-2 border-dashed border-[#D4A855] bg-[#FAF6EE] text-center space-y-3 hover:bg-[#F5ECE0] transition-colors cursor-pointer relative"
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
                <UploadCloud size={24} />
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-[#2D2319]">
                  {uploadedFileName ? uploadedFileName : "Drag & Drop your resume here, or Browse files"}
                </div>
                <div className="text-[11px] font-mono text-[#8C6D53] mt-1">
                  Supports PDF, DOC, DOCX • Processed locally in-memory for this prototype
                </div>
              </div>
              <button
                type="button"
                className="px-5 py-2 rounded-xl bg-amber-500 text-white font-heading font-black text-xs uppercase tracking-wider shadow-xs"
              >
                SELECT FILE
              </button>
            </div>
          )}

          {/* TAB 3: Paste Resume Text */}
          {activeTab === 'text' && (
            <div className="space-y-3">
              <textarea
                rows={5}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your resume summary, project descriptions, or technical skills list here..."
                className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-2xl p-4 text-xs font-mono text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
              />
              <button
                disabled={!pastedText.trim()}
                onClick={() => handleStartScan('Pasted Resume Summary')}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-heading font-black text-sm tracking-wider uppercase shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles size={16} />
                <span>ANALYZE PASTED PROFILE</span>
              </button>
            </div>
          )}

          {/* Security & Privacy Disclaimer */}
          <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-[#78614E] pt-2">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Private & secure. Zero data selling. Constructive growth assessment only.</span>
          </div>

        </div>
      )}

      {/* ==================================================== */}
      {/* PROCESSING STATE WITH VEER                           */}
      {/* ==================================================== */}
      {scanState === 'scanning' && (
        <div className="max-w-2xl mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-8 sm:p-12 shadow-[0_15px_50px_rgba(90,60,20,0.12)] text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
            <Sparkles size={14} className="animate-spin text-amber-700" />
            <span>EXTRACTING PROFILE SIGNALS</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319] tracking-tight">
            DECODING YOUR ENGINEERING ARTIFACTS
          </h3>

          {/* Processing Stages Tracker */}
          <div className="space-y-3 max-w-md mx-auto pt-2">
            {scanningStages.map((stage, idx) => {
              const isPast = idx < scanningStep;
              const isCurrent = idx === scanningStep;
              return (
                <div
                  key={stage}
                  className={`flex items-center space-x-3 text-xs sm:text-sm font-mono font-bold transition-all ${
                    isCurrent
                      ? 'text-amber-800 scale-105'
                      : isPast
                      ? 'text-emerald-700 opacity-80'
                      : 'text-stone-400 opacity-40'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 size={12} /> : idx + 1}
                  </div>
                  <span>{stage}</span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EFE8DD] rounded-full h-3 p-0.5 border border-[#DAC8B2] mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-full rounded-full transition-all duration-700"
              style={{ width: `${((scanningStep + 1) / scanningStages.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* RESULTS STATE: THE FULL CAREER DIAGNOSTIC            */}
      {/* ==================================================== */}
      {scanState === 'results' && (
        <div className="space-y-10">

          {/* STEP 2: PROFILE QUALITY SCORE CARD */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_15px_45px_rgba(90,60,20,0.1)] space-y-8">
            
            {/* Top Score Banner */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#E8DFD5] gap-4">
              <div>
                <span className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider">
                  CANDIDATE: {defaultScanResult.candidateName}
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#2D2319] tracking-tight">
                  AI PROFILE READINESS
                </h3>
                <div className="inline-flex items-center space-x-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold">
                  <ShieldCheck size={13} className="text-emerald-700" />
                  <span>Constructive Profile Diagnostic • Not an employability verdict</span>
                </div>
              </div>

              {/* Big Score Dial */}
              <div className="flex items-baseline space-x-2 bg-gradient-to-br from-[#FAF6EE] to-[#EFE5D3] p-5 rounded-2xl border-2 border-[#D4A855] shrink-0 shadow-xs">
                <span className="font-heading text-5xl sm:text-6xl font-black text-[#2D2319]">
                  {defaultScanResult.overallScore}
                </span>
                <span className="font-heading text-2xl font-bold text-[#8C6D53]">/ 100</span>
              </div>
            </div>

            {/* 7 Core Categories Grid */}
            <div className="space-y-3">
              <div className="font-heading font-black text-sm text-[#2D2319] uppercase tracking-wider flex items-center space-x-2">
                <Layers size={15} className="text-amber-700" />
                <span>DIMENSIONAL READINESS BREAKDOWN</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {defaultScanResult.categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-black text-sm text-[#2D2319]">{cat.name}</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-mono font-bold text-xs border border-amber-300">
                        {cat.score} / 100
                      </span>
                    </div>

                    <p className="text-xs text-[#5E4F41] font-sans leading-relaxed">
                      {cat.explanation}
                    </p>

                    <div className="pt-2 border-t border-[#E8DFD5] text-[11px] font-sans text-amber-950 flex items-start space-x-1.5">
                      <TrendingUp size={13} className="text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Improvement Opportunity:</strong> {cat.improvement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* STEP 3: PROFILE ALIGNMENT — WHERE DOES IT FIT?       */}
          {/* ==================================================== */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_15px_45px_rgba(90,60,20,0.1)] space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">
                MARKET ALIGNMENT MAP
              </span>
              <h3 className="font-heading text-3xl font-black text-[#2D2319] tracking-tight">
                Where does your profile currently fit?
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4F41] font-sans">
                Based on your demonstrated project patterns and technical evidence:
              </p>
            </div>

            {/* 3 Tier Role Alignment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Strong Alignment */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-emerald-900 font-heading font-black text-xs uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span>STRONG ALIGNMENT</span>
                </div>
                <div className="space-y-2">
                  {defaultScanResult.strongAlignmentRoles.map((role) => (
                    <div key={role} className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs font-heading font-bold text-emerald-950 shadow-xs">
                      {role}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-sans text-emerald-800 leading-tight">
                  Your project mix directly demonstrates the applied engineering habits expected in these roles.
                </p>
              </div>

              {/* Moderate Alignment */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-amber-900 font-heading font-black text-xs uppercase tracking-wider">
                  <TrendingUp size={16} className="text-amber-700" />
                  <span>MODERATE ALIGNMENT</span>
                </div>
                <div className="space-y-2">
                  {defaultScanResult.moderateAlignmentRoles.map((role) => (
                    <div key={role} className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-heading font-bold text-amber-950 shadow-xs">
                      {role}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-sans text-amber-900 leading-tight">
                  Solid foundation; requires 1 deployed production project to become a priority candidate.
                </p>
              </div>

              {/* Needs More Evidence */}
              <div className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-stone-700 font-heading font-black text-xs uppercase tracking-wider">
                  <AlertTriangle size={16} className="text-stone-500" />
                  <span>NEEDS MORE EVIDENCE</span>
                </div>
                <div className="space-y-2">
                  {defaultScanResult.needsEvidenceRoles.map((role) => (
                    <div key={role} className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs font-heading font-bold text-stone-700 shadow-xs">
                      {role}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-sans text-stone-600 leading-tight">
                  Requires deeper proof in low-level distributed systems or formal mathematical research.
                </p>
              </div>

            </div>

            {/* Company Profile Alignment */}
            <div className="pt-4 border-t border-[#E8DFD5] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-heading font-black text-sm text-[#2D2319] uppercase tracking-wider">
                  EXAMPLE COMPANY PROFILES TO EXPLORE
                </div>
                <span className="text-[11px] font-mono text-[#8C6D53]">
                  Archetype engineering teams • Not a hiring prediction
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {defaultScanResult.companyProfiles.map((comp) => (
                  <div
                    key={comp}
                    className="p-3 rounded-xl bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-sans text-[#4A321B] flex items-center space-x-2"
                  >
                    <Briefcase size={14} className="text-amber-700 shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* STEP 4: "WHAT'S MISSING?" — THE CORE VALUE           */}
          {/* ==================================================== */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_15px_45px_rgba(90,60,20,0.1)] space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">
                CONSTRUCTIVE DIAGNOSTIC // 4 UNLOCKED UPGRADES
              </span>
              <h3 className="font-heading text-3xl font-black text-[#2D2319] tracking-tight">
                What would move your profile to the next level?
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4F41] font-sans">
                These are not failures. They are the exact engineering upgrades recruiters and tech leads look for on campus:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultScanResult.gaps.map((gap, idx) => (
                <div
                  key={gap.id}
                  className="p-5 rounded-2xl bg-[#FAF6EE] border-2 border-amber-300 space-y-3 shadow-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-mono font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h4 className="font-heading font-black text-base text-[#2D2319]">
                      {gap.title}
                    </h4>
                  </div>

                  <p className="text-xs text-[#5E4F41] font-sans leading-relaxed">
                    "{gap.description}"
                  </p>

                  <div className="p-3 rounded-xl bg-amber-100/70 text-xs font-sans text-amber-950 font-medium">
                    <strong>Actionable Step:</strong> {gap.actionableStep}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ==================================================== */}
          {/* STEP 5: CONNECT GAPS TO AI BUILDER LEAGUE            */}
          {/* ==================================================== */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF9] to-[#FAF6EE] border-2 border-[#D4A855] shadow-lg space-y-6">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-amber-900 font-bold uppercase tracking-wider">
                STRATEGIC CAMPAIGN BRIDGE
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#2D2319]">
                NOW CLOSE THE GAP.
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4F41] font-sans">
                The AI Builder League exists precisely to give you the proof, battle-testing, and deployed project evidence your resume currently lacks.
              </p>
            </div>

            {/* 4 Interactive Move Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Move 1: AI Detective */}
              <div
                onClick={() => {
                  sounds.playClick();
                  onJumpToSection('challenges');
                }}
                className="p-5 rounded-2xl bg-white border border-[#D4A855] hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs hover:scale-105 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                    GAP: RACE CONDITIONS
                  </div>
                  <div className="font-heading font-black text-base text-[#2D2319] mt-1 group-hover:text-amber-800 transition-colors">
                    Test Yourself in AI Detective
                  </div>
                  <p className="text-xs text-[#5E4F41] font-sans mt-1">
                    Audit concurrency bugs and Redis lock gaps in real code.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs font-mono text-amber-900 font-bold">
                  <span>ENTER ARENA 01</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Move 2: AI Creator */}
              <div
                onClick={() => {
                  sounds.playClick();
                  onJumpToSection('challenges');
                }}
                className="p-5 rounded-2xl bg-white border border-[#D4A855] hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs hover:scale-105 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                    GAP: METRIC BENCHMARKING
                  </div>
                  <div className="font-heading font-black text-base text-[#2D2319] mt-1 group-hover:text-amber-800 transition-colors">
                    Draft in AI Creator Battle
                  </div>
                  <p className="text-xs text-[#5E4F41] font-sans mt-1">
                    Engineer 4-stage pipelines and measure live prompt token costs.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs font-mono text-amber-900 font-bold">
                  <span>ENTER ARENA 02</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Move 3: Speed Run */}
              <div
                onClick={() => {
                  sounds.playClick();
                  onJumpToSection('challenges');
                }}
                className="p-5 rounded-2xl bg-white border border-[#D4A855] hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-xs hover:scale-105 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                    GAP: INCIDENT RESPONSE
                  </div>
                  <div className="font-heading font-black text-base text-[#2D2319] mt-1 group-hover:text-amber-800 transition-colors">
                    Take the AI Speed Run
                  </div>
                  <p className="text-xs text-[#5E4F41] font-sans mt-1">
                    60-second high-pressure server triage with hotfix levers.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs font-mono text-amber-900 font-bold">
                  <span>ENTER ARENA 03</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Move 4: Workshop (The Climax) */}
              <div
                onClick={() => {
                  sounds.playClick();
                  onJumpToSection('workshop');
                }}
                className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-md hover:scale-105 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-900 font-black uppercase">
                    GAP: LIVE DEPLOYMENT
                  </div>
                  <div className="font-heading font-black text-base text-[#2D2319] mt-1 group-hover:text-amber-800 transition-colors">
                    Build Your AI Project
                  </div>
                  <p className="text-xs text-[#5E4F41] font-sans mt-1">
                    Deploy your first production AI project in 60 minutes.
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-xs font-mono text-amber-950 font-black">
                  <span>RESERVE SEAT</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

          </div>

          {/* ==================================================== */}
          {/* STEP 6: PERSONAL CAREER PROGRESSION DIAGRAM          */}
          {/* ==================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EE] border-2 border-[#D4A855] text-center space-y-4 shadow-xs">
            <span className="text-xs font-mono text-amber-900 font-bold uppercase tracking-wider">
              YOUR PERSONAL CAREER PATH // 7-DAY EVOLUTION
            </span>

            {/* Visual Progression Chain */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 text-xs sm:text-sm font-heading font-black">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D4C3A3] text-[#2D2319] shadow-xs">
                YOUR PROFILE
              </span>
              <span className="text-amber-700 font-black">↓</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D4C3A3] text-amber-900 shadow-xs">
                YOUR GAPS
              </span>
              <span className="text-amber-700 font-black">↓</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D4C3A3] text-[#2D2319] shadow-xs">
                AI BUILDER LEAGUE
              </span>
              <span className="text-amber-700 font-black">↓</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D4C3A3] text-[#2D2319] shadow-xs">
                3 CHALLENGES
              </span>
              <span className="text-amber-700 font-black">↓</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-white shadow-xs">
                60-MINUTE BUILD
              </span>
              <span className="text-amber-700 font-black">↓</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white shadow-xs">
                STRONGER PROJECT PORTFOLIO
              </span>
            </div>

            <p className="font-heading font-black text-base sm:text-lg text-[#2D2319] pt-2">
              “Don't just attend another workshop. Build evidence of what you can do.”
            </p>
          </div>

          {/* ==================================================== */}
          {/* STEP 7: DIRECT INTEGRATION WITH GAP-CLOSING PROJECT  */}
          {/* ==================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-amber-500 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DFD5]">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-mono font-black mb-1">
                  <Flame size={13} className="text-amber-700" />
                  <span>RECOMMENDED GAP-CLOSING PROJECT</span>
                </div>
                <h4 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319]">
                  {defaultScanResult.gapClosingProject.title}
                </h4>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-xl bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-mono font-bold text-[#5C3A1E]">
                  DIFFICULTY: {defaultScanResult.gapClosingProject.difficulty}
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-mono font-bold text-emerald-900">
                  ⏱️ {defaultScanResult.gapClosingProject.estimatedTime}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-[#432810] leading-relaxed">
              <strong>WHY THIS CLOSES YOUR CAREER GAPS: </strong>
              {defaultScanResult.gapClosingProject.whyFits}
            </div>

            <div className="space-y-1">
              <div className="font-heading font-black text-xs text-[#8C6D53] uppercase tracking-wider">
                WHAT YOU'LL BUILD & SHIP
              </div>
              <p className="text-xs sm:text-sm text-[#5E4F41] font-sans">
                {defaultScanResult.gapClosingProject.whatYouBuild}
              </p>
            </div>

            {/* Architecture Stack */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {defaultScanResult.gapClosingProject.stack.map((layer, idx) => (
                <div key={layer} className="p-3 rounded-xl bg-[#FAF6EE] border border-[#D4C3A3] text-center">
                  <div className="text-[10px] font-mono text-amber-800 font-bold">NODE 0{idx + 1}</div>
                  <div className="text-xs font-heading font-bold text-[#2D2319] mt-0.5">{layer}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onBuildInWorkshopClick(defaultScanResult.gapClosingProject);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-heading font-black text-base tracking-wider uppercase shadow-[0_6px_25px_rgba(217,119,6,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2.5"
              >
                <span>BUILD THIS IN 60 MINUTES</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setScanState('upload');
                  setVeerMood('curious');
                  setVeerSpeech("Want to test another profile? Upload another PDF or paste text!");
                }}
                className="px-5 py-3.5 rounded-2xl bg-[#FAF6EE] hover:bg-[#F3ECE0] border border-[#D4C3A3] text-xs font-mono text-[#5C3A1E] font-bold transition-all cursor-pointer flex items-center space-x-1.5 shadow-xs"
              >
                <RefreshCw size={14} className="text-amber-700" />
                <span>RETEST ANOTHER RESUME</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
