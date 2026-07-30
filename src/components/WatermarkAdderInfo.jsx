import React, { useState } from 'react';
import styles from './WatermarkAdderInfo.module.css';
import Reveal from './Reveal';

const WatermarkAdderInfo = () => {
  const features = [
    { icon: '💧', title: 'Text Watermarks', desc: 'Easily overlay custom text to protect your intellectual property.' },
    { icon: '🎨', title: 'Full Customization', desc: 'Adjust the color, font size, and opacity to match your brand perfectly.' },
    { icon: '📐', title: 'Position Control', desc: 'Place your watermark in any corner or dead center with one click.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rendering happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Watermarked images are saved as high-quality PNGs to preserve detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Watermark sensitive images securely.' }
  ];

  const useCases = [
    'Protecting photography portfolios',
    'Branding social media posts',
    'Securing digital art',
    'Marking confidential documents',
    'Adding logos to product images',
    'Deterring image theft'
  ];

  const faqs = [
    { q: 'How do I add a watermark?', a: 'Upload your image, type your text (e.g., © Your Brand), adjust the color, size, opacity, and position using the controls, and click download. The tool will bake the watermark directly into a new image.' },
    { q: 'Can I use an image as a watermark?', a: 'Currently, this tool supports text watermarks for maximum flexibility and speed. Image watermark support may be added in a future update.' },
    { q: 'Does the watermark reduce image quality?', a: 'No. The tool uses the HTML5 Canvas API to draw the text directly onto the original image pixels. The output is a high-quality PNG.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Watermark Adder</h2>
          <p className={styles.paragraph}>
            If you share photos online, protecting them from unauthorized use is crucial. Adding a watermark is the simplest way to claim ownership and deter image theft.
          </p>
          <p className={styles.paragraph}>
            Our Watermark Adder gives you a live preview of exactly how your watermark will look before you download. With full control over color, size, opacity, and position, you can brand your images professionally in seconds.
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

export default WatermarkAdderInfo;
