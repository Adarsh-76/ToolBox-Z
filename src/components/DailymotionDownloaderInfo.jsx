import React, { useState } from 'react';
import styles from './DailymotionDownloaderInfo.module.css';
import Reveal from './Reveal';

const DailymotionDownloaderInfo = () => {
  const features = [
    { icon: '🎬', title: 'Download Videos', desc: 'Easily download videos from Dailymotion in high-quality MP4 format.' },
    { icon: '⚡', title: 'Instant Extraction', desc: 'Our backend instantly extracts direct streaming links from the URL you paste.' },
    { icon: '📊', title: 'Multiple Qualities', desc: 'Choose from various resolutions like 1080p, 720p, and 480p based on availability.' },
    { icon: '📲', title: 'Mobile Friendly', desc: 'Works seamlessly on Android, iOS, and desktop browsers without any extra apps.' }
  ];

  const faqs = [
    { q: 'How do I get the Dailymotion video URL?', a: 'Open the Dailymotion website or app, play the video, click the Share button, and copy the link. Paste it into our tool and click Extract.' },
    { q: 'Is it legal to download Dailymotion videos?', a: 'Downloading copyrighted content without permission may violate Dailymotion\'s Terms of Service. Only download videos you have the rights to or those available for offline viewing.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Dailymotion Downloader</h2>
          <p className={styles.paragraph}>
            Dailymotion is one of the largest video sharing platforms in the world. Whether it's news clips, sports highlights, or indie creator content, our tool helps you download it.
          </p>
          <p className={styles.paragraph}>
            Our Dailymotion Downloader allows you to extract direct MP4 links. Just paste the link, click "Extract", and download the video to your device for offline viewing.
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

export default DailymotionDownloaderInfo;
