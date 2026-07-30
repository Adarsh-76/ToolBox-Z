import React, { useState } from 'react';
import styles from './PdfToWordConverterInfo.module.css';
import Reveal from './Reveal';

const PdfToWordConverterInfo = () => {
  const features = [
    { icon: '📝', title: 'Editable Text', desc: 'Extracts text from PDF pages and converts them into editable Word paragraphs.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Conversion happens locally in your browser. No uploads or waiting queues.' },
    { icon: '🔒', title: '100% Private', desc: 'Your PDF documents never leave your device. Securely convert sensitive files.' },
    { icon: '📊', title: 'Multi-Page Support', desc: 'Easily convert long, multi-page PDF documents into a single Word file.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited PDFs to Word with no watermarks or sign-ups.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on Windows, Mac, and mobile devices right in your browser.' }
  ];

  const steps = [
    'Click the upload area and select the PDF file you want to convert.',
    'Wait for the file to load into the converter.',
    'Click the "Convert to Word" button to start the extraction process.',
    'Watch the progress bar as the tool reads through your PDF pages.',
    'The Word document (.docx) will download automatically to your device.'
  ];

  const faqs = [
    { q: 'Will the Word document look exactly like the PDF?', a: 'This tool extracts the raw text and paragraph structure. Complex layouts, images, and custom fonts from the PDF will not be preserved. It is designed for extracting editable text, not cloning the visual layout.' },
    { q: 'Can I convert scanned PDFs?', a: 'No. Scanned PDFs are essentially images. This tool extracts embedded text. To convert scanned PDFs, you would need an OCR (Optical Character Recognition) tool like our Image to Text tool.' },
    { q: 'Is there a file size limit?', a: 'Since the conversion happens in your browser, extremely large PDFs (over 50MB) might slow down your device or crash the tab. We recommend splitting very large PDFs first.' },
    { q: 'Is my document uploaded to a server?', a: 'No. This tool runs entirely in your browser using WebAssembly. Your files are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF to Word Converter</h2>
          <p className={styles.paragraph}>
            Need to edit a PDF document but don't have the original Word file? Our PDF to Word Converter bridges that gap by extracting the text from your PDF and packaging it into an editable .docx file.
          </p>
          <p className={styles.paragraph}>
            Whether you need to update a contract, edit a resume, or rewrite an essay, this tool saves you from having to retype everything from scratch.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default PdfToWordConverterInfo;
