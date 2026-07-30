import React, { useState } from 'react';
import styles from './BarcodeGeneratorInfo.module.css';
import Reveal from './Reveal';

const BarcodeGeneratorInfo = () => {
  const features = [
    { icon: '📊', title: 'Multiple Formats', desc: 'Generate CODE128, CODE39, EAN13, EAN8, and UPC barcodes.' },
    { icon: '🎨', title: 'Custom Colors', desc: 'Change the bar color and background color to match your branding.' },
    { icon: '📏', title: 'Adjustable Size', desc: 'Control the height and line width for perfect print quality.' },
    { icon: '📥', title: 'PNG Download', desc: 'Download your generated barcode as a high-quality PNG image instantly.' },
    { icon: '⚡', title: 'Live Preview', desc: 'See your barcode update in real-time as you type.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Generate unlimited barcodes with no sign-ups.' }
  ];

  const useCases = [
    'Creating product labels for retail',
    'Generating inventory tracking codes',
    'Making shipping barcodes',
    'Designing event ticket stubs',
    'Creating ID cards',
    'Testing barcode scanners'
  ];

  const faqs = [
    { q: 'Which barcode format should I use?', a: "CODE128 is the most versatile and supports letters, numbers, and symbols. EAN13 and UPC are standard for retail products and only accept specific lengths of numbers." },
    { q: 'Are the generated barcodes scannable?', a: "Yes! As long as you use the correct format and don't make the lines too thin, the downloaded PNG will scan perfectly with any standard barcode scanner." },
    { q: 'Can I change the size of the barcode?', a: "Yes, you can adjust the height and line width using the controls. The download will match the size of the preview." },
    { q: 'Is there a limit to how many I can generate?', a: "No, you can generate and download as many barcodes as you need, completely free." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Barcode Generator</h2>
          <p className={styles.paragraph}>
            Barcodes are essential for retail, inventory, and logistics. Whether you need a quick UPC for a local craft fair or CODE128 labels for warehouse boxes, having a fast generator saves time.
          </p>
          <p className={styles.paragraph}>
            Our tool lets you create custom barcodes in seconds, customize the colors, and download them as high-quality PNG images ready for printing.
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

export default BarcodeGeneratorInfo;
