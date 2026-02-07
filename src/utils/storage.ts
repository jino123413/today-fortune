import { Storage } from '@apps-in-toss/web-framework';
import { StreakData } from '../types';

const STREAK_KEY = 'today-fortune-streak';

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getYesterdayString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  lastVisitDate: '',
  totalVisits: 0,
};

export async function getStreakData(): Promise<StreakData> {
  try {
    const stored = await Storage.getItem(STREAK_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return { ...DEFAULT_STREAK };
}

export async function updateStreak(): Promise<StreakData> {
  const data = await getStreakData();
  const today = getTodayString();
  const yesterday = getYesterdayString();

  if (data.lastVisitDate === today) {
    return data;
  }

  if (data.lastVisitDate === yesterday) {
    data.currentStreak += 1;
  } else {
    data.currentStreak = 1;
  }

  data.lastVisitDate = today;
  data.totalVisits += 1;

  try {
    await Storage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}

  return data;
}
