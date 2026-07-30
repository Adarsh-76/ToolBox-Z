import React from 'react';
import styles from './TwitterThread.module.css';

const TwitterThread = () => {
  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.devArea}`}>
        <div className={styles.iconWrapper}>🚧</div>
        <h2 className={styles.devTitle}>Tool Under Development</h2>
        <p className={styles.devText}>
          We are currently training the AI ghostwriter to craft the perfect viral threads for you. 
          <br /><br />
          This feature will be available very soon! Please check back later.
        </p>
      </div>
    </div>
  );
};

export default TwitterThread;
