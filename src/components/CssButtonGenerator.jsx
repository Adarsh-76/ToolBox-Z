import React, { useState } from 'react';
import styles from './CssButtonGenerator.module.css';

const CssButtonGenerator = () => {
  const [btn, setBtn] = useState({
    text: 'Click Me!',
    bgColor: '#FF9D9D',
    textColor: '#FFFFFF',
    fontSize: 16,
    padding: 12,
    radius: 12
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setBtn(prev => ({ ...prev, [key]: value }));
  };

  const cssCode = `button {
  background-color: ${btn.bgColor};
  color: ${btn.textColor};
  font-size: ${btn.fontSize}px;
  padding: ${btn.padding}px 2rem;
  border: none;
  border-radius: ${btn.radius}px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.previewArea}>
          <button 
            style={{
              backgroundColor: btn.bgColor,
              color: btn.textColor,
              fontSize: `${btn.fontSize}px`,
              padding: `${btn.padding}px 2rem`,
              borderRadius: `${btn.radius}px`,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {btn.text || 'Button Text'}
          </button>
        </div>

        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.inputGroup}>
            <label>Button Text</label>
            <input type="text" value={btn.text} onChange={(e) => handleChange('text', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.colorRow}>
            <div className={styles.inputGroup}>
              <label>Background</label>
              <input type="color" value={btn.bgColor} onChange={(e) => handleChange('bgColor', e.target.value)} className={styles.colorPicker} />
            </div>
            <div className={styles.inputGroup}>
              <label>Text Color</label>
              <input type="color" value={btn.textColor} onChange={(e) => handleChange('textColor', e.target.value)} className={styles.colorPicker} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Font Size ({btn.fontSize}px)</label>
            <input type="range" min="10" max="30" value={btn.fontSize} onChange={(e) => handleChange('fontSize', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Padding ({btn.padding}px)</label>
            <input type="range" min="5" max="30" value={btn.padding} onChange={(e) => handleChange('padding', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Border Radius ({btn.radius}px)</label>
            <input type="range" min="0" max="50" value={btn.radius} onChange={(e) => handleChange('radius', e.target.value)} className={styles.range} />
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.codeArea}`}>
        <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CSS'}</button>
        <pre className={styles.codeBlock}>{cssCode}</pre>
      </div>
    </div>
  );
};

export default CssButtonGenerator;
