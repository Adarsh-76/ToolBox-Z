import React, { useState } from 'react';
import styles from './ExcelToPdfConverterInfo.module.css';
import Reveal from './Reveal';

const ExcelToPdfConverterInfo = () => {
  const features = [
    { icon: '📊', title: 'Multi-Sheet Support', desc: 'Easily convert Excel files with multiple sheets into a single, organized PDF document.' },
    { icon: '🎨', title: 'Formatted Tables', desc: 'Automatically generates clean, grid-style tables with headers based on your first row.' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Converts your spreadsheets in seconds directly in your browser. No waiting in upload queues.' },
    { icon: '🔒', title: '100% Private', desc: 'Your files never leave your device. All processing happens locally in your browser.' },
    { icon: '📄', title: 'Universal Format', desc: 'Creates standard PDF files compatible with any device, operating system, or PDF reader.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited Excel files to PDF with no watermarks, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Sharing financial reports with clients',
    'Creating printable invoices from spreadsheets',
    'Archiving data tables in a non-editable format',
    'Sending grade sheets to students',
    'Presenting data analysis to stakeholders',
    'Backing up structured data securely'
  ];

  const faqs = [
    { q: 'Does this tool support CSV files?', a: "Yes! In addition to standard Excel formats (.xlsx and .xls), this tool fully supports converting comma-separated values (.csv) files into formatted PDF tables." },
    { q: 'Are my Excel files uploaded to a server?', a: "No. We take your privacy seriously. This tool uses client-side processing, meaning your files are read and converted directly in your browser and never uploaded to any server." },
    { q: 'Will the PDF look exactly like my Excel file?', a: "The tool converts your data into a clean, readable table format. Complex Excel formatting (like custom colors, merged cells, or charts) is simplified into a structured grid to ensure the PDF is clean and readable." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. However, it easily handles standard spreadsheets up to 50MB without any issues." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Excel to PDF Converter</h2>
          <p className={styles.paragraph}>
            Excel files are perfect for data analysis, but they can be messy to share. Different screen sizes, missing fonts, and accidental edits can turn a great spreadsheet into a confusing mess for the recipient.
          </p>
          <p className={styles.paragraph}>
            Our Excel to PDF Converter solves this by locking your data into a clean, universally readable PDF format. Whether it's a financial report, an inventory list, or a CSV export, your tables will look exactly as intended on any device.
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

export default ExcelToPdfConverterInfo;
