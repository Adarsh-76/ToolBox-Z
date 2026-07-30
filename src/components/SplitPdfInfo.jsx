import React, { useState } from 'react';
import styles from './SplitPdfInfo.module.css';
import Reveal from './Reveal';

const SplitPdfInfo = () => {
  const features = [
    { icon: '✂️', title: 'Flexible Splitting', desc: 'Extract every single page into its own file, or split by custom ranges (e.g., 1-3, 5-7).' },
    { icon: '📦', title: 'ZIP Packaging', desc: 'Automatically packages all your split PDF files into a single, easy-to-download ZIP folder.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Splits PDFs in seconds directly in your browser without uploading to a server.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally in your browser.' },
    { icon: '📄', title: 'Universal Format', desc: 'Creates standard PDF files compatible with any device, OS, or PDF reader.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Split unlimited PDFs with no watermarks, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Extracting specific chapters from a book',
    'Separating pages for different team members',
    'Splitting large contracts into clauses',
    'Extracting single receipts from a report',
    'Preparing individual exam papers',
    'Breaking down annual reports into quarters'
  ];

  const faqs = [
    { q: 'How are the split files downloaded?', a: "To save you time, all the newly split PDF files are packaged together into a single .zip file. Once downloaded, you can extract the ZIP to access your individual PDFs." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All splitting and ZIP packaging happens directly in your browser. Your files are never uploaded." },
    { q: 'How do I use custom ranges?', a: "Select 'Split by custom ranges', and enter the pages you want. For example, typing '1-3, 5, 7-9' will create three PDFs: one with pages 1 to 3, one with page 5, and one with pages 7 to 9." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Split PDF Files Tool</h2>
          <p className={styles.paragraph}>
            Sometimes you only need a few pages from a large PDF. Sending a 100-page document when someone only needs page 4 is inefficient and compromises privacy.
          </p>
          <p className={styles.paragraph}>
            Our Split PDF Files tool gives you complete control. Extract every page into its own file, or define exact custom ranges to extract exactly what you need in seconds.
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

export default SplitPdfInfo;
