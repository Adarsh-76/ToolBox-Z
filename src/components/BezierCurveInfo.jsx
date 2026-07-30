import React, { useState } from 'react';
import styles from './BezierCurveInfo.module.css';
import Reveal from './Reveal';

const BezierCurveInfo = () => {
  const features = [
    { icon: '📈', title: 'Visual Curve Editor', desc: 'Drag the control points to visually design the perfect animation timing curve.' },
    { icon: '⚙️', title: 'Precision Control', desc: 'Fine-tune the acceleration and deceleration of your CSS transitions.' },
    { icon: '👁️', title: 'Live Math Preview', desc: 'See the cubic-bezier(x, y, x, y) values update instantly as you drag.' },
    { icon: '📋', title: 'Instant CSS', desc: 'Copy the exact transition CSS code with your custom curve applied.' }
  ];
  const faqs = [
    { q: 'What is a cubic-bezier curve?', a: 'It defines the speed of a CSS transition over time. By default, CSS uses "ease", but custom curves give your animations a unique, professional feel.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>About Cubic Bezier Generator</h2><p className={styles.paragraph}>Custom animation curves make your UI feel premium. Stop guessing the math and draw the curve visually.</p></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Key Features</h2><div className={styles.grid}>{features.map((feat, i) => (<div key={i} className={`liquid-glass ${styles.card}`}><span className={styles.cardIcon}>{feat.icon}</span><h3 className={styles.cardTitle}>{feat.title}</h3><p className={styles.cardDesc}>{feat.desc}</p></div>))}</div></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq, i) => (<div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}><div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div><div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div></div>))}</div></section></Reveal>
    </div>
  );
};

export default BezierCurveInfo;
