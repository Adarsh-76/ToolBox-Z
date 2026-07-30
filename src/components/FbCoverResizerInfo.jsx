import React, { useState } from 'react';
import styles from './FbCoverResizerInfo.module.css';
import Reveal from './Reveal';

const FbCoverResizerInfo = () => {
  const features = [
    { icon: '📐', title: 'Perfect Dimensions', desc: 'Automatically crops and resizes to exactly 820x312 pixels.' },
    { icon: '🖼️', title: 'Smart Cropping', desc: 'Uses a cover-fit algorithm to ensure no white spaces or stretching.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All resizing happens locally in your browser. No uploads required.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Convert sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Create unlimited Facebook covers with no watermarks or sign-ups.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on Android, iOS, Windows, and Mac right in your browser.' }
  ];

  const steps = [
    'Click "Choose Image" and select a photo from your device.',
    'The tool will instantly preview how your image will look as a cover.',
    'If you are happy with the preview, click "Download HD Cover".',
    'Upload the downloaded PNG directly to your Facebook Page or Profile.'
  ];

  const faqs = [
    { q: 'What size is a Facebook Cover Photo?', a: 'The optimal size for a Facebook Cover Photo is 820 pixels wide by 312 pixels tall. For best results on high-resolution screens (like Retina displays), uploading an image that is 1640x624 pixels is recommended, but Facebook will automatically compress it.' },
    { q: 'Will my photo get cut off?', a: 'Facebook crops cover photos differently on mobile vs desktop. Our tool uses a "center-crop" algorithm to ensure the most important part of your image stays in the safe zone.' },
    { q: 'Does this tool save my photos?', a: 'No. Everything runs locally in your browser. The images you upload are never transmitted over the internet.' },
    { q: 'Is this tool free?', a: 'Yes, our FB Cover Resizer is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our FB Cover Resizer</h2>
          <p className={styles.paragraph}>
            Uploading the wrong size image for your Facebook Cover can result in awkward cropping or blurry pixels. Getting it perfect used to require opening Photoshop or complex editing apps.
          </p>
          <p className={styles.paragraph}>
            Our FB Cover Resizer makes it effortless. Simply upload your image, and the tool instantly formats it to the perfect 820x312 dimensions, ready to be uploaded directly to Facebook.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default FbCoverResizerInfo;
