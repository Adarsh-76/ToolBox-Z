import React, { useState, useEffect } from 'react';
import { toolsList } from '../data/toolsData';
import styles from './UsageHeatmap.module.css';

const UsageHeatmap = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('toolCounts') || '{}');
    setCounts(data);
  }, []);

  // Find the max usage to scale our colors
  const maxCount = Math.max(1, ...Object.values(counts));

  const getHeatColor = (count) => {
    if (count === 0) return 'rgba(255, 255, 255, 0.05)'; // Empty
    const intensity = count / maxCount;
    if (intensity > 0.75) return '#00FFAB'; // High usage
    if (intensity > 0.50) return '#00e89a';
    if (intensity > 0.25) return '#00d18c';
    return '#00b377'; // Low usage
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Your Tool Usage Heatmap</h3>
        <p>Hover over a block to see the tool name and usage count.</p>
      </div>

      <div className={styles.legend}>
        <span>Less</span>
        <div className={styles.legendBox} style={{ background: 'rgba(255, 255, 255, 0.05)' }}></div>
        <div className={styles.legendBox} style={{ background: '#00b377' }}></div>
        <div className={styles.legendBox} style={{ background: '#00d18c' }}></div>
        <div className={styles.legendBox} style={{ background: '#00e89a' }}></div>
        <div className={styles.legendBox} style={{ background: '#00FFAB' }}></div>
        <span>More</span>
      </div>

      <div className={styles.heatmapGrid}>
        {toolsList.map(tool => {
          const count = counts[tool.id] || 0;
          return (
            <div 
              key={tool.id} 
              className={styles.heatCell}
              style={{ background: getHeatColor(count) }}
              title={`${tool.name}: ${count} uses`}
            >
              <span className={styles.icon}>{tool.icon}</span>
              {count > 0 && <span className={styles.count}>{count}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsageHeatmap;
