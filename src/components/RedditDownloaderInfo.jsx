import React, { useState } from 'react';
import styles from './RedditDownloaderInfo.module.css';
import Reveal from './Reveal';

const RedditDownloaderInfo = () => {
  const features = [
    { icon: '🎬', title: 'Video with Audio', desc: 'Perfectly merges video and audio streams that Reddit keeps separate.' },
    { icon: '🎵', title: 'MP3 Extraction', desc: 'Extract just the audio from any Reddit video and download it as an MP3 file.' },
    { icon: '🖼️', title: 'Image Downloads', desc: 'Quickly download high-quality images from Reddit image posts.' },
    { icon: '⚡', title: 'Fast Processing', desc: 'Uses yt-dlp on the backend to fetch and merge media in seconds.' },
    { icon: '🔒', title: '100% Private', desc: 'We do not store your downloaded videos. Everything is processed on the fly.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited Reddit videos with no sign-ups or watermarks.' }
  ];

  const useCases = [
    'Saving funny memes before they get deleted',
    'Downloading educational videos for offline viewing',
    'Extracting audio from Reddit podcasts or AMAs',
    'Archiving interesting content',
    'Sharing Reddit videos on other platforms',
    'Creating compilation videos'
  ];

  const faqs = [
    { q: 'Why do Reddit videos have no sound on other tools?', a: "Reddit stores the video and audio in separate streams (DASH format). Many basic downloaders only grab the video stream. Our tool uses yt-dlp to fetch both and merge them perfectly, ensuring you get full audio." },
    { q: 'Can I download audio only?', a: "Yes! Click the 'Extract Audio (MP3)' button, and the tool will strip the audio from the Reddit video and download it as a high-quality MP3 file." },
    { q: 'Are my downloads tracked?', a: "No. We process the URL on our server, stream the file to your browser, and immediately delete the temporary file. We do not log or store what you download." },
    { q: 'Is there a limit to how many videos I can download?', a: "No, there are no limits. You can download as many Reddit videos as you want, completely free." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Reddit Video Downloader</h2>
          <p className={styles.paragraph}>
            Reddit is a goldmine of content, but downloading videos directly from the platform is notoriously difficult. The official app does not allow it, and third-party tools often fail to capture the audio.
          </p>
          <p className={styles.paragraph}>
            Our Reddit Video Downloader solves this by using advanced backend technology to perfectly merge the video and audio streams. You can download the full video as an MP4, extract just the audio as an MP3, or download images.
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

export default RedditDownloaderInfo;
