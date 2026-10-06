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

export interface Participant {
  name: string;
  email: string;
  college: string;
  gradYear: string;
  referralCode?: string;
  passId?: string;
  joinedAt?: string;
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
