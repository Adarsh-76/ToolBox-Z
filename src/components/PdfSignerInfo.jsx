import React, { useState } from 'react';
import styles from './PdfSignerInfo.module.css';
import Reveal from './Reveal';

const PdfSignerInfo = () => {
  const features = [
    { icon: '✍️', title: 'Draw & Embed', desc: 'Draw your signature on the canvas and embed it directly into the PDF document.' },
    { icon: '🛡️', title: 'Tamper Detection', desc: 'Generates a unique SHA-256 cryptographic hash to seal the document.' },
    { icon: '🔒', title: 'Verify Integrity', desc: 'If anyone edits the PDF after signing, the hash will break, proving it was tampered with.' },
    { icon: '⚡', title: 'Instant & Local', desc: 'Signatures are processed instantly. No waiting, no uploads to unsecure servers.' }
  ];
  const faqs = [
    { q: 'Is this a legally binding PKI signature?', a: 'This tool embeds a visual signature and generates a cryptographic hash for tamper detection. For a legally binding PKI signature, you would need a paid certificate from a CA (Certificate Authority).' },
    { q: 'How does the tamper detection work?', a: 'We calculate a SHA-256 hash of the final signed PDF. If even one byte of the PDF is changed afterwards, the hash will be completely different, proving it was altered.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>About Digital PDF Signer</h2><p className={styles.paragraph}>Signing documents shouldn't require printing them. Our tool lets you draw your signature and embed it into your PDF in seconds.</p></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Key Features</h2><div className={styles.grid}>{features.map((feat, i) => (<div key={i} className={`liquid-glass ${styles.card}`}><span className={styles.cardIcon}>{feat.icon}</span><h3 className={styles.cardTitle}>{feat.title}</h3><p className={styles.cardDesc}>{feat.desc}</p></div>))}</div></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq, i) => (<div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}><div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div><div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div></div>))}</div></section></Reveal>
    </div>
  );
};

export default PdfSignerInfo;
