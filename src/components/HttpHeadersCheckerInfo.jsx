import React, { useState } from 'react';
import styles from './HttpHeadersCheckerInfo.module.css';
import Reveal from './Reveal';

const HttpHeadersCheckerInfo = () => {
  const features = [
    { icon: '🛡️', title: 'Security Analysis', desc: 'Instantly highlights missing or present security headers like CSP, HSTS, and X-Frame-Options.' },
    { icon: '📋', title: 'Full Header List', desc: 'View all raw HTTP response headers sent by the server.' },
    { icon: '🚦', title: 'Status Codes', desc: 'See the exact HTTP status code (200, 301, 404, etc.) for the requested URL.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Fetches header data in seconds using our secure backend proxy.' },
    { icon: '🌐', title: 'Any Website', desc: 'Check headers for any public URL or API endpoint.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited checks with no sign-ups.' }
  ];

  const useCases = [
    'Auditing website security headers',
    'Debugging API response configurations',
    'Checking redirects (301/302)',
    'Verifying Content-Type settings',
    'Ensuring CORS policies are set correctly',
    'Testing CDN cache headers'
  ];

  const faqs = [
    { q: 'What are HTTP Security Headers?', a: "Security headers like Content-Security-Policy (CSP) and HTTP Strict Transport Security (HSTS) protect your website from attacks like XSS and clickjacking. Our tool highlights which ones are missing." },
    { q: 'Why do I get a 403 or 401 status?', a: "This means the server is blocking automated requests (like our bot) or requires authentication. Some highly protected sites will block bots entirely." },
    { q: 'Can I check subpages?', a: "Yes! Just enter the full URL including the path (e.g., example.com/blog)." },
    { q: 'Is this tool safe to use?', a: "Yes, the check is performed via our backend proxy to bypass browser CORS restrictions, but we do not store the results." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our HTTP Headers Checker</h2>
          <p className={styles.paragraph}>
            HTTP headers are the core of web communication, dictating how browsers and servers interact. For developers and security experts, checking these headers is crucial for debugging and protecting applications.
          </p>
          <p className={styles.paragraph}>
            Our tool fetches the raw headers for any URL and provides a clear summary of your security posture, showing exactly which protective headers are active and which are missing.
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

export default HttpHeadersCheckerInfo;
