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
  iconSize = 44,
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
      aria-label="spanishconmeli ana sayfa"
    >
      {/* Amblem SVG */}
      <svg
        className="scm-icon"
        viewBox="0 0 120 120"
        width={iconSize}
        height={iconSize}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`navBgGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7941D" />
            <stop offset="55%" stopColor="#F15A24" />
            <stop offset="100%" stopColor="#D9272E" />
          </linearGradient>
          <linearGradient id={`navRibbon1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBB040" />
            <stop offset="100%" stopColor="#E63E21" />
          </linearGradient>
          <linearGradient id={`navRibbon2-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9272E" />
            <stop offset="100%" stopColor="#F7941D" />
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
          <circle cx="12" cy="12" r="11" fill="#FFFDF9" />
          <polygon points="4,19 2,24 9,21" fill="#FFFDF9" />
          <text
            x="12"
            y="15.5"
            fontFamily="sans-serif"
            fontWeight="800"
            fontSize="9.5"
            fill="#C92A2A"
            textAnchor="middle"
          >
            ¡H!
          </text>
        </g>
        <g transform="translate(82, 30) rotate(-8)">
          <path d="M0,2 Q6,0 12,2 T24,2 L24,14 Q18,16 12,14 T0,14 Z" fill="#AA151B" />
          <path d="M0,5 Q6,3 12,5 T24,5 L24,11 Q18,13 12,11 T0,11 Z" fill="#F1BF00" />
        </g>
      </svg>

      {/* Renkli 'i' Noktalarına Sahip Özel Tipografi */}
      <span
        className={`scm-wordmark ${isDark ? 'text-white' : 'text-[#1E1C1A]'}`}
        style={wordmarkSize ? { fontSize: wordmarkSize } : undefined}
      >
        span<span className="red-dot-i">ı</span>shconmel<span className="red-dot-i">ı</span>
      </span>
    </a>
  );
};
