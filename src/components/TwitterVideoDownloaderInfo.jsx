import React, { useState } from 'react';
import styles from './TwitterVideoDownloaderInfo.module.css';
import Reveal from './Reveal';

const TwitterVideoDownloaderInfo = () => {
  const features = [
    'Extract videos from Twitter posts',
    'Multiple quality options available',
    'Direct download links provided',
    'Preview video before downloading',
    'Fast and reliable processing',
    'No registration or software required'
  ];

  const steps = [
    'Copy the URL of the Twitter tweet containing the video.',
    'Paste the URL into the input box above.',
    'Click the "Extract Video" button and wait for processing.',
    'Select your preferred video quality from the options.',
    'Click the download button to save the video to your device.'
  ];

  const faqs = [
    { q: 'Can I download videos from private accounts?', a: 'No. This tool only works for public accounts and public tweets. We respect Twitter\'s privacy rules and cannot access content from private profiles.' },
    { q: 'Why did the extraction fail?', a: 'Sometimes Twitter blocks automated requests. If this happens, wait a minute and try again. Also, ensure the link is a valid tweet URL containing "/status/".' },
    { q: 'What video quality is available?', a: 'We fetch all available qualities provided by Twitter, usually ranging from 360p (Mobile) up to 1080p (HD). The highest quality is listed first.' },
    { q: 'Is it legal to download Twitter videos?', a: 'Downloading videos for personal use is generally fine, but you should not reuse or repost someone else\'s content commercially without their explicit permission.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About This Tool</h2>
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
          <h2 className={styles.sectionTitle}>Tool Information</h2>
          <div className={`liquid-glass ${styles.infoBox}`}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Input:</span>
              <span className={styles.infoValue}>Twitter video URLs (Public Tweets)</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Output:</span>
              <span className={styles.infoValue}>Direct Video Download Links (.mp4)</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Security:</span>
              <span className={styles.infoValue}>100% Safe and Client-Side Processed</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Speed:</span>
              <span className={styles.infoValue}>Fast and reliable processing</span>
            </div>
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

export default TwitterVideoDownloaderInfo;
