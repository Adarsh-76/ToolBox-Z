import React, { useState } from 'react';
import styles from './BoxShadowGeneratorInfo.module.css';
import Reveal from './Reveal';

const BoxShadowGeneratorInfo = () => {
  const features = [
    { icon: '📦', title: 'Visual Controls', desc: 'Use sliders to perfectly adjust X, Y, Blur, and Spread in real-time.' },
    { icon: '🎨', title: 'Color & Opacity', desc: 'Pick the exact shadow color and adjust its transparency for subtle effects.' },
    { icon: '凹陷', title: 'Inset Shadows', desc: 'Easily toggle between drop shadows and inset (inner) shadows.' },
    { icon: '📋', title: 'Instant CSS', desc: 'Copy the generated box-shadow CSS code with a single click.' }
  ];

  const faqs = [
    { q: 'What is the difference between blur and spread?', a: 'Blur makes the edges of the shadow soft. Spread makes the shadow larger or smaller than the element itself.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Box Shadow Generator</h2>
          <p className={styles.paragraph}>
            Perfect box shadows are hard to write from scratch. You usually have to guess the pixels and blur values.
          </p>
          <p className={styles.paragraph}>
            Our visual generator lets you drag sliders until the shadow looks perfect, then gives you the exact CSS code to copy.
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

export default BoxShadowGeneratorInfo;
