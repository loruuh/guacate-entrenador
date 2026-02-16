export const playSound = (type: 'correct' | 'milestone' | 'complete') => {
  if (typeof window === 'undefined') return;

  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.value = 0.15;

  if (type === 'correct') {
    oscillator.frequency.value = 880;
    oscillator.type = 'sine';
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  } else if (type === 'milestone') {
    oscillator.frequency.value = 660;
    oscillator.type = 'sine';
    oscillator.start();
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(1100, ctx.currentTime + 0.2);
    oscillator.stop(ctx.currentTime + 0.3);
  } else if (type === 'complete') {
    oscillator.frequency.value = 523;
    oscillator.type = 'sine';
    oscillator.start();
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
    oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
    oscillator.stop(ctx.currentTime + 0.6);
  }

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === 'correct' ? 0.1 : type === 'milestone' ? 0.3 : 0.6));
};
