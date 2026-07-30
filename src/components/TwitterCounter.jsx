import React, { useState } from 'react';
import styles from './TwitterCounter.module.css';

const TwitterCounter = () => {
  const [text, setText] = useState('');
  const limit = 280;
  const count = text.length;
  const remaining = limit - count;
  const percentage = (count / limit) * 100;

  // Determine color based on percentage
  let progressColor = '#22c55e'; // Green (Safe)
  if (percentage > 80 && percentage <= 95) {
    progressColor = '#FFAF38'; // Orange (Warning)
  } else if (percentage > 95) {
    progressColor = '#FF3232'; // Red (Danger)
  }

  // SVG Circle Math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.workspace}`}>
        <div className={styles.header}>
          <div className={styles.ringWrapper}>
            <svg width="120" height="120" className={styles.progressRing}>
              <circle 
                cx="60" 
                cy="60" 
                r={radius} 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="8" 
                fill="none" 
              />
              <circle 
                cx="60" 
                cy="60" 
                r={radius} 
                stroke={progressColor} 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div className={styles.countText}>
              <span style={{ color: progressColor }}>{remaining}</span>
              <p>Left</p>
            </div>
          </div>
          
          <div className={styles.stats}>
            <h3>Twitter (X) Limit: <span style={{ color: progressColor }}>{limit}</span></h3>
            <p>Current Characters: <strong>{count}</strong></p>
            <p>Percentage Used: <strong>{percentage.toFixed(1)}%</strong></p>
          </div>
        </div>

        <textarea 
          className={styles.textarea}
          placeholder="Start typing your tweet here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className={styles.buttonRow}>
          <button className={styles.clearBtn} onClick={() => setText('')}>
            🗑️ Clear Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwitterCounter;
