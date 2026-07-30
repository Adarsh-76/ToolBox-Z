import React, { useState } from 'react';
import styles from './CaseConverterInfo.module.css';
import Reveal from './Reveal';

const CaseConverterInfo = () => {
  const features = [
    { icon: '🔠', title: '7 Case Formats', desc: 'Convert to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case.' },
    { icon: '⚡', title: 'Instant Conversion', desc: 'See your text transformed instantly with a single click. No waiting required.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the converted text to your clipboard to paste into your code or document.' },
    { icon: '🛡️', title: '100% Private', desc: 'Your text is processed entirely in your browser. Nothing is uploaded to any server.' },
    { icon: '💻', title: 'Code Friendly', desc: 'camelCase, snake_case, and kebab-case are perfect for variable naming in programming.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers.' }
  ];

  const useCases = [
    'Programming variable naming',
    'Formatting book titles',
    'Writing SEO headlines',
    'Cleaning up uppercase emails',
    'Formatting URLs (kebab-case)',
    'Standardizing database keys (snake_case)'
  ];

  const faqs = [
    { q: 'What is the difference between Title Case and Sentence case?', a: 'Title Case capitalizes the first letter of every word (e.g., "The Quick Brown Fox"). Sentence case only capitalizes the first letter of each sentence (e.g., "The quick brown fox").' },
    { q: 'When should I use camelCase vs snake_case?', a: 'camelCase (e.g., myVariable) is standard in JavaScript and Java. snake_case (e.g., my_variable) is standard in Python, Ruby, and database column names. kebab-case (e.g., my-variable) is standard for URLs and CSS classes.' },
    { q: 'Is my text saved when I leave the page?', a: 'No. Everything runs locally in your browser memory. If you refresh or leave the page, your text will be cleared.' },
    { q: 'Is this tool free?', a: 'Yes, our Case Converter is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Case Converter</h2>
          <p className={styles.paragraph}>
            Manually retyping text to change its capitalization is tedious and error-prone. Whether you accidentally left Caps Lock on, or need to format a list of variables for a programming project, our Case Converter handles it instantly.
          </p>
          <p className={styles.paragraph}>
            With support for 7 different formats, this tool is essential for developers, writers, and data entry professionals. Simply paste your text, click the desired format, and copy the result.
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
          <p className={styles.paragraph}>This tool is a daily driver for many professionals:</p>
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

export default CaseConverterInfo;
