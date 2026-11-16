import React from 'react';
import { useCMS } from '../context/CMSContext';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  iconSize?: number;
  wordmarkSize?: string;
  onClick?: () => void;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  iconSize = 38,
  wordmarkSize,
  onClick,
  className = '',
}) => {
  const { setActiveView } = useCMS();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (onClick) onClick();
  };

  const isDark = variant === 'dark';

  return (
    <a
      href="/"
      onClick={handleClick}
      className={`scm-brand-logo group cursor-pointer ${className}`}
      aria-label="spanishconmeli home"
    >
      <svg
        className="scm-icon"
        viewBox="0 0 120 120"
        width={iconSize}
        height={iconSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`navBgGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2B134" />
            <stop offset="55%" stopColor="#D96B43" />
            <stop offset="100%" stopColor="#C8553D" />
          </linearGradient>
          <linearGradient id={`navRibbon1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6EC" />
            <stop offset="100%" stopColor="#F2B134" />
          </linearGradient>
          <linearGradient id={`navRibbon2-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8553D" />
            <stop offset="100%" stopColor="#FFF6EC" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="112" height="112" rx="28" fill={`url(#navBgGrad-${variant})`} />
        <path
          d="M 48 34 C 30 34, 24 46, 36 55 C 48 64, 52 74, 38 82 C 26 88, 22 76, 26 70"
          fill="none"
          stroke={`url(#navRibbon1-${variant})`}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M 38 82 C 48 86, 56 76, 60 62 L 66 78 L 78 58 L 88 82"
          fill="none"
          stroke={`url(#navRibbon2-${variant})`}
          strokeWidth="10.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform="translate(56, 26)">
          <circle cx="12" cy="12" r="11" fill="#FFF6EC" />
          <polygon points="4,19 2,24 9,21" fill="#FFF6EC" />
          <text
            x="12"
            y="15.5"
            fontFamily="sans-serif"
            fontWeight="800"
            fontSize="9.5"
            fill="#C8553D"
            textAnchor="middle"
          >
            ¡H!
          </text>
        </g>
      </svg>

      <span
        className={`scm-wordmark ${isDark ? 'text-[#FFF6EC]' : 'text-[#22334A]'}`}
        style={wordmarkSize ? { fontSize: wordmarkSize } : undefined}
      >
        span<span className="red-dot-i">ı</span>shconmel<span className="red-dot-i">ı</span>
      </span>
    </a>
  );
};
