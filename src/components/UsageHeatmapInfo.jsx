import React, { useState } from 'react';
import styles from './UsageHeatmapInfo.module.css';
import Reveal from './Reveal';

const UsageHeatmapInfo = () => {
  const features = [
    { icon: '🔥', title: 'GitHub-Style Heatmap', desc: 'A beautiful visual grid showing exactly which tools you use the most.' },
    { icon: '📊', title: 'Usage Counters', desc: 'Every time you open a tool, its counter increases, shifting its color from dark to bright neon.' },
    { icon: '🧠', title: 'Discover Habits', desc: 'Easily spot your daily workflows. Are you a PDF power user or an Image Editor master?' },
    { icon: '🔒', title: '100% Private', desc: 'Your usage data is stored entirely in your browser. We don\'t track it on our servers.' }
  ];

  const faqs = [
    { q: 'How is the heatmap colored?', a: 'Tools you haven\'t used yet are dark gray. As you use a tool more frequently, its block turns green, scaling up to bright neon green for your most used tool.' },
    { q: 'Why is my heatmap empty?', a: 'If you recently cleared your browser data or are using the site for the first time, the heatmap will be empty. Open a few tools and come back to see it light up!' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Tool Usage Heatmap</h2>
          <p className={styles.paragraph}>
            Ever wonder exactly which tools you rely on the most? We visualized your workflow into a beautiful heatmap.
          </p>
          <p className={styles.paragraph}>
            Every time you open a tool, its block lights up. Over time, you'll see a clear picture of your daily habits and favorite utilities.
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

export default UsageHeatmapInfo;
