import React, { useState } from 'react';
import styles from './Game2048Info.module.css';
import Reveal from './Reveal';

const Game2048Info = () => {
  const features = [
    { icon: '🎮', title: 'Classic 2048', desc: 'Slide tiles to combine them. Reach the 2048 tile to win!' },
    { icon: '📱', title: 'Swipe Controls', desc: 'Fully optimized for mobile devices with smooth swipe gestures.' },
    { icon: '⌨️', title: 'Keyboard Support', desc: 'Play easily on desktop using your arrow keys.' },
    { icon: '🏆', title: 'High Score Tracker', desc: 'Your best score is saved locally so you can try to beat it next time.' }
  ];

  const faqs = [
    { q: 'How do I play 2048?', a: 'Use your arrow keys (or swipe on mobile) to move all tiles. When two tiles with the same number touch, they merge into one! Keep merging to reach 2048.' },
    { q: 'Does my score save?', a: 'Yes, your highest score is saved in your browser\'s local storage, so it will be there next time you visit.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About 2048 Game</h2>
          <p className={styles.paragraph}>
            Need a quick break from work? 2048 is one of the most addictive puzzle games ever created.
          </p>
          <p className={styles.paragraph}>
            It's easy to learn but hard to master. Slide the tiles, combine the numbers, and see if you can reach the elusive 2048 tile!
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.grid}>
            {features.map((feat, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <span className={styles.cardIcon}>{feat.icon}</span>
                <h3 className={styles.cardTitle}>{feat.title}</h3>
                <p className={styles.cardDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}>
                <div className={styles.faqQ}>
                  <h3>{faq.q}</h3>
                  <span>{openFaq === i ? '−' : '+'}</span>
                </div>
                <div className={styles.faqAWrapper}>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Game2048Info;
