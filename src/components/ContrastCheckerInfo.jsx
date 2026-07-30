import React, { useState } from 'react';
import styles from './ContrastCheckerInfo.module.css';
import Reveal from './Reveal';

const ContrastCheckerInfo = () => {
  const features = [
    { icon: '👁️', title: 'WCAG Compliant', desc: 'Calculates exact contrast ratios according to Web Content Accessibility Guidelines (WCAG).' },
    { icon: '📊', title: 'AA & AAA Standards', desc: 'Instantly see if your colors pass AA (normal & large text) and AAA (strict) accessibility standards.' },
    { icon: '🎨', title: 'Live Preview', desc: 'See your background and text colors applied to real text in real-time as you adjust them.' },
    { icon: '♿', title: 'Design for Everyone', desc: 'Ensure your website is readable for users with visual impairments or color blindness.' }
  ];

  const faqs = [
    { q: 'What is a good contrast ratio?', a: 'For normal text, WCAG requires a contrast ratio of at least 4.5:1 (AA standard). For large text, 3:1 is required. AAA standard requires 7:1 for normal text.' },
    { q: 'Why does accessibility matter?', a: 'Designing with accessibility in mind ensures that all users, including those with visual impairments, can read and navigate your website. It is also crucial for SEO and legal compliance in many regions.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Color Contrast Checker</h2>
          <p className={styles.paragraph}>
            Choosing colors that look good together isn't just about aesthetics; it's about readability. If your text and background colors are too similar, people with visual impairments won't be able to read your content.
          </p>
          <p className={styles.paragraph}>
            Our Accessibility & Color Contrast Checker ensures your color palette meets global WCAG standards, making your website inclusive for everyone.
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

export default ContrastCheckerInfo;
