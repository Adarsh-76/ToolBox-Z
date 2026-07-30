import React, { useState } from 'react';
import styles from './YoutubeBannerMakerInfo.module.css';
import Reveal from './Reveal';

const YoutubeBannerMakerInfo = () => {
  const features = [
    { icon: '📏', title: 'Exact Dimensions', desc: 'Automatically scales your image to the exact 2560x1440 pixels required by YouTube.' },
    { icon: '🛡️', title: 'Safe Zone Overlay', desc: 'Visual guide shows you exactly what will be visible on mobile, desktop, and TV.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Generates your banner instantly in your browser without uploading to a server.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images never leave your device. All processing happens locally.' },
    { icon: '🎨', title: 'Cover Fit', desc: 'Smart scaling ensures your image fills the entire banner without stretching.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Create unlimited YouTube banners with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Creating channel art for a new YouTube channel',
    'Updating outdated banners to fit new specs',
    'Ensuring logos are visible on mobile screens',
    'Designing banners for multiple channels',
    'Cropping high-res photos for channel backgrounds',
    'Testing how an image looks before uploading'
  ];

  const faqs = [
    { q: 'What is the YouTube "Safe Zone"?', a: "YouTube displays channel art differently on TVs, computers, and phones. The 'Safe Zone' is the 1546x423 pixel area in the center of the banner that is guaranteed to be visible on all devices. Our tool shows you this zone so you don't accidentally put your logo where it will be cut off." },
    { q: 'What size should my image be before uploading?', a: "You can upload any size image! However, for the best quality, we recommend uploading an image that is already close to 2560x1440 pixels, or larger. Our tool will automatically crop and scale it to fit perfectly." },
    { q: 'Are my images uploaded to a server?', a: "No. We take your privacy seriously. All image processing happens directly in your browser using HTML5 Canvas. Your files are never uploaded anywhere." },
    { q: 'Will the downloaded image have the white box on it?', a: "No! The white dashed box is just a preview guide. The downloaded image will be a clean, full 2560x1440 image without any overlays." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our YouTube Banner Maker</h2>
          <p className={styles.paragraph}>
            YouTube Channel Art is notoriously difficult to design. The required dimensions are 2560x1440 pixels, but different devices crop the image differently. If you put your logo too close to the edge, it might get cut off on mobile.
          </p>
          <p className={styles.paragraph}>
            Our YouTube Banner Maker solves this by automatically scaling your image to the exact required dimensions and showing you a live "Safe Zone" overlay. You can see exactly how your banner will look before you download it!
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

export default YoutubeBannerMakerInfo;
