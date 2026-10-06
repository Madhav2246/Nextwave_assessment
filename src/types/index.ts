export type ExperienceStage =
  | 'intro-character'
  | 'door-revealed'
  | 'door-knocking'
  | 'door-opening'
  | 'portal-travel'
  | 'main-hub';

export type CharacterMood =
  | 'curious'
  | 'thinking'
  | 'excited'
  | 'proud'
  | 'confused'
  | 'celebratory'
  | 'playful'
  | 'intense';

export interface GeneratedProject {
  title: string;
  builderType: string;
  whyFits: string;
  whatYouBuild: string;
  stack: string[];
  difficulty: string; // e.g. "★★★☆☆"
  difficultyRating: number;
  estimatedTime: string; // e.g. "60–90 minutes"
  mvpScope: string;
  skills: string[];
}

export interface ResumeCategory {
  name: string;
  score: number;
  explanation: string;
  improvement: string;
}

export interface ResumeGap {
  id: string;
  title: string;
  description: string;
  actionableStep: string;
  nextMove: string;
  targetId: string;
}

export interface ResumeScanResult {
  candidateName: string;
  overallScore: number;
  categories: ResumeCategory[];
  strongAlignmentRoles: string[];
  moderateAlignmentRoles: string[];
  needsEvidenceRoles: string[];
  companyProfiles: string[];
  gaps: ResumeGap[];
  gapClosingProject: GeneratedProject;
}

export interface Participant {
  name: string;
  email: string;
  college: string;
  gradYear: string;
  referralCode?: string;
  passId?: string;
  joinedAt?: string;
  selectedProject?: string;
  builderType?: string;
}

export interface IndividualLeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  score: number;
  badge: string;
  challengesCompleted: number;
  avatarSeed: string;
}

export interface CollegeLeaderboardEntry {
  rank: number;
  college: string;
  builders: number;
  challengePoints: number;
  trending: 'up' | 'stable' | 'down';
}

export interface ReferralLeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  qualifiedReferrals: number;
  estimatedPrize: string;
}
