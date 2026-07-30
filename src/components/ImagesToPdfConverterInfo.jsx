import React, { useState } from 'react';
import styles from './ImagesToPdfConverterInfo.module.css';
import Reveal from './Reveal';

const ImagesToPdfConverterInfo = () => {
  const features = [
    { icon: '🖼️', title: 'Multi-Image Support', desc: 'Combine multiple JPG, PNG, or WEBP images into a single PDF document.' },
    { icon: '🔀', title: 'Easy Reordering', desc: 'Drag and rearrange the order of your images before generating the PDF.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All conversion happens locally in your browser. No uploads required.' },
    { icon: '📄', title: 'HD Quality Output', desc: 'Generates a high-quality PDF preserving the original resolution of your images.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Create sensitive PDFs securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited images to PDF with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Scanning receipts for expenses',
    'Combining assignment pages into one file',
    'Creating photo albums',
    'Archiving screenshots',
    'Submitting multiple documents as one',
    'Sharing image sequences as a document'
  ];

  const faqs = [
    { q: 'How do I convert images to PDF?', a: 'Upload your images, reorder them by clicking the arrows, and click "Convert to PDF". The tool will instantly generate and download a combined PDF file.' },
    { q: 'What image formats are supported?', a: 'You can upload JPG, JPEG, PNG, and WEBP files. They will all be safely embedded into the PDF.' },
    { q: 'Does it reduce image quality?', a: 'No. The tool uses the original image data and creates a custom PDF page size to match your image exactly, ensuring zero quality loss.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using the jsPDF library. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Images to PDF Converter</h2>
          <p className={styles.paragraph}>
            Sharing multiple images individually can be messy and hard to organize. Combining them into a single PDF document makes them much easier to send, view, and print.
          </p>
          <p className={styles.paragraph}>
            Our Images to PDF Converter lets you bulk-upload your photos, reorder them visually, and generate a high-quality PDF in seconds. Everything happens locally in your browser, ensuring maximum privacy and speed.
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

export default ImagesToPdfConverterInfo;
