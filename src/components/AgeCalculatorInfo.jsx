import React, { useState } from 'react';
import styles from './AgeCalculatorInfo.module.css';
import Reveal from './Reveal';

const AgeCalculatorInfo = () => {
  const features = [
    { icon: '🎂', title: 'Exact Age', desc: 'Get your precise age in years, months, and days, not just rounded years.' },
    { icon: '📊', title: 'Detailed Breakdown', desc: 'See total months, weeks, days, and even hours you have been alive.' },
    { icon: '🎉', title: 'Next Birthday', desc: 'Find out exactly how many days are left until your next birthday.' },
    { icon: '⚡', title: 'Instant Calculation', desc: 'Results update instantly as soon as you select your birth date.' },
    { icon: '🔒', title: '100% Private', desc: 'Your birth date is processed locally in your browser. Nothing is saved.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited calculations with no sign-ups or ads.' }
  ];

  const useCases = [
    'Filling out forms requiring exact age',
    'Calculating age for visa or job applications',
    'Planning birthday surprises and countdowns',
    'Verifying age eligibility for services',
    'Tracking a baby\'s age in months',
    'Calculating age difference between two people'
  ];

  const faqs = [
    { q: 'How is exact age calculated?', a: "We calculate the difference between your birth date and the current date, accounting for varying month lengths and leap years to give you the precise years, months, and days." },
    { q: 'Why does the day count change?', a: "Months have different numbers of days (28-31). When calculating, if the current day is less than your birth day, we borrow days from the previous month to ensure accuracy." },
    { q: 'Does it account for leap years?', a: "Yes! The calculation uses JavaScript's native Date object, which automatically handles leap years and other calendar complexities." },
    { q: 'Is my birth date stored?', a: "No. The calculation happens entirely in your browser. Your birth date is never sent to a server or saved anywhere." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Age Calculator</h2>
          <p className={styles.paragraph}>
            Knowing your exact age isn't just about the year you were born. Whether you're filling out official documents, planning a milestone celebration, or just curious, you need the precise years, months, and days.
          </p>
          <p className={styles.paragraph}>
            Our Age Calculator gives you that exact breakdown instantly, along with fun stats like total weeks lived and a countdown to your next birthday.
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

export default AgeCalculatorInfo;
