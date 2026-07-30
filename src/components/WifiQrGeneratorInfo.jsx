import React, { useState } from 'react';
import styles from './WifiQrGeneratorInfo.module.css';
import Reveal from './Reveal';

const WifiQrGeneratorInfo = () => {
  const features = [
    { icon: '📱', title: 'Instant Connection', desc: 'Guests scan the QR code with their phone camera and instantly connect to your Wi-Fi.' },
    { icon: '🔒', title: 'Supports WPA & WEP', desc: 'Generate codes for modern WPA/WPA2 networks, legacy WEP, or open networks.' },
    { icon: '🤫', title: 'Hidden Networks', desc: 'Works perfectly with hidden SSIDs by including the network flag in the QR data.' },
    { icon: '⬇️', title: 'Download & Print', desc: 'Download the high-quality PNG to print and frame for your home, cafe, or office.' }
  ];

  const faqs = [
    { q: 'How do people scan it?', a: 'On iPhones, simply open the Camera app and point it at the QR code. On Android, you may need to open the Google Lens or QR scanner feature in the camera app.' },
    { q: 'Is my password safe?', a: 'Yes. The QR code is generated directly in your browser. We do not store or transmit your Wi-Fi password to any server.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Wi-Fi QR Code Generator</h2>
          <p className={styles.paragraph}>
            Tired of spelling out your complicated Wi-Fi password to guests? With a Wi-Fi QR Code, they can simply point their phone camera at a printed code and hit "Connect".
          </p>
          <p className={styles.paragraph}>
            Generate your code instantly, download it, and print it to place on your fridge, guest room, or cafe counter.
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

export default WifiQrGeneratorInfo;
