import React, { useState } from 'react';
import styles from './RotatePdfInfo.module.css';
import Reveal from './Reveal';

const RotatePdfInfo = () => {
  const features = [
    { icon: '🔄', title: 'Instant Rotation', desc: 'Rotate all pages in your PDF by 90°, 180°, or 270° with a single click.' },
    { icon: '↻', title: 'Cumulative Angles', desc: 'If your PDF is already slightly rotated, the tool smartly adds to the existing angle.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Rotates PDFs in seconds directly in your browser without uploading to a server.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '📄', title: 'Lossless Quality', desc: 'Preserves the exact original quality, text, and images of your PDF.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Rotate unlimited PDFs with no watermarks, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Fixing sideways scanned documents',
    'Correcting upside-down PDF pages',
    'Aligning landscape pages to portrait',
    'Fixing photos exported as PDFs',
    'Preparing documents for printing',
    'Correcting mobile-scanned receipts'
  ];

  const faqs = [
    { q: 'Does this rotate all pages or just specific ones?', a: "Currently, this tool applies the rotation to ALL pages in the document simultaneously to ensure consistent orientation across the file." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All rotation happens directly in your browser using client-side JavaScript. Your files are never uploaded." },
    { q: 'Will rotating the PDF reduce the quality?', a: "No. This tool changes the page orientation metadata without re-encoding the content, meaning the text and images remain at 100% of their original quality." },
    { q: 'Can I rotate a password-protected PDF?', a: "If your PDF is password-protected, you will need to remove the password first before using this tool, as the browser cannot decrypt locked files." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Rotate PDF Pages Tool</h2>
          <p className={styles.paragraph}>
            Scanning documents with a phone or exporting from certain apps can often result in PDF pages that are sideways or upside down. Reading them is frustrating, and printing them wastes paper.
          </p>
          <p className={styles.paragraph}>
            Our Rotate PDF Pages tool solves this instantly. Just upload your PDF, click 90° or 180°, and download the corrected file in seconds without losing any quality.
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

export default RotatePdfInfo;
