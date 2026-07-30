import React, { useState } from 'react';
import styles from './PdfGeneratorInfo.module.css';
import Reveal from './Reveal';

const PdfGeneratorInfo = () => {
  const features = [
    { icon: '🖼️', title: 'Multiple Image Upload', desc: 'Select and combine multiple images at once to create a single, organized PDF document.' },
    { icon: '✨', title: 'HD Quality Output', desc: 'Preserves the original resolution of your images. The PDF page sizes itself to match your photos exactly.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images are processed entirely in your browser. They are never uploaded to any server.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'No waiting around. The PDF is compiled and downloaded to your device in milliseconds.' },
    { icon: '🗑️', title: 'Easy Management', desc: 'Preview your selected images and remove any unwanted ones before generating the final PDF.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works seamlessly on Android, iOS, Windows, and Mac. Generate PDFs right from your phone.' }
  ];

  const useCases = [
    'Scanning documents and receipts',
    'Creating photo albums',
    'Submitting assignments',
    'Archiving screenshots',
    'Combining memes into one file',
    'Sharing multiple images as one link'
  ];

  const faqs = [
    { q: 'Is there a limit to how many images I can add?', a: 'There is no hard limit set by the app. However, since the processing happens in your browser, adding hundreds of extremely high-resolution photos at once might slow down your device temporarily.' },
    { q: 'Does the PDF compress my images?', a: 'We use JPEG compression to keep the file size manageable, but the page dimensions are set to the exact pixel dimensions of your original image to maintain HD visual quality.' },
    { q: 'Are my images uploaded to your server?', a: 'No. This tool runs 100% locally in your browser using JavaScript. Your images never leave your device, ensuring total privacy.' },
    { q: 'Can I reorder the images?', a: 'Currently, the PDF is generated in the order you selected the images. Drag-to-reorder functionality may be added in a future update!' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image to PDF Generator</h2>
          <p className={styles.paragraph}>
            Converting images to PDFs is a common necessity, whether you are submitting school assignments, compiling receipts for expense reports, or organizing photos. Our tool makes this process incredibly fast and entirely private.
          </p>
          <p className={styles.paragraph}>
            Unlike other online converters that require you to upload your personal images to unknown servers, our PDF Generator uses modern browser technology to compile your PDF locally. This means zero upload time and 100% privacy.
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

export default PdfGeneratorInfo;
