import React, { useState } from 'react';
import styles from './CricketScoresInfo.module.css';
import Reveal from './Reveal';

const CricketScoresInfo = () => {
  const features = [
    { icon: '🔴', title: 'Real-Time Updates', desc: 'Scores auto-refresh every 30 seconds. You never have to refresh the page manually.' },
    { icon: '🌍', title: 'All International Matches', desc: ' Covers IPL, World Cup, bilateral series, and domestic leagues globally.' },
    { icon: '🚩', title: 'Team Flags & Scores', desc: 'Beautiful cards showing team flags, live scores, and match status.' },
    { icon: '📍', title: 'Venue Details', desc: ' Know exactly where the match is happening and the current series name.' }
  ];

  const faqs = [
    { q: 'How often are the scores updated?', a: 'Our tool automatically fetches the latest data every 30 seconds. If a match is live, you will see the scores update automatically without refreshing the page.' },
    { q: 'Does it show T20, ODI, and Test matches?', a: 'Yes! We support all international and domestic cricket formats, including the IPL, World Cup, and bilateral series.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Live Cricket Score Checker</h2>
          <p className={styles.paragraph}>
            Never miss a moment of the action! Whether it's the IPL, a high-voltage India vs Pakistan match, or an intense Ashes series, our Live Cricket Score Checker keeps you updated in real-time.
          </p>
          <p className={styles.paragraph}>
            No need to download heavy apps or deal with annoying pop-ups. Just open the tool and get instant, auto-updating scores right in your browser.
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
              <div
                key={i}
                className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`}
                onClick={() => toggleFaq(i)}
              >
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

export default CricketScoresInfo;
