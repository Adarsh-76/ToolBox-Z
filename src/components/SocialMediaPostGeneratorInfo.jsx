import React, { useState } from 'react';
import styles from './SocialMediaPostGeneratorInfo.module.css';
import Reveal from './Reveal';

const SocialMediaPostGeneratorInfo = () => {
  const features = [
    { icon: '✍️', title: 'Smart Content Engine', desc: 'Generates structured posts with hooks, body text, and calls-to-action.' },
    { icon: '🎭', title: 'Multiple Tones', desc: 'Choose between Professional, Casual, Funny, or Exciting writing styles.' },
    { icon: '📱', title: 'Platform Specific', desc: 'Tailors the format and length for Instagram, Twitter, LinkedIn, or Facebook.' },
    { icon: '#️⃣', title: 'Auto Hashtags', desc: 'Automatically appends relevant hashtags to maximize your post reach.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Get a perfectly formatted post in milliseconds, ready to copy and paste.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Generate unlimited social media posts with no sign-ups.' }
  ];

  const steps = [
    'Enter the main topic or keyword for your post (e.g., "Digital Marketing").',
    'Select the social media platform you are posting to.',
    'Choose the desired tone for your audience.',
    'Click "Generate Post" to instantly create your content.',
    'Click "Copy Post" and paste it directly into your social media app!'
  ];

  const faqs = [
    { q: 'How does the Post Generator work?', a: 'Our tool uses an advanced template matrix. It combines your keyword with proven copywriting frameworks (like AIDA), platform-specific constraints, and tone modifiers to generate a unique, engaging post every time.' },
    { q: 'Can I edit the generated post?', a: 'Absolutely! The tool provides a perfect first draft. We highly recommend copying it and tweaking the wording to add your personal touch before posting.' },
    { q: 'Why was my Twitter post cut short?', a: 'Twitter (X) has a strict 280-character limit. Our tool automatically truncates the post to ensure it fits within Twitter\'s constraints without breaking off mid-sentence.' },
    { q: 'Is this tool free?', a: 'Yes, our Social Media Post Generator is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Social Media Post Generator</h2>
          <p className={styles.paragraph}>
            Staring at a blank screen trying to write the perfect caption is a creator's worst nightmare. Writer's block can kill your productivity and consistency.
          </p>
          <p className={styles.paragraph}>
            Our tool eliminates the blank page. Just enter your topic, pick a vibe, and instantly get a structured, engaging post complete with emojis and hashtags, ready to copy and paste.
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

export default SocialMediaPostGeneratorInfo;
