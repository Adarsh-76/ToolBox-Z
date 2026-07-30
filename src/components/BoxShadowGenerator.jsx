import React, { useState } from 'react';
import styles from './BoxShadowGenerator.module.css';

const BoxShadowGenerator = () => {
  const [shadow, setShadow] = useState({
    x: 10,
    y: 10,
    blur: 20,
    spread: 0,
    color: '#43A047',
    opacity: 0.5,
    inset: false
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setShadow(prev => ({ ...prev, [key]: value }));
  };

  const rgbaColor = () => {
    const r = parseInt(shadow.color.slice(1, 3), 16);
    const g = parseInt(shadow.color.slice(3, 5), 16);
    const b = parseInt(shadow.color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${shadow.opacity})`;
  };

  const boxShadowCss = `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgbaColor()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.previewArea}>
          <div className={styles.previewBox} style={{ boxShadow: boxShadowCss }}></div>
        </div>

        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.inputGroup}>
            <label>X Offset ({shadow.x}px)</label>
            <input type="range" min="-50" max="50" value={shadow.x} onChange={(e) => handleChange('x', Number(e.target.value))} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Y Offset ({shadow.y}px)</label>
            <input type="range" min="-50" max="50" value={shadow.y} onChange={(e) => handleChange('y', Number(e.target.value))} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Blur ({shadow.blur}px)</label>
            <input type="range" min="0" max="100" value={shadow.blur} onChange={(e) => handleChange('blur', Number(e.target.value))} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Spread ({shadow.spread}px)</label>
            <input type="range" min="-30" max="30" value={shadow.spread} onChange={(e) => handleChange('spread', Number(e.target.value))} className={styles.range} />
          </div>
          <div className={styles.colorRow}>
            <div className={styles.inputGroup}>
              <label>Color</label>
              <input type="color" value={shadow.color} onChange={(e) => handleChange('color', e.target.value)} className={styles.colorPicker} />
            </div>
            <div className={styles.inputGroup}>
              <label>Opacity ({shadow.opacity})</label>
              <input type="range" min="0" max="1" step="0.1" value={shadow.opacity} onChange={(e) => handleChange('opacity', Number(e.target.value))} className={styles.range} />
            </div>
          </div>
          <div className={styles.checkboxRow}>
            <input type="checkbox" id="inset" checked={shadow.inset} onChange={(e) => handleChange('inset', e.target.checked)} />
            <label htmlFor="inset">Inset Shadow</label>
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.codeArea}`}>
        <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CSS'}</button>
        <pre className={styles.codeBlock}>box-shadow: {boxShadowCss};</pre>
      </div>
    </div>
  );
};

export default BoxShadowGenerator;
