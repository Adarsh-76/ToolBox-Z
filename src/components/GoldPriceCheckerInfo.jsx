import React, { useState } from 'react';
import styles from './GoldPriceCheckerInfo.module.css';
import Reveal from './Reveal';

const GoldPriceCheckerInfo = () => {
  const features = [
    { icon: '🥇', title: '24K, 22K & 18K', desc: 'Instantly switch between 24K, 22K, and 18K purity levels.' },
    { icon: '🌍', title: 'Multi-Currency', desc: 'View live gold prices in 9 major global currencies.' },
    { icon: '⚡', title: 'Auto-Updates', desc: 'The dashboard automatically refreshes every 30 seconds during market hours.' },
    { icon: '🔄', title: 'Manual Refresh', desc: 'Click the refresh button to instantly fetch the latest rates.' },
    { icon: '🟢', title: 'Live Indicator', desc: 'A pulsing green dot confirms that the data stream is active.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Track gold market trends without any sign-ups or subscription fees.' }
  ];

  const useCases = [
    'Checking gold investment portfolio values',
    'Checking prices before buying jewelry',
    'Monitoring market trends for trading',
    'Comparing 24K vs 22K premiums',
    'Educational purposes for economics students',
    'Staying updated on commodity prices'
  ];

  const faqs = [
    { q: 'Are these prices real-time?', a: "Yes! We pull real-time data directly from global commodity and forex markets. During market hours (Monday-Friday), you will see prices update as global trading occurs." },
    { q: 'Why isn\'t the price changing?', a: "Global gold and forex markets close over the weekend. During this time, prices remain locked at Friday's closing rate. You will see live fluctuations resume when markets reopen on Monday morning." },
    { q: 'What is the difference between 24K, 22K, and 18K?', a: "24K is 99.9% pure gold. 22K is 91.6% pure (often used for jewelry). 18K is 75.0% pure. The tool calculates the exact price for each purity based on the live 24K spot price." },
    { q: 'How often does the data update?', a: "The tool automatically fetches new data every 30 seconds. You can also click the 'Refresh Prices' button for an instant update." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Live Gold Price Checker</h2>
          <p className={styles.paragraph}>
            Gold is the ultimate safe-haven asset. Whether you are investing, buying jewelry, or tracking the global economy, knowing the exact live price of gold is essential.
          </p>
          <p className={styles.paragraph}>
            Our Live Gold Price Checker provides real-time XAU prices for 24K, 22K, and 18K purities in 9 different global currencies, updated every 30 seconds.
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

export default GoldPriceCheckerInfo;
