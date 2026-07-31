import React, { useState } from 'react';
import styles from './JsonToTsInfo.module.css';
import Reveal from './Reveal';

const JsonToTsInfo = () => {
  const features = [
    { icon: '⚡', title: 'Instant Conversion', desc: 'Automatically parse JSON data and generate clean TypeScript interfaces in milliseconds.' },
    { icon: '🧩', title: 'Nested Object Support', desc: 'Handles deeply nested JSON objects and arrays, creating separate interfaces for each.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the generated TypeScript code to your clipboard with a single click.' },
    { icon: '🛡️', title: 'Error Handling', desc: 'Get instant feedback if your JSON syntax is invalid, helping you debug quickly.' },
    { icon: '🎨', title: 'Type Inference', desc: 'Automatically detects strings, numbers, booleans, and null values to assign correct types.' },
    { icon: '🔒', title: '100% Private', desc: 'All parsing happens locally in your browser. Your JSON data is never uploaded to any server.' }
  ];

  const users = [
    'Frontend developers', 'Backend engineers', 'API integrators', 'TypeScript beginners', 'Full-stack developers', 'Freelancers', 'Enterprise teams'
  ];

  const benefits = [
    'Save time writing types manually', 'Prevent TypeScript compilation errors', 'Speed up API integration', 'Improve code maintainability', 'Ensure type safety across your app'
  ];

  const faqs = [
    { q: 'Is this JSON to TypeScript converter free?', a: 'Yes, it is 100% free to use with no limits or hidden subscriptions.' },
    { q: 'Does it handle nested JSON arrays?', a: 'Absolutely. The tool recursively parses arrays and nested objects to create comprehensive interfaces.' },
    { q: 'Are my JSON payloads sent to a server?', a: 'No. This is a strictly client-side tool. Your data never leaves your browser, ensuring complete privacy.' },
    { q: 'What happens if my JSON is invalid?', a: 'The tool will display a clear error message indicating the syntax issue so you can fix it before generating interfaces.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our JSON to TypeScript Generator</h2>
          <p className={styles.paragraph}>
            Manually converting complex JSON API responses into TypeScript interfaces can be incredibly tedious and error-prone. Our JSON to TypeScript Generator eliminates this bottleneck by instantly transforming any valid JSON payload into clean, ready-to-use TypeScript interfaces.
          </p>
          <p className={styles.paragraph}>
            Whether you are integrating a new REST API, writing a Node.js backend, or building a React frontend, this tool ensures type safety and speeds up your development workflow significantly.
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
          <h2 className={styles.sectionTitle}>Who Can Use This Tool?</h2>
          <p className={styles.paragraph}>This tool is built for modern web developers, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Using TypeScript Interfaces</h2>
          <div className={styles.grid}>
            {benefits.map((ben, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>✅ {ben}</h3>
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

export default JsonToTsInfo;
