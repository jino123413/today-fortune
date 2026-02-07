export interface FortuneResult {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  scores: {
    label: string;
    value: number;
  }[];
  luckyItems: {
    color: string;
    number: number;
    direction: string;
    time: string;
  };
  advice: string;
  premiumContent?: {
    weeklyFortune?: string;
  };
}

export interface DailyFortune {
  id: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  overall: number;
  wealth: number;
  love: number;
  health: number;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  luckyTime: string;
  advice: string;
  weeklyFortune: string;
}

export interface StreakData {
  currentStreak: number;
  lastVisitDate: string;
  totalVisits: number;
}
