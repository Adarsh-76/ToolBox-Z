import React, { useState } from 'react';
import styles from './MergePdfInfo.module.css';
import Reveal from './Reveal';

const MergePdfInfo = () => {
  const features = [
    { icon: '📂', title: 'Unlimited Merging', desc: 'Combine 2, 10, or 50 PDF files into a single document with no limits.' },
    { icon: '🔄', title: 'Reorder Pages', desc: 'Easily move files up and down the list to get the exact page order you need.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Merges PDFs in seconds directly in your browser without uploading.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '📄', title: 'Universal Format', desc: 'Creates standard PDF files compatible with any device, OS, or PDF reader.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Merge unlimited PDFs with no watermarks, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Combining scanned documents',
    'Merging multiple invoices into one file',
    'Creating comprehensive reports from chapters',
    'Compiling receipts for expense reports',
    'Joining presentation slides into one PDF',
    'Archiving related documents together'
  ];

  const faqs = [
    { q: 'Is there a limit to how many PDFs I can merge?', a: "No! You can merge as many PDF files as your device's memory can handle. For most computers, this is easily dozens of standard documents." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All merging happens directly in your browser using client-side JavaScript. Your files are never uploaded." },
    { q: 'Can I reorder the pages after uploading?', a: "Yes! Once you select your files, you will see a list with up and down arrows next to each file. You can rearrange them in any order before clicking merge." },
    { q: 'Will the merged PDF lose quality?', a: "No. This tool uses lossless merging, meaning the exact original pages and quality are preserved in the final combined document." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Merge PDF Files Tool</h2>
          <p className={styles.paragraph}>
            Dealing with multiple PDF files for a single project is frustrating. Sending 10 separate attachments or trying to read a document scattered across 5 files slows down your workflow.
          </p>
          <p className={styles.paragraph}>
            Our Merge PDF Files tool solves this by combining all your PDFs into one clean, seamless document. Just upload the files, arrange them in the order you want, and download your merged PDF instantly.
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

export default MergePdfInfo;
