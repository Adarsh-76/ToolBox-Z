import React, { useState } from 'react';
import styles from './SocialAnalyticsInfo.module.css';
import Reveal from './Reveal';

const SocialAnalyticsInfo = () => {
  const features = [
    { icon: '📊', title: 'Comprehensive Metrics', desc: 'Track followers, engagement rates, average likes, and comments all in one place.' },
    { icon: '📈', title: 'Growth Visualization', desc: 'Interactive line charts show follower growth trends over the last 7 days.' },
    { icon: '👥', title: 'Audience Demographics', desc: 'Understand your audience with age-group breakdowns and visual bar charts.' },
    { icon: '📱', title: 'Multi-Platform Support', desc: 'Analyze profiles across Instagram, Twitter/X, TikTok, and YouTube.' },
    { icon: '⚡', title: 'Instant Analysis', desc: 'Generate a complete, beautiful report in seconds without exporting CSVs.' },
    { icon: '🔒', title: 'Safe & Secure', desc: 'No login required. We analyze public metrics without storing your data.' }
  ];

  const useCases = [
    'Influencers tracking engagement rates',
    'Marketers auditing competitor profiles',
    'Students learning social media metrics',
    'Brands analyzing campaign performance',
    'Content creators optimizing post times',
    'Agencies reporting to clients'
  ];

  const faqs = [
    { q: 'How does this analytics tool work?', a: "Enter a public username and select a platform. Our simulator generates a realistic dashboard showing how professional analytics tools display metrics like engagement rate, growth, and demographics." },
    { q: 'Do I need to log in to my account?', a: "No! We do not ask for your passwords or use API tokens. This tool is designed to simulate and visualize public data structures safely." },
    { q: 'What is a good engagement rate?', a: "Generally, an engagement rate between 1% and 5% is considered good for most platforms. Rates above 5% are excellent and indicate a highly active, loyal audience." },
    { q: 'Can I download the report?', a: "Currently, the report is viewable on-screen. You can take a screenshot to share with your team or clients." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Social Media Analytics Tool</h2>
          <p className={styles.paragraph}>
            Understanding your social media performance is crucial for growth. However, native analytics dashboards can be clunky, and premium tools are often too expensive.
          </p>
          <p className={styles.paragraph}>
            Our Social Media Analytics tool provides a clean, visual dashboard of your most important metrics. Track follower growth, calculate engagement rates, and understand your audience demographics all in one beautiful interface.
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

export default SocialAnalyticsInfo;
