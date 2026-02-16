'use client';

import { useEffect, useState } from 'react';

export function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem('learning-streak');
    const lastDate = localStorage.getItem('last-learning-date');
    const today = new Date().toDateString();

    if (savedStreak && lastDate) {
      if (lastDate === today) {
        setStreak(parseInt(savedStreak));
      } else if (isYesterday(new Date(lastDate))) {
        const newStreak = parseInt(savedStreak) + 1;
        setStreak(newStreak);
        localStorage.setItem('learning-streak', newStreak.toString());
        localStorage.setItem('last-learning-date', today);
      } else {
        setStreak(1);
        localStorage.setItem('learning-streak', '1');
        localStorage.setItem('last-learning-date', today);
      }
    } else {
      setStreak(1);
      localStorage.setItem('learning-streak', '1');
      localStorage.setItem('last-learning-date', today);
    }
  }, []);

  return null;
}

function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedStreak = localStorage.getItem('learning-streak');
    const lastDate = localStorage.getItem('last-learning-date');
    const today = new Date().toDateString();

    if (savedStreak && lastDate) {
      if (lastDate === today) {
        setStreak(parseInt(savedStreak));
      } else if (isYesterday(new Date(lastDate))) {
        const newStreak = parseInt(savedStreak) + 1;
        setStreak(newStreak);
        localStorage.setItem('learning-streak', newStreak.toString());
        localStorage.setItem('last-learning-date', today);
      } else {
        setStreak(1);
        localStorage.setItem('learning-streak', '1');
        localStorage.setItem('last-learning-date', today);
      }
    } else {
      setStreak(1);
      localStorage.setItem('learning-streak', '1');
      localStorage.setItem('last-learning-date', today);
    }
  }, []);

  return streak;
}
