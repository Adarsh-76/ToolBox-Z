import React, { useState } from 'react';
import styles from './HtmlToPdfConverterInfo.module.css';
import Reveal from './Reveal';

const HtmlToPdfConverterInfo = () => {
  const features = [
    { icon: '⚡', title: 'Instant Conversion', desc: 'Transform raw HTML code into downloadable PDF documents instantly without any server processing.' },
    { icon: '👁️', title: 'Live Preview', desc: 'See exactly how your HTML renders in real-time before generating the final PDF file.' },
    { icon: '🎨', title: 'Inline CSS Support', desc: 'Supports inline styles and basic CSS rules to ensure your PDF matches your web design.' },
    { icon: '📄', title: 'HD Quality', desc: 'Generates high-resolution, vector-like PDF files using advanced HTML5 Canvas technology.' },
    { icon: '🔒', title: '100% Private', desc: 'All HTML parsing and PDF generation happens locally in your browser. No data is ever uploaded.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works seamlessly on desktop, tablet, and mobile devices right from your web browser.' }
  ];

  const users = [
    'Web developers', 'Designers', 'Students', 'Report generators', 'Invoice creators', 'Content writers', 'Digital marketers'
  ];

  const benefits = [
    'Create PDFs without backend infrastructure', 'Test HTML rendering offline', 'Generate invoices from HTML templates', 'Save web content for offline reading', 'Avoid complex server setups'
  ];

  const faqs = [
    { q: 'Is this HTML to PDF converter free?', a: 'Yes, it is completely free to use with no limits or hidden fees.' },
    { q: 'Does it support external images?', a: 'Yes, but the image host must allow CORS (Cross-Origin Resource Sharing). If they block it, the PDF generation might fail to prevent canvas security breaches.' },
    { q: 'Can I use external CSS files?', a: 'For best results, use inline CSS or <style> tags within the HTML textarea. External stylesheets may not render correctly in the generated PDF due to browser security.' },
    { q: 'Is my HTML data sent to a server?', a: 'No. This tool runs entirely on the client-side using JavaScript. Your code and data remain strictly in your browser.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our HTML to PDF Converter</h2>
          <p className={styles.paragraph}>
            Converting HTML to PDF is a common requirement for generating reports, invoices, and digital documents. Our HTML to PDF Converter allows you to paste your HTML code and instantly download it as a high-quality PDF file.
          </p>
          <p className={styles.paragraph}>
            Because the conversion happens entirely in your browser using HTML5 Canvas, it is lightning-fast, highly secure, and puts zero load on external servers. It's the perfect tool for developers and designers who need quick PDF prototypes.
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
          <h2 className={styles.sectionTitle}>Who Can Use This Tool?</h2>
          <p className={styles.paragraph}>This tool is built for anyone who works with HTML, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Client-Side PDF Generation</h2>
          <div className={styles.grid}>
            {benefits.map((ben, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>✅ {ben}</h3>
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

export default HtmlToPdfConverterInfo;
