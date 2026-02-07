import React from 'react';
import { FortuneResult } from '../types';

interface FortuneCardProps {
  result: FortuneResult;
}

const GRADE_CONFIG: Record<string, { label: string; colorClass: string }> = {
  S: { label: '최고의 하루', colorClass: 'grade-s' },
  A: { label: '좋은 하루', colorClass: 'grade-a' },
  B: { label: '무난한 하루', colorClass: 'grade-b' },
  C: { label: '조심스러운 하루', colorClass: 'grade-c' },
  D: { label: '쉬어가는 하루', colorClass: 'grade-d' },
};

const GRADE_MASCOT: Record<string, string> = {
  S: '/mascot/grade-s.png',
  A: '/mascot/grade-a.png',
  B: '/mascot/grade-b.png',
  C: '/mascot/grade-c.png',
  D: '/mascot/grade-d.png',
};

const LUCKY_ITEMS = [
  { key: 'color' as const, label: '행운의 색', icon: '/mascot/lucky-guide-xs.png' },
  { key: 'number' as const, label: '행운의 숫자', icon: '/mascot/magic-sparkle-xs.png' },
  { key: 'direction' as const, label: '행운의 방향', icon: '/mascot/mascot-main-xs.png' },
  { key: 'time' as const, label: '행운의 시간', icon: '/mascot/crystal-ball-xs.png' },
];

const FortuneCard: React.FC<FortuneCardProps> = ({ result }) => {
  const gradeInfo = GRADE_CONFIG[result.grade];

  return (
    <div className="fortune-main-card">
      {/* Grade Section */}
      <div className="grade-section">
        <img
          src={GRADE_MASCOT[result.grade]}
          alt={`${result.grade}등급`}
          className="grade-mascot"
        />
        <div className={`grade-badge ${gradeInfo.colorClass}`}>{result.grade}</div>
        <p className="grade-label">{gradeInfo.label}</p>
      </div>

      {/* Title & Description */}
      <h2 className="fortune-title">{result.title}</h2>
      <p className="fortune-description">{result.description}</p>

      {/* Score Bars */}
      <div className="scores-section">
        <h3 className="section-title">운세 지수</h3>
        {result.scores.map((score, index) => (
          <div key={index} className="score-row">
            <span className="score-label">{score.label}</span>
            <div className="score-bar-bg">
              <div
                className={`score-bar-fill ${gradeInfo.colorClass}`}
                style={{
                  width: `${score.value}%`,
                  animationDelay: `${index * 0.12}s`,
                }}
              />
            </div>
            <span className="score-value">{score.value}</span>
          </div>
        ))}
      </div>

      {/* Lucky Items */}
      <div className="lucky-section">
        <h3 className="section-title">럭키 아이템</h3>
        <div className="lucky-grid">
          {LUCKY_ITEMS.map((item) => (
            <div key={item.key} className="lucky-item">
              <img src={item.icon} alt="" className="lucky-item-icon" />
              <div className="lucky-item-label">{item.label}</div>
              <div className="lucky-item-value">{result.luckyItems[item.key]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Advice */}
      <div className="advice-section">
        <div className="advice-card">
          <img src="/mascot/magic-sparkle-xs.png" alt="" className="advice-icon" />
          <p className="advice-text">{result.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneCard;
