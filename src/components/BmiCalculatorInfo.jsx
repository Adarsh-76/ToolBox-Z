import React, { useState } from 'react';
import styles from './BmiCalculatorInfo.module.css';
import Reveal from './Reveal';

const BmiCalculatorInfo = () => {
  const features = [
    { icon: '⚖️', title: 'Metric & Imperial', desc: 'Easily switch between cm/kg and inches/lbs with smart unit conversion.' },
    { icon: '🎚️', title: 'Interactive Sliders', desc: 'Smooth sliders make it incredibly easy to test different heights and weights.' },
    { icon: '📊', title: 'Visual Gauge', desc: 'A colorful half-circle gauge instantly shows where your BMI falls on the scale.' },
    { icon: '🏷️', title: 'Health Categories', desc: 'Instantly know if you are Underweight, Normal, Overweight, or Obese.' },
    { icon: '⚡', title: 'Instant Recalculation', desc: 'Your BMI updates in real-time as you drag the sliders.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited calculations with no sign-ups or ads.' }
  ];

  const useCases = [
    'Tracking weight loss or muscle gain progress',
    'Checking if you are in a healthy weight range',
    'Calculating BMI for medical or fitness assessments',
    'Setting realistic fitness goals',
    'Monitoring family health metrics',
    'Educational purposes for health students'
  ];

  const faqs = [
    { q: 'What is BMI?', a: "BMI (Body Mass Index) is a value derived from the mass and height of a person. It is defined as the body mass divided by the square of the body height, and is universally expressed in units of kg/m²." },
    { q: 'Is BMI accurate for everyone?', a: "BMI is a general screening tool and does not account for muscle mass. A bodybuilder might have a high BMI but very little body fat. It is less accurate for athletes, pregnant women, and the elderly." },
    { q: 'What is a healthy BMI range?', a: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is obese." },
    { q: 'Does the tool save my data?', a: "No. All calculations happen instantly in your browser. Your height and weight are not saved or sent to any server." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our BMI Calculator</h2>
          <p className={styles.paragraph}>
            Body Mass Index (BMI) is a widely used metric to determine if your weight is appropriate for your height. Maintaining a healthy BMI is crucial for preventing cardiovascular diseases, diabetes, and other health conditions.
          </p>
          <p className={styles.paragraph}>
            Our BMI Calculator provides an instant, visual representation of your BMI, supporting both Metric and Imperial units. Just slide in your height and weight to see your result!
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

export default BmiCalculatorInfo;
