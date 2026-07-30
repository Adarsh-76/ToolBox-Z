import React, { useState } from 'react';
import styles from './PdfSecurityInfo.module.css';
import Reveal from './Reveal';

const PdfSecurityInfo = () => {
  const features = [
    { icon: '📊', title: 'Password Strength Analysis', desc: 'Real-time strength meter ensures you use a highly secure password before encrypting.' },
    { icon: '⚙️', title: 'Granular Permissions', desc: 'Restrict printing, copying text, or editing the document even if the user has the password.' },
    { icon: '🔒', title: 'Standard Encryption', desc: 'Applies standard PDF security handlers to prevent unauthorized access.' },
    { icon: '🔓', title: 'Remove Passwords', desc: 'Instantly unlock protected PDFs by removing the encryption layer and permissions.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Encrypts or decrypts PDFs in seconds directly in your browser.' },
    { icon: '🛡️', title: '100% Private', desc: 'Your documents and passwords never leave your device. All processing is local.' }
  ];

  const useCases = [
    'Protecting sensitive contracts before emailing',
    'Securing financial documents like tax returns',
    'Unlocking PDFs when you forgot the password',
    'Preventing clients from copying your proposals',
    'Restricting printing of confidential study materials',
    'Sharing confidential business plans'
  ];

  const faqs = [
    { q: 'How does the password strength meter work?', a: "We analyze your password based on length, uppercase letters, lowercase letters, numbers, and special characters. We strongly recommend reaching the 'Strong' (Green) level before encrypting your document." },
    { q: 'What are Granular Permissions?', a: "Beyond just requiring a password to open, you can restrict what users do after they open it. For example, you can allow them to read the PDF but prevent them from printing it or copying the text." },
    { q: 'Are my passwords or files uploaded to a server?', a: "Absolutely not. Both the PDF file and your password are processed entirely in your browser's memory. Nothing is ever sent over the internet, ensuring total privacy." },
    { q: 'Can I unlock a PDF if I forgot the password?', a: "No. We cannot crack unknown passwords. To unlock a PDF, you must provide the correct current password so the browser can legally decrypt it." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Advanced PDF Protection Tool</h2>
          <p className={styles.paragraph}>
            PDFs are often used for sensitive documents like contracts, invoices, and medical records. Sending an unencrypted PDF over email can be risky if it falls into the wrong hands.
          </p>
          <p className={styles.paragraph}>
            Our Advanced PDF Protection Tool allows you to add password encryption, analyze your password strength, and set granular permissions (like disabling printing or copying). Everything happens locally in your browser, ensuring your data remains completely private.
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

export default PdfSecurityInfo;
