import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './Recommendations.module.css';

const Recommendations = ({ currentToolId }) => {
  const navigate = useNavigate();
  const [recs, setRecs] = useState({
    basedOnRecent: [],
    basedOnCategory: [],
    trending: []
  });

  useEffect(() => {
    // 1. Parse user data from localStorage
    const recentIds = JSON.parse(localStorage.getItem('recentTools') || '[]');
    const uniqueUsedIds = JSON.parse(localStorage.getItem('uniqueToolsUsed') || '[]');

    // Convert IDs to actual tool objects
    const recentTools = recentIds.map(id => toolsList.find(t => t.id === id)).filter(Boolean);
    const usedTools = uniqueUsedIds.map(id => toolsList.find(t => t.id === id)).filter(Boolean);

    // --- LOGIC 1: "Because you used [X]..." ---
    let recentRecs = [];
    if (recentTools.length > 0) {
      // Take the most recent tool they used (that isn't the current one)
      const baseTool = recentTools.find(t => t.id !== currentToolId) || recentTools[0];
      
      // Find 3 other tools in the same category
      recentRecs = toolsList
        .filter(t => t.category === baseTool.category && t.id !== baseTool.id && t.id !== currentToolId)
        .slice(0, 3)
        .map(t => ({ ...t, reason: `Because you used ${baseTool.name}` }));
    }

    // --- LOGIC 2: "Recommended for [Category]" ---
    let categoryRecs = [];
    if (usedTools.length > 0) {
      // Count how many times each category was used
      const categoryCounts = {};
      usedTools.forEach(t => {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
      });
      
      // Find the most used category
      const topCategory = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a])[0];
      
      if (topCategory) {
        // Find 3 tools in that category the user HASN'T used yet
        categoryRecs = toolsList
          .filter(t => t.category === topCategory && !uniqueUsedIds.includes(t.id) && t.id !== currentToolId)
          .slice(0, 3)
          .map(t => ({ ...t, reason: `Recommended for ${topCategory} fans` }));
      }
    }

    // --- LOGIC 3: "Trending Now" ---
    // Parse the 'users' string (e.g., "45.2k" -> 45200) to find the most popular tools
    const trending = [...toolsList]
      .filter(t => t.id !== currentToolId)
      .sort((a, b) => {
        const numA = parseFloat(a.users) * (a.users.includes('k') ? 1000 : 1);
        const numB = parseFloat(b.users) * (b.users.includes('k') ? 1000 : 1);
        return numB - numA;
      })
      .slice(0, 3)
      .map(t => ({ ...t, reason: 'Trending Now' }));

    // If we don't have enough data, fallback to trending
    setRecs({
      basedOnRecent: recentRecs.length > 0 ? recentRecs : trending.slice(0, 1),
      basedOnCategory: categoryRecs.length > 0 ? categoryRecs : trending.slice(1, 2),
      trending: trending
    });

  }, [currentToolId]);

  // Combine all valid recommendations
  const allRecs = [...recs.basedOnRecent, ...recs.basedOnCategory, ...recs.trending];
  
  // Remove duplicates (in case a tool ends up in multiple lists)
  const uniqueRecs = allRecs.filter((tool, index, self) => 
    index === self.findIndex((t) => t.id === tool.id)
  );

  if (uniqueRecs.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎯 Smart Recommendations</h2>
      <p className={styles.subtitle}>Hand-picked tools just for you based on your activity.</p>
      
      <div className={styles.grid}>
        {uniqueRecs.slice(0, 4).map((tool) => (
          <div 
            key={tool.id} 
            className={`liquid-glass ${styles.card}`}
            onClick={() => navigate(`/tools/${tool.id}`)}
          >
            <span className={styles.reasonTag}>{tool.reason}</span>
            <div className={styles.icon}>{tool.icon}</div>
            <h3 className={styles.cardTitle}>{tool.name}</h3>
            <p className={styles.cardDesc}>{tool.desc}</p>
            <button className={styles.tryBtn}>Try Now <span>→</span></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
