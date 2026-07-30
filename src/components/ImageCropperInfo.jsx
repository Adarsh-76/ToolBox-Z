import React, { useState } from 'react';
import styles from './ImageCropperInfo.module.css';
import Reveal from './Reveal';

const ImageCropperInfo = () => {
  const features = [
    { icon: '✂️', title: 'Precision Cropping', desc: 'Drag the image to exactly where you want it and crop with pixel-perfect accuracy.' },
    { icon: '🔍', title: 'Zoom & Pan', desc: 'Use the zoom slider to zoom in close, making it easy to crop fine details.' },
    { icon: '📐', title: 'Aspect Ratios', desc: 'Lock the crop to specific ratios like 1:1 for profile pics or 16:9 for YouTube thumbnails.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All cropping happens locally in your browser. No uploads, no waiting.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Cropped images are saved as high-quality PNGs to preserve transparency and detail.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images never leave your device. Crop sensitive photos securely.' }
  ];

  const useCases = [
    'Creating social media profile pictures',
    'Making YouTube thumbnails (16:9)',
    'Cropping screenshots for tutorials',
    'Removing unwanted background edges',
    'Creating square (1:1) Instagram posts',
    'Framing specific details in photos'
  ];

  const faqs = [
    { q: 'How do I change the crop shape?', a: 'Use the "Aspect Ratio" buttons in the settings panel. You can choose Free (custom), 1:1 (square), 4:3, 16:9, or 9:16 (vertical).' },
    { q: 'Can I zoom in to crop better?', a: 'Yes! Use the zoom slider on the right side to zoom in up to 3x. You can then drag the image to position the exact area you want.' },
    { q: 'Does cropping reduce quality?', a: 'No. The tool uses the original image data to crop. The output is a high-quality PNG file, meaning no pixel data is lost in the cropped area.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Cropper</h2>
          <p className={styles.paragraph}>
            Sometimes you just need to cut out the extra background and focus on what matters. Our Image Cropper gives you a smooth, intuitive interface to frame your images perfectly.
          </p>
          <p className={styles.paragraph}>
            Whether you are preparing a profile picture, a YouTube thumbnail, or just removing unwanted edges, you can drag, zoom, and crop with precision. Everything happens instantly in your browser.
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

export default ImageCropperInfo;
