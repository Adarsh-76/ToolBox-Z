import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './PopularTools.module.css';
import Reveal from './Reveal';

const PopularTools = () => {
  const navigate = useNavigate();

  const popularTools = [...toolsList].sort((a, b) => {
    const aUsers = parseFloat(a.users) * (a.users.includes('k') ? 1000 : 1);
    const bUsers = parseFloat(b.users) * (b.users.includes('k') ? 1000 : 1);
    return bUsers - aUsers;
  }).slice(0, 4);

  return (
    <Reveal>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Popular This Week</h2>
          <p className={styles.subtitle}>The most used tools by our community right now.</p>
        </div>
        
        <div className={styles.grid}>
          {popularTools.map((tool, index) => (
            <div 
              key={index} 
              className={`liquid-glass ${styles.card}`}
              onClick={() => navigate(`/tools/${tool.id}`)}
            >
              {/* NEW Badge */}
              {tool.isNew && <div className={styles.newBadge}>NEW</div>}

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
      </section>
    </Reveal>
  );
};

export default PopularTools;
