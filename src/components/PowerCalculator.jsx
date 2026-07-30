import React, { useState, useMemo } from 'react';
import styles from './PowerCalculator.module.css';

const formatNumber = (num) => {
  if (isNaN(num)) return '-';
  if (!isFinite(num)) return '∞';
  // Format large/small numbers nicely without losing precision
  return parseFloat(num.toPrecision(12)).toLocaleString(undefined, { maximumFractionDigits: 6 });
};

const PowerCalculator = () => {
  const [num, setNum] = useState('16');
  const [customExp, setCustomExp] = useState('5');
  const [customRoot, setCustomRoot] = useState('3');

  const parsedNum = useMemo(() => parseFloat(num), [num]);
  
  const results = useMemo(() => {
    if (isNaN(parsedNum)) return {};
    
    return {
      square: parsedNum ** 2,
      cube: parsedNum ** 3,
      fourth: parsedNum ** 4,
      sqrt: Math.sqrt(parsedNum),
      cbrt: Math.cbrt(parsedNum),
      fourthRoot: parsedNum ** (1 / 4),
    };
  }, [parsedNum]);

  const customExpResult = useMemo(() => {
    const exp = parseFloat(customExp);
    if (isNaN(parsedNum) || isNaN(exp)) return '-';
    return formatNumber(parsedNum ** exp);
  }, [parsedNum, customExp]);

  const customRootResult = useMemo(() => {
    const root = parseFloat(customRoot);
    if (isNaN(parsedNum) || isNaN(root) || root === 0) return '-';
    return formatNumber(parsedNum ** (1 / root));
  }, [parsedNum, customRoot]);

  const handleClear = () => {
    setNum('');
    setCustomExp('');
    setCustomRoot('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <label>Enter a Number</label>
        <input 
          type="number" 
          value={num} 
          onChange={(e) => setNum(e.target.value)} 
          className={styles.input} 
          placeholder="e.g., 16" 
        />
        {num && <button className={styles.clearBtn} onClick={handleClear}>✖</button>}
      </div>

      <div className={styles.resultsGrid}>
        <div className={`liquid-glass ${styles.card}`}>
          <h3>Square (<em>x²</em>)</h3>
          <p className={styles.value}>{formatNumber(results.square)}</p>
        </div>
        <div className={`liquid-glass ${styles.card}`}>
          <h3>Cube (<em>x³</em>)</h3>
          <p className={styles.value}>{formatNumber(results.cube)}</p>
        </div>
        <div className={`liquid-glass ${styles.card}`}>
          <h3>Square Root (<em>√x</em>)</h3>
          <p className={styles.value}>{formatNumber(results.sqrt)}</p>
        </div>
        <div className={`liquid-glass ${styles.card}`}>
          <h3>Cube Root (<em>³√x</em>)</h3>
          <p className={styles.value}>{formatNumber(results.cbrt)}</p>
        </div>
      </div>

      <div className={styles.customGrid}>
        <div className={`liquid-glass ${styles.customCard}`}>
          <h3>Custom Power (<em>x<sup>y</sup></em>)</h3>
          <div className={styles.customInputRow}>
            <input 
              type="number" 
              value={customExp} 
              onChange={(e) => setCustomExp(e.target.value)} 
              className={styles.smallInput} 
              placeholder="y" 
            />
          </div>
          <p className={styles.value}>{customExpResult}</p>
        </div>

        <div className={`liquid-glass ${styles.customCard}`}>
          <h3>Custom Root (<em><sup>y</sup>√x</em>)</h3>
          <div className={styles.customInputRow}>
            <input 
              type="number" 
              value={customRoot} 
              onChange={(e) => setCustomRoot(e.target.value)} 
              className={styles.smallInput} 
              placeholder="y" 
            />
          </div>
          <p className={styles.value}>{customRootResult}</p>
        </div>
      </div>
    </div>
  );
};

export default PowerCalculator;
