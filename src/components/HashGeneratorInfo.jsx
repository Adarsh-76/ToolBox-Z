import React, { useState } from 'react';
import styles from './HashGeneratorInfo.module.css';
import Reveal from './Reveal';

const HashGeneratorInfo = () => {
  const features = [
    { icon: '⚡', title: 'Instant Hashing', desc: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly as you type.' },
    { icon: '🔒', title: '100% Private', desc: 'All hashing is done locally in your browser using the Web Crypto API. No data is sent to servers.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy any generated hash to your clipboard with a single click.' },
    { icon: '🛡️', title: 'Verify Integrity', desc: 'Perfect for checking file integrity, storing passwords securely, or verifying data.' }
  ];

  const faqs = [
    { q: 'What is a hash function?', a: 'A hash function takes an input (like text) and produces a fixed-size string of characters. It is a one-way function, meaning you cannot reverse it to get the original text.' },
    { q: 'Why are different algorithms shown?', a: 'Different systems require different algorithms. SHA-256 is the most common for modern security, while SHA-1 is older and sometimes still used for legacy systems.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Hash Generator</h2>
          <p className={styles.paragraph}>
            Hashing is a fundamental concept in cybersecurity and software development. It allows you to verify data integrity and securely store passwords.
          </p>
          <p className={styles.paragraph}>
            Our Hash Generator provides instant SHA-1, SHA-256, SHA-384, and SHA-512 hashes directly in your browser.
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

export default HashGeneratorInfo;
