import React, { useState } from 'react';
import styles from './ImageBlurInfo.module.css';
import Reveal from './Reveal';

const ImageBlurInfo = () => {
  const features = [
    { icon: '🌫️', title: 'Adjustable Intensity', desc: 'Slide from a subtle 1px blur to a heavy 30px blur for maximum effect.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See exactly how your blurred image will look before you download it.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rendering happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Blurred images are saved as high-quality PNGs to preserve detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Blur sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Blur unlimited images with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Censoring faces or license plates',
    'Creating depth-of-field effects',
    'Blurring sensitive information',
    'Making abstract backgrounds',
    'Softening skin in portraits',
    'Hiding spoilers in screenshots'
  ];

  const faqs = [
    { q: 'How do I blur an image?', a: 'Upload your image and use the "Blur Intensity" slider. Moving it right increases the blur. When you are happy with the look, click download.' },
    { q: 'Can I blur only part of an image?', a: 'Currently, this tool applies a uniform blur to the entire image. Selective blurring (like only faces) may be added in a future update.' },
    { q: 'Does blurring reduce quality?', a: 'No. The tool uses the HTML5 Canvas API to apply the filter to the original image pixels. The output is a high-quality PNG.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Blur Tool</h2>
          <p className={styles.paragraph}>
            Blurring an image is a useful technique whether you are trying to create a professional depth-of-field effect, make an abstract background, or censor sensitive information.
          </p>
          <p className={styles.paragraph}>
            Our Image Blur Tool provides a smooth, live preview so you know exactly how your final image will look. With a simple slider, you can control the intensity of the blur from 1px to 30px, and download the result instantly.
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

export default ImageBlurInfo;
