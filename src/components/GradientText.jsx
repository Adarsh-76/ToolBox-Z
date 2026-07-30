import React, { useState } from 'react';
import styles from './GradientText.module.css';

const GradientText = () => {
  const [text, setText] = useState('ToolBox Z is Awesome!');
  const [color1, setColor1] = useState('#E3F2FD');
  const [color2, setColor2] = useState('#1E88E5');
  const [angle, setAngle] = useState(45);
  const [copied, setCopied] = useState(false);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.inputGroup}>
          <label>Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} className={styles.input} />
        </div>
        <div className={styles.colorRow}>
          <div className={styles.inputGroup}>
            <label>Color 1</label>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className={styles.colorPicker} />
          </div>
          <div className={styles.inputGroup}>
            <label>Color 2</label>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className={styles.colorPicker} />
          </div>
          <div className={styles.inputGroup}>
            <label>Angle ({angle}°)</label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(e.target.value)} className={styles.range} />
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.previewArea}`}>
        <h2 style={gradientStyle}>{text || 'Your Text Here'}</h2>
      </div>

      <div className={`liquid-glass ${styles.codeArea}`}>
        <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CSS'}</button>
        <pre className={styles.codeBlock}>{cssCode}</pre>
      </div>
    </div>
  );
};

export default GradientText;
