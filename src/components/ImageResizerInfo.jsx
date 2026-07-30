import React, { useState } from 'react';
import styles from './ImageResizerInfo.module.css';
import Reveal from './Reveal';

const ImageResizerInfo = () => {
  const features = [
    { icon: '📐', title: 'Custom Dimensions', desc: 'Manually enter any exact pixel width and height to fit your exact requirements.' },
    { icon: '🔗', title: 'Aspect Ratio Lock', desc: 'Toggle the lock to automatically calculate the missing dimension, preventing stretched or squished images.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All resizing happens locally in your browser using the HTML5 Canvas API. No uploads required.' },
    { icon: '🖼️', title: 'High Quality Output', desc: 'Uses high-quality image smoothing algorithms to ensure resized images look crisp and clean.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images never leave your device. Resize personal or sensitive photos securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Resize unlimited images with no watermarks, sign-ups, or hidden costs.' }
  ];

  const useCases = [
    'Resizing photos for web upload',
    'Creating custom thumbnails',
    'Fitting images into specific UI frames',
    'Reducing image resolution for emails',
    'Preparing graphics for social media',
    'Optimizing images for print'
  ];

  const faqs = [
    { q: 'How do I maintain the aspect ratio?', a: 'Make sure the "Aspect Ratio Locked" toggle is switched on. When you change the width, the height will automatically adjust, and vice versa.' },
    { q: 'Does resizing reduce image quality?', a: 'Scaling an image down retains quality perfectly. Scaling an image up may cause it to look slightly pixelated, but our tool uses high-quality smoothing to minimize this.' },
    { q: 'What format is the downloaded image?', a: 'Currently, resized images are downloaded as high-quality PNG files to ensure transparency and maximum quality are preserved.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Image Resizer</h2>
          <p className={styles.paragraph}>
            Different platforms and use cases require different image dimensions. Whether you need a 256x256 avatar, a 1920x1080 banner, or a custom thumbnail, manually calculating dimensions to avoid stretching is frustrating.
          </p>
          <p className={styles.paragraph}>
            Our Image Resizer makes the process effortless. Simply upload your image, enter your desired width or height, and the tool automatically calculates the other dimension to maintain the perfect aspect ratio.
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

export default ImageResizerInfo;
