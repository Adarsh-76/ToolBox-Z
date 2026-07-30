import React, { useState, useMemo } from 'react';
import styles from './PercentageCalculator.module.css';

const PercentageCalculator = () => {
  const [mode, setMode] = useState('of');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const result = useMemo(() => {
    const x = parseFloat(val1);
    const y = parseFloat(val2);

    if (isNaN(x) || isNaN(y)) return '---';

    if (mode === 'of') {
      // What is X% of Y?
      return ((x / 100) * y).toLocaleString(undefined, { maximumFractionDigits: 4 });
    } else if (mode === 'is') {
      // X is what % of Y?
      if (y === 0) return 'Cannot divide by zero';
      return ((x / y) * 100).toFixed(2) + '%';
    } else if (mode === 'change') {
      // % increase/decrease from X to Y
      if (x === 0) return 'Cannot divide by zero';
      const change = ((y - x) / Math.abs(x)) * 100;
      return (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    }
    return '---';
  }, [mode, val1, val2]);

  const getLabels = () => {
    if (mode === 'of') return { l1: 'Percentage (%)', l2: 'Of Value' };
    if (mode === 'is') return { l1: 'Value', l2: 'Total Value' };
    if (mode === 'change') return { l1: 'From Value', l2: 'To Value' };
  };

  const labels = getLabels();

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.modeSelector}`}>
        <button className={`${styles.modeBtn} ${mode === 'of' ? styles.modeActive : ''}`} onClick={() => setMode('of')}>What is X% of Y?</button>
        <button className={`${styles.modeBtn} ${mode === 'is' ? styles.modeActive : ''}`} onClick={() => setMode('is')}>X is what % of Y?</button>
        <button className={`${styles.modeBtn} ${mode === 'change' ? styles.modeActive : ''}`} onClick={() => setMode('change')}>% Change</button>
      </div>

      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputGroup}>
          <label>{labels.l1}</label>
          <input 
            type="number" 
            value={val1} 
            onChange={(e) => setVal1(e.target.value)} 
            className={styles.numberInput}
            placeholder="0"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>{labels.l2}</label>
          <input 
            type="number" 
            value={val2} 
            onChange={(e) => setVal2(e.target.value)} 
            className={styles.numberInput}
            placeholder="0"
          />
        </div>
      </div>

      <div className={`liquid-glass ${styles.resultArea}`}>
        <span className={styles.resultLabel}>Result</span>
        <h3 className={styles.resultValue}>{result}</h3>
      </div>
    </div>
  );
};

export default PercentageCalculator;
