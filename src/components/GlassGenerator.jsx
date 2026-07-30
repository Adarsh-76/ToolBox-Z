import React, { useState } from 'react';
import styles from './GlassGenerator.module.css';

const GlassGenerator = () => {
  const [glass, setGlass] = useState({
    blur: 10,
    opacity: 0.2,
    color: '#9FA1FF',
    radius: 16
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setGlass(prev => ({ ...prev, [key]: value }));
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgbaColor = `rgba(${hexToRgb(glass.color)}, ${glass.opacity})`;

  const glassCss = `.glass-card {
  background: ${rgbaColor};
  backdrop-filter: blur(${glass.blur}px);
  -webkit-backdrop-filter: blur(${glass.blur}px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${glass.radius}px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(glassCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.previewArea}>
          <div 
            className={styles.glassCard}
            style={{
              background: rgbaColor,
              backdropFilter: `blur(${glass.blur}px)`,
              WebkitBackdropFilter: `blur(${glass.blur}px)`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: `${glass.radius}px`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h3>Glass Card</h3>
            <p>This is a live preview of your glassmorphism effect.</p>
          </div>
        </div>

        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.inputGroup}>
            <label>Blur ({glass.blur}px)</label>
            <input type="range" min="0" max="30" value={glass.blur} onChange={(e) => handleChange('blur', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Transparency ({glass.opacity})</label>
            <input type="range" min="0" max="1" step="0.05" value={glass.opacity} onChange={(e) => handleChange('opacity', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Border Radius ({glass.radius}px)</label>
            <input type="range" min="0" max="50" value={glass.radius} onChange={(e) => handleChange('radius', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Glass Tint Color</label>
            <input type="color" value={glass.color} onChange={(e) => handleChange('color', e.target.value)} className={styles.colorPicker} />
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.codeArea}`}>
        <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CSS'}</button>
        <pre className={styles.codeBlock}>{glassCss}</pre>
      </div>
    </div>
  );
};

export default GlassGenerator;
