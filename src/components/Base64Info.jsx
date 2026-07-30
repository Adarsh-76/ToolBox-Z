import React, { useState } from 'react';
import styles from './Base64Info.module.css';
import Reveal from './Reveal';

const Base64Info = () => {
  const features = [
    { icon: '🔒', title: 'Secure Encoding', desc: 'Convert any text data into a Base64 string safely, supporting full Unicode characters.' },
    { icon: '🔓', title: 'Instant Decoding', desc: 'Easily reverse Base64 strings back to readable plain text with a single click.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Quickly copy the encoded or decoded output to your clipboard without manual highlighting.' },
    { icon: '🌐', title: 'Unicode Support', desc: 'Unlike basic encoders, our tool uses TextEncoder/TextDecoder to safely handle emojis and foreign languages.' },
    { icon: '🛡️', title: 'Privacy First', desc: 'All encoding and decoding happens locally in your browser. Your data is never uploaded.' },
    { icon: '⚡', title: 'Fast Performance', desc: 'Process large strings and files instantly without waiting for server responses.' }
  ];

  const useCases = [
    'Embedding images in HTML/CSS',
    'Data URIs for web development',
    'Encoding API credentials',
    'Email attachments (MIME)',
    'Obfuscating data strings',
    'Storing complex data in JSON'
  ];

  const faqs = [
    { q: 'Is Base64 encryption?', a: 'No. Base64 is an encoding scheme, not encryption. It transforms data into a printable ASCII string format, but it does not provide any security or confidentiality. Anyone can decode it.' },
    { q: 'Why does my encoded text look different here?', a: 'Our tool supports full UTF-8 Unicode. If you are encoding emojis or special characters, the output will be slightly longer than basic ASCII encoders because it safely converts the bytes first.' },
    { q: 'Is it safe to paste sensitive data?', a: 'Yes. This tool runs 100% in your browser. No data is sent to our servers, so you can safely encode and decode sensitive strings.' },
    { q: 'Can I encode images?', a: 'Currently, this tool supports text encoding. For images, you would typically use a script to read the file as a Data URI, which this tool will decode back to text if needed.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Base64 Encoder/Decoder</h2>
          <p className={styles.paragraph}>
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is widely used in web development, email systems (MIME), and APIs to ensure that data remains intact without modification during transport.
          </p>
          <p className={styles.paragraph}>
            Our Base64 Encoder/Decoder provides a fast, reliable, and secure way to convert your text data. With built-in Unicode support, you can safely encode emojis, foreign scripts, and special characters without corruption.
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
          <p className={styles.paragraph}>Base64 encoding is essential for many modern web tasks, including:</p>
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

export default Base64Info;
