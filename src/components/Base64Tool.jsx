import React, { useState } from 'react';
import styles from './Base64Tool.module.css';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const encodeBase64 = () => {
    try {
      // Using TextEncoder to safely handle Unicode characters
      const bytes = new TextEncoder().encode(input);
      let binary = '';
      bytes.forEach((b) => binary += String.fromCharCode(b));
      setOutput(btoa(binary));
      setError('');
    } catch (err) {
      setError('Failed to encode text.');
    }
  };

  const decodeBase64 = () => {
    try {
      const binary = atob(input);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      setOutput(new TextDecoder().decode(bytes));
      setError('');
    } catch (err) {
      setError('Invalid Base64 string.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput(''); setOutput(''); setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonRow}>
        <button className={styles.actionBtn} onClick={encodeBase64}>🔒 Encode</button>
        <button className={styles.actionBtn} onClick={decodeBase64}>🔓 Decode</button>
        <button className={styles.actionBtn} onClick={clearAll}>🗑️ Clear</button>
        <button className={`${styles.actionBtn} ${styles.copyBtn}`} onClick={handleCopy} disabled={!output}>
          {isCopied ? '✅ Copied!' : '📋 Copy Output'}
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.paneWrapper}>
          <label className={styles.paneLabel}>Input Text</label>
          <div className={`liquid-glass ${styles.textAreaWrapper}`}>
            <textarea 
              className={styles.textarea}
              placeholder='Enter text to encode or Base64 to decode...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.paneWrapper}>
          <label className={styles.paneLabel}>Output</label>
          <div className={`liquid-glass ${styles.textAreaWrapper}`}>
            <textarea 
              className={styles.textarea}
              placeholder='Result will appear here...'
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
