import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './RecentlyAdded.module.css';
import Reveal from './Reveal';

const RecentlyAdded = () => {
  const navigate = useNavigate();
  
  // Filter tools with isNew flag and limit to exactly 6
  const newTools = toolsList.filter(tool => tool.isNew).slice(0, 6);

  // Don't render the section if there are no new tools
  if (newTools.length === 0) return null;

  return (
    <Reveal>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Recently Added</h2>
          <p className={styles.subtitle}>Check out the latest tools added to ToolBox Z.</p>
        </div>
        
        <div className={styles.scrollContainer}>
          {newTools.map((tool, index) => (
            <div 
              key={index} 
              className={`liquid-glass ${styles.card}`}
              onClick={() => navigate(`/tools/${tool.id}`)}
            >
              {/* NEW Badge */}
              <div className={styles.newBadge}>NEW</div>

              <div className={styles.cardHeader}>
                <div className={styles.icon}>{tool.icon}</div>
                <div className={styles.headerText}>
                  <h3 className={styles.cardTitle}>{tool.name}</h3>
                  <div className={styles.stats}>
                    <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                    <span className={styles.rating}>{tool.rating}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.users}>{tool.users} users</span>
                  </div>
                </div>
              </div>
              
              <p className={styles.cardDesc}>{tool.desc}</p>
              
              <div className={styles.cardFooter}>
                <span className={styles.category}>{tool.category}</span>
                <button className={styles.openBtn}>Open <span className={styles.arrow}>→</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
};

export default RecentlyAdded;
