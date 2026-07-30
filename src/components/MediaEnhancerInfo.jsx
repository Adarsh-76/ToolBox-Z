import React, { useState } from 'react';
import styles from './MediaEnhancerInfo.module.css';
import Reveal from './Reveal';

const MediaEnhancerInfo = () => {
  const features = [
    { icon: '🔍', title: 'Pre-Enhancement Check', desc: 'Automatically validates if the selected media can be safely upscaled to your chosen resolution without quality loss.' },
    { icon: '📐', title: 'Multi-Resolution Support', desc: 'Choose between HD 720p, Full HD 1080p, and QHD 2K resolutions to suit your needs.' },
    { icon: '🎨', title: 'AI-Like Filters', desc: 'Applies high-quality canvas interpolation, contrast, and saturation filters to make images look professionally edited.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Images are enhanced locally in milliseconds. No waiting for server uploads or processing queues.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos and videos never leave your browser. Everything happens securely on your device.' },
    { icon: '⬇️', title: 'One-Click Download', desc: 'Instantly download your enhanced HD image with a single click, ready for social media or print.' }
  ];

  const useCases = [
    'Upscaling old photos for HD screens',
    'Enhancing web images for print',
    'Improving low-resolution thumbnails',
    'Preparing visuals for presentations',
    'Restoring family pictures',
    'Optimizing graphics for Retina displays'
  ];

  const faqs = [
    { q: 'Can I enhance videos with this tool?', a: 'You can upload videos to check compatibility, but browser-based video exporting is highly restricted. Currently, only images can be enhanced and downloaded in HD.' },
    { q: 'Why did I get a "Cannot enhance" error?', a: 'If your original image is already larger than the target resolution (e.g., trying to upscale a 4K image to 1080p), the tool will block the action to prevent quality loss.' },
    { q: 'How does the enhancement work?', a: 'We use the HTML5 Canvas API with high-quality smoothing algorithms, combined with subtle contrast and saturation filters to simulate AI upscaling.' },
    { q: 'Is there a file size limit?', a: 'Since processing happens in your browser, extremely large files (over 20MB) might slow down your browser tab temporarily, but there is no hard limit set.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Media Enhancer</h2>
          <p className={styles.paragraph}>
            In the age of high-resolution displays, having low-quality images can ruin the aesthetic of your project. Our Media Enhancer is a fast, browser-based solution designed to upscale and enrich your photos to HD and 2K resolutions.
          </p>
          <p className={styles.paragraph}>
            By leveraging modern browser technology, we provide a safe and private way to improve image quality without uploading your personal files to unknown cloud servers. Simply select your image, check compatibility, and download the enhanced version instantly.
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
          <p className={styles.paragraph}>This tool is perfect for anyone looking to improve image quality:</p>
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

export default MediaEnhancerInfo;
