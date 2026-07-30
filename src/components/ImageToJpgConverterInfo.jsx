import React, { useState } from 'react';
import styles from './ImageToJpgConverterInfo.module.css';
import Reveal from './Reveal';

const ImageToJpgConverterInfo = () => {
  const features = [
    'Customizable Quality Settings',
    'Size Optimization Options',
    'Multi-format Input Support',
    'Scaling and Resizing Options',
    'Instant Download',
    'Maintain Aspect Ratio'
  ];

  const qualityGuide = [
    { range: '90 - 100%', desc: 'High quality, large files' },
    { range: '70 - 89%', desc: 'Good quality, balanced size' },
    { range: '50 - 69%', desc: 'Medium quality, smaller files' },
    { range: '1 - 49%', desc: 'Low quality, very small files' }
  ];

  const supportedFormats = ['PNG', 'GIF', 'BMP', 'WebP', 'TIFF', 'ICO'];

  const faqs = [
    { q: 'Why convert to JPG?', a: 'JPG (JPEG) is the most widely used image format for photographs and complex images. It offers excellent compression, making file sizes much smaller than PNG or BMP, which is ideal for web use and sharing.' },
    { q: 'What does "Progressive JPG" mean?', a: 'A progressive JPG loads in waves of increasing detail, rather than top-to-bottom. This gives users on slow connections a preview of the image much faster. It is highly recommended for web use.' },
    { q: 'Does it support transparent backgrounds?', a: 'No. The JPG format does not support transparency. If you upload a PNG with a transparent background, the converter will automatically fill the transparent areas with a solid white background.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using the HTML5 Canvas API. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <div className={styles.featureGrid}>
            {features.map((feat, i) => (
              <div key={i} className={`liquid-glass ${styles.featureCard}`}>
                <span className={styles.checkIcon}>✅</span>
                <p className={styles.featureText}>{feat}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quality Guide</h2>
          <div className={styles.guideGrid}>
            {qualityGuide.map((guide, i) => (
              <div key={i} className={`liquid-glass ${styles.guideCard}`}>
                <h3 className={styles.guideRange}>{guide.range}</h3>
                <p className={styles.guideDesc}>{guide.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Supported Formats</h2>
          <div className={styles.pillGrid}>
            {supportedFormats.map((format, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{format}</div>
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

export default ImageToJpgConverterInfo;
