import React, { useState } from 'react';
import { diffLines } from 'diff';
import styles from './TextDiffChecker.module.css';

const TextDiffChecker = () => {
  const [originalText, setOriginalText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [diffResult, setDiffResult] = useState(null);

  const handleCompare = () => {
    if (!originalText && !changedText) return;
    const diff = diffLines(originalText, changedText);
    setDiffResult(diff);
  };

  const handleClear = () => {
    setOriginalText('');
    setChangedText('');
    setDiffResult(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGrid}>
        <div className={styles.inputGroup}>
          <label>Original Text</label>
          <textarea
            className={styles.textarea}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste original text here..."
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Changed Text</label>
          <textarea
            className={styles.textarea}
            value={changedText}
            onChange={(e) => setChangedText(e.target.value)}
            placeholder="Paste changed text here..."
          />
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.compareBtn} onClick={handleCompare}>🔍 Compare Text</button>
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
      </div>

      {diffResult && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3>Differences</h3>
          <div className={styles.diffOutput}>
            {diffResult.map((part, index) => (
              <span
                key={index}
                className={`${styles.diffPart} ${part.added ? styles.added : part.removed ? styles.removed : styles.unchanged}`}
              >
                {part.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextDiffChecker;
