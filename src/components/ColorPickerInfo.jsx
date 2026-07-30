import React, { useState } from 'react';
import styles from './ColorPickerInfo.module.css';
import Reveal from './Reveal';

const ColorPickerInfo = () => {
  const features = [
    { icon: '🎯', title: 'Precise Selection', desc: 'Pick exact colors using the native browser color wheel for pixel-perfect accuracy.' },
    { icon: '🔄', title: 'Multi-Format Conversion', desc: 'Instantly convert your selected color into HEX, RGB, and HSL formats without any math.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Simply click on any color format card to instantly copy the value to your clipboard.' },
    { icon: '⚡', title: 'Real-Time Updates', desc: 'See the color preview and all corresponding values change instantly as you adjust the picker.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers for on-the-go design.' },
    { icon: '🛡️', title: 'Privacy Friendly', desc: 'No data is sent to servers. All color calculations and conversions happen locally in your browser.' }
  ];

  const useCases = [
    'Web Developers matching CSS themes',
    'Graphic Designers extracting brand colors',
    'Digital Artists creating color palettes',
    'UI/UX Designers ensuring accessibility',
    'Marketers matching campaign visuals',
    'Hobbyists customizing personal projects'
  ];

  const faqs = [
    { q: 'How do I find the HEX code of a color?', a: 'Simply open the color picker, select the shade you want, and the HEX code will be displayed in the card below. Click the card to copy it!' },
    { q: 'What is the difference between HEX, RGB, and HSL?', a: 'HEX uses hexadecimal values, RGB uses Red/Green/Blue values from 0-255, and HSL represents Hue, Saturation, and Lightness. They are just different ways to represent the same color.' },
    { q: 'Can I use this tool offline?', a: 'Yes! Because the tool runs entirely in your browser, once the page is loaded, you can use it without an internet connection.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Color Picker Tool</h2>
          <p className={styles.paragraph}>
            Our Color Picker is an essential online tool designed for developers, designers, and digital artists. It allows you to effortlessly select colors and instantly convert them into HEX, RGB, and HSL formats. Whether you are styling a website with CSS or designing a digital masterpiece, this tool streamlines your workflow.
          </p>
          <p className={styles.paragraph}>
            Stop wasting time doing manual color math. Our tool handles all the complex conversions in real-time, right inside your browser, ensuring you get the exact color values you need with zero hassle.
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
          <h2 className={styles.sectionTitle}>Who Uses This Tool?</h2>
          <p className={styles.paragraph}>This Color Picker is widely used by professionals and hobbyists alike, including:</p>
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

export default ColorPickerInfo;
