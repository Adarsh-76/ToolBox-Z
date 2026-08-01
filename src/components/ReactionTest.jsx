import React, { useState, useRef } from 'react';
import styles from './ReactionTest.module.css';

const ReactionTest = () => {
  const [state, setState] = useState('idle'); // idle, waiting, ready, clicked, tooSoon
  const [time, setTime] = useState(0);
  const startTime = useRef(0);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    if (state === 'idle' || state === 'clicked' || state === 'tooSoon') {
      setState('waiting');
      const delay = Math.floor(Math.random() * 4000) + 2000; // 2-6 seconds
      timeoutRef.current = setTimeout(() => {
        setState('ready');
        startTime.current = Date.now();
      }, delay);
    } else if (state === 'waiting') {
      clearTimeout(timeoutRef.current);
      setState('tooSoon');
    } else if (state === 'ready') {
      const reactionTime = Date.now() - startTime.current;
      setTime(reactionTime);
      setState('clicked');
    }
  };

  const getBgColor = () => {
    switch(state) {
      case 'waiting': return '#ef4444';
      case 'ready': return '#22c55e';
      default: return 'var(--glass-bg)';
    }
  };

  const getMessage = () => {
    switch(state) {
      case 'idle': return 'Click to start';
      case 'waiting': return 'Wait for green...';
      case 'ready': return 'CLICK NOW!';
      case 'clicked': return `${time} ms! Click to retry`;
      case 'tooSoon': return 'Too soon! Click to retry';
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.box}
        style={{ backgroundColor: getBgColor(), cursor: 'pointer' }}
        onClick={handleClick}
      >
        <h2 className={styles.text}>{getMessage()}</h2>
        {state === 'clicked' && time < 250 && <p className={styles.rank}>⚡ Lightning Fast!</p>}
        {state === 'clicked' && time >= 250 && time < 350 && <p className={styles.rank}>👍 Good Reflexes</p>}
        {state === 'clicked' && time >= 350 && <p className={styles.rank}>🐢 Keep Practicing</p>}
      </div>
    </div>
  );
};

export default ReactionTest;
