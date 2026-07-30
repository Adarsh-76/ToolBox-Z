import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './Labs.module.css';

const Labs = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const experimentalTools = toolsList.filter(t => t.isExperimental);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleCardClick = (toolId) => {
    if (isLoggedIn) {
      navigate(`/tools/${toolId}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧪 ToolBox Z Labs</h1>
        <p className={styles.subtitle}>Welcome to the testing ground! These tools are highly experimental and still in development.</p>
      </div>

      <div className={`liquid-glass ${styles.warningBanner}`}>
        <h4>⚠️ Beta Warning</h4>
        <p>Tools in this section may be unstable, have bugs, or be removed at any time. Please use them with caution and don't rely on them for important work yet. Have fun testing!</p>
      </div>

      {experimentalTools.length > 0 ? (
        <div className={styles.grid}>
          {experimentalTools.map((tool, index) => (
            <div
              key={index}
              className={`liquid-glass ${styles.card}`}
              onClick={() => handleCardClick(tool.id)}
            >
              {!isLoggedIn ? (
                <div className={styles.lockBadge}>🔒 Login to Test</div>
              ) : (
                <div className={styles.betaBadge}>BETA</div>
              )}
              <div className={styles.icon}>{tool.icon}</div>
              <h3 className={styles.cardTitle}>{tool.name}</h3>
              <p className={styles.cardDesc}>{tool.desc}</p>
              <button className={styles.testBtn}>
                {isLoggedIn ? 'Test Tool' : 'Login to Test'} <span className={styles.arrow}>→</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🔬</span>
          <h2>No Experiments Right Now</h2>
          <p>Our engineers are currently brewing up new tools. Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default Labs;
