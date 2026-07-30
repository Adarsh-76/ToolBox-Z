import React, { useState } from 'react';
import styles from './InvoiceGeneratorInfo.module.css';
import Reveal from './Reveal';

const InvoiceGeneratorInfo = () => {
  const features = [
    { icon: '📄', title: 'Professional Invoices', desc: 'Generate clean, beautiful PDF invoices for your clients in seconds.' },
    { icon: '➕', title: 'Dynamic Line Items', desc: 'Easily add, remove, or edit services and prices. Totals calculate automatically.' },
    { icon: '🖨️', title: 'One-Click PDF Export', desc: 'Uses your browser\'s native print engine to save perfect PDFs. No watermarks.' },
    { icon: '🆓', title: '100% Free Forever', desc: 'No subscriptions, no logins, no limits. Built for freelancers and small businesses.' }
  ];

  const faqs = [
    { q: 'How do I save the invoice as a PDF?', a: 'Click the "Download / Print as PDF" button. In the print dialog that opens, select "Save as PDF" as the destination instead of a physical printer.' },
    { q: 'Are my invoices stored online?', a: 'No. All data is generated locally in your browser and disappears when you refresh. We do not store your client information on any server.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Free Invoice Generator</h2>
          <p className={styles.paragraph}>
            Freelancers and small business owners shouldn't have to pay $15/month just to send a simple PDF invoice to a client.
          </p>
          <p className={styles.paragraph}>
            Our Free Invoice Generator lets you fill out a quick form and instantly download a professional, watermark-free invoice ready for billing.
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

export default InvoiceGeneratorInfo;
