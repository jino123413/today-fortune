import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Crystal ball with a sparkle inside -- main app symbol
 */
export const CrystalBallIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Ball */}
    <circle cx="12" cy="11" r="7.5" stroke={color} strokeWidth="1.5" />
    {/* Base */}
    <path
      d="M8 18.5h8M9 20h6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Sparkle inside */}
    <path
      d="M12 8v6M9 11h6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="12" cy="11" r="1" fill={color} opacity="0.8" />
  </svg>
);

/**
 * Star with shimmer rays for grade display (S/A/B/C/D)
 */
export const GradeStarIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Five-point star */}
    <path
      d="M12 3l2.47 5.01L20 8.87l-4 3.9.94 5.5L12 15.77l-4.94 2.5.94-5.5-4-3.9 5.53-.86L12 3z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Shimmer rays */}
    <path
      d="M12 1v1M21 8h-1M3 8h1M19.5 2.5l-.7.7M4.5 2.5l.7.7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

/**
 * Palette/circle icon for lucky color
 */
export const LuckyColorIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Palette outline */}
    <path
      d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.1 0 2-.9 2-2 0-.51-.2-.98-.52-1.34-.3-.33-.48-.77-.48-1.16 0-1.1.9-2 2-2h2.36c3.08 0 5.64-2.56 5.64-5.64C22 5.55 17.52 2 12 2z"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    {/* Color dots */}
    <circle cx="8" cy="9" r="1.5" fill={color} opacity="0.7" />
    <circle cx="12" cy="7" r="1.5" fill={color} opacity="0.5" />
    <circle cx="16" cy="9" r="1.5" fill={color} opacity="0.9" />
    <circle cx="7" cy="13" r="1.5" fill={color} opacity="0.6" />
  </svg>
);

/**
 * Dice icon for lucky number
 */
export const LuckyNumberIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Dice body */}
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Dots */}
    <circle cx="8.5" cy="8.5" r="1.25" fill={color} />
    <circle cx="15.5" cy="8.5" r="1.25" fill={color} />
    <circle cx="12" cy="12" r="1.25" fill={color} />
    <circle cx="8.5" cy="15.5" r="1.25" fill={color} />
    <circle cx="15.5" cy="15.5" r="1.25" fill={color} />
  </svg>
);

/**
 * Compass icon for lucky direction
 */
export const LuckyDirectionIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Outer ring */}
    <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.5" />
    {/* Compass needle */}
    <path
      d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill={color} />
    {/* Cardinal marks */}
    <path
      d="M12 2.5v1M12 20.5v1M2.5 12h1M20.5 12h1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

/**
 * Clock icon for lucky time
 */
export const LuckyTimeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Clock face */}
    <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.5" />
    {/* Hour hand */}
    <path
      d="M12 7v5l3.5 3.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill={color} />
    {/* Hour marks */}
    <path
      d="M12 3v1M12 20v1M3 12h1M20 12h1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

/**
 * Lightbulb/insight icon for advice
 */
export const AdviceIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Bulb */}
    <path
      d="M9 21h6M10 17h4M12 3a6 6 0 014 10.47V16a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.53A6 6 0 0112 3z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Light rays */}
    <path
      d="M12 1v1M4.22 4.22l.7.7M1 12h1M19.07 4.93l-.7.7M22 12h1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

/**
 * Flame icon for streak badge
 */
export const StreakFireIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#F59E0B',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Outer flame */}
    <path
      d="M12 2c.5 3.5-1.5 5.5-1.5 5.5S12 9 12.5 11c.5-2 2.5-3 2.5-3s1 2.5.5 5c1.5-1 2.5-3 2.5-5 0-4-4-8-6-9z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Inner flame */}
    <path
      d="M10 19c0-2 1-3 2-4 1 1 2 2 2 4a2 2 0 01-4 0z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.3"
    />
    {/* Base flame shape */}
    <path
      d="M8 18c0-4 4-6 4-10 0 4 4 6 4 10a4 4 0 01-8 0z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/**
 * Crown icon for premium content
 */
export const PremiumCrownIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#F59E0B',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Crown */}
    <path
      d="M3 18h18M5 18l-1-9 4.5 3L12 6l3.5 6L20 9l-1 9H5z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
    {/* Gems */}
    <circle cx="12" cy="14" r="1" fill={color} opacity="0.6" />
    <circle cx="8.5" cy="14.5" r="0.75" fill={color} opacity="0.4" />
    <circle cx="15.5" cy="14.5" r="0.75" fill={color} opacity="0.4" />
  </svg>
);

/**
 * Four-point sparkle star for decorative use
 */
export const SparkleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Four-point star */}
    <path
      d="M12 2l2 7h0l5-2-5 5 2 7-4-5-4 5 2-7-5-5h0l5 2 2-7z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Small accent sparkle */}
    <path
      d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z"
      fill={color}
      opacity="0.5"
    />
  </svg>
);

/**
 * Bar chart icon for scores section
 */
export const ScoreChartIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Bars */}
    <path
      d="M7 17V10M12 17V7M17 17V13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Baseline */}
    <path
      d="M4 20h16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Sparkle on top bar */}
    <circle cx="12" cy="5" r="1" fill={color} opacity="0.5" />
  </svg>
);

/**
 * Lock icon for premium locked state
 */
export const LockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#6C3CE1',
  style,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    {/* Lock body */}
    <rect
      x="5"
      y="11"
      width="14"
      height="10"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Shackle */}
    <path
      d="M8 11V7a4 4 0 018 0v4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Keyhole */}
    <circle cx="12" cy="16" r="1.5" fill={color} opacity="0.6" />
    <path d="M12 17.5v1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
