import React, { useState } from 'react';
import styles from './ToolComparisonInfo.module.css';
import Reveal from './Reveal';

const ToolComparisonInfo = () => {
  const features = [
    { icon: '⚖️', title: 'Side-by-Side View', desc: 'Instantly compare two formats or tools in a clean, readable table.' },
    { icon: '📊', title: 'Key Metrics', desc: 'Compare file size, quality, transparency, animation, and browser support.' },
    { icon: '⚡', title: 'Instant Updates', desc: 'Change a dropdown and the table updates dynamically in real-time.' },
    { icon: '🎯', title: 'Best Use Cases', desc: 'Learn exactly when to use which format for your specific project.' },
    { icon: '🔒', title: '100% Private', desc: 'All comparisons are static data. No internet connection required.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Access all comparison data with no sign-ups or limits.' }
  ];

  const steps = [
    'Select the first format/tool you want to compare from the left dropdown.',
    'Select the second format/tool from the right dropdown.',
    'Review the automatically generated comparison table below.',
    'Use the "Best Used For" metric to decide which format fits your needs!'
  ];

  const faqs = [
    { q: 'How accurate is the comparison data?', a: 'Our data is compiled from the latest web standards and browser compatibility charts (like CanIUse). It is regularly updated to reflect current technology.' },
    { q: 'Can I compare more than two formats?', a: 'Currently, the tool supports comparing two formats side-by-side to keep the UI clean and readable on mobile devices.' },
    { q: 'What does "Lossy" vs "Lossless" mean?', a: 'Lossy compression removes some data to reduce file size (smaller, but quality degrades slightly). Lossless compression keeps all data (perfect quality, but larger file size).' },
    { q: 'Is this tool free?', a: 'Yes, our Tool Comparison feature is 100% free to use.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Tool Comparison</h2>
          <p className={styles.paragraph}>
            Choosing the right image format or tool can be confusing. Do I use PNG or WebP? What about AVIF? Making the wrong choice can bloat your website or degrade image quality.
          </p>
          <p className={styles.paragraph}>
            Our Tool Comparison feature takes the guesswork out of this decision. Select any two formats and instantly see a side-by-side breakdown of their strengths, weaknesses, and best use cases.
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

export default ToolComparisonInfo;
