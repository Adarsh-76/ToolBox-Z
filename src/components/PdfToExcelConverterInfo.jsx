import React, { useState } from 'react';
import styles from './PdfToExcelConverterInfo.module.css';
import Reveal from './Reveal';

const PdfToExcelConverterInfo = () => {
  const features = [
    { icon: '📉', title: 'Automated Table Extraction', desc: 'Smart algorithms analyze text coordinates to reconstruct tables accurately.' },
    { icon: '✏️', title: 'Editable Excel Output', desc: 'Get clean .xlsx files where you can edit numbers, text, and formulas instantly.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Convert PDFs to Excel in seconds directly in your browser without uploads.' },
    { icon: '🔒', title: '100% Private', desc: 'Your financial and business documents never leave your device.' },
    { icon: '📊', title: 'Multi-Page Support', desc: 'Extracts data from all pages of your PDF into a single Excel sheet.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited PDF to Excel conversions with no hidden fees or sign-ups.' }
  ];

  const useCases = [
    'Extracting financial data from PDF reports',
    'Converting invoices into accounting spreadsheets',
    'Parsing research data tables',
    'Extracting pricing lists from PDF catalogs',
    'Importing PDF data into data analysis tools',
    'Archiving structured data from forms'
  ];

  const faqs = [
    { q: 'Does this tool work with scanned PDFs?', a: "No. This tool extracts text based on digital text coordinates. If your PDF is a scanned image, it requires OCR (Optical Character Recognition) to read the text, which this specific tool does not do." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All PDF parsing and Excel generation happens directly in your browser. Your files are never uploaded." },
    { q: 'Will the Excel file look exactly like the PDF?', a: "The tool attempts to reconstruct the table grid based on text spacing. Very complex PDF layouts might be slightly misaligned, but standard data tables extract perfectly." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF to Excel Converter</h2>
          <p className={styles.paragraph}>
            Manually retyping data from a PDF table into Excel is tedious and prone to errors. Whether it's a financial report, an invoice, or a research paper, copying and pasting usually destroys the table formatting.
          </p>
          <p className={styles.paragraph}>
            Our PDF to Excel Converter analyzes the physical layout of text on the PDF page, grouping items into rows and columns to rebuild the table. You get an editable .xlsx file in seconds, ready for analysis.
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

export default PdfToExcelConverterInfo;
