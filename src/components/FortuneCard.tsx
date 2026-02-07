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

const FortuneCard: React.FC<FortuneCardProps> = ({ result }) => {
  const gradeInfo = GRADE_CONFIG[result.grade];

  return (
    <div className="fortune-main-card">
      {/* Mascot Grade Badge */}
      <img
        src={GRADE_MASCOT[result.grade]}
        alt={`${result.grade}등급`}
        className="grade-mascot"
      />
      <div className={`grade-letter ${gradeInfo.colorClass}`}>{result.grade}</div>
      <p className="grade-label">{gradeInfo.label}</p>

      {/* Title & Description */}
      <h2 className="fortune-title">{result.title}</h2>
      <p className="fortune-description">{result.description}</p>

      {/* Score Bars */}
      <div className="scores-section">
        <h3 className="section-title">
          <img src="/mascot/mascot-main-xs.png" alt="" className="section-mascot" />
          운세 지수
        </h3>
        {result.scores.map((score, index) => (
          <div key={index} className="score-row">
            <span className="score-label">{score.label}</span>
            <div className="score-bar-bg">
              <div
                className="score-bar-fill"
                style={{
                  width: `${score.value}%`,
                  animationDelay: `${index * 0.15}s`,
                }}
              />
            </div>
            <span className="score-value">{score.value}</span>
          </div>
        ))}
      </div>

      {/* Lucky Items */}
      <div className="lucky-section">
        <h3 className="section-title">
          <img src="/mascot/lucky-guide-xs.png" alt="" className="section-mascot" />
          럭키 아이템
        </h3>
        <div className="lucky-grid">
          <div className="lucky-item">
            <div className="lucky-item-emoji">🎨</div>
            <div className="lucky-item-label">행운의 색</div>
            <div className="lucky-item-value">{result.luckyItems.color}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-emoji">🔢</div>
            <div className="lucky-item-label">행운의 숫자</div>
            <div className="lucky-item-value">{result.luckyItems.number}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-emoji">🧭</div>
            <div className="lucky-item-label">행운의 방향</div>
            <div className="lucky-item-value">{result.luckyItems.direction}</div>
          </div>
          <div className="lucky-item">
            <div className="lucky-item-emoji">⏰</div>
            <div className="lucky-item-label">행운의 시간</div>
            <div className="lucky-item-value">{result.luckyItems.time}</div>
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="advice-section">
        <div className="advice-card">
          <img src="/mascot/magic-sparkle-xs.png" alt="" className="advice-mascot" />
          <p className="advice-text">{result.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default FortuneCard;
