import React, { useState } from 'react';
import styles from './ImageRotatorInfo.module.css';
import Reveal from './Reveal';

const ImageRotatorInfo = () => {
  const features = [
    { icon: '🔄', title: '90° Quick Rotate', desc: 'Instantly fix sideways or upside-down photos with a single click.' },
    { icon: '🎛️', title: 'Fine-Tune Slider', desc: 'Need to straighten a tilted horizon? Use the slider for exact degree rotation.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rotation happens locally in your browser. No uploads or server queues.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Rotated images are saved as high-quality PNGs to preserve detail and transparency.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Rotate sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Rotate unlimited images with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Fixing sideways phone photos',
    'Straightening tilted horizons',
    'Correcting document scans',
    'Flipping images for mirrors',
    'Adjusting profile pictures',
    'Preparing images for printing'
  ];

  const faqs = [
    { q: 'How do I rotate an image by 90 degrees?', a: 'Use the "Rotate 90° Left" or "Rotate 90° Right" buttons in the settings panel. This is perfect for fixing photos that were taken in portrait mode but display sideways.' },
    { q: 'Can I rotate by custom angles?', a: 'Yes! Use the "Fine Tune" slider to rotate the image by single degrees. This is perfect for straightening a crooked photo where the horizon isn\'t level.' },
    { q: 'Does rotating reduce quality?', a: 'No. The tool uses the original image data and HTML5 Canvas to redraw the image at its exact original resolution. No pixel data is lost.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Rotator</h2>
          <p className={styles.paragraph}>
            Sometimes cameras or phones save photos with the wrong orientation metadata, resulting in sideways or upside-down images. Our Image Rotator fixes this instantly.
          </p>
          <p className={styles.paragraph}>
            Whether you need a quick 90-degree fix or a fine-tune adjustment to straighten a tilted horizon, this tool provides a smooth, live preview so you know exactly how your final image will look before you download it.
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

export default ImageRotatorInfo;
