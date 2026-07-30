import React, { useState } from 'react';
import styles from './JsonCsvConverterInfo.module.css';
import Reveal from './Reveal';

const JsonCsvConverterInfo = () => {
  const features = [
    { icon: '🔄', title: 'Two-Way Conversion', desc: 'Instantly convert JSON arrays to CSV for Excel, or CSV back to JSON for your APIs.' },
    { icon: '⚡', title: 'Instant & Local', desc: 'All parsing happens in your browser. No waiting, no server uploads.' },
    { icon: '🧠', title: 'Smart Parsing', desc: 'Automatically converts numbers and booleans when going from CSV to JSON.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the formatted output to your clipboard for use in your code.' }
  ];

  const faqs = [
    { q: 'What is the difference between JSON and CSV?', a: 'JSON is a structured format used by web APIs and databases. CSV is a simple spreadsheet format used by Excel and Google Sheets.' },
    { q: 'Can I convert nested JSON objects?', a: 'Currently, this tool works best with flat arrays of objects (e.g., lists of users). Deeply nested objects will be stringified.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About JSON/CSV Converter</h2>
          <p className={styles.paragraph}>
            Developers work with JSON. Accountants work with CSV (Excel). Bridging the gap between them is annoying.
          </p>
          <p className={styles.paragraph}>
            Our two-way converter lets you instantly transform API data into spreadsheets, or spreadsheet data into JSON for your apps.
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

export default JsonCsvConverterInfo;
