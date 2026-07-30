import React, { useState } from 'react';
import styles from './MetadataViewerInfo.module.css';
import Reveal from './Reveal';

const MetadataViewerInfo = () => {
  const features = [
    { icon: '🏷️', title: 'Read EXIF Data', desc: 'Instantly view camera model, lens, settings, timestamps, and software used.' },
    { icon: '📍', title: 'GPS Location Data', desc: 'Check if your photos have hidden GPS coordinates attached to them.' },
    { icon: '🛡️', title: 'One-Click Strip', desc: 'Protect your privacy by instantly removing all metadata and downloading a clean image.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All parsing happens locally in your browser. No uploads required.' },
    { icon: '🔒', title: '100% Private', desc: 'Your photos never leave your device. Inspect sensitive images securely.' },
    { icon: '🆓', title: 'Completely Free', desc: 'View and strip metadata from unlimited images with no sign-ups.' }
  ];

  const useCases = [
    'Checking photo location privacy',
    'Verifying camera settings used',
    'Stripping metadata before web upload',
    'Inspecting image origins',
    'Removing identifying data from documents',
    'Learning about photography EXIF'
  ];

  const faqs = [
    { q: 'What is EXIF metadata?', a: 'EXIF (Exchangeable Image File Format) data is hidden information stored inside a JPEG image by your camera or phone. It includes settings like ISO, aperture, timestamp, and sometimes even GPS coordinates of where the photo was taken.' },
    { q: 'Why should I strip EXIF data?', a: 'If you share photos online, EXIF data can accidentally reveal your exact home location, the device you use, and your name. Stripping it protects your privacy.' },
    { q: 'Does this work on PNG images?', a: 'Currently, this tool focuses on JPEG images, as that is where 99% of EXIF data is stored. PNGs use a different, simpler metadata format.' },
    { q: 'Is my image uploaded to a server?', a: 'No. This tool runs entirely in your browser using the piexifjs library. Your images are processed locally and are never transmitted over the internet.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Metadata Viewer</h2>
          <p className={styles.paragraph}>
            Every time you take a photo with your phone or camera, invisible data is embedded inside the image file. This data, called EXIF metadata, can reveal a lot about you.
          </p>
          <p className={styles.paragraph}>
            Our Metadata Viewer lets you inspect exactly what information is hiding inside your photos. If you find sensitive data (like GPS location), you can instantly strip all metadata and download a clean, safe image ready for social media.
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

export default MetadataViewerInfo;
