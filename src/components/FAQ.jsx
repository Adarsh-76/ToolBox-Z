import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const faqs = [
    { q: 'Is ToolVerse really free?', a: 'Yes! Every single tool on ToolVerse is 100% free to use. There are no hidden fees, premium tiers, or sign-ups required.' },
    { q: 'Do you store my data?', a: 'No. We take your privacy seriously. All tools run entirely in your browser (client-side), meaning your text and files never leave your computer.' },
    { q: 'Can I use this on my phone?', a: 'Absolutely. ToolVerse is fully responsive and optimized to work smoothly on mobile devices, tablets, and desktop computers.' },
    { q: 'How often are new tools added?', a: 'We are constantly developing and adding new tools. Check back often, or follow our GitHub for updates!' }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <p className={styles.subtitle}>Got questions? We've got answers.</p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`liquid-glass ${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.questionRow}>
              <h3 className={styles.question}>{faq.q}</h3>
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </div>
            <div className={styles.answerWrapper}>
              <p className={styles.answer}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
