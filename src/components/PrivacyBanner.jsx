import React, { useState, useEffect } from 'react';
import styles from './PrivacyBanner.module.css';

const PrivacyBanner = ({ onClear }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`liquid-glass ${styles.banner}`}>
      <div className={styles.info}>
        <span className={styles.icon}>🛡️</span>
        <div>
          <p className={styles.title}>Secure & Private Processing</p>
          <p className={styles.desc}>
            Your files are processed locally. Temporary data will be auto-cleared in <strong>{formatTime(timeLeft)}</strong>.
          </p>
        </div>
      </div>
      <button className={styles.deleteBtn} onClick={onClear}>
        🗑️ Delete Now
      </button>
    </div>
  );
};

export default PrivacyBanner;
