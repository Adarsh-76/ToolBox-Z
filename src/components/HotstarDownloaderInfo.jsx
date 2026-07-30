import React, { useState } from 'react';
import styles from './HotstarDownloaderInfo.module.css';
import Reveal from './Reveal';

const HotstarDownloaderInfo = () => {
  const features = [
    { icon: '🎬', title: 'Download Free Content', desc: 'Easily download free movies, trailers, and shows from Jio Hotstar in MP4 format.' },
    { icon: '⚡', title: 'Instant Extraction', desc: 'Our backend instantly extracts direct streaming links from the Hotstar URL you paste.' },
    { icon: '📊', title: 'Multiple Qualities', desc: 'Choose from various resolutions like 1080p, 720p, and 480p based on availability.' },
    { icon: '📲', title: 'Mobile Friendly', desc: 'Works seamlessly on Android, iOS, and desktop browsers without any extra apps.' }
  ];

  const faqs = [
    { q: 'Can I download premium Hotstar content?', a: 'No. Premium content on Jio Hotstar is protected by DRM (Digital Rights Management) to prevent unauthorized downloading. Our tool only works on free content, trailers, and live TV channels.' },
    { q: 'How do I get the Hotstar video URL?', a: 'Open the Hotstar website or app, play the video, click the Share button, and copy the link. Paste it into our tool and click Extract.' },
    { q: 'Why did the downloaded video fail to play?', a: 'If you manage to download a DRM-protected video, it will not play. Please ensure you are only downloading free-to-watch content.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Jio Hotstar Downloader</h2>
          <p className={styles.paragraph}>
            Jio Hotstar is one of the largest streaming platforms in India. While it requires a subscription for premium movies and live sports, it also hosts a vast library of free content.
          </p>
          <p className={styles.paragraph}>
            Our Jio Hotstar Downloader allows you to extract direct MP4 links from free Hotstar URLs. Just paste the link, click "Extract", and download the video to your device for offline viewing.
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

export default HotstarDownloaderInfo;
