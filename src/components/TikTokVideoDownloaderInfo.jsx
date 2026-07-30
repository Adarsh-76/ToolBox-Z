import React, { useState } from 'react';
import styles from './TikTokVideoDownloaderInfo.module.css';
import Reveal from './Reveal';

const TikTokVideoDownloaderInfo = () => {
  const features = [
    { icon: '🎬', title: 'HD Video Downloads', desc: 'Download TikTok videos in HD quality without the TikTok watermark.' },
    { icon: '🎵', title: 'MP3 Audio Extraction', desc: 'Extract the audio from any TikTok and download it as a high-quality MP3 file.' },
    { icon: '🖼️', title: 'Image Slideshow Saver', desc: 'Save images from TikTok photo slideshows directly to your device.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Fetches media links instantly via our fast backend proxy server.' },
    { icon: '🔒', title: '100% Private', desc: 'We do not store your downloaded videos. Everything is processed on the fly.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited TikTok videos, audio, and images with no sign-ups.' }
  ];

  const useCases = [
    'Saving trending sounds for your own videos',
    'Downloading funny memes before they get deleted',
    'Archiving educational content for offline viewing',
    'Extracting audio for podcast clips',
    'Saving photo slideshows as image files',
    'Creating compilation videos'
  ];

  const faqs = [
    { q: 'How do I download a TikTok video?', a: "Open TikTok, find the video you want, click the Share button, and select Copy Link. Paste that link into our tool and click the search button." },
    { q: 'Does the video have a watermark?', a: "No! We use a special API that fetches the video stream before the TikTok watermark is applied, giving you a clean, HD video." },
    { q: 'Can I download just the audio (MP3)?', a: "Yes! When you paste a link, we provide a purple 'Download Audio (MP3)' button alongside the video options." },
    { q: 'Are my downloads tracked?', a: "No. We process the URL on our server, stream the file to your browser, and immediately delete the temporary file. We do not log what you download." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our TikTok Downloader</h2>
          <p className={styles.paragraph}>
            TikTok is filled with trending sounds, funny clips, and amazing photo slideshows. But the official app doesn't let you download them without a watermark.
          </p>
          <p className={styles.paragraph}>
            Our TikTok Downloader solves this. You can download high-definition videos without watermarks, extract the audio as an MP3, or save images from slideshows. It is the ultimate all-in-one TikTok saver.
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

export default TikTokVideoDownloaderInfo;
