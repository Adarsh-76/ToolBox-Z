import React, { useState } from 'react';
import styles from './FakeDataGeneratorInfo.module.css';
import Reveal from './Reveal';

const FakeDataGeneratorInfo = () => {
  const features = [
    { icon: '👤', title: 'Realistic User Data', desc: 'Generates names, emails, phone numbers, addresses, and job titles instantly.' },
    { icon: '🖼️', title: 'Avatars Included', desc: 'Comes with random profile picture URLs so you can test UI layouts perfectly.' },
    { icon: '📊', title: 'JSON & CSV Export', desc: 'Easily switch between JSON for API testing and CSV for database imports.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'No waiting. Generate up to 10 users in milliseconds directly in your browser.' }
  ];

  const faqs = [
    { q: 'Is this data real?', a: 'No. All names, emails, and addresses are randomly generated and do not belong to real people. It is strictly for testing purposes.' },
    { q: 'Can I use these emails for signups?', a: 'No, the emails are fake and do not exist. You should use a service like temp-mail for actual dummy inboxes.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Fake Data Generator</h2>
          <p className={styles.paragraph}>
            When building an app or website, you need dummy data to test your databases, APIs, and UI layouts.
          </p>
          <p className={styles.paragraph}>
            Our Fake Data Generator creates realistic user profiles in seconds. Export them as JSON for your APIs or CSV for your databases.
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

export default FakeDataGeneratorInfo;
