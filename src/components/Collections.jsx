import React from 'react';
import { Link } from 'react-router-dom';
import { collectionsList } from '../data/collections';
import styles from './Collections.module.css';
import Reveal from './Reveal';

const Collections = () => {
  return (
    <Reveal>
      {/* Added id="categories" so the Navbar scroll still works */}
      <section id="categories" className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore Collections</h2>
          <p className={styles.subtitle}>Curated tool packs for every need.</p>
        </div>
        
        <div className={styles.grid}>
          {collectionsList.map((col, i) => (
            <Link 
              key={i} 
              to={`/tools?collection=${encodeURIComponent(col.name)}`} 
              className={`liquid-glass ${styles.card}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{col.icon}</span>
                <h3 className={styles.cardTitle}>{col.name}</h3>
              </div>
              <p className={styles.cardDesc}>{col.desc}</p>
              
              <div className={styles.cardFooter}>
                <span className={styles.toolCount}>{col.tools.length} Tools</span>
                <span className={styles.linkText}>View Pack <span>&rarr;</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
};

export default Collections;
