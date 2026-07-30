import React, { useState } from 'react';
import styles from './ImageToTextInfo.module.css';
import Reveal from './Reveal';

const ImageToTextInfo = () => {
  const features = [
    { icon: '🧠', title: 'AI-Powered OCR', desc: 'Utilizes the Tesseract.js engine to accurately recognize and extract text from images.' },
    { icon: '⚡', title: 'Real-Time Progress', desc: 'Watch the scanning progress live as the engine reads your image pixel by pixel.' },
    { icon: '📋', title: 'Instant Copy', desc: 'Easily extract the recognized text and copy it to your clipboard with a single click.' },
    { icon: '🔒', title: '100% Private', desc: 'Image processing happens entirely in your browser. No images are uploaded to any server.' },
    { icon: '🌐', title: 'Multi-Platform', desc: 'Works smoothly on mobile phones, tablets, and desktop computers.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Extract unlimited images without any hidden charges, subscriptions, or sign-ups.' }
  ];

  const useCases = [
    'Digitizing printed documents',
    'Extracting code from screenshots',
    'Reading text from memes',
    'Translating restaurant menus',
    'Saving receipts for expenses',
    'Copying text from scanned PDFs'
  ];

  const faqs = [
    { q: 'How does Image to Text work?', a: 'We use Optical Character Recognition (OCR) technology. The engine analyzes the shapes of characters in your image and matches them to known letters and numbers.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using WebAssembly. Your images stay on your device, ensuring complete privacy.' },
    { q: 'What languages are supported?', a: 'Currently, this tool is optimized for English. Support for additional languages may be added in future updates.' },
    { q: 'Why is the text extraction inaccurate?', a: 'OCR accuracy depends on image quality. For best results, use high-resolution images with clear, high-contrast text and minimal background noise.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image to Text Tool</h2>
          <p className={styles.paragraph}>
            Manually typing text from an image or a scanned document is tedious and time-consuming. Our Image to Text (OCR) tool eliminates this hassle by instantly converting image-based text into editable digital text.
          </p>
          <p className={styles.paragraph}>
            Whether you have a screenshot of code, a photo of a recipe, or a scanned receipt, simply upload the image and let our engine do the heavy lifting. Everything happens locally in your browser, ensuring speed and privacy.
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
          <p className={styles.paragraph}>This tool is a daily driver for students, professionals, and content creators:</p>
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

export default ImageToTextInfo;
