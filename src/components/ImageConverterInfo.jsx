import React, { useState } from 'react';
import styles from './ImageConverterInfo.module.css';
import Reveal from './Reveal';

const ImageConverterInfo = () => {
  const features = [
    { icon: '🔄', title: 'Multi-Format Support', desc: 'Convert your images to PNG for transparency, JPEG for compression, or WEBP for modern web optimization.' },
    { icon: '✨', title: 'Auto-Enhancement', desc: 'Toggle the enhance feature to automatically apply contrast, saturation, and brightness adjustments during conversion.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All conversions happen locally in your browser using the HTML5 Canvas API. No server uploads required.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images never leave your device. Convert sensitive or personal photos securely.' },
    { icon: '📈', title: 'High Quality', desc: 'Maintains the original resolution and uses a 95% quality setting for JPEG and WEBP exports.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on Android, iOS, Windows, and Mac right from your browser.' }
  ];

  const useCases = [
    'Converting PNG to JPG to save space',
    'Converting images to WEBP for faster websites',
    'Enhancing dark photos before posting',
    'Stripping metadata by re-saving images',
    'Preparing images for email attachments',
    'Optimizing graphics for web deployment'
  ];

  const faqs = [
    { q: 'What is the best image format?', a: 'It depends on your use case. PNG is best for graphics requiring transparency. JPEG is best for photographs due to its compression. WEBP is the modern standard, offering high quality at smaller file sizes.' },
    { q: 'Does converting images reduce quality?', a: 'Converting to PNG or WEBP retains almost perfect quality. Converting to JPEG applies compression, but our tool uses a high 95% quality setting to keep it looking crisp.' },
    { q: 'How does the Auto-Enhance work?', a: 'When toggled on, the tool applies a mathematical filter to the canvas before conversion, boosting contrast by 15%, saturation by 30%, and slightly increasing brightness.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Converter</h2>
          <p className={styles.paragraph}>
            Different platforms and use cases require different image formats. What works for a high-quality print (PNG) might be too large for a website (JPEG/WEBP). Our Image Converter bridges this gap instantly.
          </p>
          <p className={styles.paragraph}>
            By combining format conversion with an optional auto-enhancement filter, this tool ensures your images are not only in the correct format but also look their absolute best. And because it runs entirely in your browser, it is incredibly fast and completely private.
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

export default ImageConverterInfo;
