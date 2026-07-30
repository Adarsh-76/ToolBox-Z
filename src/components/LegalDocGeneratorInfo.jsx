import React, { useState } from 'react';
import styles from './LegalDocGeneratorInfo.module.css';
import Reveal from './Reveal';

const LegalDocGeneratorInfo = () => {
  const features = [
    { icon: '📄', title: 'Privacy & Terms', desc: 'Generate standard Privacy Policies or Terms & Conditions for any app or website.' },
    { icon: '⚙️', title: 'Customizable Clauses', desc: 'Toggle specific clauses like Cookies, Google Analytics, and AdSense to match your setup.' },
    { icon: '⬇️', title: 'Instant Download', desc: 'Download the generated document as a .txt file or copy it to your clipboard instantly.' },
    { icon: '⚡', title: 'No Expensive Lawyers', desc: 'Get a solid baseline document for free. Perfect for indie developers and small startups.' }
  ];

  const faqs = [
    { q: 'Is this generated document legally binding?', a: 'It provides a solid, standard baseline. However, laws vary by country. We highly recommend having a legal professional review it before using it for a large commercial enterprise.' },
    { q: 'Can I edit the document after generating it?', a: 'Yes! You can copy the generated text to your clipboard and edit it in Word, Google Docs, or any text editor.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Legal Document Generator</h2>
          <p className={styles.paragraph}>
            Every website and app needs a Privacy Policy and Terms of Service. But paying a lawyer hundreds of dollars for a basic document isn't always an option for indie developers.
          </p>
          <p className={styles.paragraph}>
            Our generator creates a professional, formatted baseline document in seconds. Just fill out your company info, select the services you use, and download.
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

export default LegalDocGeneratorInfo;
