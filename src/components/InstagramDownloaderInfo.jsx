import React, { useState } from 'react';
import styles from './InstagramDownloaderInfo.module.css';
import Reveal from './Reveal';

const InstagramDownloaderInfo = () => {
  const features = [
    { icon: '📸', title: 'High-Quality Photos', desc: 'Extract and download the highest resolution image available from the post.' },
    { icon: '🔗', title: 'Smart URL Parsing', desc: 'Automatically detects Instagram Post and Reel URLs to find the media.' },
    { icon: '⚡', title: 'Instant Fetching', desc: 'Media is extracted and ready for download in seconds.' },
    { icon: '📥', title: 'One-Click Download', desc: 'Download your extracted photo directly to your device as a JPG.' },
    { icon: '🔒', title: 'Privacy Friendly', desc: 'We do not store your downloaded images or track your searches.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited public Instagram photos with no sign-ups.' }
  ];

  const steps = [
    'Open Instagram and find the photo or reel you want to download.',
    'Click the three dots (...) at the top right of the post and select "Copy Link".',
    'Paste the copied URL into the input box above.',
    'Click the "Extract Photo" button and wait for the preview to load.',
    'Click the "Download HD Photo" button to save the image to your device.'
  ];

  const contentTypes = [
    'Single Photos (JPG/PNG)',
    'Reel Cover Photos',
    'Public Profile Pictures',
    'Carousel First Images'
  ];

  const faqs = [
    { q: 'Can I download private Instagram photos?', a: 'No. This tool only works for public accounts and public posts. We respect Instagram\'s privacy rules and cannot access content from private profiles.' },
    { q: 'Can I download Instagram Stories?', a: 'Due to Instagram\'s security walls, downloading Stories requires complex backend authentication. Currently, this tool supports public Posts and Reels.' },
    { q: 'Why did the extraction fail?', a: 'Sometimes Instagram blocks automated requests. If this happens, wait a minute and try again. Also, ensure the link is a valid public post URL.' },
    { q: 'Is it legal to download Instagram photos?', a: 'Downloading photos for personal use is generally fine, but you should not reuse or repost someone else\'s content commercially without their explicit permission.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Instagram Downloader</h2>
          <p className={styles.paragraph}>
            Instagram makes it notoriously difficult to save photos directly from the app. Our tool bridges that gap, allowing you to easily extract and download high-quality images from public posts.
          </p>
          <p className={styles.paragraph}>
            Whether you want to save an inspirational quote, a beautiful landscape, or a meme, just paste the link and download it in HD.
          </p>
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
          <h2 className={styles.sectionTitle}>Supported Content Types</h2>
          <div className={styles.pillGrid}>
            {contentTypes.map((type, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{type}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <div className={`liquid-glass ${styles.legalNotice}`}>
            <h3>⚠️ Legal Notice</h3>
            <p>
              This tool is intended for downloading content you own or have explicit permission to download. Do not use it to steal or redistribute copyrighted material. Users are solely responsible for complying with Instagram's Terms of Service.
            </p>
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

export default InstagramDownloaderInfo;
