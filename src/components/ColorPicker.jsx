import React, { useState } from 'react';
import styles from './ColorPicker.module.css';

const ColorPicker = () => {
  const [color, setColor] = useState('#3C096C');
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const formats = [
    { label: 'HEX', value: color.toUpperCase(), type: 'hex' },
    { label: 'RGB', value: hexToRgb(color), type: 'rgb' },
    { label: 'HSL', value: hexToHsl(color), type: 'hsl' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.previewArea} style={{ background: color }}>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          className={styles.nativePicker}
        />
      </div>

      <div className={styles.formatsGrid}>
        {formats.map((fmt) => (
          <div 
            key={fmt.type} 
            className={`liquid-glass ${styles.formatCard}`}
            onClick={() => handleCopy(fmt.value, fmt.type)}
          >
            <div className={styles.formatHeader}>
              <span className={styles.formatLabel}>{fmt.label}</span>
              <span className={styles.copyIcon}>{copied === fmt.type ? '✅' : '📋'}</span>
            </div>
            <p className={styles.formatValue}>{fmt.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
