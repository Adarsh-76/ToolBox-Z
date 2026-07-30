import React, { useState } from 'react';
import styles from './TextDiffCheckerInfo.module.css';
import Reveal from './Reveal';

const TextDiffCheckerInfo = () => {
  const features = [
    { icon: '🔍', title: 'Line-by-Line Comparison', desc: 'Instantly compares two blocks of text and highlights the exact differences.' },
    { icon: '🟢', title: 'Color-Coded Results', desc: 'Additions are highlighted in green, and deletions are crossed out in red.' },
    { icon: '💻', title: 'Code & Text Friendly', desc: 'Perfect for comparing code snippets, configuration files, or plain text documents.' },
    { icon: '⚡', title: 'Instant & Private', desc: 'All comparison is done locally in your browser. No data is uploaded.' }
  ];

  const faqs = [
    { q: 'How does the diff algorithm work?', a: 'We use the standard Line Diffing algorithm (Myers diff) to find the Longest Common Subsequence (LCS) between the two texts and identify what was added or removed.' },
    { q: 'Can I compare code from different languages?', a: 'Yes! The tool compares text line-by-line, so it works perfectly for JavaScript, Python, HTML, CSS, or just plain English text.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Text Diff Checker</h2>
          <p className={styles.paragraph}>
            Finding what changed between two versions of a document or code file can be a nightmare if you do it manually.
          </p>
          <p className={styles.paragraph}>
            Our Text Diff Checker instantly compares your original and changed text, highlighting exactly what was added or removed line-by-line.
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

export default TextDiffCheckerInfo;
