import React, { useState } from 'react';
import styles from './CssGridGenerator.module.css';

const CssGridGenerator = () => {
  const [grid, setGrid] = useState({
    cols: 3,
    rows: 2,
    gap: 10,
    colGap: 10
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setGrid(prev => ({ ...prev, [key]: Number(value) }));
  };

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${grid.cols}, 1fr);
  grid-template-rows: repeat(${grid.rows}, 1fr);
  column-gap: ${grid.colGap}px;
  row-gap: ${grid.gap}px;
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
          <div 
            className={styles.gridBox}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
              gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
              columnGap: `${grid.colGap}px`,
              rowGap: `${grid.gap}px`
            }}
          >
            {Array.from({ length: grid.cols * grid.rows }).map((_, i) => (
              <div key={i} className={styles.gridItem}></div>
            ))}
          </div>
        </div>

        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.inputGroup}>
            <label>Columns ({grid.cols})</label>
            <input type="range" min="1" max="6" value={grid.cols} onChange={(e) => handleChange('cols', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Rows ({grid.rows})</label>
            <input type="range" min="1" max="6" value={grid.rows} onChange={(e) => handleChange('rows', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Row Gap ({grid.gap}px)</label>
            <input type="range" min="0" max="50" value={grid.gap} onChange={(e) => handleChange('gap', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Column Gap ({grid.colGap}px)</label>
            <input type="range" min="0" max="50" value={grid.colGap} onChange={(e) => handleChange('colGap', e.target.value)} className={styles.range} />
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

export default CssGridGenerator;
