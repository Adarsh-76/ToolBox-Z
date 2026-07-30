import React, { useState } from 'react';
import styles from './FacebookVideoDownloaderInfo.module.css';
import Reveal from './Reveal';

const FacebookVideoDownloaderInfo = () => {
  const features = [
    { icon: '▶️', title: 'Public Video Extraction', desc: 'Download videos from public Facebook posts, pages, and watch links.' },
    { icon: '📊', title: 'Multiple Qualities', desc: 'Choose between HD Quality (1080p/720p) and SD Quality (480p/360p) if available.' },
    { icon: '⚡', title: 'Instant Fetching', desc: 'Video links are extracted and ready for download in seconds.' },
    { icon: '📥', title: 'One-Click Download', desc: 'Download your chosen video quality directly to your device as an MP4.' },
    { icon: '🔒', title: 'Privacy Friendly', desc: 'We do not store your downloaded videos or track your searches.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited public Facebook videos with no sign-ups.' }
  ];

  const steps = [
    'Open Facebook and find the video you want to download.',
    'Click the three dots (...) at the top right of the post and select "Copy link".',
    'Paste the copied URL into the input box above.',
    'Click the "Extract Video" button and wait for the preview to load.',
    'Select your preferred video quality and click the download button to save it.'
  ];

  const faqs = [
    { q: 'Can I download private Facebook videos?', a: 'No. This tool only works for public videos. If a video is posted in a private group or on a private profile, we cannot access it due to Facebook\'s security walls.' },
    { q: 'Why did the extraction fail?', a: 'Facebook frequently updates its page structure to prevent automated downloads. If the tool fails, it means the regex needs an update, or the video link is not publicly accessible.' },
    { q: 'What video quality is available?', a: 'We attempt to extract both the HD (High Definition) and SD (Standard Definition) versions of the video. If Facebook only provides one, only that option will appear.' },
    { q: 'Is it legal to download Facebook videos?', a: 'Downloading videos for personal, offline viewing is generally fine, but you should not reuse or repost someone else\'s content commercially without their explicit permission.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Facebook Video Downloader</h2>
          <p className={styles.paragraph}>
            Facebook makes it difficult to save videos directly from the platform. Our tool bridges that gap, allowing you to easily extract and download high-quality MP4 videos from public Facebook posts.
          </p>
          <p className={styles.paragraph}>
            Whether you want to save a tutorial, a funny clip, or an informative video, just paste the link and download it in HD or SD quality.
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

export default FacebookVideoDownloaderInfo;
