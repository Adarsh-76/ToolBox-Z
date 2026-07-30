import React, { useState, useEffect, useRef } from 'react';
import styles from './PomodoroTimer.module.css';

const phases = {
  work: { duration: 25 * 60, label: 'Focus Time', next: 'short' },
  short: { duration: 5 * 60, label: 'Short Break', next: 'long' }, // Simplified: always alternate or go to long after 4
  long: { duration: 15 * 60, label: 'Long Break', next: 'work' },
};

const PomodoroTimer = () => {
  const [phase, setPhase] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(phases.work.duration);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const audioContextRef = useRef(null);

  // Init Audio Context for beep
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playBeep = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
  };

  // Timer logic
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          playBeep();
          handlePhaseChange();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const handlePhaseChange = () => {
    if (phase === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % 4 === 0) {
        setPhase('long');
        setSecondsLeft(phases.long.duration);
      } else {
        setPhase('short');
        setSecondsLeft(phases.short.duration);
      }
    } else {
      setPhase('work');
      setSecondsLeft(phases.work.duration);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('work');
    setSecondsLeft(phases.work.duration);
    setCycles(0);
  };

  const skipPhase = () => {
    setIsActive(false);
    handlePhaseChange();
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // SVG Circular Progress Math
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const progress = (phases[phase].duration - secondsLeft) / phases[phase].duration;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.phaseTabs}>
        <button className={`${styles.tabBtn} ${phase === 'work' ? styles.tabActive : ''}`} onClick={() => { setPhase('work'); setSecondsLeft(phases.work.duration); setIsActive(false); }}>Focus</button>
        <button className={`${styles.tabBtn} ${phase === 'short' ? styles.tabActive : ''}`} onClick={() => { setPhase('short'); setSecondsLeft(phases.short.duration); setIsActive(false); }}>Short Break</button>
        <button className={`${styles.tabBtn} ${phase === 'long' ? styles.tabActive : ''}`} onClick={() => { setPhase('long'); setSecondsLeft(phases.long.duration); setIsActive(false); }}>Long Break</button>
      </div>

      <div className={styles.timerWrapper}>
        <svg className={styles.svg} width="320" height="320" viewBox="0 0 320 320">
          <circle className={styles.track} cx="160" cy="160" r={radius} />
          <circle 
            className={styles.progress} 
            cx="160" cy="160" r={radius} 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            transform="rotate(-90 160 160)"
          />
        </svg>
        <div className={styles.timeDisplay}>
          <h2>{formatTime(secondsLeft)}</h2>
          <p>{phases[phase].label}</p>
          <span className={styles.cycleCount}>Cycles: {cycles}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.resetBtn} onClick={resetTimer}>🔄 Reset</button>
        <button className={styles.playBtn} onClick={toggleTimer}>
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button className={styles.skipBtn} onClick={skipPhase}>⏭️ Skip</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
