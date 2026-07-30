import React, { useState } from 'react';
import styles from './PulseGeneratorInfo.module.css';
import Reveal from './Reveal';

const PulseGeneratorInfo = () => {
  const features = [
    { icon: '💗', title: 'Live Pulse Preview', desc: 'Watch your element pulse in real-time as you adjust the settings.' },
    { icon: '🎨', title: 'Custom Colors', desc: 'Match the pulse color to your brand or UI theme perfectly.' },
    { icon: '⏱️', title: 'Speed & Scale Control', desc: 'Adjust how big the pulse gets and how fast it animates.' },
    { icon: '📋', title: 'Instant Keyframes', desc: 'Copy the exact @keyframes and animation CSS code instantly.' }
  ];
  const faqs = [
    { q: 'How do I apply this to my button?', a: 'Copy the CSS code and paste it into your stylesheet. Then add the class "pulse-element" to any HTML element you want to pulse.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>About Pulse Animation Generator</h2><p className={styles.paragraph}>Pulsing elements are great for drawing attention to notifications, live indicators, or call-to-action buttons.</p></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Key Features</h2><div className={styles.grid}>{features.map((feat, i) => (<div key={i} className={`liquid-glass ${styles.card}`}><span className={styles.cardIcon}>{feat.icon}</span><h3 className={styles.cardTitle}>{feat.title}</h3><p className={styles.cardDesc}>{feat.desc}</p></div>))}</div></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq, i) => (<div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}><div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div><div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div></div>))}</div></section></Reveal>
    </div>
  );
};

export default PulseGeneratorInfo;
