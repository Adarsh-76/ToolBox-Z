import React, { useState } from 'react';
import styles from './BackgroundRemoverInfo.module.css';
import Reveal from './Reveal';

const BackgroundRemoverInfo = () => {
  const features = [
    { icon: '🪄', title: 'One-Click Magic', desc: 'Automatically detects the subject in your photo and erases the background instantly.' },
    { icon: '🧠', title: 'In-Browser AI', desc: 'Uses ONNX machine learning models running locally via WebAssembly. No cloud processing.' },
    { icon: '🖼️', title: 'HD Transparent PNG', desc: 'Outputs high-quality PNG files with full alpha transparency, ready for any project.' },
    { icon: '⚡', title: 'Fast Processing', desc: 'Optimized to run inference in seconds using your device\'s native GPU.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your browser. Perfect for sensitive or personal images.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Remove backgrounds from unlimited images with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Creating product photos for e-commerce',
    'Making profile pictures',
    'Designing custom stickers',
    'Editing profile banners',
    'Isolating objects for graphic design',
    'Removing unwanted background clutter'
  ];

  const faqs = [
    { q: 'How does the background removal work?', a: 'We use an AI neural network (U2Net) that has been trained on millions of images to distinguish between the foreground subject and the background. It creates a precise mask and cuts it out.' },
    { q: 'Why does it take a few seconds to load the first time?', a: 'On the first run, the tool downloads the AI model file (about 40MB) into your browser cache. Subsequent runs will be much faster because it loads locally.' },
    { q: 'What format is the downloaded image?', a: 'The result is downloaded as a PNG file. PNG supports alpha transparency, meaning the background will be see-through when you place the image on a website or document.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using WebAssembly. Your photos are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Background Remover</h2>
          <p className={styles.paragraph}>
            Removing an image background used to require complex software like Photoshop and manual clipping paths. Our Background Remover makes it automatic.
          </p>
          <p className={styles.paragraph}>
            By leveraging modern browser technology and machine learning, this tool identifies the main subject in your photo—whether it\'s a person, a car, or a product—and erases everything else. You get a clean, transparent PNG in seconds.
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

export default BackgroundRemoverInfo;
