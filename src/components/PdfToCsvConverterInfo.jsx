import React, { useState } from 'react';
import styles from './PdfToCsvConverterInfo.module.css';
import Reveal from './Reveal';

const PdfToCsvConverterInfo = () => {
  const features = [
    { icon: '🗂️', title: 'Structured Data Extraction', desc: 'Smart algorithms analyze text coordinates to reconstruct tables accurately.' },
    { icon: '📊', title: 'Universal CSV Output', desc: 'Get clean .csv files that open instantly in Excel, Google Sheets, or Python.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Convert PDFs to CSV in seconds directly in your browser without uploads.' },
    { icon: '🔒', title: '100% Private', desc: 'Your data documents never leave your device. All processing happens locally.' },
    { icon: '📄', title: 'Multi-Page Support', desc: 'Extracts data from all pages of your PDF into a single continuous CSV file.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited PDF to CSV conversions with no hidden fees or sign-ups.' }
  ];

  const useCases = [
    'Extracting financial data for Python analysis',
    'Converting reports into database imports',
    'Parsing research data tables',
    'Extracting inventory lists from PDFs',
    'Importing PDF data into BI tools',
    'Archiving structured data from forms'
  ];

  const faqs = [
    { q: 'Does this tool work with scanned PDFs?', a: "No. This tool extracts text based on digital text coordinates. If your PDF is a scanned image, it requires OCR (Optical Character Recognition) to read the text, which this specific tool does not do." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All PDF parsing and CSV generation happens directly in your browser. Your files are never uploaded." },
    { q: 'Will the CSV look exactly like the PDF?', a: "The tool attempts to reconstruct the table grid based on text spacing. Very complex PDF layouts might be slightly misaligned, but standard data tables extract perfectly." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF to CSV Converter</h2>
          <p className={styles.paragraph}>
            CSV (Comma Separated Values) is the universal language for data analysis. But extracting data locked inside a PDF into a usable CSV format is notoriously difficult.
          </p>
          <p className={styles.paragraph}>
            Our PDF to CSV Converter analyzes the physical layout of text on the PDF page, grouping items into rows and columns to rebuild your data. You get an instantly usable .csv file in seconds.
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

export default PdfToCsvConverterInfo;
