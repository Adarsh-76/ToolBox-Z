import React, { useState } from 'react';
import styles from './SampleFileGeneratorInfo.module.css';
import Reveal from './Reveal';

const SampleFileGeneratorInfo = () => {
  const features = [
    { icon: '🛡️', title: 'Privacy First', desc: 'Test tools with dummy data instead of uploading your personal or sensitive files.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Files are generated locally in your browser in milliseconds. No waiting.' },
    { icon: '📦', title: 'Multiple Formats', desc: 'Generate sample JSON, CSV, PDF, Images, and Text files of various sizes.' },
    { icon: '🧪', title: 'Perfect for Testing', desc: 'Ideal for testing compressors, converters, formatters, and merge tools safely.' }
  ];

  const faqs = [
    { q: 'Are these files safe to download?', a: 'Absolutely. The files contain generic, randomly generated "lorem ipsum" style data. They do not contain any real personal information or malware.' },
    { q: 'Can I choose the file size?', a: 'Currently, the sizes are fixed to represent common use cases (e.g., a 2.5MB image for compression testing). We are working on adding custom size options in the future.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Sample File Playground</h2>
          <p className={styles.paragraph}>
            When you want to try a new tool—like an Image Compressor or a PDF Merger—you might not have a suitable file ready on your device. Or worse, you might not want to upload a sensitive document just to test the tool.
          </p>
          <p className={styles.paragraph}>
            Our Sample File Playground solves this. Generate a safe, dummy file instantly, and use it to test any of our tools without risking your own data.
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

export default SampleFileGeneratorInfo;
