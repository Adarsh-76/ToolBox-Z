import React, { useState } from 'react';
import styles from './EmojiKeyboardInfo.module.css';
import Reveal from './Reveal';

const EmojiKeyboardInfo = () => {
  const features = [
    { icon: '⌨️', title: 'Massive Library', desc: 'Hundreds of emojis across 8 different categories, ready to be copied.' },
    { icon: '🔍', title: 'Instant Search', desc: 'Type a keyword like "heart" or "smile" to instantly filter the grid.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Simply click any emoji to instantly copy it to your clipboard.' },
    { icon: '⚡', title: 'Zero Latency', desc: 'Everything runs locally in your browser. No waiting for server requests.' },
    { icon: '📱', title: 'Mobile Optimized', desc: 'The grid automatically adjusts to fit perfectly on phone screens.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Copy unlimited emojis with no sign-ups, limits, or hidden fees.' }
  ];

  const steps = [
    'Use the search bar to find a specific emoji, or browse by category.',
    'Click on the emoji you want to use.',
    'A "Copied!" toast will appear at the bottom of the screen.',
    'Go to your social media app, email, or document and paste (Ctrl+V / Cmd+V).'
  ];

  const faqs = [
    { q: 'How do I paste the emoji after copying?', a: 'After clicking an emoji, simply go to the app where you want to use it (like Instagram, Twitter, or Word) and press Ctrl+V (Windows) or Cmd+V (Mac) to paste it.' },
    { q: 'Are these emojis compatible with all devices?', a: 'Yes! We use standard Unicode emojis. While the visual style might vary slightly depending on the device (Apple vs Android vs Windows), the meaning remains the same.' },
    { q: 'Can I use these emojis for commercial purposes?', a: 'Yes, Unicode emojis are free to use for both personal and commercial projects.' },
    { q: 'Is this tool free?', a: 'Yes, our Emoji Keyboard is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Emoji Keyboard</h2>
          <p className={styles.paragraph}>
            Emojis are the universal language of the internet. They add emotion, context, and personality to your text. However, finding the right emoji on a desktop computer can be frustrating compared to a smartphone keyboard.
          </p>
          <p className={styles.paragraph}>
            Our Emoji Keyboard bridges that gap. With a massive library, categorized tabs, and instant search, you can find and copy the perfect emoji in milliseconds.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default EmojiKeyboardInfo;
