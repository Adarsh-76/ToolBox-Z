import React, { useState } from 'react';
import styles from './ExifRemoverInfo.module.css';
import Reveal from './Reveal';

const ExifRemoverInfo = () => {
  const features = [
    { icon: '🛡️', title: 'Strip GPS Location', desc: 'Remove hidden GPS coordinates that tell strangers exactly where you live or work.' },
    { icon: '📷', title: 'Remove Camera Data', desc: 'Erase metadata like phone model, lens type, and software versions from your photos.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Images are processed directly in your browser. No uploads, 100% private and fast.' },
    { icon: '🔒', title: 'Safe for Social Media', desc: 'Post photos online with peace of mind knowing your personal data is completely wiped.' }
  ];

  const faqs = [
    { q: 'What is EXIF data?', a: 'EXIF (Exchangeable Image File Format) data is hidden information stored inside photos taken by digital cameras and smartphones. It includes camera settings, timestamps, and GPS locations.' },
    { q: 'Does this tool upload my photos?', a: 'No. All processing happens locally inside your browser using HTML5 Canvas. Your images never leave your device.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Privacy Image Stripper</h2>
          <p className={styles.paragraph}>
            When you take a photo with your smartphone, it secretly embeds your exact GPS location, the time, and your phone model into the image file.
          </p>
          <p className={styles.paragraph}>
            If you post that photo online, anyone can download it and extract that data. Our Privacy Image Stripper wipes all hidden EXIF metadata instantly, keeping you safe.
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
              <div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}>
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

export default ExifRemoverInfo;
