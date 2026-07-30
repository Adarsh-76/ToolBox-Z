import React, { useState } from 'react';
import styles from './ImageBase64Info.module.css';
import Reveal from './Reveal';

const ImageBase64Info = () => {
  const features = [
    { icon: '🖼️', title: 'Image to Base64', desc: 'Upload any image (PNG, JPG, WEBP) and instantly get its Base64 string.' },
    { icon: '🔄', title: 'Base64 to Image', desc: 'Paste a Base64 string to instantly preview and download the original image.' },
    { icon: '⚡', title: 'Optimize Web Requests', desc: 'Embed images directly into HTML/CSS to reduce HTTP requests on your website.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the massive Base64 string to your clipboard with a single click.' }
  ];

  const faqs = [
    { q: 'Why would I convert an image to Base64?', a: 'Converting an image to Base64 allows you to embed it directly into HTML or CSS files. This reduces the number of HTTP requests your website has to make, which can speed up page load times for small icons.' },
    { q: 'Does Base64 increase file size?', a: 'Yes, a Base64 string is typically about 20-25% larger than the original binary image file. It is recommended only for small images (under 100KB).' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Image to Base64 Encoder</h2>
          <p className={styles.paragraph}>
            Base64 encoding is a way to convert binary image files into plain text strings. Web developers use this to embed images directly inside HTML or CSS files.
          </p>
          <p className={styles.paragraph}>
            Our tool makes it easy to convert images to Base64, or decode Base64 strings back into viewable images.
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

export default ImageBase64Info;
