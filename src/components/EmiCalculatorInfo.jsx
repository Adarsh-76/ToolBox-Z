import React, { useState } from 'react';
import styles from './EmiCalculatorInfo.module.css';
import Reveal from './Reveal';

const EmiCalculatorInfo = () => {
  const features = [
    { icon: '🏦', title: 'All Loan Types', desc: 'Supports Home, Car, Personal, and Education loans with smart default presets.' },
    { icon: '📊', title: 'Interactive Sliders', desc: 'Easily adjust Loan Amount, Interest Rate, and Tenure with smooth sliders.' },
    { icon: '🍩', title: 'Visual Breakdown', desc: 'Beautiful donut chart shows the exact ratio of Principal vs. Interest.' },
    { icon: '💰', title: 'Total Cost Analysis', desc: 'See exactly how much you will pay in total, including the total interest amount.' },
    { icon: '⚡', title: 'Instant Recalculation', desc: 'Numbers update instantly in real-time as you drag the sliders.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited calculations with no sign-ups or ads.' }
  ];

  const useCases = [
    'Planning to buy a new home or apartment',
    'Calculating car loan installments before visiting the dealer',
    'Estimating personal loan repayments',
    'Budgeting for student education loans',
    'Comparing different loan offers from banks',
    'Deciding whether to prepay or close a loan early'
  ];

  const faqs = [
    { q: 'How is EMI calculated?', a: "EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate, and N is the number of monthly installments." },
    { q: 'What is the difference between Principal and Interest?', a: "Principal is the actual amount of money you borrowed from the bank. Interest is the fee the bank charges you for lending the money. In the early years of a loan, a larger portion of your EMI goes towards paying the interest." },
    { q: 'Does the interest rate change?', a: "If you choose a floating interest rate, it can change over time based on the market. This calculator uses a fixed rate for the entire tenure to give you a baseline estimate." },
    { q: 'Are the presets accurate?', a: "The presets (e.g., 8.5% for Home Loans) are based on average market rates. Actual rates vary by bank, credit score, and location. Always check with your bank for the exact rate." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Loan EMI Calculator</h2>
          <p className={styles.paragraph}>
            Taking a loan is a major financial decision. Whether you are buying a house, a car, or funding your education, knowing your monthly EMI beforehand helps you budget effectively and avoid debt traps.
          </p>
          <p className={styles.paragraph}>
            Our Universal EMI Calculator provides instant, accurate calculations for any type of loan. Just select your loan type, adjust the sliders, and instantly see your monthly payment and total interest.
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

export default EmiCalculatorInfo;
