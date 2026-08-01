import React, { useState } from 'react';
import styles from './GameInfo.module.css';
import Reveal from './Reveal';

const BreakoutGameInfo = () => {
  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Breakout Game</h2>
          <p className={styles.paragraph}>
            Smash all the bricks with your ball and paddle. Don't let the ball fall through the floor! A timeless arcade classic built right into your browser.
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Play</h2>
          <div className={styles.grid}>
            <div className={`liquid-glass ${styles.card}`}><h3>1. Start</h3><p>Click Start to launch the ball.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>2. Move Paddle</h3><p>Use Left and Right Arrow keys to slide the paddle.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>3. Bounce</h3><p>Bounce the ball up to destroy the bricks.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>4. Win</h3><p>Clear all bricks to win the game!</p></div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};
export default BreakoutGameInfo;
