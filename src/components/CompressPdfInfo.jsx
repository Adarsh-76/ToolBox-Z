import React, { useState } from 'react';
import styles from './CompressPdfInfo.module.css';
import Reveal from './Reveal';

const CompressPdfInfo = () => {
  const features = [
    { icon: '🗜️', title: 'Smart Compression', desc: 'Intelligently rasterizes and re-encodes pages to drastically reduce file size.' },
    { icon: '🎚️', title: '3 Quality Levels', desc: 'Choose between Less Compression (Best Quality), Medium (Recommended), or High (Smallest Size).' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Compresses PDFs directly in your browser without uploading to a server.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '📉', title: 'Size Comparison', desc: 'See exactly how much file size you saved with our before-and-after stats.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Compress unlimited PDFs with no watermarks, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Emailing large PDFs that exceed attachment limits',
    'Uploading documents to web forms with size limits',
    'Saving storage space on your device',
    'Speeding up website load times for PDF links',
    'Optimizing scanned documents for archiving',
    'Sharing high-res presentations quickly'
  ];

  const faqs = [
    { q: 'How does the compression work?', a: "Our tool works by rendering each page of your PDF to a high-quality image, then reconstructing the PDF using optimized JPEG compression. This is especially effective for image-heavy or scanned PDFs." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All compression happens directly in your browser. Your files are never uploaded anywhere." },
    { q: 'Will the text still be selectable after compression?', a: "Because the pages are rasterized (turned into images) for maximum compression, the text will no longer be selectable. If you need selectable text, use 'Less Compression'." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Compress PDF Files Tool</h2>
          <p className={styles.paragraph}>
            PDF files can easily balloon to massive sizes, especially if they contain high-resolution images or scanned pages. Large PDFs are frustrating to email, slow to upload, and take up unnecessary storage.
          </p>
          <p className={styles.paragraph}>
            Our Compress PDF Files tool solves this by smartly optimizing the internal images and data streams. Just choose your quality level, and download a significantly smaller PDF in seconds.
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

export default CompressPdfInfo;
