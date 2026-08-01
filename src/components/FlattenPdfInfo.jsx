import React, { useState } from 'react';
import styles from './FlattenPdfInfo.module.css';
import Reveal from './Reveal';

const FlattenPdfInfo = () => {
  const features = [
    { icon: '🔒', title: 'Lock Form Data', desc: 'Convert interactive form fields into static text to prevent any further edits to the data.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Flatten PDF documents in milliseconds using powerful client-side processing.' },
    { icon: '📋', title: 'Preserve Layout', desc: 'Maintains the exact visual layout, text, and positioning of the original PDF document.' },
    { icon: '✍️', title: 'Finalize Contracts', desc: 'Perfect for finalizing signed contracts, applications, and tax forms before archiving.' },
    { icon: '🛡️', title: '100% Private', desc: 'Your sensitive PDF documents are never uploaded to a server. Everything happens in your browser.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Flatten unlimited PDFs with no watermarks, fees, or sign-ups required.' }
  ];

  const users = [
    'HR Professionals', 'Legal Assistants', 'Accountants', 'Real Estate Agents', 'Government Employees', 'Students', 'Business Owners'
  ];

  const benefits = [
    'Prevent accidental edits to form data', 'Finalize signed digital documents', 'Archive forms securely', 'Ensure consistent viewing across devices', 'Meet legal document requirements'
  ];

  const faqs = [
    { q: 'What does "flattening" a PDF mean?', a: 'Flattening converts interactive elements (like text fields and checkboxes) into standard, permanent text and graphics on the page. The form can no longer be edited.' },
    { q: 'Is this PDF Flattener free?', a: 'Yes, it is 100% free to use with no limits or hidden fees.' },
    { q: 'Are my PDFs uploaded to a server?', a: 'No. This tool uses the pdf-lib JavaScript library to process your files entirely within your browser, ensuring total privacy and security.' },
    { q: 'Can I un-flatten a PDF after processing?', a: 'No. Flattening is a one-way process. Once the form fields are converted to static text, they cannot be made interactive again. Always keep a backup of the original.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Flatten PDF Forms Tool</h2>
          <p className={styles.paragraph}>
            Interactive PDF forms are great for collecting data, but once the form is filled out and signed, you often need to "lock" the data in place to prevent further edits. This process is called flattening.
          </p>
          <p className={styles.paragraph}>
            Our Flatten PDF Forms tool converts all interactive elements—such as text boxes, checkboxes, and radio buttons—into static text and graphics. This finalizes the document, making it suitable for archiving, printing, or sharing as a permanent record.
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
          <p className={styles.paragraph}>This tool is essential for professionals who handle forms and contracts, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Flattening PDFs</h2>
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

export default FlattenPdfInfo;
