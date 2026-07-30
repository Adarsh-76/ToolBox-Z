import React, { useState } from 'react';
import styles from './CaseConverter.module.css';

const CaseConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const convertCase = (type) => {
    let result = '';
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        result = input.toLowerCase().replace(/(^\w|\.\s+\w)/g, (txt) => txt.toUpperCase());
        break;
      case 'camel':
        result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case 'snake':
        result = input.trim().toLowerCase().replace(/[\s\W]+/g, '_');
        break;
      case 'kebab':
        result = input.trim().toLowerCase().replace(/[\s\W]+/g, '-');
        break;
      default:
        result = input;
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all text?")) {
      setInput('');
      setOutput('');
    }
  };

  const buttons = [
    { label: 'UPPERCASE', type: 'upper' },
    { label: 'lowercase', type: 'lower' },
    { label: 'Title Case', type: 'title' },
    { label: 'Sentence case', type: 'sentence' },
    { label: 'camelCase', type: 'camel' },
    { label: 'snake_case', type: 'snake' },
    { label: 'kebab-case', type: 'kebab' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttonGrid}>
        {buttons.map((btn) => (
          <button key={btn.type} className={styles.clayBtn} onClick={() => convertCase(btn.type)}>
            {btn.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.paneWrapper}>
          <div className={styles.headerRow}>
            <label className={styles.paneLabel}>Input Text</label>
            <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear All</button>
          </div>
          <div className={`liquid-glass ${styles.textAreaWrapper}`}>
            <textarea 
              className={styles.textarea}
              placeholder="Type or paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.paneWrapper}>
          <div className={styles.headerRow}>
            <label className={styles.paneLabel}>Output Text</label>
            <button className={`${styles.clayBtn} ${styles.copyBtn}`} onClick={handleCopy} disabled={!output}>
              {isCopied ? '✅ Copied!' : '📋 Copy Text'}
            </button>
          </div>
          <div className={`liquid-glass ${styles.textAreaWrapper}`}>
            <textarea 
              className={styles.textarea}
              placeholder="Converted text will appear here..."
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
