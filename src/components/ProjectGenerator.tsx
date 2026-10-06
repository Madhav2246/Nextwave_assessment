/**
 * ProjectGenerator — "WHAT WOULD YOU BUILD?"
 *
 * An interactive AI discovery experience placed between Main Hero and the 3 AI Arenas.
 * Makes the student immediately realize: "I can actually build something with AI."
 * Fully connects to the Day-7 Capstone Workshop: "Build Your First AI Project in 60 Minutes".
 */
import React, { useState, useEffect } from 'react';
import { VeerCharacter } from './VeerCharacter';
import { CharacterMood, GeneratedProject } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Share2,
  Check,
  ChevronDown,
  Layers,
  Cpu,
  Terminal,
  Compass,
  Hammer,
  ShieldCheck,
  Flame,
  ArrowDown
} from 'lucide-react';

interface ProjectGeneratorProps {
  onBuildInWorkshopClick: (project: GeneratedProject) => void;
  onExploreChallengesClick: () => void;
}

export const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({
  onBuildInWorkshopClick,
  onExploreChallengesClick,
}) => {
  // User Selection State
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI / ML', 'GenAI / LLMs']);
  const [selectedActivity, setSelectedActivity] = useState<string>('Solving problems');
  const [selectedLevel, setSelectedLevel] = useState<string>('Just Starting');
  const [customProblem, setCustomProblem] = useState<string>('');

  // Veer speech & mood
  const [veerMood, setVeerMood] = useState<CharacterMood>('curious');
  const [veerSpeech, setVeerSpeech] = useState<string>(
    "Before we start competing... Want to see what YOU could build with AI? Let's find your first AI project."
  );

  // Generation status: 'input' | 'generating' | 'result'
  const [generationState, setGenerationState] = useState<'input' | 'generating' | 'result'>('input');
  const [genStepIndex, setGenStepIndex] = useState(0);
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);

  const interestOptions = [
    { label: 'AI / ML', icon: '🧠' },
    { label: 'Web Development', icon: '🌐' },
    { label: 'Data', icon: '📊' },
    { label: 'Automation', icon: '⚡' },
    { label: 'Computer Vision', icon: '👁️' },
    { label: 'GenAI / LLMs', icon: '✨' },
    { label: 'Cybersecurity', icon: '🛡️' },
    { label: 'Something Else', icon: '💡' },
  ];

  const activityOptions = [
    'Solving problems',
    'Building things',
    'Creating ideas',
    'Analysing data',
    'Automating repetitive work',
    'Experimenting with AI',
  ];

  const levelOptions = [
    { id: 'Just Starting', label: 'Just Starting', desc: 'Ready to write my first AI API call' },
    { id: "I've Built a Few Projects", label: "I've Built a Few Projects", desc: 'Familiar with code & basic frameworks' },
    { id: 'Comfortable Building', label: 'Comfortable Building', desc: 'Want to architect real production AI' },
  ];

  const generationStages = [
    'UNDERSTANDING YOUR INTERESTS...',
    'MATCHING PROJECT IDEAS...',
    'DESIGNING YOUR AI STACK...',
    'MAKING IT BUILDABLE...',
    'FOUND IT.',
  ];

  // Dynamic Veer reactions when inputs change
  const handleToggleInterest = (interest: string) => {
    sounds.playChirp(1150);
    let next: string[];
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length === 1) return; // keep at least 1
      next = selectedInterests.filter((i) => i !== interest);
    } else {
      next = [...selectedInterests, interest];
    }
    setSelectedInterests(next);

    // Contextual Veer reaction
    if (interest === 'AI / ML') {
      setVeerMood('proud');
      setVeerSpeech("Okay... you're speaking my language! AI and ML fundamentals run deep.");
    } else if (interest === 'Computer Vision') {
      setVeerMood('excited');
      setVeerSpeech("Interesting! You like teaching machines to see the physical world.");
    } else if (interest === 'Automation') {
      setVeerMood('celebratory');
      setVeerSpeech("Now THAT sounds useful. Automating boring repetitive grunt work is gold.");
    } else if (interest === 'GenAI / LLMs') {
      setVeerMood('excited');
      setVeerSpeech("Prompting + LLMs = an unfair engineering superpower for final years!");
    } else if (interest === 'Cybersecurity') {
      setVeerMood('intense');
      setVeerSpeech("Defending networks and catching anomalies with AI? Elite choice.");
    } else if (interest === 'Web Development') {
      setVeerMood('playful');
      setVeerSpeech("Full-stack AI apps hit differently when they're live on a real URL!");
    } else if (interest === 'Data') {
      setVeerMood('thinking');
      setVeerSpeech("Data is where the real intelligence begins. Clean data = smart AI.");
    } else {
      setVeerMood('curious');
      setVeerSpeech("Something unique? I love seeing builders invent brand new concepts.");
    }
  };

  const handleSelectActivity = (act: string) => {
    sounds.playChirp(1200);
    setSelectedActivity(act);
    if (act === 'Solving problems') {
      setVeerMood('proud');
      setVeerSpeech("Engineers solve pain points. That's the mindset top tech companies hire for.");
    } else if (act === 'Building things') {
      setVeerMood('celebratory');
      setVeerSpeech("A true hands-on builder! You're going to love deploying in the 60-min workshop.");
    } else if (act === 'Creating ideas') {
      setVeerMood('excited');
      setVeerSpeech("Creative minds build the most unexpected, viral AI tools.");
    } else if (act === 'Analysing data') {
      setVeerMood('thinking');
      setVeerSpeech("Looking for patterns? We'll match you with a high-impact intelligence tool.");
    } else if (act === 'Automating repetitive work') {
      setVeerMood('proud');
      setVeerSpeech("Why repeat 50 manual steps when an autonomous script can do it in 200ms?");
    } else {
      setVeerMood('playful');
      setVeerSpeech("Experimenting without fear is how the best breakthroughs happen.");
    }
  };

  const handleSelectLevel = (lvl: string) => {
    sounds.playChirp(1100);
    setSelectedLevel(lvl);
    if (lvl === 'Just Starting') {
      setVeerMood('proud');
      setVeerSpeech("Perfect. Everyone starts somewhere. The workshop assumes zero prior AI experience!");
    } else if (lvl === "I've Built a Few Projects") {
      setVeerMood('thinking');
      setVeerSpeech("Nice base! We'll make sure your project levels up your engineering architecture.");
    } else {
      setVeerMood('excited');
      setVeerSpeech("Love that confidence! We'll give you a serious system you can flex on your resume.");
    }
  };

  // Structured Project Recommendation Engine
  const generatePersonalizedProject = (): GeneratedProject => {
    const problemLower = customProblem.trim().toLowerCase();

    // 1. Specific Keyword Matching from Optional Problem
    if (problemLower.includes('placement') || problemLower.includes('interview')) {
      return {
        title: 'AI Placement Interview Coach',
        builderType: 'AI PROBLEM SOLVER',
        whyFits: `You enjoy ${selectedActivity.toLowerCase()} and want to make campus placement prep frictionless.`,
        whatYouBuild:
          'A web-based mock technical interview agent that asks role-specific DSA/System Design questions, assesses spoken/typed answers, and gives instant grading rubrics.',
        stack: ['LLM (Gemini / Claude)', 'Prompt & Scoring Evaluation Layer', 'FastAPI Backend', 'React Web UI'],
        difficulty: selectedLevel === 'Just Starting' ? '★★☆☆☆' : '★★★☆☆',
        difficultyRating: selectedLevel === 'Just Starting' ? 2 : 3,
        estimatedTime: '60–90 minutes',
        mvpScope:
          'A working single-screen interface where an AI interviewer evaluates your answer to 3 placement questions with a live score card out of 10.',
        skills: [
          'Prompt engineering for structured rubric scoring',
          'Streaming LLM completions',
          'FastAPI REST endpoints',
          'Vercel web deployment',
        ],
      };
    }

    if (problemLower.includes('resume') || problemLower.includes('job') || problemLower.includes('ats')) {
      return {
        title: 'AI Resume Roaster & ATS Optimizer',
        builderType: 'AI ARCHITECT',
        whyFits: `You like ${selectedActivity.toLowerCase()} and want to solve the opaque resume screening dilemma.`,
        whatYouBuild:
          'An intelligent document analyzer that parses candidate PDF resumes against job descriptions, identifies skill gaps, and suggests tailored rewrites.',
        stack: ['LLM Extraction Engine', 'JSON Schema Guardrails', 'PDF Parser Microservice', 'Vite Dashboard'],
        difficulty: '★★☆☆☆',
        difficultyRating: 2,
        estimatedTime: '60 minutes',
        mvpScope:
          'Upload or paste resume text + a job description to receive a bulleted ATS compatibility score and 3 punchy sentence upgrades.',
        skills: [
          'Strict JSON Schema output enforcement',
          'Context window document chunking',
          'Tailwind UI score visualization',
          'Prompt chaining',
        ],
      };
    }

    if (problemLower.includes('exam') || problemLower.includes('notes') || problemLower.includes('study')) {
      return {
        title: 'Smart Exam Synthesizer & Knowledge Graph',
        builderType: 'AI ANALYST',
        whyFits: `You enjoy ${selectedActivity.toLowerCase()} and want to compress hundreds of syllabus pages into razor-sharp study guides.`,
        whatYouBuild:
          'An interactive AI study copilot that ingests lecture PDFs, generates key-point flashcards, and predicts likely semester exam questions.',
        stack: ['RAG Vector Embeddings', 'LLM Question Generator', 'Python Flask API', 'Interactive Flashcard UI'],
        difficulty: '★★★☆☆',
        difficultyRating: 3,
        estimatedTime: '75 minutes',
        mvpScope:
          'Paste a single chapter notes section and generate 5 high-probability exam questions with verified reasoning.',
        skills: [
          'RAG (Retrieval Augmented Generation) basics',
          'Vector embeddings search',
          'Stateful flashcard UI interactions',
          'One-click Vercel hosting',
        ],
      };
    }

    if (problemLower.includes('attendance') || problemLower.includes('face') || problemLower.includes('proxy')) {
      return {
        title: 'Vision-Powered Classroom Attendance Shield',
        builderType: 'AI AUTOMATOR',
        whyFits: `You want to eliminate manual roll-calls using modern computer vision and intelligent verification.`,
        whatYouBuild:
          'A camera-assisted web application that detects student faces, matches verified ID embeddings, and flags spoofing attempts in real-time.',
        stack: ['OpenCV / Vision API', 'Face Vector Matching', 'SQLite Student Database', 'Real-time Canvas Web UI'],
        difficulty: '★★★★☆',
        difficultyRating: 4,
        estimatedTime: '80 minutes',
        mvpScope:
          'A live webcam snapshot interface that detects a face and matches it to a pre-enrolled mock roll roster with 98% confidence.',
        skills: [
          'Computer vision feature extraction',
          'Cosine similarity vector calculation',
          'Webcam stream handling in React',
          'Edge inference integration',
        ],
      };
    }

    if (problemLower.includes('code') || problemLower.includes('bug') || problemLower.includes('git')) {
      return {
        title: 'Autonomous Pull Request Bug Auditor',
        builderType: 'AI PROBLEM SOLVER',
        whyFits: `You enjoy ${selectedActivity.toLowerCase()} and want to catch nasty runtime bugs before code reaches production.`,
        whatYouBuild:
          'An automated code reviewer that inspects git diffs, detects race conditions and memory leaks, and writes inline suggested fixes.',
        stack: ['Code LLM (Claude 3.5 Sonnet)', 'Git Diff AST Parser', 'Webhook Integration', 'Markdown Review Report UI'],
        difficulty: '★★★☆☆',
        difficultyRating: 3,
        estimatedTime: '60 minutes',
        mvpScope:
          'Paste a snippet of buggy code or diff to receive an annotated forensic flaw analysis with exact replacement lines.',
        skills: [
          'Code tokenization and prompt auditing',
          'Static AST analysis heuristics',
          'Markdown syntax diff formatting',
          'Git webhook triggers',
        ],
      };
    }

    // 2. Matrix Based on Selected Interests + Activities
    const hasCV = selectedInterests.includes('Computer Vision');
    const hasCyber = selectedInterests.includes('Cybersecurity');
    const hasData = selectedInterests.includes('Data');
    const hasAuto = selectedInterests.includes('Automation');
    const hasGenAI = selectedInterests.includes('GenAI / LLMs');
    const hasWeb = selectedInterests.includes('Web Development');

    if (hasCV) {
      return {
        title: 'Visual Defect & Component Inspector',
        builderType: 'AI EXPLORER',
        whyFits: `You chose Computer Vision + ${selectedActivity}. You enjoy teaching software to perceive visual reality.`,
        whatYouBuild:
          'A browser-based visual diagnostic app that inspects uploaded photos of hardware components or circuit boards to flag missing solder points or micro-cracks.',
        stack: ['LLM Multimodal Vision API', 'Bounding Box Coordinate Layer', 'FastAPI Backend', 'Interactive Canvas UI'],
        difficulty: '★★★☆☆',
        difficultyRating: 3,
        estimatedTime: '60–80 minutes',
        mvpScope:
          'Upload any image and see bounding boxes highlight and explain flaws with actionable confidence percentages.',
        skills: [
          'Multimodal vision prompting',
          'HTML5 Canvas coordinate overlays',
          'Fast image compression pipelines',
          'Vercel API edge deployment',
        ],
      };
    }

    if (hasCyber) {
      return {
        title: 'Real-Time AI Security Log & Anomaly Inspector',
        builderType: 'AI DEFENDER',
        whyFits: `You selected Cybersecurity + ${selectedActivity}. You want to spot covert attacks and unauthorized access before breaches happen.`,
        whatYouBuild:
          'An intelligent log parsing microservice that streams server telemetry, detects abnormal token spikes or brute-force signatures, and auto-generates firewall rules.',
        stack: ['Vector Distance Anomaly Model', 'LLM Incident Summary Layer', 'Python Microservice', 'Live Security Dashboard'],
        difficulty: '★★★★☆',
        difficultyRating: 4,
        estimatedTime: '70–90 minutes',
        mvpScope:
          'Simulate a live stream of 100 access logs and have the AI flag the exact 3 anomalous packets with remediation steps.',
        skills: [
          'Log anomaly classification heuristics',
          'Structured threat mitigation prompts',
          'Real-time streaming WebSockets',
          'Production log hygiene',
        ],
      };
    }

    if (hasData) {
      return {
        title: 'Natural Language SQL & Data Intelligence Agent',
        builderType: 'AI ANALYST',
        whyFits: `You picked Data + ${selectedActivity}. You want to let anyone query complex databases simply by speaking English.`,
        whatYouBuild:
          'A conversational data copilot that converts plain-text questions ("Show top 5 colleges by score this week") into safe SQL queries, executes them, and plots charts.',
        stack: ['Text-to-SQL LLM Engine', 'SQL Schema Sandbox', 'DuckDB / SQLite', 'Recharts Visual Analytics UI'],
        difficulty: '★★★☆☆',
        difficultyRating: 3,
        estimatedTime: '60 minutes',
        mvpScope:
          'Type 3 natural questions over a student placement table and see the generated SQL query + live interactive bar chart.',
        skills: [
          'Text-to-SQL prompt constraints & anti-injection',
          'Client-side SQLite in WASM',
          'Dynamic charting components',
          'Zero-server deployment',
        ],
      };
    }

    if (hasAuto) {
      return {
        title: 'Autonomous Web Research & Summarizer Agent',
        builderType: 'AI AUTOMATOR',
        whyFits: `You chose Automation + ${selectedActivity}. You hate doing 2 hours of manual Google searching and tab-hopping.`,
        whatYouBuild:
          'An autonomous background research agent that crawls 5 documentation sites or news feeds on any topic, extracts the key breakthroughs, and produces a brief.',
        stack: ['Headless Scraping Pipeline', 'LLM Map-Reduce Summarizer', 'Node.js Worker', 'Clean Digest Web Reader'],
        difficulty: '★★☆☆☆',
        difficultyRating: 2,
        estimatedTime: '60 minutes',
        mvpScope:
          'Enter any topic or company name to receive an executive 1-page intelligence report synthesized from live web sources.',
        skills: [
          'Web scraping & DOM sanitization',
          'Map-Reduce LLM summarization patterns',
          'Async background jobs in Node',
          'Markdown report rendering',
        ],
      };
    }

    if (hasGenAI && selectedActivity === 'Creating ideas') {
      return {
        title: 'Interactive AI Story & Concept Co-Creator',
        builderType: 'AI CREATOR',
        whyFits: `You chose GenAI + Creating ideas. You thrive at the intersection of imagination and machine intelligence.`,
        whatYouBuild:
          'A dynamic branching narrative adventure where an AI dungeon master adapts world-lore, character stats, and challenges based on player decisions.',
        stack: ['Stateful LLM Memory Manager', 'Dynamic Prompt Template Engine', 'Web Audio Sound Trigger', 'Retro Game UI'],
        difficulty: '★★☆☆☆',
        difficultyRating: 2,
        estimatedTime: '60 minutes',
        mvpScope:
          'A 4-turn playable interactive story where every player choice dynamically changes the lore and unlocks a special ending.',
        skills: [
          'Managing LLM conversation history and memory',
          'Branching choice generation',
          'Web Audio procedural feedback',
          'Interactive UI state machines',
        ],
      };
    }

    if (hasWeb) {
      return {
        title: 'AI-Powered Developer Productivity Copilot',
        builderType: 'AI ARCHITECT',
        whyFits: `You selected Web Development + ${selectedActivity}. You love building tools that empower other developers.`,
        whatYouBuild:
          'A lightweight in-browser code companion that transforms natural language specifications into validated TypeScript components with instant preview.',
        stack: ['Streaming LLM API', 'Sandboxed Iframe Previewer', 'Monaco Code Editor', 'Tailwind Component Engine'],
        difficulty: '★★★☆☆',
        difficultyRating: 3,
        estimatedTime: '65 minutes',
        mvpScope:
          'Describe a UI element ("A warm glassmorphism testimonial card") and watch the live JSX code generate and render live.',
        skills: [
          'Streaming response chunk handling',
          'Sandboxed iframe code execution',
          'Monaco editor integration',
          'Production Vercel deployment',
        ],
      };
    }

    // Default Fallback: AI Document Intelligence Assistant
    return {
      title: 'AI Document Intelligence & Contextual Q&A',
      builderType: 'AI PROBLEM SOLVER',
      whyFits: `You selected ${selectedInterests.join(', ')} + ${selectedActivity}. You want an app that instantly unlocks answers from complex documents.`,
      whatYouBuild:
        'A full-stack RAG document intelligence tool where users drop engineering textbooks or company manuals and query them with zero hallucinations.',
      stack: ['LLM Retrieval Layer', 'Context Chunking Engine', 'FastAPI Microservice', 'Warm Porcelain Web UI'],
      difficulty: selectedLevel === 'Just Starting' ? '★★☆☆☆' : '★★★☆☆',
      difficultyRating: selectedLevel === 'Just Starting' ? 2 : 3,
      estimatedTime: '60–80 minutes',
      mvpScope:
        'Upload any 5-page PDF notes and ask 3 technical questions with exact citation page numbers returned in under 2 seconds.',
      skills: [
        'Document chunking heuristics',
        'Grounding prompts to prevent hallucination',
        'Fast REST API endpoints',
        'Vercel static web deployment',
      ],
    };
  };

  // Launch Cinematic Generation
  const handleStartGeneration = () => {
    sounds.playClick();
    setGenerationState('generating');
    setGenStepIndex(0);

    // Stage 0: Thinking
    setVeerMood('thinking');
    setVeerSpeech('Hold tight! Let me study your chosen interests and engineering style...');

    // Stage 1: Matching
    setTimeout(() => {
      setGenStepIndex(1);
      setVeerMood('curious');
      setVeerSpeech('Scanning 20+ real-world AI project architectures built by top student engineers...');
      sounds.playChirp(1300);
    }, 800);

    // Stage 2: Designing Stack
    setTimeout(() => {
      setGenStepIndex(2);
      setVeerMood('excited');
      setVeerSpeech('Designing a rock-solid AI stack: LLM, prompt guardrails, and backend endpoints...');
      sounds.playChirp(1450);
    }, 1600);

    // Stage 3: Making it Buildable
    setTimeout(() => {
      setGenStepIndex(3);
      setVeerMood('celebratory');
      setVeerSpeech('Trimming complexity so you can ship a working MVP during the 60-minute workshop!');
      sounds.playChirp(1600);
    }, 2400);

    // Final: Found It!
    setTimeout(() => {
      setGenStepIndex(4);
      const proj = generatePersonalizedProject();
      setGeneratedProject(proj);
      setGenerationState('result');
      setVeerMood('celebratory');
      setVeerSpeech(
        `That's your project: ${proj.title}! And yes... you can start building it directly in our Day-7 workshop!`
      );
      sounds.playSuccess();

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 3200);
  };

  const handleShareProject = () => {
    if (!generatedProject) return;
    sounds.playClick();
    const shareText = `I just found my first AI project: "${generatedProject.title}" (${generatedProject.builderType})!\nWhat would you build?\n\nAI Builder League — Build Your First AI Project in 60 Minutes\nhttps://ai-builder-league.vercel.app`;

    if (navigator.share) {
      navigator.share({
        title: `My First AI Project: ${generatedProject.title}`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        // fallback to clipboard
        navigator.clipboard?.writeText(shareText);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2500);
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    }
  };

  return (
    <section
      id="project-generator"
      className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden text-[#2D2319] select-none"
    >
      {/* Background Subtle Warm Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-100/35 rounded-full blur-3xl pointer-events-none -z-1" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D4A855] bg-[#FFFDF9] shadow-xs">
          <Sparkles size={14} className="text-amber-700" />
          <span className="text-xs font-mono font-bold text-[#5C3A1E] tracking-wider uppercase">
            AI FIRST PROJECT DISCOVERY
          </span>
        </div>

        {/* Big Headline */}
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D2319]">
          WHAT WOULD YOU BUILD?
        </h2>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg text-[#5E4F41] font-sans leading-relaxed max-w-2xl mx-auto">
          Tell us a little about yourself. We'll turn your engineering interests into an AI project you can actually build and ship in 60 minutes.
        </p>
      </div>

      {/* ==================================================== */}
      {/* INTERACTIVE VEER SPEECH & REACTION ROW                */}
      {/* ==================================================== */}
      <div className="mb-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-5 rounded-3xl bg-[#FFFDF9] border-2 border-[#D4A855] shadow-[0_8px_30px_rgba(90,60,20,0.08)]">
        {/* Veer Character */}
        <div className="shrink-0">
          <VeerCharacter
            mood={veerMood}
            isWalking={generationState === 'generating'}
            size={105}
          />
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="font-heading font-black text-xs text-[#2D2319] tracking-wider">VEER // AI GUIDE</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
              {generationState === 'generating' ? 'PROCESSING' : generationState === 'result' ? 'FOUND IT' : 'READY'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#432810] font-sans font-medium leading-snug">
            "{veerSpeech}"
          </p>
        </div>
      </div>

      {/* ==================================================== */}
      {/* STATE 1: INTERACTIVE INPUT DISCOVERY DECK            */}
      {/* ==================================================== */}
      {generationState === 'input' && (
        <div className="max-w-4xl mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_12px_40px_rgba(90,60,20,0.08)] space-y-8">
          
          {/* STEP 1: What are you most interested in? */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-heading font-black text-sm sm:text-base text-[#2D2319] flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>What are you most interested in?</span>
              </label>
              <span className="text-[11px] font-mono text-[#8C6D53] font-semibold">Select multiple</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {interestOptions.map((item) => {
                const isSelected = selectedInterests.includes(item.label);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleToggleInterest(item.label)}
                    className={`p-3 rounded-2xl border text-xs sm:text-sm font-sans font-semibold flex items-center space-x-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-xs scale-[1.02]'
                        : 'bg-[#FAF6EE] border-[#E0D3BE] text-[#5C4532] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {isSelected && <Check size={14} className="ml-auto text-amber-800 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: What do you enjoy doing? */}
          <div className="space-y-3">
            <label className="font-heading font-black text-sm sm:text-base text-[#2D2319] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-mono">2</span>
              <span>What do you enjoy doing?</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {activityOptions.map((act) => {
                const isSelected = selectedActivity === act;
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => handleSelectActivity(act)}
                    className={`p-3 rounded-2xl border text-xs sm:text-sm font-sans font-semibold text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-xs scale-[1.02]'
                        : 'bg-[#FAF6EE] border-[#E0D3BE] text-[#5C4532] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{act}</span>
                      {isSelected && <Check size={14} className="text-amber-800 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Current level */}
          <div className="space-y-3">
            <label className="font-heading font-black text-sm sm:text-base text-[#2D2319] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-mono">3</span>
              <span>What is your current level?</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {levelOptions.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleSelectLevel(lvl.id)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-xs ring-2 ring-amber-400/40'
                        : 'bg-[#FAF6EE] border-[#E0D3BE] text-[#5C4532] hover:bg-[#F3ECE0]'
                    }`}
                  >
                    <div className="font-heading font-bold text-sm text-[#2D2319] flex items-center justify-between">
                      <span>{lvl.label}</span>
                      {isSelected && <Check size={15} className="text-amber-800" />}
                    </div>
                    <div className="text-[11px] font-sans text-[#7A634E] mt-1 leading-normal">
                      {lvl.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Optional Problem */}
          <div className="space-y-2">
            <label className="font-heading font-black text-sm sm:text-base text-[#2D2319] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-900 text-xs flex items-center justify-center font-mono">4</span>
              <span>Is there a problem you've always wanted to solve?</span>
              <span className="text-[11px] font-mono text-[#8C6D53] font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={customProblem}
              onChange={(e) => setCustomProblem(e.target.value)}
              placeholder="Example: I want to make placement preparation easier."
              className="w-full bg-[#FAF6EE] border border-[#D4C3A3] rounded-2xl px-4 py-3 text-sm font-sans text-[#2D2319] placeholder-[#9E8268] focus:border-amber-600 focus:outline-none shadow-xs"
            />
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-4 flex flex-col items-center">
            <button
              onClick={handleStartGeneration}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-heading font-black text-base tracking-wider uppercase shadow-[0_6px_25px_rgba(217,119,6,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2.5"
            >
              <Sparkles size={18} />
              <span>GENERATE MY FIRST AI PROJECT</span>
            </button>
            <p className="text-xs font-mono text-[#8C6D53] mt-2.5">
              Takes ~3 seconds • Matches your specific engineer profile
            </p>
          </div>

        </div>
      )}

      {/* ==================================================== */}
      {/* STATE 2: CINEMATIC AI GENERATION SEQUENCE            */}
      {/* ==================================================== */}
      {generationState === 'generating' && (
        <div className="max-w-2xl mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-8 sm:p-12 shadow-[0_15px_50px_rgba(90,60,20,0.12)] text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
            <Sparkles size={14} className="animate-spin text-amber-700" />
            <span>AI SYNTHESIS IN PROGRESS</span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319] tracking-tight">
            CRAFTING YOUR 60-MINUTE BUILD BLUEPRINT
          </h3>

          {/* Processing Stages Tracker */}
          <div className="space-y-3 max-w-md mx-auto pt-2">
            {generationStages.map((stage, idx) => {
              const isPast = idx < genStepIndex;
              const isCurrent = idx === genStepIndex;
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
                    {isPast ? <Check size={11} /> : idx + 1}
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
              style={{ width: `${((genStepIndex + 1) / generationStages.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* STATE 3: PERSONALIZED RESULT CARD                    */}
      {/* ==================================================== */}
      {generationState === 'result' && generatedProject && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* THE MASTER PROJECT CARD */}
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4A855] p-6 sm:p-10 shadow-[0_15px_45px_rgba(90,60,20,0.12)] space-y-6 relative overflow-hidden">
            
            {/* Top Identity Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-[#E8DFD5]">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-mono text-xs font-bold shadow-xs">
                  <Flame size={13} className="text-amber-700" />
                  <span>YOUR BUILDER TYPE: "{generatedProject.builderType}"</span>
                </div>
                <div className="text-[11px] font-mono text-[#8C6D53] uppercase font-bold tracking-wider">
                  DISCOVERED FOR YOU // 60-MIN CAPSTONE CANDIDATE
                </div>
              </div>

              {/* Quick Difficulty & Time Badges */}
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-xl bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-mono text-[#5C3A1E] font-bold">
                  DIFFICULTY: {generatedProject.difficulty}
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-xs font-mono text-emerald-900 font-bold">
                  ⏱️ {generatedProject.estimatedTime}
                </span>
              </div>
            </div>

            {/* Project Big Title */}
            <div>
              <div className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">
                YOUR FIRST AI PROJECT
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#2D2319] tracking-tight mt-1">
                {generatedProject.title}
              </h3>
            </div>

            {/* Why This Fits You */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-sm font-sans text-[#4A301A] leading-relaxed">
              <span className="font-heading font-black text-[#2D2319]">WHY THIS FITS YOU: </span>
              {generatedProject.whyFits}
            </div>

            {/* What You'll Build */}
            <div className="space-y-1">
              <div className="font-heading font-black text-sm text-[#2D2319] uppercase tracking-wider">
                WHAT YOU'LL BUILD
              </div>
              <p className="text-sm sm:text-base text-[#5E4F41] font-sans leading-relaxed">
                {generatedProject.whatYouBuild}
              </p>
            </div>

            {/* AI Stack Flow (Visual Diagram Nodes) */}
            <div className="space-y-2 pt-2">
              <div className="font-heading font-black text-xs text-[#8C6D53] uppercase tracking-wider flex items-center space-x-1.5">
                <Layers size={14} className="text-amber-700" />
                <span>AI STACK ARCHITECTURE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                {generatedProject.stack.map((layer, index) => (
                  <div
                    key={layer}
                    className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#D4C3A3] text-center flex flex-col items-center justify-center relative shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-amber-800 font-bold mb-1">
                      LAYER 0{index + 1}
                    </span>
                    <span className="text-xs font-heading font-black text-[#2D2319] leading-snug">
                      {layer}
                    </span>
                    {index < generatedProject.stack.length - 1 && (
                      <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-amber-600 font-black">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* The 60-Minute Workshop MVP Scope */}
            <div className="p-4 rounded-2xl bg-[#FFF9EE] border-2 border-amber-300/80 space-y-1 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-900 uppercase">
                <Hammer size={14} className="text-amber-700" />
                <span>WHAT YOU CAN SHIP IN THE 60-MINUTE WORKSHOP (MVP SCOPE)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#432810] font-sans leading-relaxed">
                {generatedProject.mvpScope}
              </p>
            </div>

            {/* What You'll Learn (Skills Gained) */}
            <div className="space-y-2 pt-1">
              <div className="font-heading font-black text-xs text-[#8C6D53] uppercase tracking-wider">
                WHAT YOU'LL LEARN
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans text-[#432810]">
                {generatedProject.skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2 p-2 rounded-xl bg-[#FAF6EE]">
                    <Check size={14} className="text-emerald-700 shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONNECT TO WORKSHOP & CTAs */}
            <div className="pt-4 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Primary Workshop Action */}
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onBuildInWorkshopClick(generatedProject);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white font-heading font-black text-base tracking-wider uppercase shadow-[0_6px_25px_rgba(217,119,6,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2.5"
              >
                <span>BUILD THIS IN 60 MINUTES</span>
                <ArrowRight size={18} />
              </button>

              {/* Secondary Actions */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
                <button
                  onClick={handleShareProject}
                  className="px-5 py-3.5 rounded-2xl bg-[#FAF6EE] hover:bg-[#F3ECE0] border border-[#D4C3A3] text-xs font-mono text-[#5C3A1E] font-bold transition-all cursor-pointer flex items-center space-x-1.5 shadow-xs"
                  title="Share your discovered project"
                >
                  {shareFeedback ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} className="text-amber-700" />}
                  <span>{shareFeedback ? 'COPIED TO CLIPBOARD!' : 'SHARE MY PROJECT'}</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setGenerationState('input');
                    setVeerMood('curious');
                    setVeerSpeech("Want to explore another idea? Change your interests or add a custom problem!");
                  }}
                  className="px-4 py-3.5 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF6EE] border border-[#D4C3A3] text-xs font-mono text-[#5C3A1E] font-bold transition-all cursor-pointer flex items-center space-x-1 shadow-xs"
                  title="Try another combination"
                >
                  <RefreshCw size={14} className="text-amber-700" />
                  <span>TRY ANOTHER</span>
                </button>
              </div>

            </div>

          </div>

          {/* ==================================================== */}
          {/* BRIDGE TO THE 3 AI ARENAS (SECTION 9 IN PROMPT)      */}
          {/* ==================================================== */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FAF6EE] to-[#EFE5D3] border-2 border-[#D4A855] shadow-xs text-center space-y-4">
            <div className="max-w-xl mx-auto space-y-2">
              <p className="text-xs font-mono text-amber-900 font-bold uppercase tracking-wider">
                CAMPAIGN PROGRESSION // STEP 2 OF 5
              </p>
              <h4 className="font-heading text-2xl sm:text-3xl font-black text-[#2D2319]">
                NOW YOU KNOW WHAT YOU COULD BUILD.
              </h4>
              <p className="text-sm text-[#5E4F41] font-sans">
                "But first... let's see what kind of builder you are under pressure."
              </p>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onExploreChallengesClick();
              }}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-[#2D2319] hover:bg-black text-amber-200 font-heading font-black text-sm tracking-wider uppercase transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <span>TEST YOUR INSTINCTS IN THE 3 ARENAS</span>
              <ArrowDown size={16} />
            </button>
          </div>

        </div>
      )}

    </section>
  );
};
