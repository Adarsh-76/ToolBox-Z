import React, { useState, useMemo } from 'react';
import styles from './ContrastChecker.module.css';

// Helper functions to calculate WCAG contrast ratio
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const luminance = (r, g, b) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const calculateContrast = (hex1, hex2) => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const lum1 = luminance(r1, g1, b1);
  const lum2 = luminance(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const ContrastChecker = () => {
  const [bgColor, setBgColor] = useState('#050810');
  const [textColor, setTextColor] = useState('#00FFAB');

  const ratio = useMemo(() => calculateContrast(bgColor, textColor), [bgColor, textColor]);
  const formattedRatio = ratio.toFixed(2);

  // WCAG Pass/Fail Logic
  const results = {
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.inputGroup}>
          <label>Background Color</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className={styles.colorPicker} />
          <span className={styles.hexCode}>{bgColor}</span>
        </div>
        
        <div className={styles.inputGroup}>
          <label>Text Color</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className={styles.colorPicker} />
          <span className={styles.hexCode}>{textColor}</span>
        </div>
      </div>

      <div 
        className={styles.previewArea} 
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <h2>The quick brown fox jumps over the lazy dog. 1234567890</h2>
        <p>This is a paragraph of text to show how readable it is at a smaller size. Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={`liquid-glass ${styles.resultsArea}`}>
        <div className={styles.ratioDisplay}>
          Contrast Ratio: <span className={styles.ratioValue}>{formattedRatio}:1</span>
        </div>

        <div className={styles.wcagGrid}>
          <div className={`${styles.wcagBadge} ${results.aaNormal ? styles.pass : styles.fail}`}>
            <h4>AA Normal Text</h4>
            <p>{results.aaNormal ? '✅ Pass' : '❌ Fail'} (Requires 4.5:1)</p>
          </div>
          <div className={`${styles.wcagBadge} ${results.aaLarge ? styles.pass : styles.fail}`}>
            <h4>AA Large Text</h4>
            <p>{results.aaLarge ? '✅ Pass' : '❌ Fail'} (Requires 3.0:1)</p>
          </div>
          <div className={`${styles.wcagBadge} ${results.aaaNormal ? styles.pass : styles.fail}`}>
            <h4>AAA Normal Text</h4>
            <p>{results.aaaNormal ? '✅ Pass' : '❌ Fail'} (Requires 7.0:1)</p>
          </div>
          <div className={`${styles.wcagBadge} ${results.aaaLarge ? styles.pass : styles.fail}`}>
            <h4>AAA Large Text</h4>
            <p>{results.aaaLarge ? '✅ Pass' : '❌ Fail'} (Requires 4.5:1)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
