import React, { useState } from 'react';
import styles from './UuidGenerator.module.css';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(5);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateUuids = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID();
      if (!hyphens) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      newUuids.push(uuid);
    }
    setUuids(newUuids);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate initial 5 on mount
  React.useEffect(() => {
    generateUuids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.controlRow}>
          <label>Quantity: <span className={styles.val}>{count}</span></label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value))} 
            className={styles.slider}
          />
        </div>

        <div className={styles.toggleRow}>
          <div className={styles.toggleWrapper} onClick={() => setHyphens(!hyphens)}>
            <div className={`${styles.toggleSwitch} ${hyphens ? styles.toggleOn : ''}`}>
              <div className={styles.toggleKnob}></div>
            </div>
            <span>Hyphens (8-4-4-4)</span>
          </div>

          <div className={styles.toggleWrapper} onClick={() => setUppercase(!uppercase)}>
            <div className={`${styles.toggleSwitch} ${uppercase ? styles.toggleOn : ''}`}>
              <div className={styles.toggleKnob}></div>
            </div>
            <span>Uppercase</span>
          </div>
        </div>

        <button className={styles.generateBtn} onClick={generateUuids}>
          🔄 Generate New UUIDs
        </button>
      </div>

      <div className={`liquid-glass ${styles.outputArea}`}>
        <div className={styles.outputHeader}>
          <label className={styles.paneLabel}>Generated UUIDs (v4)</label>
          <button className={styles.copyBtn} onClick={handleCopy} disabled={uuids.length === 0}>
            {isCopied ? '✅ Copied!' : '📋 Copy All'}
          </button>
        </div>
        
        <div className={styles.uuidList}>
          {uuids.map((uuid, i) => (
            <div key={i} className={styles.uuidItem}>
              <span className={styles.uuidText}>{uuid}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
