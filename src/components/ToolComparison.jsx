import React, { useState } from 'react';
import styles from './ToolComparison.module.css';

const formatData = {
  PNG: {
    size: 'Large', quality: 'Lossless', transparency: 'Yes', animation: 'No', browserSupport: '100%', bestFor: 'Graphics, logos, and images requiring sharp edges or transparency.'
  },
  JPG: {
    size: 'Small', quality: 'Lossy', transparency: 'No', animation: 'No', browserSupport: '100%', bestFor: 'Photographs and complex images with millions of colors.'
  },
  WebP: {
    size: 'Very Small', quality: 'Lossy/Lossless', transparency: 'Yes', animation: 'Yes', browserSupport: '98%', bestFor: 'Modern web images replacing JPG and PNG for faster loading.'
  },
  GIF: {
    size: 'Large', quality: 'Lossless (256 colors)', transparency: 'Yes', animation: 'Yes', browserSupport: '100%', bestFor: 'Simple animations and graphics with few colors.'
  },
  SVG: {
    size: 'Tiny', quality: 'Vector (Infinite)', transparency: 'Yes', animation: 'Yes (via CSS/JS)', browserSupport: '99%', bestFor: 'Logos, icons, and graphics that need to scale without losing quality.'
  },
  AVIF: {
    size: 'Extremely Small', quality: 'Lossy/Lossless', transparency: 'Yes', animation: 'Yes', browserSupport: '92%', bestFor: 'Next-gen web images offering the highest compression and quality.'
  }
};

const ToolComparison = () => {
  const formatKeys = Object.keys(formatData);
  const [fmt1, setFmt1] = useState('PNG');
  const [fmt2, setFmt2] = useState('WebP');

  const metrics = [
    { key: 'size', label: 'File Size' },
    { key: 'quality', label: 'Quality' },
    { key: 'transparency', label: 'Transparency' },
    { key: 'animation', label: 'Animation' },
    { key: 'browserSupport', label: 'Browser Support' },
    { key: 'bestFor', label: 'Best Used For' }
  ];

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.selectGroup}>
          <label>Format 1</label>
          <select value={fmt1} onChange={(e) => setFmt1(e.target.value)}>
            {formatKeys.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        
        <span className={styles.vsText}>VS</span>
        
        <div className={styles.selectGroup}>
          <label>Format 2</label>
          <select value={fmt2} onChange={(e) => setFmt2(e.target.value)}>
            {formatKeys.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className={`liquid-glass ${styles.tableWrapper}`}>
        <div className={styles.tableHeader}>
          <div className={styles.metricCol}>Metric</div>
          <div className={styles.dataCol}>{fmt1}</div>
          <div className={styles.dataCol}>{fmt2}</div>
        </div>
        
        {metrics.map((metric, i) => (
          <div key={i} className={`${styles.tableRow} ${i % 2 === 0 ? styles.rowEven : ''}`}>
            <div className={styles.metricCol}>{metric.label}</div>
            <div className={styles.dataCol}>{formatData[fmt1][metric.key]}</div>
            <div className={styles.dataCol}>{formatData[fmt2][metric.key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolComparison;
