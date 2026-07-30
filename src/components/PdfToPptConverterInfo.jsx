import React, { useState } from 'react';
import styles from './PdfToPptConverterInfo.module.css';
import Reveal from './Reveal';

const PdfToPptConverterInfo = () => {
  const features = [
    { icon: '🖥️', title: 'Slide Generation', desc: 'Reads PDF files and accurately extracts text content, creating a slide for every page.' },
    { icon: '📝', title: 'Editable PPTX Output', desc: 'Get clean .pptx files where you can edit text, add images, and change themes instantly.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Convert PDFs to PowerPoint in seconds directly in your browser without uploads.' },
    { icon: '🔒', title: '100% Private', desc: 'Your presentations never leave your device. All processing happens locally.' },
    { icon: '🎨', title: 'Universal Format', desc: 'Creates standard .pptx files compatible with Microsoft PowerPoint, Google Slides, and Keynote.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Convert unlimited PDF files to PowerPoint with no watermarks or sign-ups.' }
  ];

  const useCases = [
    'Converting webinars into editable slides',
    'Updating old PDF presentations with new text',
    'Extracting text from PDF reports for slides',
    'Creating templates from existing PDFs',
    'Viewing PDF content in presentation mode',
    'Importing PDF data into slide decks'
  ];

  const faqs = [
    { q: 'Does this tool support scanned PDFs?', a: "No. This tool extracts text based on digital text. If your PDF is a scanned image, it requires OCR (Optical Character Recognition) to read the text, which this specific tool does not do." },
    { q: 'Are my PDF files uploaded to a server?', a: "No. We take your privacy seriously. All PDF parsing and PowerPoint generation happens directly in your browser. Your files are never uploaded." },
    { q: 'Will the PowerPoint look exactly like the PDF?', a: "The tool extracts all the text from your PDF and places it cleanly onto editable slides. It does not capture complex layouts, images, or custom fonts, but it perfectly preserves the text content for editing." },
    { q: 'Is there a file size limit?', a: "Because processing happens in your browser, the limit depends on your device's RAM. It easily handles standard PDF documents up to 50MB without any issues." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our PDF to PowerPoint Converter</h2>
          <p className={styles.paragraph}>
            PDF files are great for sharing, but terrible for editing. If you've ever received a presentation as a PDF and needed to update the slides, you know how frustrating it is.
          </p>
          <p className={styles.paragraph}>
            Our PDF to PowerPoint Converter solves this by extracting the text from your PDF and generating a fully editable .pptx file. You get a clean slide deck ready for your next presentation.
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

export default PdfToPptConverterInfo;
