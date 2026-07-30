import React, { useState } from 'react';
import styles from './HashtagGeneratorInfo.module.css';
import Reveal from './Reveal';

const HashtagGeneratorInfo = () => {
  const features = [
    { icon: '#️⃣', title: 'Smart Variations', desc: 'Automatically appends popular social media modifiers to your keyword.' },
    { icon: '📈', title: 'Trending Tags', desc: 'Includes evergreen trending hashtags to help your post go viral.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Generates up to 30 highly relevant hashtags in milliseconds.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Copy all tags at once, or click individual tags to copy them separately.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Generate unlimited hashtags with no sign-ups or hidden fees.' },
    { icon: '📱', title: 'Platform Agnostic', desc: 'Works perfectly for Instagram, TikTok, Twitter, and Facebook.' }
  ];

  const steps = [
    'Type a single keyword related to your post (e.g., "travel" or "food").',
    'Click the "Generate" button.',
    'Review the list of generated hashtags.',
    'Click "Copy All" to copy the entire list to your clipboard.',
    'Paste the hashtags into your social media post caption!'
  ];

  const faqs = [
    { q: 'How does the Hashtag Generator work?', a: 'Our tool takes your base keyword and combines it with dozens of popular social media modifiers (like "gram", "daily", "photography") and prefixes (like "insta"). It then mixes in trending generic hashtags to give you a perfect list of 30 tags.' },
    { q: 'How many hashtags should I use?', a: 'On Instagram, you can use up to 30 hashtags per post. On TikTok and Twitter, 3-5 highly relevant hashtags usually perform best.' },
    { q: 'Are these hashtags guaranteed to make me go viral?', a: 'No tool can guarantee virality. However, using a mix of specific, broad, and trending hashtags significantly increases your content\'s discoverability.' },
    { q: 'Is this tool free?', a: 'Yes, our Hashtag Generator is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Hashtag Generator</h2>
          <p className={styles.paragraph}>
            Finding the right hashtags can be the difference between a post that flops and a post that goes viral. Manually typing out 30 relevant hashtags for every post is tedious.
          </p>
          <p className={styles.paragraph}>
            Our tool automates the process. Just enter your topic, and we will instantly generate a list of 30 highly relevant and trending hashtags ready to be copied and pasted directly into your caption.
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

export default HashtagGeneratorInfo;
