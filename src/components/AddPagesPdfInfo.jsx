import React, { useState } from 'react';
import styles from './AddPagesPdfInfo.module.css';
import Reveal from './Reveal';

const AddPagesPdfInfo = () => {
  const features = [
    { icon: '➕', title: 'Insert Anywhere', desc: 'Add new pages at the beginning, the end, or exactly after any specific page.' },
    { icon: '🖼️', title: 'Image to Page', desc: 'Easily convert JPG or PNG images into full PDF pages and insert them instantly.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Generates your updated PDF in seconds directly in your browser without uploading.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '📄', title: 'Lossless Quality', desc: 'Preserves the exact original quality of your base PDF and images.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Add unlimited pages to unlimited PDFs with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Adding a cover page to a report',
    'Inserting scanned signature pages into contracts',
    'Appending an appendix to a thesis',
    'Adding new slides to a PDF presentation',
    'Inserting missing pages into a downloaded document',
    'Combining images and text pages into one file'
  ];

  const faqs = [
    { q: 'How do I add pages to my PDF?', a: "Upload your base PDF, then upload the images you want to add as new pages. Choose where you want them inserted (e.g., 'After Page 2'), and click Generate." },
    { q: 'Can I insert another PDF instead of images?', a: "Currently, this tool supports inserting images (JPG/PNG) as new pages. To insert another PDF, you can use our 'Merge PDF Files' tool instead." },
    { q: 'Are my files uploaded to a server?', a: "No. We take your privacy seriously. All processing happens directly in your browser. Your files are never uploaded." },
    { q: 'Will the quality decrease?', a: "No. This tool embeds your images at their full resolution and preserves the exact original quality of your base PDF pages." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Add Pages to PDF Tool</h2>
          <p className={styles.paragraph}>
            Sometimes you need to update an existing PDF by adding new information. Maybe you need to add a cover page, insert a scanned signature, or append a new section at the end.
          </p>
          <p className={styles.paragraph}>
            Our Add Pages to PDF tool makes this easy. Just upload your base PDF, select the images you want to insert as new pages, choose the insertion point, and download your updated document in seconds.
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

export default AddPagesPdfInfo;
