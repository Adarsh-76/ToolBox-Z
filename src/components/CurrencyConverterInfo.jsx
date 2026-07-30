import React, { useState } from 'react';
import styles from './CurrencyConverterInfo.module.css';
import Reveal from './Reveal';

const CurrencyConverterInfo = () => {
  const features = [
    { icon: '💱', title: 'Live Exchange Rates', desc: 'Get real-time forex exchange rates powered directly by TradingView.' },
    { icon: '🌐', title: 'Major Global Currencies', desc: 'Convert between USD, EUR, INR, GBP, JPY, AUD, CAD, and CNY instantly.' },
    { icon: '📊', title: 'Professional Accuracy', desc: 'Uses the same data feeds as professional traders, not delayed APIs.' },
    { icon: '⚡', title: 'Instant Calculations', desc: 'Enter your amount and get the converted value immediately.' },
    { icon: '🔒', title: '100% Private', desc: 'Your conversion amounts are processed by TradingView securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited conversions with no sign-ups or subscription fees.' }
  ];

  const useCases = [
    'Checking exchange rates before traveling',
    'Calculating costs for international purchases',
    'Tracking forex market trends',
    'Converting freelance earnings from abroad',
    'Comparing product prices globally',
    'Monitoring currency strength'
  ];

  const faqs = [
    { q: 'Where does the exchange rate data come from?', a: "We use the official TradingView Currency Converter widget, which pulls real-time data from global forex markets to ensure you get the most accurate, up-to-the-second rates available." },
    { q: 'Are the rates updated live?', a: "Yes! The widget connects directly to TradingView's live data feed, so the rates you see are the exact rates being used in the market at that very second." },
    { q: 'Which currencies are supported?', a: "Currently, the tool supports major global currencies: USD, EUR, INR, GBP, JPY, AUD, CAD, and CNY. This covers the vast majority of international conversion needs." },
    { q: 'Can I use this for trading?', a: "While the rates are live, this tool is for informational purposes and quick conversions. For actual trading, please use a dedicated brokerage platform." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Currency Converter</h2>
          <p className={styles.paragraph}>
            Whether you are traveling, shopping internationally, or tracking global markets, knowing the exact exchange rate is crucial. Many free converters use delayed data, giving you inaccurate numbers.
          </p>
          <p className={styles.paragraph}>
            Our tool connects directly to TradingView's live forex data feed, ensuring you get professional-grade, real-time exchange rates for all major global currencies.
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

export default CurrencyConverterInfo;
