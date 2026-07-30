import React, { useState } from 'react';
import styles from './WordToPdfConverterInfo.module.css';
import Reveal from './Reveal';

const WordToPdfConverterInfo = () => {
  const features = [
    { icon: '📄', title: 'Document Conversion', desc: 'Easily convert your editable Word documents into shareable PDF files.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents are processed locally in your browser. No uploads required.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Convert files in seconds without waiting for server queues or email links.' },
    { icon: '📝', title: 'Preserves Text', desc: 'Extracts text, headings, and basic formatting from your .docx files.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited Word documents to PDF with no watermarks or sign-ups.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on Windows, Mac, and mobile devices right in your browser.' }
  ];

  const steps = [
    'Click the upload area and select the .docx file you want to convert.',
    'Wait for the file to load into the converter.',
    'Click the "Convert to PDF" button to start the rendering process.',
    'Watch the progress bar as the tool reads your document.',
    'The PDF file will download automatically to your device.'
  ];

  const faqs = [
    { q: 'Will the PDF look exactly like the Word document?', a: 'This tool extracts text and basic formatting (like headings and lists). Complex layouts, custom fonts, or embedded images might not be preserved perfectly. For complex documents, a desktop converter is still recommended.' },
    { q: 'Can I convert .doc files (Word 97-2003)?', a: 'No. This tool only supports the modern .docx format. Legacy .doc files use a different binary structure that cannot be parsed in the browser.' },
    { q: 'Is there a file size limit?', a: 'Since the conversion happens in your browser, extremely large Word documents (over 20MB) might slow down your device or crash the tab. We recommend splitting very large documents first.' },
    { q: 'Is my document uploaded to a server?', a: 'No. This tool runs entirely in your browser using JavaScript libraries. Your files are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Word to PDF Converter</h2>
          <p className={styles.paragraph}>
            Need to share a Word document but want to ensure the formatting stays fixed? Converting it to PDF is the best solution. Our tool allows you to convert your .docx files into PDFs directly in your browser.
          </p>
          <p className={styles.paragraph}>
            Whether you are submitting a resume, sharing a contract, or archiving a file, this tool saves you from needing expensive desktop software.
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

export default WordToPdfConverterInfo;
