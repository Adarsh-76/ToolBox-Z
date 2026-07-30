import React, { useState } from 'react';
import styles from './QrGeneratorInfo.module.css';
import Reveal from './Reveal';

const QrGeneratorInfo = () => {
  const features = [
    { icon: '⚡', title: 'Instant Generation', desc: 'QR codes are generated in real-time as you type. No waiting or server requests.' },
    { icon: '🎨', title: 'Custom Colors', desc: 'Fully customize the foreground and background colors of your QR code.' },
    { icon: '📐', title: 'Adjustable Size', desc: 'Scale your QR code from 100px to 400px for high-definition downloads.' },
    { icon: '⬇️', title: 'HD PNG Download', desc: 'Download your finished QR code as a high-quality PNG image instantly.' },
    { icon: '🛡️', title: 'High Error Correction', desc: 'Uses Level H error correction, meaning it still scans perfectly even if partially covered.' },
    { icon: '🔒', title: '100% Private', desc: 'All generation happens locally in your browser. Your data is not tracked or stored.' }
  ];

  const useCases = [
    'Sharing website URLs',
    'Restaurant menus',
    'Wi-Fi network logins',
    'Business cards',
    'Event tickets',
    'Product packaging'
  ];

  const faqs = [
    { q: 'What is a QR Code?', a: 'A QR (Quick Response) code is a type of barcode that can be read by smartphone cameras. It can store URLs, text, contact info, and more.' },
    { q: 'How do I scan a QR Code?', a: 'Open your smartphone\'s native camera app, point it at the QR code, and a notification will pop up prompting you to open the link.' },
    { q: 'Can I use custom colors?', a: 'Yes! You can pick any foreground and background color. However, for best scanning results, use a dark color on a light background.' },
    { q: 'Do these QR codes expire?', a: 'No. Because they are generated locally and don\'t rely on a link shortener or redirect service, they will work forever.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our QR Code Generator</h2>
          <p className={styles.paragraph}>
            QR codes have become essential for bridging the gap between the physical and digital worlds. Whether you are sharing a website link, a restaurant menu, or a Wi-Fi password, a QR code makes it seamless.
          </p>
          <p className={styles.paragraph}>
            Our QR Code Generator allows you to create custom, high-quality QR codes instantly. With adjustable sizes, custom colors, and high-definition PNG downloads, you have everything you need to deploy your QR code in print or digital media.
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
          <p className={styles.paragraph}>QR codes are incredibly versatile. People use them for:</p>
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

export default QrGeneratorInfo;
