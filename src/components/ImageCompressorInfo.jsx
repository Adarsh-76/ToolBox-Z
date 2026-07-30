import React, { useState } from 'react';
import styles from './ImageCompressorInfo.module.css';
import Reveal from './Reveal';

const ImageCompressorInfo = () => {
  const features = [
    { icon: '🗜️', title: 'Smart Compression', desc: 'Adjust the quality slider to find the perfect balance between file size and visual quality.' },
    { icon: '📊', title: 'Live Size Calculation', desc: 'See the exact expected output file size and your total space savings before you download.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Compression happens locally in your browser. No uploads, no waiting for server queues.' },
    { icon: '💰', title: 'Save Bandwidth', desc: 'Smaller images load faster on websites and take up less storage space on your device.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your computer. Compress sensitive documents securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Compress unlimited images with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Optimizing images for websites',
    'Reducing email attachment sizes',
    'Saving storage space on phones',
    'Faster page load speeds',
    'Compressing photos for web forms',
    'Meeting file size upload limits'
  ];

  const faqs = [
    { q: 'How does image compression work?', a: 'We use the HTML5 Canvas API to re-encode your image as a JPEG with a specified quality level. This removes redundant pixel data, drastically reducing the file size.' },
    { q: 'Will compression ruin my image?', a: 'It depends on the quality slider. 80-90% quality is visually identical to the original for most photos. Dropping below 50% will introduce visible pixelation.' },
    { q: 'Why does it convert to JPEG?', a: 'JPEG offers the best lossy compression for photographs. PNG is a lossless format, meaning it cannot be effectively compressed without converting it.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Compressor</h2>
          <p className={styles.paragraph}>
            High-resolution images can slow down websites, fail email attachment limits, and consume valuable storage space. Our Image Compressor solves this by reducing the file size of your images instantly.
          </p>
          <p className={styles.paragraph}>
            By using a smart quality slider, you can decide exactly how much to compress your image. With our live size calculator, you can see exactly how many kilobytes you're saving before you even hit download.
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

export default ImageCompressorInfo;
