import React, { useState, useEffect } from 'react';
import styles from './PaletteGenerator.module.css';

const PaletteGenerator = () => {
  const [colors, setColors] = useState([]);
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [copied, setCopied] = useState('');
  const [activeOptions, setActiveOptions] = useState([]);

  const availableOptions = [
    'Pastel', 'Vintage', 'Neon', 'Dark', 
    'Warm', 'Cold', 'Summer', 'Winter', 
    'Muted', 'Gold', 'Earthy'
  ];

  // Helper: Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Generate colors based on selected options using HSL
  const generateColor = () => {
    let h = Math.random() * 360;
    let s = 50 + Math.random() * 50; // 50-100%
    let l = 40 + Math.random() * 40; // 40-80%

    if (activeOptions.length === 0) {
      return hslToHex(h, s, l); // Pure random
    }

    // Apply rules based on active options
    activeOptions.forEach(opt => {
      switch(opt) {
        case 'Pastel': l = 75 + Math.random() * 15; s = 40 + Math.random() * 20; break;
        case 'Vintage': l = 45 + Math.random() * 15; s = 25 + Math.random() * 20; break;
        case 'Neon': s = 90 + Math.random() * 10; l = 50 + Math.random() * 10; break;
        case 'Dark': l = 15 + Math.random() * 20; break;
        case 'Warm': h = Math.random() * 60; break; // Reds to Yellow
        case 'Cold': h = 180 + Math.random() * 80; break; // Cyan to Blue
        case 'Summer': h = Math.random() * 60; s = 70 + Math.random() * 20; l = 50 + Math.random() * 20; break;
        case 'Winter': h = 180 + Math.random() * 80; s = 20 + Math.random() * 20; l = 60 + Math.random() * 20; break;
        case 'Muted': s = 15 + Math.random() * 15; break;
        case 'Gold': h = 40 + Math.random() * 15; s = 80 + Math.random() * 20; l = 45 + Math.random() * 10; break;
        case 'Earthy': h = 20 + Math.random() * 40; s = 30 + Math.random() * 20; l = 35 + Math.random() * 20; break;
        default: break;
      }
    });

    return hslToHex(h, s, l);
  };

  const generatePalette = () => {
    // FIX: Explicitly create a new array of 5 items to prevent map() bugs
    const newColors = Array.from({ length: 5 }, (_, index) => {
      // Keep the color if it's locked AND exists
      if (locked[index] && colors[index]) {
        return colors[index];
      }
      return generateColor();
    });
    setColors(newColors);
  };

  // Generate initial palette on mount
  useEffect(() => {
    setColors(Array.from({ length: 5 }, () => generateColor()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate palette automatically when options change
  useEffect(() => {
    if (locked.every(l => l)) return;
    generatePalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOptions]);

  const toggleOption = (opt) => {
    setActiveOptions(prev => {
      if (prev.includes(opt)) {
        return prev.filter(o => o !== opt);
      }
      if (prev.length >= 3) {
        alert("You can select a maximum of 3 options.");
        return prev;
      }
      return [...prev, opt];
    });
  };

  const toggleLock = (index) => {
    const newLocked = [...locked];
    newLocked[index] = !newLocked[index];
    setLocked(newLocked);
  };

  const handleCopy = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        {/* Options Section */}
        <div className={styles.optionsWrapper}>
          <p className={styles.optionsLabel}>Filter by Mood/Theme (Max 3)</p>
          <div className={styles.optionsGrid}>
            {availableOptions.map(opt => (
              <button 
                key={opt}
                className={`${styles.optionBtn} ${activeOptions.includes(opt) ? styles.optionActive : ''}`}
                onClick={() => toggleOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.generateBtn} onClick={generatePalette}>
          🎲 Generate New Palette
        </button>
        <p className={styles.hint}>Click a color to copy its HEX code. Click 🔒 to lock it.</p>
      </div>

      <div className={styles.paletteGrid}>
        {colors.map((color, index) => (
          <div 
            key={index} 
            className={styles.colorColumn}
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color, index)}
          >
            <div className={styles.colorActions}>
              <button 
                className={styles.lockBtn}
                onClick={(e) => { e.stopPropagation(); toggleLock(index); }}
              >
                {locked[index] ? '🔒' : '🔓'}
              </button>
            </div>
            
            <div className={`liquid-glass ${styles.hexBox}`}>
              {copied === index ? '✅ Copied!' : color.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteGenerator;
