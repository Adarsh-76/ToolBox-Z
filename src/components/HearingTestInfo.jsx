import React, { useState } from 'react';
import styles from './HearingTestInfo.module.css';
import Reveal from './Reveal';

const HearingTestInfo = () => {
  const features = [
    { icon: '🔊', title: 'High-Frequency Tones', desc: 'Generates pure sine waves from 8,000Hz up to 20,000Hz using the Web Audio API.' },
    { icon: '🧠', title: 'Estimate Ear Age', desc: 'Based on the highest frequency you can hear, we estimate the biological age of your ears.' },
    { icon: '🦻', title: 'Hearing Health Check', desc: 'Detect early signs of high-frequency hearing loss caused by age or loud noises.' },
    { icon: '📱', title: 'No Apps Required', desc: 'Runs entirely in your browser. Works perfectly on phones, tablets, and desktops.' }
  ];

  const faqs = [
    { q: 'Why can\'t I hear above 15,000Hz?', a: 'As we age, the tiny hair cells in our inner ear responsible for high frequencies get damaged. This is called presbycusis. It is completely normal to lose high-frequency hearing as you get older.' },
    { q: 'Is this a medical diagnosis?', a: 'No. This is a fun web tool and should not replace a professional audiogram. Always consult an audiologist if you suspect hearing loss.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Hearing Age Test</h2>
          <p className={styles.paragraph}>
            Human hearing ranges from 20Hz to 20,000Hz in our youth. However, as we age, our ability to hear high-pitched sounds diminishes.
          </p>
          <p className={styles.paragraph}>
            This tool plays different frequencies to find your hearing limit, giving you a fun estimate of your "ear age".
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

export default HearingTestInfo;
