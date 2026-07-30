import React, { useState } from 'react';
import styles from './FancyTextGeneratorInfo.module.css';
import Reveal from './Reveal';

const FancyTextGeneratorInfo = () => {
  const features = [
    { icon: '✨', title: '8 Unique Styles', desc: 'Choose from Bold, Italic, Monospace, Double-struck, Circled, and more.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Text converts instantly as you type. No waiting, no loading screens.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Simply tap the style you like, and it instantly copies to your clipboard.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on Instagram, TikTok, Twitter, Discord, and WhatsApp.' },
    { icon: '🔒', title: '100% Private', desc: 'Runs entirely in your browser. No data is ever sent to a server.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Generate unlimited fancy text with no sign-ups or watermarks.' }
  ];

  const useCases = [
    'Styling Instagram bios and captions',
    'Making TikTok comments stand out',
    'Creating aesthetic Twitter display names',
    'Formatting Discord nicknames',
    'Sending unique WhatsApp messages',
    'Designing cool YouTube titles'
  ];

  const faqs = [
    { q: 'How does the fancy text work?', a: "We use special Unicode characters that look like different fonts. Since they are technically text characters and not images, they can be copied and pasted anywhere that supports text." },
    { q: 'Will it work on Instagram and TikTok?', a: "Yes! Instagram bios, TikTok comments, and Twitter names fully support these Unicode characters. However, some very rare fonts might not render on older Android devices." },
    { q: 'Is this tool free to use?', a: "Absolutely. You can generate and copy as much fancy text as you want, completely free of charge." },
    { q: 'Do I need to install any fonts?', a: "No. The tool uses characters already built into your operating system. You just copy and paste!" }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Fancy Text Generator</h2>
          <p className={styles.paragraph}>
            Standard keyboard text can be boring. If you want your social media profile to stand out, you need style. But Instagram and TikTok don't let you change the font of your bio.
          </p>
          <p className={styles.paragraph}>
            Our Fancy Text Generator uses special Unicode characters to create the illusion of different fonts. Just type your text, pick a style, and copy it directly to your bio or comments!
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

export default FancyTextGeneratorInfo;
