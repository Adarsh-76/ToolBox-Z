import React, { useState } from 'react';
import styles from './ScientificCalculatorInfo.module.css';
import Reveal from './Reveal';

const ScientificCalculatorInfo = () => {
  const features = [
    { icon: '🧮', title: 'Scientific Functions', desc: 'Supports trigonometry (sin, cos, tan), logarithms (log, ln), and square roots.' },
    { icon: '🔢', title: 'Mathematical Constants', desc: 'Easily use Pi (π) and Euler\'s number (e) in your complex calculations.' },
    { icon: '🧠', title: 'Smart Evaluation', desc: 'Powered by mathjs, it safely parses and evaluates complex string expressions.' },
    { icon: '📱', title: 'Responsive Design', desc: 'The calculator adapts perfectly to mobile screens and desktop keyboards.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Calculations happen locally in milliseconds. No server round-trips.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited calculations with no ads, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Engineering calculations',
    'Trigonometry homework',
    'Physics formulas',
    'Financial percentages',
    'Quick everyday math',
    'Programmatic logic calculations'
  ];

  const faqs = [
    { q: 'How do I use trigonometric functions?', a: 'Simply tap the "sin(", "cos(", or "tan(" buttons, enter your number, and close the parenthesis. For example: sin(45) + cos(30).' },
    { q: 'Does it support logarithms?', a: 'Yes! Use "log(" for base-10 logarithms and "ln(" for natural logarithms (base e).' },
    { q: 'How do I calculate powers?', a: 'Use the "^" symbol. For example, to calculate 2 to the power of 3, type 2^3 and hit equals.' },
    { q: 'Is this calculator accurate?', a: 'Yes, it uses the mathjs library, which is a standard, highly accurate mathematical parser used by developers worldwide.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Scientific Calculator</h2>
          <p className={styles.paragraph}>
            Whether you are a student tackling complex physics homework, an engineer running quick estimations, or just someone who needs more than basic arithmetic, our Scientific Calculator has you covered.
          </p>
          <p className={styles.paragraph}>
            Unlike basic OS calculators, this tool evaluates full expressions at once. You can type out a complex formula, check it, and then hit equals to get the result instantly.
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

export default ScientificCalculatorInfo;
