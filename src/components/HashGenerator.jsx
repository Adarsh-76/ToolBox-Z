import React, { useState, useEffect } from 'react';
import styles from './HashGenerator.module.css';

const HashGenerator = () => {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha384: '', sha512: '' });
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const generateHashes = async () => {
      if (!text) {
        setHashes({ sha1: '', sha256: '', sha384: '', sha512: '' });
        return;
      }
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results = await Promise.all(algorithms.map(async (alg) => {
        const hashBuffer = await crypto.subtle.digest(alg, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }));

      setHashes({
        sha1: results[0],
        sha256: results[1],
        sha384: results[2],
        sha512: results[3]
      });
    };

    generateHashes();
  }, [text]);

  const handleCopy = (hash, type) => {
    navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const hashList = [
    { label: 'SHA-1', value: hashes.sha1, key: 'sha1' },
    { label: 'SHA-256', value: hashes.sha256, key: 'sha256' },
    { label: 'SHA-384', value: hashes.sha384, key: 'sha384' },
    { label: 'SHA-512', value: hashes.sha512, key: 'sha512' },
  ];

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <label>Input Text</label>
        <textarea 
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here to generate hashes..."
          rows={4}
        />
        {text && (
          <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
        )}
      </div>

      <div className={styles.resultsGrid}>
        {hashList.map((hash) => (
          <div key={hash.key} className={`liquid-glass ${styles.hashCard}`}>
            <div className={styles.cardHeader}>
              <h3>{hash.label}</h3>
              {hash.value && (
                <button className={styles.copyBtn} onClick={() => handleCopy(hash.value, hash.key)}>
                  {copied === hash.key ? '✅ Copied!' : '📋 Copy'}
                </button>
              )}
            </div>
            <p className={styles.hashValue}>{hash.value || 'Waiting for input...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashGenerator;
