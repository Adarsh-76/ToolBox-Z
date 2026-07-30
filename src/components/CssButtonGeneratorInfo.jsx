import React, { useState } from 'react';
import styles from './CssButtonGeneratorInfo.module.css';
import Reveal from './Reveal';

const CssButtonGeneratorInfo = () => {
  const features = [
    { icon: '🔘', title: 'Visual Builder', desc: 'Use sliders to perfectly adjust padding, font size, and border radius in real-time.' },
    { icon: '🎨', title: 'Custom Colors', desc: 'Pick the exact background and text colors to match your brand.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See your button update instantly as you change settings.' },
    { icon: '📋', title: 'Instant CSS', desc: 'Copy the generated CSS code with a single click and paste it into your project.' }
  ];

  const faqs = [
    { q: 'How do I use the generated button?', a: 'Click "Copy CSS" and paste the code into your stylesheet. Then use a standard <button> tag in your HTML.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About CSS Button Generator</h2>
          <p className={styles.paragraph}>
            Designing beautiful buttons from scratch takes time. Our visual generator lets you build the perfect button in seconds.
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

export default CssButtonGeneratorInfo;
