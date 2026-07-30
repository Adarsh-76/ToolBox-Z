import React, { useState } from 'react';
import styles from './PowerpointToPdfConverterInfo.module.css';
import Reveal from './Reveal';

const PowerpointToPdfConverterInfo = () => {
  const features = [
    { icon: '📽️', title: 'Slide Extraction', desc: 'Reads .pptx files and accurately extracts text content from every slide.' },
    { icon: '📄', title: 'Formatted PDFs', desc: 'Generates a clean, easy-to-read PDF with each slide formatted on its own page.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Converts presentations in seconds directly in your browser without uploads.' },
    { icon: '🔒', title: '100% Private', desc: 'Your presentations never leave your device. All processing happens locally.' },
    { icon: '🎨', title: 'Universal Format', desc: 'Creates standard PDF files compatible with any device, OS, or PDF reader.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited PowerPoint files to PDF with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Sharing presentation outlines with clients',
    'Archiving slide text in a searchable format',
    'Sending presentation notes to colleagues',
    'Printing handouts from slides',
    'Extracting text data from presentations',
    'Viewing slides on devices without PowerPoint'
  ];

  const faqs = [
    { q: 'Does this tool support old .ppt files?', a: "No. This tool only supports the modern .pptx format. Old .ppt files use a proprietary binary format that cannot be safely parsed in the browser. Please save your file as .pptx in PowerPoint first." },
    { q: 'Will the PDF look exactly like my PowerPoint?', a: "The tool extracts all the text from your slides and formats it cleanly into a PDF. It does not capture complex layouts, images, or custom fonts, but it perfectly preserves the text content of your presentation." },
    { q: 'Are my PowerPoint files uploaded to a server?', a: "No. We take your privacy seriously. All processing happens directly in your browser. Your files are never uploaded to any server." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard presentations up to 50MB without any issues." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PowerPoint to PDF Converter</h2>
          <p className={styles.paragraph}>
            PowerPoint files are great for presentations, but they can be difficult to share. Different screen sizes, missing fonts, and accidental edits can ruin a carefully crafted deck.
          </p>
          <p className={styles.paragraph}>
            Our PowerPoint to PDF Converter solves this by extracting the text from your slides and locking it into a clean, universally readable PDF format. Your presentation content will look exactly as intended on any device.
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

export default PowerpointToPdfConverterInfo;
