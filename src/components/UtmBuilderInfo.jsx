import React, { useState } from 'react';
import styles from './UtmBuilderInfo.module.css';
import Reveal from './Reveal';

const UtmBuilderInfo = () => {
  const features = [
    { icon: '📊', title: 'Track Campaigns', desc: 'Generate perfectly formatted UTM links to track where your website traffic is coming from.' },
    { icon: '🔗', title: 'URL Encoding', desc: 'Automatically encodes spaces and special characters so your links never break.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Instantly copy the generated tracking URL to your clipboard for Google Analytics or Ads.' },
    { icon: '📱', title: 'Marketing Standard', desc: 'Uses the official Google Analytics UTM parameters (source, medium, campaign, term, content).' }
  ];

  const faqs = [
    { q: 'What is a UTM link?', a: 'A UTM (Urchin Tracking Module) link is a standard URL with extra parameters attached to the end. When clicked, Google Analytics reads these parameters to tell you exactly which ad, email, or social post drove the traffic.' },
    { q: 'Do I need all parameters?', a: 'No, only Source, Medium, and Campaign are strictly required. Term and Content are optional and usually used for A/B testing or keyword tracking.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About UTM Link Builder</h2>
          <p className={styles.paragraph}>
            If you run digital marketing campaigns, you need to know exactly which ads or posts are driving traffic. UTM links are how you do it.
          </p>
          <p className={styles.paragraph}>
            Instead of manually typing URLs and risking typos, our builder formats the parameters for you instantly.
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

export default UtmBuilderInfo;
