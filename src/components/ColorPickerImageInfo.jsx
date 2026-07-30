import React, { useState } from 'react';
import styles from './ColorPickerImageInfo.module.css';
import Reveal from './Reveal';

const ColorPickerImageInfo = () => {
  const features = [
    { icon: '🎯', title: 'Pixel-Perfect Picking', desc: 'Click anywhere on your uploaded image to get the exact color of that specific pixel.' },
    { icon: '🎨', title: 'HEX & RGB Output', desc: 'Instantly get the color code in both HEX and RGB formats for your CSS or design software.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Click the color card to instantly copy the code to your clipboard.' },
    { icon: '⚡', title: '100% Local', desc: 'Images are processed entirely in your browser. No uploads, completely private.' }
  ];

  const faqs = [
    { q: 'How does the eyedropper work?', a: 'We use the HTML5 Canvas API to draw your image in the background. When you click, we read the exact Red, Green, and Blue (RGB) values of that pixel on the canvas.' },
    { q: 'Can I pick colors from a screenshot?', a: 'Yes! Just take a screenshot on your phone or computer, upload it using the button, and click anywhere to pick the color.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Image Color Picker</h2>
          <p className={styles.paragraph}>
            Ever see a color in a photo or on a website and want to use it in your own design? Finding the exact HEX code can be frustrating.
          </p>
          <p className={styles.paragraph}>
            Simply upload the image to our Image Color Picker, click on the color you want, and instantly get the HEX and RGB codes.
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
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}>
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

export default ColorPickerImageInfo;
