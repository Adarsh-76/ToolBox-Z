import React, { useState } from 'react';
import styles from './TwitterThreadInfo.module.css';
import Reveal from './Reveal';

const TwitterThreadInfo = () => {
  const features = [
    { icon: '✂️', title: 'Smart Splitting', desc: 'Intelligently splits your text at word boundaries so tweets are never cut off mid-word.' },
    { icon: '🔢', title: 'Auto-Numbering', desc: 'Automatically adds (1/N, 2/N) numbering to each tweet so your thread stays organized.' },
    { icon: '📏', title: '280 Character Limit', desc: 'Strictly adheres to Twitter\'s 280-character limit, reserving space for the numbering.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Copy individual tweets one by one, or copy the entire thread at once.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'Generates your thread instantly in your browser without any waiting.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited thread generation with no sign-ups or API keys required.' }
  ];

  const useCases = [
    'Turning blog posts into viral threads',
    'Sharing long stories or thoughts on Twitter',
    'Breaking down complex topics into readable chunks',
    'Creating educational step-by-step guides',
    'Repurposing newsletter content for social media',
    'Sharing code snippets or tutorials'
  ];

  const faqs = [
    { q: 'How does the thread generator work?', a: "You paste your long text into the box. The tool counts the characters and intelligently splits the text into multiple 280-character tweets, adding numbering like 1/5, 2/5 automatically." },
    { q: 'Will it cut my words in half?', a: "No! The tool is smart enough to never break a word in half. It looks for spaces and splits the text safely at word boundaries." },
    { q: 'Is there a limit to how long my text can be?', a: "No, you can paste an entire book if you want. However, extremely long texts might generate hundreds of tweets, which can be hard to post manually." },
    { q: 'Can I edit the tweets after they are generated?', a: "Currently, you cannot edit them directly in the tool. You just copy them and paste them into Twitter, where you can edit them before posting." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Twitter Thread Generator</h2>
          <p className={styles.paragraph}>
            Twitter (X) limits tweets to 280 characters, which makes sharing long thoughts, tutorials, or stories difficult. Writing a "thread" manually requires counting characters and numbering tweets yourself, which is tedious.
          </p>
          <p className={styles.paragraph}>
            Our Twitter Thread Generator solves this instantly. Just paste your long text, and the tool will automatically split it into perfectly sized, numbered tweets ready to be copied and pasted into Twitter.
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

export default TwitterThreadInfo;
