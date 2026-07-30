import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './UserTools.module.css';
import Reveal from './Reveal';
import EmptyState from './EmptyState'; // Import Empty State

const UserTools = ({ type }) => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storageKey = type === 'recent' ? 'recentTools' : 'toolFavs';
    const savedIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const matchedTools = savedIds.map(id => toolsList.find(t => t.id === id)).filter(Boolean);
    setTools(matchedTools);
  }, [type, navigate]);

  const title = type === 'recent' ? 'Recently Used' : 'My Favorites';
  const subtitle = type === 'recent' ? 'Pick up right where you left off.' : 'Your saved tools for quick access.';

  // Empty State Config
  const emptyConfig = {
    recent: {
      icon: '🕒',
      title: 'No recent tools yet',
      description: 'Start exploring tools and they will appear here for quick access.',
      actionText: 'Explore Tools',
      onAction: () => navigate('/tools')
    },
    favorites: {
      icon: '❤️',
      title: 'No favorites yet',
      description: 'Click the heart icon on any tool to save it here.',
      actionText: 'Browse Tools',
      onAction: () => navigate('/tools')
    }
  };

  const config = emptyConfig[type];

  return (
    <Reveal>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
        {tools.length > 0 ? (
          <div className={styles.grid}>
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className={`liquid-glass ${styles.card}`}
                onClick={() => navigate(`/tools/${tool.id}`)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.icon}>{tool.icon}</div>
                  <div className={styles.headerText}>
                    <h3 className={styles.cardTitle}>{tool.name}</h3>
                    <div className={styles.stats}>
                      <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                      <span className={styles.rating}>{tool.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className={styles.cardDesc}>{tool.desc}</p>
                
                <div className={styles.cardFooter}>
                  <span className={styles.users}>🔥 {tool.users} users</span>
                  <button className={styles.openBtn}>Open <span className={styles.arrow}>→</span></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Beautiful Empty State for Home Page */
          <EmptyState 
            icon={config.icon}
            title={config.title}
            description={config.description}
            actionText={config.actionText}
            onAction={config.onAction}
          />
        )}
      </section>
    </Reveal>
  );
};

export default UserTools;
