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

export function getDailyFortune(): FortuneResult {
  const today = getTodayString();
  const index = hashCode(today + 'daily') % dailyFortunes.length;
  const fortune = dailyFortunes[index];

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
      weeklyFortune: fortune.weeklyFortune,
    },
  };
}
