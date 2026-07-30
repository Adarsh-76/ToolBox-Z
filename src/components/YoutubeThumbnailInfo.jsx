import React, { useState } from 'react';
import styles from './YoutubeThumbnailInfo.module.css';
import Reveal from './Reveal';

const YoutubeThumbnailInfo = () => {
  const features = [
    { icon: '📺', title: 'Multiple Resolutions', desc: 'Download thumbnails in Max Res (1080p/2K), SD, HQ, or MQ formats.' },
    { icon: '🔗', title: 'Smart URL Parsing', desc: 'Automatically extracts the Video ID from standard, short, or embed URLs.' },
    { icon: '⚡', title: 'Instant Fetching', desc: 'Thumbnails are fetched directly from YouTube\'s servers instantly.' },
    { icon: '📥', title: 'One-Click Download', desc: 'Download your chosen resolution as a high-quality JPG file instantly.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited thumbnails with no watermarks or sign-ups.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers.' }
  ];

  const useCases = [
    'Embedding thumbnails in blog posts',
    'Analyzing competitor video artwork',
    'Using as image placeholders in code',
    'Creating custom video thumbnails',
    'Saving favorite video covers',
    'Designing YouTube banners'
  ];

  const faqs = [
    { q: 'How do I get the YouTube URL?', a: "Go to YouTube, open the video you want, copy the URL from your browser's address bar (or click Share -> Copy). Paste it into our tool and hit 'Get Thumbnails'." },
    { q: 'Why is the Max Resolution missing?', a: "Not all YouTube videos have a Max Resolution image. If the creator did not upload an HD (1080p or 2K) thumbnail, YouTube will not generate one, and that slot will be hidden automatically." },
    { q: 'Is it legal to download thumbnails?', a: "YouTube thumbnails are copyrighted by the creator. You can download them for personal reference, but you should not reuse them commercially without permission." },
    { q: 'Is this tool free?', a: 'Yes, our YouTube Thumbnail Downloader is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our YouTube Thumbnail Downloader</h2>
          <p className={styles.paragraph}>
            If you are a content creator, marketer, or developer, you might need to grab the thumbnail image of a YouTube video. Doing this manually requires inspecting the page source code.
          </p>
          <p className={styles.paragraph}>
            Our tool simplifies the process. Just paste the video URL, and we will fetch all available thumbnail resolutions (from Medium Quality all the way up to Max Resolution 1080p/2K) ready for one-click download.
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

export default YoutubeThumbnailInfo;
