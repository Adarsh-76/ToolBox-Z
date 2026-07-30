import React, { useState } from 'react';
import styles from './BrightnessAdjusterInfo.module.css';
import Reveal from './Reveal';

const BrightnessAdjusterInfo = () => {
  const features = [
    { icon: '🔆', title: 'Brightness Control', desc: 'Lighten dark photos or fix overexposed shots with precise brightness sliders.' },
    { icon: '🎨', title: 'Contrast & Saturation', desc: 'Punch up colors and deepen shadows to make your images pop instantly.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See exactly how your adjustments look in real-time before downloading.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rendering happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Adjusted images are saved as high-quality PNGs to preserve detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Edit sensitive images securely.' }
  ];

  const useCases = [
    'Fixing dark indoor photos',
    'Enhancing washed-out landscapes',
    'Preparing product images',
    'Adjusting screenshots for tutorials',
    'Boosting colors for social media',
    'Correcting webcam captures'
  ];

  const faqs = [
    { q: 'How do I adjust image brightness?', a: 'Upload your image and use the "Brightness" slider. Moving it right increases brightness (whitening the image), while moving it left decreases it (darkening the image).' },
    { q: 'What does saturation do?', a: 'Saturation controls the intensity of colors. Setting it to 0% makes the image black and white, while 200% makes the colors neon-bright.' },
    { q: 'Does adjusting reduce quality?', a: 'No. The tool uses the HTML5 Canvas API to apply the filters to the original image pixels. The output is a high-quality PNG.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Brightness Adjuster</h2>
          <p className={styles.paragraph}>
            Not every photo comes out perfect. Sometimes they are too dark, too bright, or the colors look flat. Our Brightness Adjuster gives you the tools to fix these issues instantly.
          </p>
          <p className={styles.paragraph}>
            With a live preview and simple sliders for Brightness, Contrast, and Saturation, you can bring your photos back to life. Everything happens locally in your browser, ensuring maximum privacy and speed.
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

export default BrightnessAdjusterInfo;
