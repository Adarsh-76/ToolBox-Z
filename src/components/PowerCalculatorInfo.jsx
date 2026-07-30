import React, { useState } from 'react';
import styles from './PowerCalculatorInfo.module.css';
import Reveal from './Reveal';

const PowerCalculatorInfo = () => {
  const features = [
    { icon: '🚀', title: 'Instant Powers', desc: 'Calculate squares (x²), cubes (x³), and fourth powers instantly as you type.' },
    { icon: '🛤️', title: 'Instant Roots', desc: 'Find square roots (√x), cube roots (³√x), and fourth roots with perfect precision.' },
    { icon: '🧮', title: 'Custom Exponents', desc: 'Raise any number to any power (xʸ) using the custom exponent calculator.' },
    { icon: '🎯', title: 'Custom Roots', desc: 'Calculate the y-th root of any number (ʸ√x) for advanced mathematics.' }
  ];

  const faqs = [
    { q: 'How are negative numbers handled?', a: 'Our calculator supports negative bases. For example, the cube root of -8 is -2. Even roots of negative numbers (like the square root of -4) will return NaN (Not a Number) because they are imaginary.' },
    { q: 'Does it support decimals?', a: 'Yes! You can enter decimal numbers (like 2.5) for both the base number and the custom exponents/roots.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Power & Root Calculator</h2>
          <p className={styles.paragraph}>
            Calculating powers and roots is a fundamental part of algebra, engineering, and physics. Doing it on a standard calculator requires too many button presses.
          </p>
          <p className={styles.paragraph}>
            Our calculator gives you the square, cube, square root, and cube root instantly. It also includes a custom calculator for x to the power of y, and the y-th root of x.
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


export default PowerCalculatorInfo;
