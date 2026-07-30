import React, { useState } from 'react';
import styles from './GradientTextInfo.module.css';
import Reveal from './Reveal';

const GradientTextInfo = () => {
  const features = [
    { icon: '🎨', title: 'Beautiful Gradients', desc: 'Create stunning text using linear gradients with two custom colors.' },
    { icon: '🔄', title: 'Custom Angles', desc: 'Adjust the angle of the gradient from 0 to 360 degrees for the perfect look.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See your text update instantly as you change colors and angles.' },
    { icon: '📋', title: 'Copy CSS', desc: 'Generate the exact WebKit CSS code needed to replicate the effect on your site.' }
  ];

  const faqs = [
    { q: 'How do I use this in my CSS?', a: 'Click "Copy CSS" and paste it into your stylesheet. It uses the -webkit-background-clip: text property which is supported by all modern browsers.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Gradient Text Generator</h2>
          <p className={styles.paragraph}>
            Gradient text is a massive trend in modern web design. It makes headlines pop without using heavy images.
          </p>
          <p className={styles.paragraph}>
            Our tool lets you build the perfect gradient text effect and instantly copy the CSS code for your projects.
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

export default GradientTextInfo;
