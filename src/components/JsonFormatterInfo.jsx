import React, { useState } from 'react';
import styles from './JsonFormatterInfo.module.css';
import Reveal from './Reveal';

const JsonFormatterInfo = () => {
  const features = [
    { icon: '✨', title: 'Beautify & Format', desc: 'Instantly indent and structure messy JSON data into a highly readable, hierarchical format.' },
    { icon: '📉', title: 'Minify Code', desc: 'Compress JSON by removing all unnecessary whitespace, perfect for reducing API payload sizes.' },
    { icon: '🔍', title: 'Syntax Validation', desc: 'Automatically detects and highlights syntax errors, showing you exactly where the JSON is invalid.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the formatted or minified output to your clipboard with a single click.' },
    { icon: '🔒', title: '100% Private', desc: 'All parsing and formatting happens locally in your browser. Your API keys and data never leave your device.' },
    { icon: '⚡', title: 'Fast Performance', desc: 'Handles large JSON files instantly without freezing your browser or requiring a backend server.' }
  ];

  const useCases = [
    'API Developers testing endpoints',
    'DevOps Engineers parsing config files',
    'Data Analysts inspecting JSON payloads',
    'Students learning data structures',
    'Mobile Devs mocking backend responses',
    'System Administrators reading logs'
  ];

  const faqs = [
    { q: 'Is this JSON Formatter safe to use?', a: 'Yes. All processing is done locally in your browser. We do not upload, store, or transmit your JSON data anywhere.' },
    { q: 'What is the difference between Beautify and Minify?', a: 'Beautify adds spaces and line breaks to make the JSON human-readable. Minify removes all extra spaces to make the file size as small as possible for transmission.' },
    { q: 'Does it support large JSON files?', a: 'Yes, the tool is optimized to handle large payloads efficiently. However, extremely large files (multiple megabytes) may slow down the browser tab.' },
    { q: 'Why is my JSON invalid?', a: 'Common reasons include trailing commas, missing quotes around keys, or using single quotes instead of double quotes. Our tool will tell you the exact line of the error.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our JSON Formatter</h2>
          <p className={styles.paragraph}>
            Our JSON Formatter is a powerful online tool designed to help developers view, format, and validate JSON data. JSON (JavaScript Object Notation) is the standard format for data exchange on the web, but raw API responses are often minified and hard to read.
          </p>
          <p className={styles.paragraph}>
            This tool solves that problem by instantly beautifying your JSON, highlighting syntax errors, and allowing you to minify it back when you're ready to deploy. It is an essential utility for any developer's toolkit.
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
          <h2 className={styles.sectionTitle}>Who Uses This Tool?</h2>
          <p className={styles.paragraph}>This tool is trusted by thousands of tech professionals daily, including:</p>
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

export default JsonFormatterInfo;
