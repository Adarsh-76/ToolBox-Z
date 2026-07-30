import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import WorkspaceSnippets from '../components/WorkspaceSnippets'; // Import Snippets
import styles from './Workspace.module.css';

const Workspace = () => {
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    setPins(JSON.parse(localStorage.getItem('workspacePins') || '[]'));
  }, []);

  const togglePin = (e, toolId) => {
    e.stopPropagation();
    let updatedPins;
    if (pins.includes(toolId)) {
      updatedPins = pins.filter(id => id !== toolId);
    } else {
      updatedPins = [...pins, toolId];
    }
    setPins(updatedPins);
    localStorage.setItem('workspacePins', JSON.stringify(updatedPins));
  };

  const pinnedTools = toolsList.filter(tool => pins.includes(tool.id));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧰 My Workspace</h1>
        <p className={styles.subtitle}>Your personalized dashboard for pinned tools and saved results.</p>
      </div>

      {/* Saved Snippets Section */}
      <WorkspaceSnippets />

      {/* Pinned Tools Section */}
      <div className={styles.pinnedSection}>
        <h2 className={styles.sectionTitle}>📌 Pinned Tools</h2>
        
        {pinnedTools.length > 0 ? (
          <div className={styles.grid}>
            {pinnedTools.map((tool, index) => (
              <div
                key={index}
                className={`liquid-glass ${styles.card}`}
                onClick={() => navigate(`/tools/${tool.id}`)}
              >
                <button
                  className={`${styles.pinBtn} ${styles.pinActive}`}
                  onClick={(e) => togglePin(e, tool.id)}
                >
                  📌
                </button>

                <div className={styles.icon}>{tool.icon}</div>
                <h3 className={styles.cardTitle}>{tool.name}</h3>
                <p className={styles.cardDesc}>{tool.desc}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.stats}>
                    <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                    <span className={styles.rating}>{tool.rating}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.users}>{tool.users} users</span>
                  </div>
                  <button className={styles.openBtn}>Open <span className={styles.arrow}>→</span></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`liquid-glass ${styles.emptyState}`}>
            <span className={styles.emptyIcon}>📌</span>
            <h2>No Pinned Tools</h2>
            <p>Click the pin icon on any tool card to add it here for quick access.</p>
            <button className={styles.exploreBtn} onClick={() => navigate('/tools')}>Explore Tools</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
