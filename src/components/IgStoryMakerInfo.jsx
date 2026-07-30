import React, { useState } from 'react';
import styles from './IgStoryMakerInfo.module.css';
import Reveal from './Reveal';

const IgStoryMakerInfo = () => {
  const features = [
    { icon: '📸', title: 'Perfect Dimensions', desc: 'Automatically exports your story in 1080x1920px HD, the ideal size for Instagram.' },
    { icon: '🖼️', title: 'Custom Backgrounds', desc: 'Upload any photo from your device to use as a full-screen story background.' },
    { icon: '✍️', title: 'Typography Control', desc: 'Adjust font size, text color, and alignment to match your brand aesthetic.' },
    { icon: '🌑', title: 'Overlay Opacity', desc: 'Darken your background image to ensure your text is perfectly readable.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Everything renders locally in your browser. No waiting for server renders.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Create sensitive stories securely.' }
  ];

  const steps = [
    'Click "Upload Background" and select an image from your device.',
    'Type your story text in the text box.',
    'Adjust the font size, color, and alignment using the controls.',
    'Use the "Overlay" slider to darken your image for better text readability.',
    'Click "Download HD Story" to save the perfect 1080x1920px image to your device.'
  ];

  const faqs = [
    { q: 'What size is an Instagram Story?', a: 'The optimal size for an Instagram Story is 1080 pixels wide by 1920 pixels tall (a 9:16 aspect ratio). Our tool exports exactly at this resolution.' },
    { q: 'Can I use this for Facebook Stories too?', a: 'Yes! Facebook Stories use the exact same dimensions (1080x1920) as Instagram Stories.' },
    { q: 'Is there a watermark on the download?', a: 'No, our tool is completely free and downloads a clean, high-quality PNG file with no watermarks.' },
    { q: 'Does the tool save my photos?', a: 'No. Everything runs locally in your browser. The images you upload are never uploaded to a server.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our IG Story Maker</h2>
          <p className={styles.paragraph}>
            Creating Instagram Stories that stand out requires more than just snapping a photo. You need beautiful typography, readable overlays, and perfect dimensions.
          </p>
          <p className={styles.paragraph}>
            Our IG Story Maker gives you a live preview of your design and exports a pixel-perfect 1080x1920 HD image ready to be uploaded directly to your social media.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default IgStoryMakerInfo;
