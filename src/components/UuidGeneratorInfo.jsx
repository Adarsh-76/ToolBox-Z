import React, { useState } from 'react';
import styles from './UuidGeneratorInfo.module.css';
import Reveal from './Reveal';

const UuidGeneratorInfo = () => {
  const features = [
    { icon: '🆔', title: 'UUID v4 Generation', desc: 'Generates cryptographically secure random Version 4 UUIDs using the Web Crypto API.' },
    { icon: '🔢', title: 'Bulk Generation', desc: 'Generate up to 50 unique UUIDs at once with a simple slider control.' },
    { icon: '⚙️', title: 'Format Options', desc: 'Toggle hyphens on/off or convert the entire string to uppercase.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy all generated UUIDs to your clipboard to paste into databases or code.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All generation happens locally in your browser. No server round-trips.' },
    { icon: '🔒', title: '100% Private', desc: 'Your generated keys are never logged or transmitted over the internet.' }
  ];

  const useCases = [
    'Database primary keys',
    'Session IDs and tokens',
    'Testing and mocking data',
    'Distributed systems identifiers',
    'Tracking unique user events',
    'Generating unique filenames'
  ];

  const faqs = [
    { q: 'What is a UUID?', a: 'A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. The standard format is a 32-character hexadecimal string displayed in five groups separated by hyphens (8-4-4-4-12).' },
    { q: 'Are these UUIDs truly unique?', a: 'Version 4 UUIDs are random. The number of possible combinations is so astronomically large (2^122) that the chance of two generated UUIDs colliding is effectively zero.' },
    { q: 'What is the difference between v1 and v4?', a: 'Version 1 UUIDs are based on your machine\'s MAC address and the current time. Version 4 UUIDs (which this tool generates) are purely random, making them more secure and private.' },
    { q: 'Is this tool free?', a: 'Yes, our UUID Generator is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our UUID Generator</h2>
          <p className={styles.paragraph}>
            If you are building an application, you need unique identifiers. Whether it's for database rows, user sessions, or API tokens, generating unique IDs manually can lead to collisions.
          </p>
          <p className={styles.paragraph}>
            Our UUID Generator uses the browser's native Web Crypto API to create cryptographically secure Version 4 UUIDs. You can generate them in bulk, format them without hyphens, and copy them instantly.
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
          <h2 className={styles.sectionTitle}>Common Use Cases</h2>
          <p className={styles.paragraph}>Developers use this tool every day for a variety of tasks:</p>
          <div className={styles.pillGrid}>
            {useCases.map((use, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{use}</div>
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

export default UuidGeneratorInfo;
