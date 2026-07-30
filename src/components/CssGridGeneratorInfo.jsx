import React, { useState } from 'react';
import styles from './CssGridGeneratorInfo.module.css';
import Reveal from './Reveal';

const CssGridGeneratorInfo = () => {
  const features = [
    { icon: '🔲', title: 'Visual Grid Builder', desc: 'Create complex CSS grid layouts visually without writing a single line of code.' },
    { icon: '⚙️', title: 'Custom Rows & Cols', desc: 'Dynamically adjust the number of rows, columns, and gaps with live sliders.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See your grid structure update instantly as you change the settings.' },
    { icon: '📋', title: 'Instant CSS', desc: 'Copy the perfectly formatted CSS code for your grid container with one click.' }
  ];
  const faqs = [
    { q: 'What is CSS Grid?', a: 'CSS Grid Layout is a 2D layout system for CSS. It lets you control both rows and columns, making it the most powerful layout tool in CSS.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>About CSS Grid Generator</h2><p className={styles.paragraph}>CSS Grid is powerful but hard to visualize. Our generator lets you build the layout visually and copy the code instantly.</p></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Key Features</h2><div className={styles.grid}>{features.map((feat, i) => (<div key={i} className={`liquid-glass ${styles.card}`}><span className={styles.cardIcon}>{feat.icon}</span><h3 className={styles.cardTitle}>{feat.title}</h3><p className={styles.cardDesc}>{feat.desc}</p></div>))}</div></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq, i) => (<div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}><div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div><div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div></div>))}</div></section></Reveal>
    </div>
  );
};

export default CssGridGeneratorInfo;
