import React, { useState } from 'react';
import styles from './PdfWatermarkInfo.module.css';
import Reveal from './Reveal';

const PdfWatermarkInfo = () => {
  const features = [
    { icon: '📝', title: 'Text Watermarks', desc: 'Add custom text with adjustable opacity, font size, and rotation angle.' },
    { icon: '🖼️', title: 'Image Watermarks', desc: 'Upload a logo or signature image and place it in the center of your pages.' },
    { icon: '🧽', title: 'Cover/Remove Mode', desc: 'Draw a solid white box over watermarks in the header or footer to hide them.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Applies watermarks to all pages in seconds directly in your browser.' },
    { icon: '🔒', title: '100% Private', desc: 'Your documents never leave your device. All processing happens locally.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited watermarking with no sign-ups or watermarks added by us.' }
  ];

  const useCases = [
    'Marking documents as "Confidential" or "Draft"',
    'Adding company logos to official PDFs',
    'Hiding old watermarks from downloaded PDFs',
    'Protecting copyright on PDF ebooks',
    'Signing digital documents visually',
    'Branding client proposals'
  ];

  const faqs = [
    { q: 'How does the "Remove" mode work?', a: "True removal of embedded watermark data is impossible without breaking the PDF. Our tool uses a 'Cover' method. It draws a solid white box over the header or footer area where watermarks usually live, effectively hiding them from view." },
    { q: 'Can I put the watermark on specific pages only?', a: "Currently, the tool applies the watermark to all pages in the document simultaneously to ensure consistency." },
    { q: 'Are my files uploaded to a server?', a: "No. We take your privacy seriously. All watermarking happens directly in your browser. Your files are never uploaded." },
    { q: 'Can I use a transparent PNG for the image watermark?', a: "Yes! Transparent PNGs work perfectly. You can also adjust the opacity slider to make the image blend nicely with the text." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF Watermark Tool</h2>
          <p className={styles.paragraph}>
            Watermarks are essential for protecting copyright, marking drafts, or branding documents. But adding them usually requires expensive software like Adobe Acrobat.
          </p>
          <p className={styles.paragraph}>
            Our tool lets you add text or image watermarks with full control over opacity and size. It also includes a "Cover" mode to hide existing unwanted watermarks in the header or footer.
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

export default PdfWatermarkInfo;
