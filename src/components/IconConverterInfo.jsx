import React, { useState } from 'react';
import styles from './IconConverterInfo.module.css';
import Reveal from './Reveal';

const IconConverterInfo = () => {
  const features = [
    { icon: '💠', title: 'Favicon Generator', desc: 'Create valid `.ico` files for browser tabs directly from any image.' },
    { icon: '📐', title: 'Multi-Size PNGs', desc: 'Download PNG icons in standard sizes (16px to 512px) for apps and web.' },
    { icon: '🖼️', title: 'SVG Wrapper', desc: 'Embed your image into an SVG format for scalable vector usage.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All conversion happens locally in your browser. No uploads required.' },
    { icon: '🔒', title: '100% Private', desc: 'Your icons never leave your device. Convert sensitive logos securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Generate unlimited icons with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Creating website favicons',
    'Generating app icons',
    'Formatting logos for web',
    'Making PWA manifest icons',
    'Converting raster to SVG wrappers',
    'Sizing icons for different UI elements'
  ];

  const faqs = [
    { q: 'How do I create a favicon?', a: 'Upload your logo or image, then click "Download favicon.ico". Place the downloaded file in your website root directory and link it in your HTML head: `<link rel="icon" href="favicon.ico">`.' },
    { q: 'Is the ICO file valid?', a: 'Yes, we construct a valid ICO directory header and embed a 32x32 PNG inside it. This is a modern standard supported by all current web browsers.' },
    { q: 'How does the SVG conversion work?', a: 'Since true raster-to-vector conversion is highly complex, this tool wraps a high-quality 512x512 PNG inside an SVG `<image>` tag. This makes the SVG file valid and scalable, though the underlying image remains rasterized.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using the HTML5 Canvas API. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Icon Converter</h2>
          <p className={styles.paragraph}>
            Web development requires images in very specific formats. Browsers need `.ico` files for tabs, PWA manifests need various sizes of `.png` files, and modern apps often require `.svg` vectors.
          </p>
          <p className={styles.paragraph}>
            Our Icon Converter handles all these formats instantly. Upload a single image and download exactly what you need without worrying about complex software or formatting rules.
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
          <p className={styles.paragraph}>Developers use this tool every day for a variety of tasks:</p>
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

export default IconConverterInfo;
