import React, { useState } from 'react';
import styles from './FuelPriceTrackerInfo.module.css';
import Reveal from './Reveal';

const FuelPriceTrackerInfo = () => {
  const features = [
    { icon: '⛽', title: 'Petrol & Diesel Prices', desc: 'Track both Petrol and Diesel prices for major cities worldwide.' },
    { icon: '🌍', title: 'Global Coverage', desc: 'Includes data for major countries like USA, UK, India, Canada, Australia, and Germany.' },
    { icon: '⚡', title: 'Auto-Updates', desc: 'The dashboard automatically refreshes every 30 seconds to simulate live market changes.' },
    { icon: '🟢', title: 'Live Indicator', desc: 'A pulsing green dot confirms that the data stream is active and up to date.' },
    { icon: '📱', title: 'Responsive Grid', desc: 'Beautiful card layout that adapts perfectly to mobile, tablet, and desktop screens.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Access live market simulations without any sign-ups or subscription fees.' }
  ];

  const useCases = [
    'Tracking fuel costs for logistics and transport businesses',
    'Estimating travel budgets for international road trips',
    'Monitoring global energy market trends',
    'Comparing fuel prices before moving to a new city',
    'Analyzing petrol vs diesel price gaps',
    'Staying updated on energy costs for fleet management'
  ];

  const faqs = [
    { q: 'Are these prices real-time?', a: "The prices are based on realistic global averages and are simulated to update every 30 seconds. For legal and financial decisions, always consult official local fuel station prices, as actual real-time city-level API data requires expensive enterprise subscriptions." },
    { q: 'How often does the data update?', a: "The tool automatically fetches new data every 30 seconds. You do not need to refresh the page; the numbers will update automatically." },
    { q: 'What currencies are the prices in?', a: "For standardization across countries, the simulated prices are displayed in USD ($)." },
    { q: 'Can I request a specific city to be added?', a: "Yes! If you want your city added to the tracker, please use the 'Tool Request' feature on the Tools page to let us know." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Live Fuel Price Tracker</h2>
          <p className={styles.paragraph}>
            Fuel prices fluctuate daily based on global crude oil markets, taxes, and local distribution. For logistics companies, travelers, and businesses, keeping an eye on these prices is essential.
          </p>
          <p className={styles.paragraph}>
            Our Live Fuel Price Tracker provides a clean, auto-updating dashboard of Petrol and Diesel prices across major global cities, helping you estimate costs and track market trends at a glance.
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

export default FuelPriceTrackerInfo;
