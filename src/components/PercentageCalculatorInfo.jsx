import React, { useState } from 'react';
import styles from './PercentageCalculatorInfo.module.css';
import Reveal from './Reveal';

const PercentageCalculatorInfo = () => {
  const features = [
    { icon: '🧮', title: '3 Calculation Modes', desc: 'Find a percentage of a number, find what percent one number is of another, or calculate percentage change.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Get your answer immediately as you type. No need to press calculate.' },
    { icon: '📈', title: 'Increase & Decrease', desc: 'Easily calculate growth rates, discounts, or price hikes with the % change mode.' },
    { icon: '🔢', title: 'High Precision', desc: 'Handles decimals and large numbers with up to 4 decimal places of precision.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited calculations with no sign-ups or ads.' }
  ];

  const useCases = [
    'Calculating discounts during sales',
    'Figuring out tips at restaurants',
    'Tracking business growth or decline',
    'Calculating test scores',
    'Determining tax percentages',
    'Comparing statistical data'
  ];

  const faqs = [
    { q: 'How do I calculate percentage of a number?', a: "To calculate X% of Y, you multiply Y by (X/100). For example, to find 15% of 200, you calculate 200 * 0.15 = 30. Our tool does this instantly in the first mode." },
    { q: 'How is percentage change calculated?', a: "The formula for percentage change is: ((New Value - Old Value) / |Old Value|) * 100. If the result is positive, it's an increase. If negative, it's a decrease." },
    { q: 'Why does it say "Cannot divide by zero"?', a: "In mathematics, dividing by zero is undefined. If you try to find what percentage a number is of zero, or calculate the percentage change from zero, the tool will show this error." },
    { q: 'Does it handle decimal percentages?', a: "Yes! You can enter decimals like 12.5% or 0.5%, and the tool will calculate the result accurately." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Percentage Calculator</h2>
          <p className={styles.paragraph}>
            Percentages are used everywhere—from shopping discounts to financial reports. But calculating them in your head can lead to embarrassing mistakes.
          </p>
          <p className={styles.paragraph}>
            Our tool offers three distinct modes to handle any percentage calculation you need, instantly and accurately.
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
          <h2 className={styles.sectionTitle}>Common Use Cases</h2>
          <p className={styles.paragraph}>People use this tool every day for a variety of tasks:</p>
          <div className={styles.pillGrid}>
            {useCases.map((use, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{use}</div>
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

export default PercentageCalculatorInfo;
