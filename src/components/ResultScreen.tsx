import React from 'react';
import { FortuneResult, StreakData } from '../types';
import FortuneCard from './FortuneCard';

interface ResultScreenProps {
  result: FortuneResult;
  streak: StreakData;
  premiumUnlocked: boolean;
  onUnlockPremium: () => void;
  onRefresh: () => void;
  adLoading: boolean;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  streak,
  premiumUnlocked,
  onUnlockPremium,
  onRefresh,
  adLoading,
}) => {
  const todayDate = new Date();
  const dateStr = `${todayDate.getFullYear()}년 ${todayDate.getMonth() + 1}월 ${todayDate.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayStr = dayNames[todayDate.getDay()];

  return (
    <div className="result-screen">
      {/* Header */}
      <div className="result-header">
        <h1 className="result-header-title">오늘 어때</h1>
        <p className="result-date">{dateStr} ({dayStr})</p>
      </div>

      {/* Streak Badge */}
      {streak.currentStreak > 0 && (
        <div className="streak-container">
          <div className="streak-badge">
            <img src="/mascot/streak-fire-xs.png" alt="" className="streak-icon" />
            <span>{streak.currentStreak}일 연속</span>
          </div>
          {streak.totalVisits > 1 && (
            <span className="total-visits">총 {streak.totalVisits}회</span>
          )}
        </div>
      )}

      {/* Fortune Card */}
      <FortuneCard result={result} />

      {/* Premium Section (Weekly Fortune) */}
      {result.premiumContent?.weeklyFortune && (
        <div className="premium-section">
          <div className={`premium-card${premiumUnlocked ? ' unlocked' : ''}`}>
            {premiumUnlocked ? (
              <div className="premium-unlocked-content">
                <h3 className="premium-content-title">
                  <img src="/mascot/premium-key-xs.png" alt="" className="premium-title-icon" />
                  이번 주 운세
                </h3>
                <p className="premium-content-text">
                  {result.premiumContent.weeklyFortune}
                </p>
              </div>
            ) : (
              <div className="premium-locked-content">
                <img src="/mascot/premium-key-sm.png" alt="" className="premium-locked-icon" />
                <p className="premium-locked-title">이번 주 상세 운세</p>
                <p className="premium-locked-desc">이번 주 전체 운세를 확인해보세요</p>
                <button
                  className="btn-premium"
                  onClick={onUnlockPremium}
                  disabled={adLoading}
                >
                  <span className="ad-badge">AD</span>
                  {adLoading ? '로딩 중...' : '주간 운세 보기'}
                </button>
                <p className="ad-notice">광고 시청 후 확인할 수 있습니다</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="button-group">
        <button
          className="btn-secondary"
          onClick={onRefresh}
          disabled={adLoading}
        >
          <span className="ad-badge">AD</span>
          {adLoading ? '로딩 중...' : '다시 뽑기'}
        </button>
        <p className="ad-notice">광고 시청 후 새로운 운세를 뽑아보세요</p>
      </div>
    </div>
  );
};

export default ResultScreen;
