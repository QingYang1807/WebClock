/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Monitor, Layers, Moon, Sun, Palette, Check } from 'lucide-react';

type ClockMode = 'analog' | 'digital' | 'both';
type ClockStyle = 'swiss' | 'classic' | 'modern' | 'bauhaus' | 'ipad';

interface ClockFaceProps {
  isDark: boolean;
  hourAngle: number;
  minuteAngle: number;
  secondAngle: number;
}

// --- Clock Face Components ---

const SwissFace: React.FC<ClockFaceProps> = ({ isDark, hourAngle, minuteAngle, secondAngle }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
    <circle cx="50" cy="50" r="49" fill={isDark ? '#18181b' : '#ffffff'} stroke={isDark ? '#3f3f46' : '#e4e4e7'} strokeWidth="1" />
    {/* Ticks */}
    {Array.from({ length: 60 }).map((_, i) => {
      const isHour = i % 5 === 0;
      return (
        <line
          key={i}
          x1="50"
          y1={isHour ? "4" : "2"}
          x2="50"
          y2="0"
          transform={`rotate(${i * 6} 50 50) translate(0, 2)`}
          stroke={isDark ? (isHour ? '#f4f4f5' : '#71717a') : (isHour ? '#18181b' : '#a1a1aa')}
          strokeWidth={isHour ? "1.5" : "0.5"}
        />
      );
    })}
    {/* Hour Hand */}
    <line x1="50" y1="50" x2="50" y2="22" transform={`rotate(${hourAngle} 50 50)`} stroke={isDark ? '#f4f4f5' : '#18181b'} strokeWidth="3.5" strokeLinecap="round" />
    {/* Minute Hand */}
    <line x1="50" y1="50" x2="50" y2="10" transform={`rotate(${minuteAngle} 50 50)`} stroke={isDark ? '#f4f4f5' : '#18181b'} strokeWidth="2.5" strokeLinecap="round" />
    {/* Second Hand */}
    <g transform={`rotate(${secondAngle} 50 50)`}>
      <line x1="50" y1="62" x2="50" y2="10" stroke="#ef4444" strokeWidth="1" />
      <circle cx="50" cy="18" r="3.5" fill="#ef4444" />
      <circle cx="50" cy="50" r="2" fill="#ef4444" />
    </g>
  </svg>
);

const ClassicFace: React.FC<ClockFaceProps> = ({ isDark, hourAngle, minuteAngle, secondAngle }) => {
  const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="classicGradDark" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#1c1917" />
          <stop offset="100%" stopColor="#292524" />
        </radialGradient>
        <radialGradient id="classicGradLight" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#fdfbf7" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="50%" stopColor="#fcf6ba" />
          <stop offset="100%" stopColor="#b38728" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill={isDark ? 'url(#classicGradDark)' : 'url(#classicGradLight)'} stroke="url(#gold)" strokeWidth="1.5" />
      
      {/* Roman Numerals */}
      {numerals.map((num, i) => {
        const angle = i * 30;
        const rad = (angle - 90) * (Math.PI / 180);
        const radius = 37;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        return (
          <text key={num} x={x} y={y} fill={isDark ? '#e7e5e4' : '#292524'} fontSize="8" fontFamily="Georgia, serif" textAnchor="middle" dominantBaseline="central">
            {num}
          </text>
        );
      })}
      
      {/* Inner track */}
      <circle cx="50" cy="50" r="28" fill="none" stroke={isDark ? '#44403c' : '#d6d3d1'} strokeWidth="0.5" />
      
      {/* Hour Hand (Breguet style approximation) */}
      <g transform={`rotate(${hourAngle} 50 50)`}>
        <path d="M48.5 50 L49.2 28 A 2.5 2.5 0 1 1 50.8 28 L51.5 50 Z" fill={isDark ? 'url(#gold)' : '#1c1917'} />
        <circle cx="50" cy="25.5" r="1.5" fill={isDark ? '#1c1917' : '#fdfbf7'} />
      </g>
      
      {/* Minute Hand */}
      <g transform={`rotate(${minuteAngle} 50 50)`}>
        <path d="M49 50 L49.5 14 A 2 2 0 1 1 50.5 14 L51 50 Z" fill={isDark ? 'url(#gold)' : '#1c1917'} />
        <circle cx="50" cy="12" r="1" fill={isDark ? '#1c1917' : '#fdfbf7'} />
      </g>
      
      {/* Second Hand */}
      <g transform={`rotate(${secondAngle} 50 50)`}>
        <line x1="50" y1="58" x2="50" y2="8" stroke={isDark ? '#a8a29e' : '#78716c'} strokeWidth="0.5" />
        <circle cx="50" cy="50" r="1.5" fill={isDark ? 'url(#gold)' : '#1c1917'} />
      </g>
    </svg>
  );
};

const ModernFace: React.FC<ClockFaceProps> = ({ isDark, hourAngle, minuteAngle, secondAngle }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
    <circle cx="50" cy="50" r="49" fill={isDark ? '#09090b' : '#fafafa'} stroke={isDark ? '#27272a' : '#e4e4e7'} strokeWidth="1" />
    
    {/* Minimalist dots */}
    {Array.from({ length: 12 }).map((_, i) => (
      <circle
        key={i}
        cx="50"
        cy="8"
        r={i % 3 === 0 ? "1.5" : "1"}
        fill={isDark ? (i % 3 === 0 ? '#10b981' : '#3f3f46') : (i % 3 === 0 ? '#059669' : '#d4d4d8')}
        transform={`rotate(${i * 30} 50 50)`}
        style={i % 3 === 0 ? { filter: isDark ? 'drop-shadow(0 0 2px rgba(16,185,129,0.8))' : 'none' } : {}}
      />
    ))}
    
    {/* Hour Hand */}
    <rect x="48.5" y="25" width="3" height="25" rx="1.5" fill={isDark ? '#ffffff' : '#000000'} transform={`rotate(${hourAngle} 50 50)`} />
    
    {/* Minute Hand */}
    <rect x="49" y="12" width="2" height="38" rx="1" fill={isDark ? '#a1a1aa' : '#52525b'} transform={`rotate(${minuteAngle} 50 50)`} />
    
    {/* Second Hand (Neon Green) */}
    <g transform={`rotate(${secondAngle} 50 50)`}>
      <line 
        x1="50" y1="50" x2="50" y2="10" 
        stroke={isDark ? '#34d399' : '#10b981'} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        style={{ filter: isDark ? 'drop-shadow(0 0 3px rgba(52,211,153,0.8))' : 'none' }} 
      />
      <circle cx="50" cy="50" r="3" fill={isDark ? '#09090b' : '#fafafa'} stroke={isDark ? '#34d399' : '#10b981'} strokeWidth="1.5" />
    </g>
  </svg>
);

const BauhausFace: React.FC<ClockFaceProps> = ({ isDark, hourAngle, minuteAngle, secondAngle }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    <circle cx="50" cy="50" r="49" fill={isDark ? '#1e1b4b' : '#fefce8'} stroke={isDark ? '#312e81' : '#fef08a'} strokeWidth="1" />
    
    {/* Geometric Markers */}
    <rect x="48" y="4" width="4" height="10" fill="#ef4444" /> {/* 12 */}
    <rect x="48" y="86" width="4" height="10" fill="#3b82f6" /> {/* 6 */}
    <rect x="86" y="48" width="10" height="4" fill="#eab308" /> {/* 3 */}
    <rect x="4" y="48" width="10" height="4" fill="#10b981" /> {/* 9 */}
    
    {/* Hour Hand: Circle */}
    <g transform={`rotate(${hourAngle} 50 50)`}>
      <line x1="50" y1="50" x2="50" y2="32" stroke={isDark ? '#f8fafc' : '#0f172a'} strokeWidth="3" />
      <circle cx="50" cy="32" r="6" fill="none" stroke={isDark ? '#f8fafc' : '#0f172a'} strokeWidth="3" />
    </g>
    
    {/* Minute Hand: Triangle/Line */}
    <g transform={`rotate(${minuteAngle} 50 50)`}>
      <line x1="50" y1="50" x2="50" y2="15" stroke={isDark ? '#94a3b8' : '#475569'} strokeWidth="2" />
      <polygon points="46,18 54,18 50,6" fill={isDark ? '#94a3b8' : '#475569'} />
    </g>
    
    {/* Second Hand */}
    <g transform={`rotate(${secondAngle} 50 50)`}>
      <line x1="50" y1="65" x2="50" y2="10" stroke="#ef4444" strokeWidth="1" />
      <circle cx="50" cy="60" r="4" fill="#ef4444" />
      <circle cx="50" cy="50" r="2" fill={isDark ? '#1e1b4b' : '#fefce8'} />
    </g>
  </svg>
);

const IpadFace: React.FC<ClockFaceProps> = ({ hourAngle, minuteAngle, secondAngle }) => {
  const numerals = Array.from({ length: 12 }, (_, index) => index + 1);
  
  const polarPointPct = (radius: number, angleDeg: number) => {
    const angle = (angleDeg - 90) * Math.PI / 180;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius
    };
  };

  const chapterOuterRadius = 41.8;
  const numeralRadius = 31.5;

  return (
    <div className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center"
         style={{
            background: `radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.88), transparent 22%),
                         linear-gradient(145deg, #fbfbfa 0%, #eff1f4 42%, #d9dde3 100%)`,
            border: 'min(1.05vmin, 10px) solid rgba(255, 255, 255, 0.46)',
            boxShadow: `0 34px 65px rgba(3, 8, 18, 0.34),
                        0 10px 24px rgba(14, 24, 40, 0.18),
                        inset 0 1px 0 rgba(255, 255, 255, 0.96),
                        inset 0 -8px 18px rgba(91, 102, 123, 0.14)`
         }}>
         <div className="absolute rounded-full" style={{
            inset: '3.6%',
            background: 'radial-gradient(circle at 30% 26%, rgba(255, 255, 255, 0.42), transparent 36%)',
            boxShadow: 'inset 0 0 0 1px rgba(83, 92, 110, 0.16), inset 0 0 20px rgba(255, 255, 255, 0.18)'
         }} />
         <div className="absolute rounded-full z-0" style={{
            inset: '8.8%',
            boxShadow: 'inset 0 0 0 1px rgba(74, 85, 106, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.22)'
         }} />

         {Array.from({ length: 60 }).map((_, i) => {
            const quarter = i % 15 === 0;
            const major = i % 5 === 0;
            const angleDeg = i * 6;
            const width = quarter ? '1.2%' : major ? '0.75%' : '0.26%';
            const height = quarter ? '8.8%' : major ? '6%' : '4.2%';
            const radius = chapterOuterRadius - (parseFloat(height) / 2);
            const point = polarPointPct(radius, angleDeg);

            return (
              <div key={`tick-${i}`} className="absolute z-10 rounded-full" style={{
                width,
                height,
                left: `${point.x}%`,
                top: `${point.y}%`,
                background: quarter ? 'rgba(22, 33, 53, 0.88)' : major ? 'rgba(34, 45, 66, 0.7)' : 'rgba(58, 67, 85, 0.26)',
                boxShadow: '0 0 0 0.5px rgba(255, 255, 255, 0.08)',
                transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`
              }} />
            );
         })}

         {numerals.map(value => {
            const point = polarPointPct(numeralRadius, value * 30);
            const isQuarter = value % 3 === 0 || value === 12;
            return (
              <div key={`num-${value}`} className="absolute z-20 text-center" style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Avenir Next", "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: isQuarter ? 'clamp(21px, 3.1vmin, 34px)' : 'clamp(18px, 2.55vmin, 28px)',
                fontWeight: isQuarter ? 650 : 600,
                color: isQuarter ? 'rgba(18, 28, 46, 0.9)' : 'rgba(24, 34, 52, 0.72)',
                textShadow: '0 1px 0 rgba(255, 255, 255, 0.46)',
                fontVariantNumeric: 'lining-nums',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                minWidth: '2.6ch'
              }}>
                {value}
              </div>
            );
         })}

         <div className="absolute z-30 rounded-full" style={{
            left: '50%',
            bottom: '50%',
            transformOrigin: '50% 100%',
            width: 'max(1.45vmin, 10px)',
            height: '23%',
            marginLeft: 'calc(max(1.45vmin, 10px) / -2)',
            background: 'linear-gradient(180deg, rgba(45, 58, 86, 0.98), rgba(22, 30, 46, 0.98))',
            clipPath: 'polygon(50% 0, 84% 12%, 66% 100%, 34% 100%, 16% 12%)',
            boxShadow: '0 7px 14px rgba(12, 17, 30, 0.16)',
            transform: `rotate(${hourAngle}deg)`
         }} />

         <div className="absolute z-30 rounded-full" style={{
            left: '50%',
            bottom: '50%',
            transformOrigin: '50% 100%',
            width: 'max(1vmin, 6px)',
            height: '34%',
            marginLeft: 'calc(max(1vmin, 6px) / -2)',
            background: 'linear-gradient(180deg, rgba(77, 87, 107, 0.96), rgba(55, 63, 80, 0.96))',
            clipPath: 'polygon(50% 0, 80% 10%, 62% 100%, 38% 100%, 20% 10%)',
            boxShadow: '0 7px 14px rgba(12, 17, 30, 0.12)',
            transform: `rotate(${minuteAngle}deg)`
         }} />

         <div className="absolute z-30" style={{
            left: '50%',
            bottom: '50%',
            transformOrigin: '50% 100%',
            width: '2px',
            height: '38%',
            marginLeft: '-1px',
            background: 'linear-gradient(180deg, #dd4158, #b0162d)',
            boxShadow: '0 0 12px rgba(176, 22, 45, 0.12)',
            transform: `rotate(${secondAngle}deg)`
         }}>
            <div className="absolute rounded-full" style={{
              left: '50%',
              bottom: '-23%',
              width: '12px',
              height: '12px',
              transform: 'translateX(-50%)',
              border: '2px solid rgba(207, 41, 65, 0.96)',
              background: 'rgba(251, 251, 250, 0.92)'
            }} />
            <div className="absolute" style={{
              left: '50%',
              bottom: '-30%',
              width: '2px',
              height: '28%',
              transform: 'translateX(-50%)',
              background: 'rgba(207, 41, 65, 0.95)',
              borderRadius: 'inherit'
            }} />
         </div>

         <div className="absolute z-40 rounded-full" style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '7.4%',
            aspectRatio: '1',
            background: 'radial-gradient(circle at 30% 30%, #42506a 0%, #202a3d 56%, #121825 100%)',
            boxShadow: '0 3px 10px rgba(11, 16, 28, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.28)'
         }}>
            <div className="absolute rounded-full" style={{
              inset: '35%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(228, 232, 238, 0.96))'
            }} />
         </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<ClockMode>('both');
  const [style, setStyle] = useState<ClockStyle>('swiss');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    const updateClock = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(updateClock);
    };
    animationFrameId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Smooth continuous angles
  const secondAngle = (seconds + milliseconds / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  const formattedDate = time.toLocaleDateString('zh-CN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  // Dynamic typography based on style
  const typographyStyles = {
    swiss: {
      date: 'font-sans font-medium tracking-wide',
      time: 'font-sans font-bold tracking-tighter',
      color: isDark ? 'text-zinc-100' : 'text-zinc-900',
      dateColor: isDark ? 'text-zinc-400' : 'text-zinc-500'
    },
    classic: {
      date: 'font-serif font-medium tracking-widest uppercase text-sm',
      time: 'font-serif font-medium tracking-wide',
      color: isDark ? 'text-stone-200' : 'text-stone-800',
      dateColor: isDark ? 'text-stone-400' : 'text-stone-500'
    },
    modern: {
      date: 'font-mono font-medium tracking-widest uppercase text-sm',
      time: 'font-mono font-bold tracking-tighter',
      color: isDark ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'text-emerald-600',
      dateColor: isDark ? 'text-zinc-500' : 'text-zinc-400'
    },
    bauhaus: {
      date: 'font-sans font-bold tracking-[0.2em] uppercase text-xs',
      time: 'font-sans font-black tracking-tighter',
      color: isDark ? 'text-indigo-100' : 'text-indigo-900',
      dateColor: isDark ? 'text-indigo-300' : 'text-indigo-600'
    },
    ipad: {
      date: 'font-sans font-medium tracking-wide',
      time: 'font-sans font-semibold tracking-wider',
      color: isDark ? 'text-slate-100' : 'text-slate-800',
      dateColor: isDark ? 'text-slate-300' : 'text-slate-500'
    }
  };

  const currentTypo = typographyStyles[style];

  // Backgrounds based on style and theme
  const getBackgroundClass = () => {
    if (style === 'ipad') return '';
    if (isDark) {
      switch (style) {
        case 'classic': return 'bg-stone-950';
        case 'modern': return 'bg-zinc-950';
        case 'bauhaus': return 'bg-slate-950';
        default: return 'bg-zinc-950';
      }
    } else {
      switch (style) {
        case 'classic': return 'bg-stone-100';
        case 'modern': return 'bg-zinc-50';
        case 'bauhaus': return 'bg-slate-50';
        default: return 'bg-zinc-100';
      }
    }
  };

  const getBackgroundStyle = () => {
    if (style === 'ipad') {
      return {
        background: `
          radial-gradient(circle at 22% 18%, rgba(120, 154, 197, 0.16), transparent 26%),
          radial-gradient(circle at 78% 82%, rgba(211, 156, 106, 0.18), transparent 30%),
          linear-gradient(140deg, #07101a 0%, #13243a 54%, #544943 100%)
        `
      };
    }
    return {};
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${getBackgroundClass()}`}
      style={getBackgroundStyle()}
    >
      
      {/* Top Header Controls */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-4 z-10">
        <div className={`flex p-1 rounded-full backdrop-blur-md shadow-sm transition-colors duration-500 ${isDark ? 'bg-white/10 border border-white/5' : 'bg-black/5 border border-black/5'}`}>
          <button
            onClick={() => setMode('analog')}
            className={`p-2 rounded-full transition-all duration-300 ${mode === 'analog' ? (isDark ? 'bg-white/20 text-white shadow-md' : 'bg-white text-zinc-900 shadow-sm') : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700')}`}
            title="Analog Mode"
          >
            <Clock size={18} />
          </button>
          <button
            onClick={() => setMode('digital')}
            className={`p-2 rounded-full transition-all duration-300 ${mode === 'digital' ? (isDark ? 'bg-white/20 text-white shadow-md' : 'bg-white text-zinc-900 shadow-sm') : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700')}`}
            title="Digital Mode"
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setMode('both')}
            className={`p-2 rounded-full transition-all duration-300 ${mode === 'both' ? (isDark ? 'bg-white/20 text-white shadow-md' : 'bg-white text-zinc-900 shadow-sm') : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-700')}`}
            title="Both Modes"
          >
            <Layers size={18} />
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-500 ${isDark ? 'bg-white/10 border border-white/5 text-yellow-300 hover:bg-white/20' : 'bg-black/5 border border-black/5 text-indigo-600 hover:bg-black/10'}`}
          title="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-12 md:gap-16 w-full max-w-4xl p-8 z-0">
        <AnimatePresence mode="popLayout">
          {(mode === 'analog' || mode === 'both') && (
            <motion.div
              key="analog"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
              className="relative w-72 h-72 md:w-96 md:h-96"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={style + (isDark ? 'dark' : 'light')}
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {style === 'swiss' && <SwissFace isDark={isDark} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />}
                  {style === 'classic' && <ClassicFace isDark={isDark} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />}
                  {style === 'modern' && <ModernFace isDark={isDark} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />}
                  {style === 'bauhaus' && <BauhausFace isDark={isDark} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />}
                  {style === 'ipad' && <IpadFace isDark={isDark} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {(mode === 'digital' || mode === 'both') && (
            <motion.div
              key="digital"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              className={`flex flex-col items-center text-center transition-all duration-500 ${currentTypo.color}`}
            >
              <div className={`mb-2 transition-colors duration-500 ${currentTypo.date} ${currentTypo.dateColor}`}>
                {formattedDate}
              </div>
              <div className={`text-6xl md:text-8xl tabular-nums transition-all duration-500 ${currentTypo.time}`}>
                {formattedTime}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Style Selector */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl backdrop-blur-xl shadow-lg transition-colors duration-500 ${isDark ? 'bg-zinc-900/80 border border-zinc-800' : 'bg-white/80 border border-zinc-200'}`}>
          <div className={`pl-3 pr-2 flex items-center gap-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            <Palette size={16} />
            <span className="text-xs font-medium uppercase tracking-wider mr-1">Style</span>
          </div>
          <div className="h-6 w-px bg-zinc-500/30 mx-1" />
          
          {(['swiss', 'classic', 'modern', 'bauhaus', 'ipad'] as ClockStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 capitalize ${
                style === s 
                  ? (isDark ? 'text-white' : 'text-zinc-900') 
                  : (isDark ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100')
              }`}
            >
              {style === s && (
                <motion.div
                  layoutId="activeStyle"
                  className={`absolute inset-0 rounded-xl -z-10 ${isDark ? 'bg-zinc-800 shadow-inner border border-zinc-700' : 'bg-white shadow-sm border border-zinc-200'}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {s}
                {style === s && <Check size={14} className={isDark ? 'text-zinc-300' : 'text-zinc-600'} />}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

