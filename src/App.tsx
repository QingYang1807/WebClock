/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Monitor, Layers, Moon, Sun } from 'lucide-react';

type ClockMode = 'analog' | 'digital' | 'both';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<ClockMode>('both');
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

  // Calculate angles
  const secondAngle = (seconds + milliseconds / 1000) * 6;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  // Format digital time
  const formattedDate = time.toLocaleDateString('zh-CN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-900'}`}>
      
      {/* Header Controls */}
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <div className={`flex p-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
          <button
            onClick={() => setMode('analog')}
            className={`p-2 rounded-full transition-colors ${mode === 'analog' ? (isDark ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-sm') : 'text-zinc-500 hover:text-zinc-400'}`}
            title="Analog"
          >
            <Clock size={20} />
          </button>
          <button
            onClick={() => setMode('digital')}
            className={`p-2 rounded-full transition-colors ${mode === 'digital' ? (isDark ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-sm') : 'text-zinc-500 hover:text-zinc-400'}`}
            title="Digital"
          >
            <Monitor size={20} />
          </button>
          <button
            onClick={() => setMode('both')}
            className={`p-2 rounded-full transition-colors ${mode === 'both' ? (isDark ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900 shadow-sm') : 'text-zinc-500 hover:text-zinc-400'}`}
            title="Both"
          >
            <Layers size={20} />
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-colors ${isDark ? 'bg-zinc-900 text-zinc-400 hover:text-zinc-100' : 'bg-zinc-200 text-zinc-500 hover:text-zinc-900'}`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-16 w-full max-w-4xl p-8">
        <AnimatePresence mode="popLayout">
          {(mode === 'analog' || mode === 'both') && (
            <motion.div
              key="analog"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              {/* Clock Face */}
              <div className={`absolute inset-0 rounded-full border-4 shadow-2xl ${isDark ? 'border-zinc-800 bg-zinc-900/50 shadow-black/50' : 'border-zinc-200 bg-white shadow-zinc-300/50'}`}>
                {/* Tick Marks */}
                {[...Array(60)].map((_, i) => {
                  const isHour = i % 5 === 0;
                  return (
                    <div
                      key={i}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
                      style={{ transform: `rotate(${i * 6}deg)` }}
                    >
                      <div
                        className={`mx-auto ${isHour ? 'w-1.5 h-4 mt-2' : 'w-0.5 h-2 mt-2'} ${isDark ? (isHour ? 'bg-zinc-400' : 'bg-zinc-700') : (isHour ? 'bg-zinc-600' : 'bg-zinc-300')}`}
                      />
                    </div>
                  );
                })}

                {/* Hour Hand */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center"
                  style={{ transform: `rotate(${hourAngle}deg)` }}
                >
                  <div className={`w-2 h-24 mt-20 md:mt-24 rounded-full ${isDark ? 'bg-zinc-200' : 'bg-zinc-800'}`} style={{ transformOrigin: 'bottom' }} />
                </div>

                {/* Minute Hand */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center"
                  style={{ transform: `rotate(${minuteAngle}deg)` }}
                >
                  <div className={`w-1.5 h-32 mt-12 md:mt-16 rounded-full ${isDark ? 'bg-zinc-400' : 'bg-zinc-600'}`} style={{ transformOrigin: 'bottom' }} />
                </div>

                {/* Second Hand */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center"
                  style={{ transform: `rotate(${secondAngle}deg)` }}
                >
                  <div className="w-0.5 h-40 mt-4 md:mt-8 bg-red-500 rounded-full" style={{ transformOrigin: 'bottom' }} />
                </div>

                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-zinc-950" />
              </div>
            </motion.div>
          )}

          {(mode === 'digital' || mode === 'both') && (
            <motion.div
              key="digital"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              {/* Date (Small Text) */}
              <div className={`text-lg md:text-xl font-medium tracking-wide mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {formattedDate}
              </div>
              
              {/* Time (Large Text) */}
              <div className="text-6xl md:text-8xl font-bold tracking-tighter tabular-nums font-mono">
                {formattedTime}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
