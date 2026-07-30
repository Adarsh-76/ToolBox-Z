import React, { useState } from 'react';
import styles from './RearrangePdfInfo.module.css';
import Reveal from './Reveal';

const RearrangePdfInfo = () => {
  const features = [
    { icon: '🔀', title: 'Reorder Pages', desc: 'Rearrange your PDF pages into any sequence you need with a simple text input.' },
    { icon: '🗑️', title: 'Delete Pages', desc: 'Remove unwanted pages simply by omitting their numbers from the new order.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Generates your new PDF in seconds directly in your browser without uploading.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '📄', title: 'Lossless Quality', desc: 'Preserves the exact original quality, text, and images of your PDF pages.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Rearrange and delete unlimited PDFs with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Moving the conclusion to the front',
    'Deleting blank pages from a scan',
    'Reordering presentation slides',
    'Removing sensitive pages before sharing',
    'Fixing mixed-up document sections',
    'Creating a custom excerpt from a book'
  ];

  const faqs = [
    { q: 'How do I rearrange pages?', a: "When you upload your PDF, the tool will list all pages (e.g., 1, 2, 3). Simply change the order of those numbers (e.g., 3, 1, 2) and click Generate." },
    { q: 'How do I delete pages?', a: "To delete a page, just remove its number from the input box. For example, if you have 3 pages and want to delete page 2, just type '1, 3'." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All processing happens directly in your browser. Your files are never uploaded." },
    { q: 'Will the quality decrease?', a: "No. This tool extracts the exact original pages and places them in a new PDF, meaning 100% of the original quality, text, and formatting is preserved." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Rearrange & Delete PDF Tool</h2>
          <p className={styles.paragraph}>
            Sometimes a PDF has the pages in the wrong order, or contains blank/secret pages you don't want to share. Manually fixing this is impossible without expensive software.
          </p>
          <p className={styles.paragraph}>
            Our tool combines rearranging and deleting into one easy step. Just type the page numbers in the exact order you want them, leave out the ones you don't, and download your perfect new PDF.
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

export default RearrangePdfInfo;
