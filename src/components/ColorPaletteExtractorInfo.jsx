import React, { useState } from 'react';
import styles from './ColorPaletteExtractorInfo.module.css';
import Reveal from './Reveal';

const ColorPaletteExtractorInfo = () => {
  const features = [
    { icon: '🎨', title: 'Extract Dominant Colors', desc: 'Automatically finds the 6 most prominent colors in any image.' },
    { icon: '📋', title: 'One-Click HEX Copy', desc: 'Click any color to instantly copy its HEX code to your clipboard.' },
    { icon: '⚡', title: 'Fast & Private', desc: 'Images are processed locally in your browser. No uploads to servers.' },
    { icon: '🖌️', title: 'Design Inspiration', desc: 'Perfect for creating UI themes, matching brand colors, or finding palettes.' }
  ];

  const faqs = [
    { q: 'How does it find the colors?', a: 'We scale your image down and analyze the pixel data using a color quantization algorithm to group similar colors and find the most frequent ones.' },
    { q: 'Can I use this for any image?', a: 'Yes! It works with JPEGs, PNGs, and WEBPs. It works best with photos, wallpapers, or screenshots of websites.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Color Palette Extractor</h2>
          <p className={styles.paragraph}>
            Finding the perfect color palette for your next design project can be hard. But what if you see a photo or a website with colors you love?
          </p>
          <p className={styles.paragraph}>
            Simply upload the image to our Color Palette Extractor, and we will instantly analyze it and give you the top 6 dominant colors with their HEX codes.
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

export default ColorPaletteExtractorInfo;
