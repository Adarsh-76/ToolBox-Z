import React, { useState } from 'react';
import styles from './TextToHandwritingInfo.module.css';
import Reveal from './Reveal';

const TextToHandwritingInfo = () => {
  const features = [
    { icon: '✍️', title: 'Realistic Handwriting', desc: 'Choose from multiple cursive and natural handwriting fonts to convert your typed text.' },
    { icon: '🎨', title: 'Custom Ink & Paper', desc: 'Change the pen ink color, font size, and paper background to suit your needs.' },
    { icon: '📄', title: 'Ruled Notebook Paper', desc: 'Generates realistic ruled lines and a red margin just like a real notebook.' },
    { icon: '⬇️', title: 'Download as Image', desc: 'Instantly download your generated handwriting as a high-quality PNG file.' }
  ];

  const faqs = [
    { q: 'Can I use this for school assignments?', a: 'While it can generate text that looks like handwriting, we recommend using it for drafts, notes, or fun projects rather than official submissions.' },
    { q: 'How do I download the image?', a: 'Simply click the "Download as PNG" button, and the image will be saved to your device.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Text to Handwriting Generator</h2>
          <p className={styles.paragraph}>
            Typing is fast, but sometimes you need the personal touch of handwriting. Our Text to Handwriting Generator allows you to type any text and instantly convert it into realistic handwriting.
          </p>
          <p className={styles.paragraph}>
            Perfect for adding a personal note to digital documents, creating aesthetic graphics for social media, or just having fun.
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

export default TextToHandwritingInfo;
