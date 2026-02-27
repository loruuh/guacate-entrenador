'use client';

import { useState, useEffect } from 'react';
import ConfettiAnimation from './ConfettiAnimation';
import { playSound } from '@/lib/sounds';

export function VocabTimer() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    if (seconds === 0) {
      setIsActive(false);
      setShowCelebration(true);
      playSound('complete');
      const celebrationTimeout = setTimeout(() => {
        setShowCelebration(false);
        setSeconds(120);
      }, 3000);
      return () => clearTimeout(celebrationTimeout);
    }

    const tick = setTimeout(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearTimeout(tick);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(prev => !prev);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(120);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining.toString().padStart(2, '0')}`;
  };

  const isAtStart = seconds === 120 && !isActive;
  const progress = ((120 - seconds) / 120) * 100;

  return (
    <>
      {showCelebration && <ConfettiAnimation />}

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white px-12 py-6 rounded-3xl text-3xl font-bold shadow-2xl animate-bounce">
            🎉 Zeit abgelaufen! Super! 🎉
          </div>
        </div>
      )}

      <div className="relative">
        {/* Glasmorphism Container */}
        <div
          onClick={toggleTimer}
          aria-label={isActive ? 'Timer pausieren' : 'Timer starten'}
          role="button"
          className={`
            relative overflow-hidden
            px-5 py-3 rounded-2xl
            bg-gradient-to-br from-blue-500/20 to-purple-600/20
            backdrop-blur-lg
            border-2
            transition-all duration-300
            hover:scale-105 cursor-pointer select-none
            ${isActive
              ? 'border-green-400 shadow-lg shadow-green-400/40'
              : 'border-blue-400/50 hover:border-blue-400 shadow-lg shadow-blue-500/20'
            }
          `}
        >
          {/* Animated gradient overlay when running */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 animate-gradient-x" />
          )}

          <div className="relative flex items-center gap-3">
            {/* Hourglass icon */}
            <span className={`text-2xl leading-none ${isActive ? 'animate-hourglass' : ''}`}>
              ⏳
            </span>

            {/* Time + label */}
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-200">
                {isActive ? 'Läuft…' : 'Timer'}
              </span>
              <span className={`text-xl font-bold tabular-nums ${isActive ? 'text-green-300' : 'text-white'}`}>
                {formatTime(seconds)}
              </span>
            </div>

            {/* Reset button — only when not at start */}
            {!isAtStart && (
              <button
                onClick={(e) => { e.stopPropagation(); resetTimer(); }}
                aria-label="Timer zurücksetzen"
                className="ml-1 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-180"
              >
                🔄
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
