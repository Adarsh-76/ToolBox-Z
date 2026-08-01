import React, { useState } from 'react';
import styles from './GameInfo.module.css'; // Shared CSS for game infos
import Reveal from './Reveal';

const SnakeGameInfo = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Classic Snake Game</h2>
          <p className={styles.paragraph}>
            Relive the nostalgia of the classic Nokia Snake game right in your browser. Eat the food, grow longer, and try not to hit the walls or your own tail. It's simple, addictive, and 100% free.
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Play</h2>
          <div className={styles.grid}>
            <div className={`liquid-glass ${styles.card}`}><h3>1. Start</h3><p>Click the Start button to begin the game.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>2. Move</h3><p>Use the Arrow Keys on your keyboard to steer the snake.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>3. Eat</h3><p>Consume the glowing food to grow longer and increase your score.</p></div>
            <div className={`liquid-glass ${styles.card}`}><h3>4. Avoid</h3><p>Don't crash into the walls or your own tail!</p></div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};
export default SnakeGameInfo;
