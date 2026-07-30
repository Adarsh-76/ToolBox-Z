import React, { useState } from 'react';
import styles from './ComparePdfInfo.module.css';
import Reveal from './Reveal';

const ComparePdfInfo = () => {
  const features = [
    { icon: '🔄', title: 'Side-by-Side View', desc: 'View both documents simultaneously with perfectly aligned text lines.' },
    { icon: '🟩', title: 'Added Highlights', desc: 'New text added in the modified PDF is instantly highlighted in green.' },
    { icon: '🟥', title: 'Removed Highlights', desc: 'Deleted text from the original PDF is clearly highlighted in red.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Compares PDFs in seconds directly in your browser without uploads.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited PDF comparisons with no watermarks, fees, or sign-ups.' }
  ];

  const useCases = [
    'Checking contract revisions',
    'Comparing different draft versions',
    'Reviewing edited academic papers',
    'Verifying updated invoices',
    'Tracking changes in reports',
    'Auditing compliance documents'
  ];

  const faqs = [
    { q: 'Does this tool compare scanned PDFs?', a: "No. This tool extracts text based on digital text. If your PDFs are scanned images, it won't be able to read the text to compare it." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All PDF parsing and comparison happens directly in your browser. Your files are never uploaded." },
    { q: 'Will it detect formatting changes?', a: "This tool focuses on text content. It will detect added, removed, or changed words and lines, but it does not highlight font or image changes." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Compare PDF Files Tool</h2>
          <p className={styles.paragraph}>
            Finding the exact changes between two versions of a PDF document can be impossible just by looking at them. Manually scanning pages for tiny edits is tedious and prone to mistakes.
          </p>
          <p className={styles.paragraph}>
            Our Compare PDF Files tool solves this by extracting the text from both documents and running a smart line-by-line comparison. It instantly shows you exactly what was added, removed, or changed in a clean side-by-side view.
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

export default ComparePdfInfo;
