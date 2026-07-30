import React, { useState } from 'react';
import styles from './TwitterCounterInfo.module.css';
import Reveal from './Reveal';

const TwitterCounterInfo = () => {
  const features = [
    { icon: '🎯', title: 'Live Counting', desc: 'See your character count update instantly as you type your tweet.' },
    { icon: '🎨', title: 'Color-Coded Alerts', desc: 'The progress ring changes from green to orange to red as you approach the limit.' },
    { icon: '🔄', title: 'Visual Progress Ring', desc: 'A beautiful circular indicator shows exactly how much of your limit you have used.' },
    { icon: '⚡', title: 'Instant Feedback', desc: 'No waiting or buttons to click. Everything calculates in real-time.' },
    { icon: '📋', title: 'Easy Clearing', desc: 'One click to clear your text and start over with a fresh tweet.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Count unlimited tweets with no sign-ups or hidden fees.' }
  ];

  const steps = [
    'Start typing your tweet in the text box.',
    'Watch the circular progress ring and character count update instantly.',
    'Notice the color change from green (safe) to orange (warning) and red (limit reached).',
    'Edit your text to ensure you stay under the 280-character limit.',
    'Copy your finalized tweet and paste it directly into Twitter (X).'
  ];

  const faqs = [
    { q: 'What is the character limit for Twitter (X)?', a: 'The standard character limit for a tweet is 280 characters. This includes letters, numbers, spaces, and punctuation.' },
    { q: 'Do links count towards the character limit?', a: 'Yes, but Twitter automatically shortens URLs (t.co links). A shortened link typically counts as exactly 23 characters, regardless of the original URL length.' },
    { q: 'Do emojis count as one character?', a: 'No, most emojis actually count as 2 characters on Twitter due to Unicode encoding. Our tool counts the raw string length, so keep this in mind when using many emojis.' },
    { q: 'Is this tool free?', a: 'Yes, our Twitter Character Counter is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Twitter Character Counter</h2>
          <p className={styles.paragraph}>
            Twitter (now X) enforces a strict 280-character limit on tweets. If you exceed this limit, Twitter will prevent you from posting. Manually counting characters is tedious and prone to error.
          </p>
          <p className={styles.paragraph}>
            Our Twitter Character Counter provides a live, visual representation of your tweet length. With a dynamic progress ring that changes color as you type, you can easily craft the perfect tweet without ever hitting the dreaded "Tweet is too long" error.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default TwitterCounterInfo;
