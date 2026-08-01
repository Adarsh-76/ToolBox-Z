import React, { useState } from 'react';
import styles from './PdfToImageInfo.module.css';
import Reveal from './Reveal';

const PdfToImageInfo = () => {
  const features = [
    { icon: '🖼️', title: 'High-Quality Output', desc: 'Extract pages as HD PNG or JPEG images with 2x resolution scaling for crystal-clear results.' },
    { icon: '📦', title: 'Bulk ZIP Download', desc: 'Convert entire PDF documents and download all pages at once in a neatly packaged ZIP file.' },
    { icon: '⚡', title: 'Instant Conversion', desc: 'Leverages powerful browser-based rendering to convert files instantly without server delays.' },
    { icon: '🔄', title: 'Format Flexibility', desc: 'Choose between lossless PNG for maximum quality or compressed JPEG for smaller file sizes.' },
    { icon: '🔒', title: '100% Private', desc: 'Your PDF documents are processed locally in your browser. No files are ever uploaded to a server.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works seamlessly on desktop, tablet, and mobile devices right from your web browser.' }
  ];

  const users = [
    'Content creators', 'Graphic designers', 'Students', 'Researchers', 'Social media managers', 'Architects', 'Real estate agents'
  ];

  const benefits = [
    'Extract charts for presentations', 'Share PDF pages on social media', 'Embed document scans in websites', 'Create image-based portfolios', 'Avoid complex software installations'
  ];

  const faqs = [
    { q: 'Is this PDF to Image converter free?', a: 'Yes, it is completely free to use with no limits on the number of pages or files you can convert.' },
    { q: 'What image formats are supported?', a: 'You can convert your PDF pages to either PNG (lossless, high quality) or JPEG (compressed, smaller file size).' },
    { q: 'Are my PDFs uploaded to a server?', a: 'No. This tool uses Mozilla\'s pdf.js library to render your PDFs entirely within your browser, ensuring complete privacy.' },
    { q: 'Can I convert multiple pages at once?', a: 'Yes, the tool automatically processes all pages in the PDF and offers a "Download All as ZIP" button for bulk extraction.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF to Image Converter</h2>
          <p className={styles.paragraph}>
            Sometimes you need a specific page from a PDF as an image to insert into a presentation, share on social media, or edit in Photoshop. Our PDF to Image Converter makes this process effortless.
          </p>
          <p className={styles.paragraph}>
            Instead of taking low-quality screenshots, this tool renders each PDF page at 2x resolution, ensuring your images are sharp, clear, and professional. You can download individual pages or grab them all at once in a ZIP file.
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
          <p className={styles.paragraph}>This tool is perfect for anyone who works with visual content, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Converting PDF to Images</h2>
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

export default PdfToImageInfo;
