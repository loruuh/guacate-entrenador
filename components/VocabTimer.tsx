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

  return (
    <>
      {showCelebration && <ConfettiAnimation />}

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl animate-bounce">
            🎉 Zeit abgelaufen! Gut gemacht! 🎉
          </div>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleTimer}
          aria-label={isActive ? 'Timer pausieren' : 'Timer starten'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all text-sm text-white ${
            isActive
              ? 'bg-green-600 hover:bg-green-700 animate-pulse'
              : seconds < 120
              ? 'bg-yellow-600 hover:bg-yellow-700'
              : 'bg-blue-600/80 hover:bg-blue-600'
          }`}
        >
          <span className="text-base">{isActive ? '⏸' : '⏳'}</span>
          <span className="tabular-nums">{formatTime(seconds)}</span>
        </button>

        {!isAtStart && (
          <button
            onClick={resetTimer}
            aria-label="Timer zurücksetzen"
            className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
          >
            🔄
          </button>
        )}
      </div>
    </>
  );
}
