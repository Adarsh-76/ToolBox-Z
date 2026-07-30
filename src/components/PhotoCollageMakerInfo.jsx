import React, { useState } from 'react';
import styles from './PhotoCollageMakerInfo.module.css';
import Reveal from './Reveal';

const PhotoCollageMakerInfo = () => {
  const features = [
    { icon: '🖼️', title: 'Multiple Grid Layouts', desc: 'Choose from 1x2, 2x1, 2x2, or 3x2 grids to fit your photos perfectly.' },
    { icon: '📐', title: 'Perfect Fit (Cover)', desc: 'Images are automatically cropped to fit the slots without stretching or distortion.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All rendering happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Collages are saved as high-quality PNGs to preserve detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Create sensitive collages securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Create unlimited collages with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Creating social media posts',
    'Combining family photos',
    'Making before/after comparisons',
    'Designing mood boards',
    'Grouping product images',
    'Summarizing event photos'
  ];

  const faqs = [
    { q: 'How do I create a collage?', a: 'Select a grid layout, click on each slot to upload an image, and then click "Download Collage PNG". The tool will merge them into one image.' },
    { q: 'Can I rearrange images after uploading?', a: 'Currently, you can remove an image by clicking the "❌" button and upload a new one in its place. Drag-and-drop rearranging may be added in the future.' },
    { q: 'Does it reduce quality?', a: 'No. The tool uses the original image data and the HTML5 Canvas API to render the collage at a high resolution (up to 1200px).' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your photos are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Photo Collage Maker</h2>
          <p className={styles.paragraph}>
            Combining multiple photos into a single, shareable image is a great way to tell a story. Our Photo Collage Maker makes this process effortless.
          </p>
          <p className={styles.paragraph}>
            Choose your grid layout, upload your photos, and download a beautifully merged collage instantly. Everything happens locally in your browser, ensuring maximum privacy and speed.
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

export default PhotoCollageMakerInfo;
