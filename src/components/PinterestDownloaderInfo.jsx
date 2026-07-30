import React, { useState } from 'react';
import styles from './PinterestDownloaderInfo.module.css';
import Reveal from './Reveal';

const PinterestDownloaderInfo = () => {
  const features = [
    { icon: '🖼️', title: 'High-Quality Downloads', desc: 'Fetches the original resolution images from Pinterest pins, bypassing compressed thumbnails.' },
    { icon: '⚡', title: 'Instant Fetching', desc: 'Our backend processes the pin URL and extracts the direct image link in seconds.' },
    { icon: '📥', title: 'One-Click Save', desc: 'Download images directly to your device with a single click, no right-clicking required.' },
    { icon: '🔒', title: 'Safe & Secure', desc: 'We do not store your downloaded images or track your Pinterest browsing history.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Download unlimited Pinterest images without any hidden fees or subscriptions.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers.' }
  ];

  const useCases = [
    'Saving design inspiration boards',
    'Downloading recipe images for offline use',
    'Archiving visual references for projects',
    'Saving aesthetic wallpapers',
    'Collecting fashion outfit ideas',
    'Backing up your own uploaded pins'
  ];

  const faqs = [
    { q: 'How do I get the Pinterest Pin URL?', a: "Open Pinterest, find the pin you want to download, click the three dots (or share button), and copy the link. Paste it into our tool and hit the search button." },
    { q: 'Can I download images from a private board?', a: "No, our tool can only access publicly available pins. If a board is private or password-protected, our server will not be able to fetch the image data." },
    { q: 'Why did I get an error?', a: "This usually happens if the URL is not a direct link to a pin (e.g., it's a link to a profile or board) or if the original pin has been deleted." },
    { q: 'Is it legal to download Pinterest images?', a: "Images on Pinterest are often copyrighted by their creators. You should only download them for personal use and not claim them as your own or use them commercially without permission." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Pinterest Image Downloader</h2>
          <p className={styles.paragraph}>
            Pinterest is a massive source of inspiration, but downloading images directly from the platform isn't always straightforward. Often, you end up saving low-resolution thumbnails.
          </p>
          <p className={styles.paragraph}>
            Our Pinterest Image Downloader solves this by fetching the highest available resolution image directly from the pin's metadata. Just paste the URL, and we'll extract the original image for you to download instantly.
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

export default PinterestDownloaderInfo;
