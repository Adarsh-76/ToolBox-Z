import React, { useState } from 'react';
import styles from './GlassGeneratorInfo.module.css';
import Reveal from './Reveal';

const GlassGeneratorInfo = () => {
  const features = [
    { icon: '🪟', title: 'Frosted Glass Effect', desc: 'Create modern, beautiful glassmorphism UI cards with a live preview.' },
    { icon: '🎛️', title: 'Fine Controls', desc: 'Adjust blur, transparency, border radius, and tint color with sliders.' },
    { icon: '🎨', title: 'Custom Tints', desc: 'Add a subtle color tint to your glass to match any background perfectly.' },
    { icon: '📋', title: 'Instant CSS', desc: 'Copy the generated backdrop-filter CSS code with a single click.' }
  ];

  const faqs = [
    { q: 'Why is my glass effect not working?', a: 'Glassmorphism requires a background element behind the glass card to be visible. If the card is on a solid white background, you won\'t see the blur.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Glassmorphism Generator</h2>
          <p className={styles.paragraph}>
            Glassmorphism is a popular UI design trend that uses background blur and transparency to create a frosted glass look.
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
                <div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div>
                <div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default GlassGeneratorInfo;
