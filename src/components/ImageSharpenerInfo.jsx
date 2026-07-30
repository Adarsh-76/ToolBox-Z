import React, { useState } from 'react';
import styles from './ImageSharpenerInfo.module.css';
import Reveal from './Reveal';

const ImageSharpenerInfo = () => {
  const features = [
    { icon: '🔪', title: 'Clarity Slider', desc: 'Easily drag the slider to bring out fine details and fix blurry photos.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See exactly how your sharpened image will look before you download it.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rendering happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Sharpened images are saved as high-quality PNGs to preserve detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Edit sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Sharpen unlimited images with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Fixing slightly blurry photos',
    'Enhancing text in screenshots',
    'Bringing out details in product shots',
    'Preparing images for print',
    'Restoring old scanned photos',
    'Improving landscape photography'
  ];

  const faqs = [
    { q: 'How does the sharpening work?', a: 'We use the HTML5 Canvas API to apply a high-contrast filter that enhances the edges of objects in your photo, making them appear crisper and less blurry.' },
    { q: 'Will sharpening add noise?', a: 'Over-sharpening can introduce grain or noise, especially in low-light photos. We recommend finding a balance using the slider, usually around 40-60%.' },
    { q: 'Does sharpening reduce quality?', a: 'No. The tool uses the original image pixels. The output is a high-quality PNG file, meaning no resolution is lost.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Sharpener</h2>
          <p className={styles.paragraph}>
            Sometimes photos come out slightly soft or blurry due to camera focus or motion. Our Image Sharpener helps bring those photos back to life.
          </p>
          <p className={styles.paragraph}>
            By enhancing the contrast along the edges of objects in your image, this tool makes the photo look crisper and more detailed. With a live preview, you can find the perfect balance of sharpness before downloading.
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

export default ImageSharpenerInfo;
