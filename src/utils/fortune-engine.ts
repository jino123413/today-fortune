import { FortuneResult } from '../types';
import { dailyFortunes } from '../data/daily-fortunes';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getISOWeekString(): string {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // ISO week: Monday is the first day of the week
  // Set to nearest Thursday (current date + 4 - current day number, with Sunday as 7)
  const dayNum = target.getDay() || 7; // Sunday = 7
  target.setDate(target.getDate() + 4 - dayNum);
  const yearStart = new Date(target.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${target.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

export function getDailyFortune(refreshCount?: number): FortuneResult {
  const today = getTodayString();
  const count = refreshCount ?? 0;
  const dailySeed = count > 0 ? today + 'daily' + count : today + 'daily';
  const index = hashCode(dailySeed) % dailyFortunes.length;
  const fortune = dailyFortunes[index];

  // Weekly fortune uses week-based hash so it stays the same Mon~Sun
  const weekStr = getISOWeekString();
  const weeklyIndex = hashCode(weekStr + 'weekly') % dailyFortunes.length;
  const weeklyFortune = dailyFortunes[weeklyIndex].weeklyFortune;

  return {
    grade: fortune.grade,
    title: fortune.title,
    description: fortune.description,
    scores: [
      { label: '종합운', value: fortune.overall },
      { label: '재물운', value: fortune.wealth },
      { label: '연애운', value: fortune.love },
      { label: '건강운', value: fortune.health },
    ],
    luckyItems: {
      color: fortune.luckyColor,
      number: fortune.luckyNumber,
      direction: fortune.luckyDirection,
      time: fortune.luckyTime,
    },
    advice: fortune.advice,
    premiumContent: {
      weeklyFortune,
    },
  };
}
