import React, { useState } from 'react';
import styles from './MetaTagGeneratorInfo.module.css';
import Reveal from './Reveal';

const MetaTagGeneratorInfo = () => {
  const features = [
    { icon: '🔍', title: 'SEO Optimized', desc: 'Generate perfect title, description, and author meta tags for Google search rankings.' },
    { icon: '📘', title: 'Social Media Ready', desc: 'Includes Open Graph (Facebook) and Twitter Card tags for beautiful link previews.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See exactly how your link will look on search engines and social media before copying.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Generate the clean HTML code and copy it to your clipboard instantly.' }
  ];

  const faqs = [
    { q: 'Where do I paste the generated meta tags?', a: 'You should paste the generated HTML code inside the <head> section of your website\'s HTML document.' },
    { q: 'Do I need all these tags?', a: 'While basic title and description tags are required for SEO, Open Graph and Twitter tags are highly recommended if you plan to share your website on social media.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Meta Tag Generator</h2>
          <p className={styles.paragraph}>
            Meta tags are crucial for SEO and social media sharing. They tell search engines what your website is about and control how your links look when shared.
          </p>
          <p className={styles.paragraph}>
            Our Meta Tag Generator creates a complete set of SEO, Open Graph, and Twitter tags with a live preview, so you can perfect your appearance before publishing.
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

export default MetaTagGeneratorInfo;
