import React, { useState } from 'react';
import styles from './SilverPriceCheckerInfo.module.css';
import Reveal from './Reveal';

const SilverPriceCheckerInfo = () => {
  const features = [
    { icon: '🥈', title: 'Gram & Kg Rates', desc: 'Get live prices for 1g, 10g, 1 Tola, and 1kg of silver instantly.' },
    { icon: '🌍', title: 'Multi-Currency', desc: 'Switch between 9 major global currencies (USD, INR, EUR, GBP, etc.).' },
    { icon: '⚡', title: 'Auto-Updates', desc: 'The dashboard automatically refreshes every 30 seconds during market hours.' },
    { icon: '🔄', title: 'Manual Refresh', desc: 'Click the refresh button to instantly fetch the latest rates.' },
    { icon: '🟢', title: 'Live Indicator', desc: 'A pulsing green dot confirms that the data stream is active and up to date.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Track silver market trends without any sign-ups or subscription fees.' }
  ];

  const useCases = [
    'Tracking silver investment portfolio values',
    'Checking prices before buying jewelry',
    'Monitoring market trends for trading',
    'Comparing 1g vs 1kg silver premiums',
    'Educational purposes for economics students',
    'Staying updated on commodity prices'
  ];

  const faqs = [
    { q: 'Are these prices real-time?', a: "Yes! We pull real-time data directly from global commodity and forex markets. During market hours (Monday-Friday), you will see prices update as global trading occurs." },
    { q: 'Why isn\'t the price changing?', a: "Global silver and forex markets close over the weekend. During this time, prices remain locked at Friday's closing rate. You will see live fluctuations resume when markets reopen on Monday morning." },
    { q: 'What is a Tola?', a: "A Tola is a traditional Indian unit of mass, equivalent to exactly 11.664 grams. It is still widely used in the Indian precious metals market." },
    { q: 'How often does the data update?', a: "The tool automatically fetches new data every 30 seconds. You can also click the 'Refresh Prices' button for an instant update." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Live Silver Price Checker</h2>
          <p className={styles.paragraph}>
            Silver is a popular investment and industrial metal. Its price fluctuates daily based on global demand, currency exchange rates, and market conditions.
          </p>
          <p className={styles.paragraph}>
            Our Live Silver Price Checker provides a real-time dashboard for silver prices in India and across the globe in multiple weight units (Gram, 10 Grams, Tola, and Kilogram).
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

export default SilverPriceCheckerInfo;
