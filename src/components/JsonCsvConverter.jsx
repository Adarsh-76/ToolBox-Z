import React, { useState } from 'react';
import styles from './JsonCsvConverter.module.css';

const JsonCsvConverter = () => {
  const [mode, setMode] = useState('json-to-csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setError('');
    setOutput('');
    
    if (!input) return;

    try {
      if (mode === 'json-to-csv') {
        const data = JSON.parse(input);
        if (!Array.isArray(data)) throw new Error('JSON must be an array of objects.');
        
        const headers = Object.keys(data[0]);
        const csvRows = [
          headers.join(','),
          ...data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))
        ];
        setOutput(csvRows.join('\n'));
      } else {
        // CSV to JSON
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (values.length === headers.length) {
            const obj = {};
            headers.forEach((h, index) => {
              // Try to parse numbers/booleans
              let val = values[index].trim();
              if (!isNaN(val) && val !== '') val = Number(val);
              if (val === 'true') val = true;
              if (val === 'false') val = false;
              obj[h] = val;
            });
            result.push(obj);
          }
        }
        setOutput(JSON.stringify(result, null, 2));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwap = () => {
    setMode(mode === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv');
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.modeToggle}>
          <button className={`${styles.modeBtn} ${mode === 'json-to-csv' ? styles.active : ''}`} onClick={() => setMode('json-to-csv')}>JSON → CSV</button>
          <button className={styles.swapBtn} onClick={handleSwap}>⇄</button>
          <button className={`${styles.modeBtn} ${mode === 'csv-to-json' ? styles.active : ''}`} onClick={() => setMode('csv-to-json')}>CSV → JSON</button>
        </div>
        
        <div className={styles.ioGrid}>
          <div className={styles.inputGroup}>
            <label>{mode === 'json-to-csv' ? 'Input JSON' : 'Input CSV'}</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.codeInput}
              placeholder={mode === 'json-to-csv' ? '[{"name":"John","age":30}]' : 'name,age\nJohn,30'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>{mode === 'json-to-csv' ? 'Output CSV' : 'Output JSON'}</label>
            <textarea 
              value={output}
              className={styles.codeOutput}
              readOnly
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.buttonRow}>
          <button className={styles.convertBtn} onClick={handleConvert}>🔄 Convert</button>
          {output && <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>}
          <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
        </div>
      </div>
    </div>
  );
};

export default JsonCsvConverter;
