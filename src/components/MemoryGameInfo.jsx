import React, { useState } from 'react';
import styles from './GameInfo.module.css';
import Reveal from './Reveal';

const MemoryGameInfo = () => {
  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Memory Match</h2>
          <p className={styles.paragraph}>
            Test your short-term memory with this classic card matching game. Flip the cards to find matching pairs. The fewer moves you make, the better your memory!
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Play</h2>
          <div className={styles.grid}>
            <div className={`liquid-glass ${styles.card}`}><h3>1. Flip Cards</h3><p>Click on any two cards to reveal their emojis.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>2. Find Pairs</h3><p>If they match, they stay flipped. If not, they turn back over.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>3. Remember</h3><p>Memorize the positions of unmatched cards for your next turn.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>4. Win</h3><p>Match all pairs to win the game!</p></div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};
export default MemoryGameInfo;
