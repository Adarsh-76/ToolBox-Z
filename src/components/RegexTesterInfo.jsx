import React, { useState } from 'react';
import styles from './RegexTesterInfo.module.css';
import Reveal from './Reveal';

const RegexTesterInfo = () => {
  const features = [
    { icon: '⚡', title: 'Real-Time Highlighting', desc: 'See exactly which parts of your text match the regex pattern instantly as you type.' },
    { icon: '🚩', title: 'Flags Support', desc: 'Supports standard regex flags like (g)lobal, case-(i)nsensitive, and (m)ultiline.' },
    { icon: '❌', title: 'Error Detection', desc: 'Instantly alerts you if your regex pattern is invalid or malformed.' },
    { icon: '📊', title: 'Match Counter', desc: 'Automatically counts and displays the total number of matches found in your text.' }
  ];

  const faqs = [
    { q: 'What is a Regular Expression (Regex)?', a: 'Regex is a sequence of characters that forms a search pattern. It is used by developers to find, validate, or replace specific text patterns within strings.' },
    { q: 'Can I use this to test email or phone validation?', a: 'Yes! This tool is perfect for testing validation patterns before implementing them in your code. Just paste your pattern and some test data.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Regex Tester</h2>
          <p className={styles.paragraph}>
            Regular Expressions (Regex) are incredibly powerful for data validation, but they are notoriously difficult to read and write.
          </p>
          <p className={styles.paragraph}>
            Our Regex Tester provides a real-time visual playground. Type your pattern, add your test text, and instantly see your matches highlighted.
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

export default RegexTesterInfo;
