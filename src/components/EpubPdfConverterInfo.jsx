import React, { useState } from 'react';
import styles from './EpubPdfConverterInfo.module.css';
import Reveal from './Reveal';

const EpubPdfConverterInfo = () => {
  const features = [
    { icon: '🔄', title: 'Bidirectional Conversion', desc: 'Convert PDF documents into e-reader-friendly ePub format, or convert ePub books back into standard PDFs.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Leverages powerful browser-based engines to process files instantly without uploading to external servers.' },
    { icon: '📱', title: 'ePub Optimization', desc: 'Creates reflowable ePub documents that adapt to any screen size, perfect for Kindle, Apple Books, and Kobo.' },
    { icon: '🔒', title: '100% Private', desc: 'All file parsing and conversion happens locally in your browser. Your books and documents never leave your device.' },
    { icon: '📂', title: 'Chapter Extraction', desc: 'Automatically parses ePub tables of contents (TOC) and structures them into readable chapters for PDF output.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited files with no watermarks, hidden fees, or subscription requirements.' }
  ];

  const users = [
    'Authors and writers', 'Students', 'E-reader owners (Kindle, Kobo)', 'Researchers', 'Publishers', 'Content converters', 'Audiobook listeners', 'Digital librarians'
  ];

  const benefits = [
    'Read PDFs on e-ink devices', 'Archive ePub books as PDFs', 'Avoid expensive conversion software', 'Maintain document privacy', 'Print e-book chapters easily'
  ];

  const faqs = [
    { q: 'Is this PDF to ePub converter free?', a: 'Yes, it is completely free to use with no limits on the number of files you can convert.' },
    { q: 'Why does the ePub text look different from the PDF?', a: 'PDFs are fixed-layout (like a printed page), while ePubs are reflowable (like a website). Our tool extracts the text so it can flow and adapt to your e-reader screen perfectly.' },
    { q: 'Are my files uploaded to a server?', a: 'No. This tool uses advanced JavaScript libraries (pdf.js, jszip, html2pdf) to process everything entirely in your browser. Your files are 100% private.' },
    { q: 'Does it convert images inside the PDF?', a: 'For PDF to ePub, it focuses on text extraction to ensure compatibility with all e-readers. For ePub to PDF, images are included if the ePub allows cross-origin access.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF ⇄ ePub Converter</h2>
          <p className={styles.paragraph}>
            PDF and ePub are the two most common document formats, but they serve very different purposes. PDFs are great for printing and preserving exact layouts, while ePubs are essential for reading on devices like Kindles, Nooks, and phones because the text adapts to the screen size.
          </p>
          <p className={styles.paragraph}>
            Our PDF ⇄ ePub Converter allows you to seamlessly switch between these formats right in your browser. Whether you want to read a PDF report on your Kindle or turn an e-book into a printable PDF, this tool handles it instantly and securely.
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
          <h2 className={styles.sectionTitle}>Who Can Use This Tool?</h2>
          <p className={styles.paragraph}>This tool is built for anyone who reads or manages digital documents, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Format Conversion</h2>
          <div className={styles.grid}>
            {benefits.map((ben, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>✅ {ben}</h3>
              </div>
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

export default EpubPdfConverterInfo;
