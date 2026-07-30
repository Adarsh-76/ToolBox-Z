import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './DailyTool.module.css';
import Reveal from './Reveal';

const DailyTool = () => {
  const navigate = useNavigate();

  // Calculate the current day of the year (1-365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Pick the daily tool using modulo math
  const dailyTool = toolsList[dayOfYear % toolsList.length];

  return (
    <Reveal>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tool of the Day</h2>
          <p className={styles.subtitle}>Check back tomorrow for another featured tool!</p>
        </div>
        
        <div className={styles.gridWrapper}>
          <div 
            className={`liquid-glass ${styles.card}`}
            onClick={() => navigate(`/tools/${dailyTool.id}`)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.icon}>{dailyTool.icon}</div>
              <div className={styles.headerText}>
                <span className={styles.dailyBadge}>FEATURED TODAY</span>
                <h3 className={styles.cardTitle}>{dailyTool.name}</h3>
                <div className={styles.stats}>
                  <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span>
                  <span className={styles.rating}>{dailyTool.rating}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.users}>{dailyTool.users} users</span>
                </div>
              </div>
            </div>
            
            <p className={styles.cardDesc}>{dailyTool.desc}</p>
            
            <div className={styles.cardFooter}>
              <span className={styles.category}>{dailyTool.category}</span>
              <button className={styles.openBtn}>Try it now <span className={styles.arrow}>→</span></button>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default DailyTool;
