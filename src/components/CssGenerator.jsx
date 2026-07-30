import React, { useState } from 'react';
import styles from './CssGenerator.module.css';

const CssGenerator = () => {
  const [hOffset, setHOffset] = useState(5);
  const [vOffset, setVOffset] = useState(5);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [radius, setRadius] = useState(12);
  const [isCopied, setIsCopied] = useState(false);

  const boxShadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;
  const cssCode = `border-radius: ${radius}px;\nbox-shadow: ${boxShadow};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Left Column: Controls */}
        <div className={`liquid-glass ${styles.controls}`}>
          <div className={styles.controlRow}>
            <label>Horizontal Offset: <span>{hOffset}px</span></label>
            <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(e.target.value)} className={styles.slider} />
          </div>
          <div className={styles.controlRow}>
            <label>Vertical Offset: <span>{vOffset}px</span></label>
            <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(e.target.value)} className={styles.slider} />
          </div>
          <div className={styles.controlRow}>
            <label>Blur: <span>{blur}px</span></label>
            <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(e.target.value)} className={styles.slider} />
          </div>
          <div className={styles.controlRow}>
            <label>Spread: <span>{spread}px</span></label>
            <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(e.target.value)} className={styles.slider} />
          </div>
          <div className={styles.controlRow}>
            <label>Border Radius: <span>{radius}px</span></label>
            <input type="range" min="0" max="100" value={radius} onChange={(e) => setRadius(e.target.value)} className={styles.slider} />
          </div>
          <div className={styles.colorRow}>
            <label>Shadow Color:</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.colorPicker} />
          </div>
        </div>

        {/* Right Column: Preview & Code */}
        <div className={styles.previewColumn}>
          <div className={styles.previewArea}>
            <div 
              className={styles.previewBox} 
              style={{ borderRadius: `${radius}px`, boxShadow: boxShadow }}
            ></div>
          </div>

          <div className={`liquid-glass ${styles.codeBlock}`}>
            <pre className={styles.codeText}>{cssCode}</pre>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {isCopied ? '✅ Copied!' : '📋 Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssGenerator;
