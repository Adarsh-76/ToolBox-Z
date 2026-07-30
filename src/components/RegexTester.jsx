import React, { useState, useMemo } from 'react';
import styles from './RegexTester.module.css';

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact us at support@example.com or sales@test.org for help.');
  const [error, setError] = useState('');

  const highlightedText = useMemo(() => {
    if (!pattern) {
      setError('');
      return text;
    }

    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      
      // If no global flag, we can only get the first match
      if (!flags.includes('g')) {
        const match = text.match(regex);
        if (match) {
          return text.replace(regex, `<span class="${styles.highlight}">${match[0]}</span>`);
        }
        return text;
      }

      // With global flag, replace all
      return text.replace(regex, (match) => `<span class="${styles.highlight}">${match}</span>`);
    } catch (e) {
      setError(e.message);
      return text;
    }
  }, [pattern, flags, text]);

  const matchCount = useMemo(() => {
    if (error || !pattern) return 0;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  }, [pattern, flags, text, error]);

  const handleClear = () => {
    setPattern('');
    setFlags('g');
    setText('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <div className={styles.regexRow}>
          <span className={styles.slash}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className={styles.patternInput}
            placeholder="Enter regex pattern..."
          />
          <span className={styles.slash}>/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className={styles.flagsInput}
            placeholder="gim"
            maxLength="3"
          />
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textInput}
          placeholder="Enter test text here..."
          rows="5"
        ></textarea>
        
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear All</button>
      </div>

      {error ? (
        <div className={styles.errorBox}>⚠️ {error}</div>
      ) : (
        <div className={styles.statsBar}>
          <span className={styles.stat}>✅ Matches found: <strong>{matchCount}</strong></span>
        </div>
      )}

      <div className={`liquid-glass ${styles.resultArea}`}>
        <h3>Visualization</h3>
        <div
          className={styles.highlightedText}
          dangerouslySetInnerHTML={{ __html: highlightedText || '<span style="opacity:0.5">Results will appear here...</span>' }}
        />
      </div>
    </div>
  );
};

export default RegexTester;
