import React from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface WireframePlaceholderProps {
  width: number;
  height: number;
  aspectRatio: string;
  label: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export const WireframePlaceholder: React.FC<WireframePlaceholderProps> = ({
  width,
  height,
  aspectRatio,
  label,
  subtitle,
  description,
  className = '',
}) => {
  const displaySubtitle = description || subtitle || 'Recommended dimensions for replacement image';
  return (
    <div
      className={`relative w-full h-full min-h-[180px] bg-[#EDE8DE] border-2 border-dashed border-[#B8B0A2] rounded-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none group transition-all hover:border-[#C73E29] ${className}`}
      style={{ aspectRatio }}
    >
      {/* Blueprint Grid Lines SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${width}-${height}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#78716C" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${width}-${height})`} />
        {/* Cutout Corner Crop Marks */}
        <line x1="12" y1="12" x2="28" y2="12" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="28" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="12" x2="calc(100% - 28px)" y2="12" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="12" x2="calc(100% - 12px)" y2="28" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="12" y1="calc(100% - 12px)" x2="28" y2="calc(100% - 12px)" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="12" y1="calc(100% - 12px)" x2="12" y2="calc(100% - 28px)" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="calc(100% - 12px)" x2="calc(100% - 28px)" y2="calc(100% - 12px)" stroke="#C73E29" strokeWidth="1.5" />
        <line x1="calc(100% - 12px)" y1="calc(100% - 12px)" x2="calc(100% - 12px)" y2="calc(100% - 28px)" stroke="#C73E29" strokeWidth="1.5" />
      </svg>

      {/* Center Spec Badge */}
      <div className="relative z-10 flex flex-col items-center max-w-[90%]">
        <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#D5CFC4] text-[#C73E29] flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-105 transition-transform">
          <ImageIcon className="w-5 h-5" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E1B18] text-white text-[11px] font-mono font-bold rounded-lg shadow-xs mb-1.5">
          <span>{width} × {height} px</span>
          <span className="text-[#A8A196]">({aspectRatio})</span>
        </div>

        <p className="text-xs font-bold text-[#1E1B18] leading-tight line-clamp-2">
          {label}
        </p>
        <p className="text-[10px] text-[#78716C] mt-0.5 leading-snug">
          {displaySubtitle}
        </p>
      </div>

      {/* Decorative Cutout Indicator */}
      <div className="absolute bottom-2 right-2.5 text-[9px] font-mono text-[#8C827A] flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-[#C73E29]" />
        <span>Placeholder Slot</span>
      </div>
    </div>
  );
};
