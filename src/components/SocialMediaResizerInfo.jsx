import React, { useState } from 'react';
import styles from './SocialMediaResizerInfo.module.css';
import Reveal from './Reveal';

const SocialMediaResizerInfo = () => {
  const features = [
    { icon: '📱', title: 'Platform Presets', desc: 'Instantly resize for Instagram, Facebook, Twitter, and YouTube exact dimensions.' },
    { icon: '✂️', title: 'Smart Auto-Crop', desc: 'Automatically crops and scales your image to fit perfectly without stretching.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All resizing happens locally in your browser. No uploads required.' },
    { icon: '🖼️', title: 'HD Quality Output', desc: 'Resized images are saved as high-quality PNGs ready for upload.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Resize sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Resize unlimited images with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Creating Instagram posts and stories',
    'Designing Facebook covers',
    'Formatting Twitter headers',
    'Making YouTube thumbnails',
    'Sizing profile pictures',
    'Optimizing social media ad creatives'
  ];

  const faqs = [
    { q: 'How does the auto-crop work?', a: 'We calculate the center of your image and crop the excess edges so that the remaining image perfectly fits the target aspect ratio (e.g., 1:1 for Instagram) without leaving empty white space.' },
    { q: 'Will it stretch my image?', a: 'No. The tool uses a "cover" algorithm, similar to CSS `object-fit: cover`. It maintains the aspect ratio of the subject while filling the entire target canvas.' },
    { q: 'What format is the downloaded image?', a: 'Currently, resized images are downloaded as high-quality PNG files to ensure maximum quality and transparency support.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using the HTML5 Canvas API. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Social Media Resizer</h2>
          <p className={styles.paragraph}>
            Every social media platform has different dimension requirements. Uploading an image with the wrong dimensions can result in awkward cropping, compression, or blurriness.
          </p>
          <p className={styles.paragraph}>
            Our Social Media Resizer takes the guesswork out of formatting. Choose your platform, upload your image, and download a perfectly sized, HD image ready to post.
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

export default SocialMediaResizerInfo;
