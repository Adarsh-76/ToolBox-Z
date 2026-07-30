import React, { useState } from 'react';
import styles from './ApiResponseViewerInfo.module.css';
import Reveal from './Reveal';

const ApiResponseViewerInfo = () => {
  const features = [
    { icon: '🚀', title: 'Instant API Testing', desc: 'Quickly send GET requests to any API endpoint and view the response without writing code.' },
    { icon: '🎨', title: 'Syntax Highlighting', desc: 'Beautifully formatted JSON with color-coded keys, strings, numbers, and booleans.' },
    { icon: '🔒', title: 'CORS Bypass Proxy', desc: 'Our backend safely fetches the API for you, bypassing annoying browser CORS errors.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy the formatted JSON response to your clipboard for use in your code.' }
  ];

  const faqs = [
    { q: 'Why did I get a "Failed to fetch" error?', a: 'This usually happens if the API requires authentication (API keys), is temporarily down, or explicitly blocks server-side requests. Ensure the URL is correct and public.' },
    { q: 'Can I send POST requests?', a: 'Currently, this tool only supports GET requests for viewing public API data. POST requests usually require headers and body data which are complex to format in a simple URL.' },
    { q: 'Is my API data stored?', a: 'No. We do not log or store any API responses. The data is fetched in real-time and discarded immediately after being sent to your browser.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About API Response Viewer</h2>
          <p className={styles.paragraph}>
            Testing APIs can be annoying when you have to open Postman or write a custom script just to see what data an endpoint returns.
          </p>
          <p className={styles.paragraph}>
            Our API Response Viewer allows you to paste any public API URL and instantly see the formatted JSON response. With built-in syntax highlighting and CORS bypassing, it's the fastest way to inspect API data directly in your browser.
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

export default ApiResponseViewerInfo;
