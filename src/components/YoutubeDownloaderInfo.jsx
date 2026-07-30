import React, { useState } from 'react';
import styles from './YoutubeDownloaderInfo.module.css';
import Reveal from './Reveal';

const YoutubeDownloaderInfo = () => {
  const features = [
    { icon: '📺', title: 'High-Definition Video', desc: 'Download videos in MP4 format up to 1080p, 1440p, and even 4K if available.' },
    { icon: '🎵', title: 'MP3 Audio Extraction', desc: 'Convert and download the highest quality audio track as an MP3 file instantly.' },
    { icon: '📦', title: 'Exact File Sizes', desc: 'We fetch the precise file size for every quality option before you download.' },
    { icon: '⚡', title: 'Blazing Fast Processing', desc: 'Our backend extracts direct media links in seconds, with no buffering.' },
    { icon: '📥', title: 'Forced Downloads', desc: 'Files download directly to your device without opening a new browser tab.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited YouTube video and MP3 downloads with no hidden fees or sign-ups.' }
  ];

  const useCases = [
    'Watching videos offline during travel',
    'Creating podcast audio clips',
    'Saving educational lectures for study',
    'Extracting music for personal listening',
    'Archiving deleted videos',
    'Creating compilation videos'
  ];

  const faqs = [
    { q: 'How do I get the YouTube URL?', a: "Go to YouTube, open the video you want, copy the URL from your browser's address bar (or click Share -> Copy). Paste it into our tool and hit the search button." },
    { q: 'Why are some qualities marked as "Video Only"?', a: "YouTube stores high-definition video (1080p and above) and audio in separate streams to save bandwidth. Our tool provides these streams directly. If you need video+audio combined, select a 720p or lower option." },
    { q: 'Is downloading YouTube videos legal?', a: "Downloading copyrighted content without permission is against YouTube's Terms of Service. You should only download videos you have the rights to, such as Creative Commons videos, or for personal offline viewing if permitted by local laws." },
    { q: 'Is there a download limit?', a: 'No! Our YouTube Downloader is 100% free with no limits. However, please be mindful of your internet data plan when downloading 4K videos.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our YouTube Video & MP3 Downloader</h2>
          <p className={styles.paragraph}>
            YouTube is the largest video platform in the world, but it doesn't offer a native way to download videos for offline viewing on a computer.
          </p>
          <p className={styles.paragraph}>
            Our YouTube Downloader bridges that gap. Whether you need a high-definition MP4 file for a project, or you just want to extract the audio as an MP3 for a long drive, our tool fetches the direct streams instantly. Just paste the link, pick your quality, and download.
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

export default YoutubeDownloaderInfo;
