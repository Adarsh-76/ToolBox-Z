import React, { useState } from 'react';
import styles from './PulseGenerator.module.css';

const PulseGenerator = () => {
  const [pulse, setPulse] = useState({
    color: '#00F7FF',
    scale: 1.5,
    duration: 1.5
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (key, value) => {
    setPulse(prev => ({ ...prev, [key]: value }));
  };

  const cssCode = `@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 ${pulse.color}; }
  70% { transform: scale(${pulse.scale}); box-shadow: 0 0 0 20px rgba(0,0,0,0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
}

.pulse-element {
  animation: pulse ${pulse.duration}s infinite;
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
            className={styles.pulseBox}
            style={{
              background: pulse.color,
              animation: `pulse ${pulse.duration}s infinite`
            }}
          ></div>
          <style>{`@keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 ${pulse.color}; } 70% { transform: scale(${pulse.scale}); box-shadow: 0 0 0 20px rgba(0,0,0,0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0); } }`}</style>
        </div>

        <div className={`liquid-glass ${styles.controlsArea}`}>
          <div className={styles.inputGroup}>
            <label>Pulse Color</label>
            <input type="color" value={pulse.color} onChange={(e) => handleChange('color', e.target.value)} className={styles.colorPicker} />
          </div>
          <div className={styles.inputGroup}>
            <label>Max Scale ({pulse.scale}x)</label>
            <input type="range" min="1.1" max="2" step="0.1" value={pulse.scale} onChange={(e) => handleChange('scale', e.target.value)} className={styles.range} />
          </div>
          <div className={styles.inputGroup}>
            <label>Duration ({pulse.duration}s)</label>
            <input type="range" min="0.5" max="3" step="0.1" value={pulse.duration} onChange={(e) => handleChange('duration', e.target.value)} className={styles.range} />
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

export default PulseGenerator;
