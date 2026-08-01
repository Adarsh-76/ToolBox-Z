import React, { useState } from 'react';
import styles from './GameInfo.module.css';
import Reveal from './Reveal';

const ReactionTestInfo = () => {
  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Reaction Time Test</h2>
          <p className={styles.paragraph}>
            How fast are your reflexes? This tool measures your reaction time in milliseconds. Human average is around 250ms. Can you beat it?
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How it Works</h2>
          <div className={styles.grid}>
            <div className={`liquid-glass ${styles.card}`}><h3>1. Click to Start</h3><p>The box turns Red. Get ready.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>2. Wait for Green</h3><p>The box will turn Green after a random delay.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>3. Click Fast!</h3><p>The moment it turns green, click as fast as you can.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>4. Don't Cheat</h3><p>If you click before it turns green, you have to restart.</p></div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};
export default ReactionTestInfo;
