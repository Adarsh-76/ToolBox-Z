import React, { useState } from 'react';
import styles from './PasswordGeneratorInfo.module.css';
import Reveal from './Reveal';

const PasswordGeneratorInfo = () => {
  const features = [
    { icon: '🛡️', title: 'Military-Grade Security', desc: 'Generates passwords using cryptographically secure pseudo-random number generators (CSPRNG) directly in your browser.' },
    { icon: '⚙️', title: 'Customizable Options', desc: 'Choose your exact length (8-32 characters) and include or exclude uppercase, lowercase, numbers, and symbols.' },
    { icon: '📊', title: 'Strength Meter', desc: 'Instantly visualizes how strong your password is, helping you avoid weak and vulnerable combinations.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'No waiting required. Passwords are generated instantly in real-time as you adjust the settings.' },
    { icon: '🔒', title: '100% Private', desc: 'Your passwords are never sent over the internet or stored on our servers. Everything happens locally.' },
    { icon: '📱', title: 'Cross-Platform', desc: 'Works flawlessly on mobile phones, tablets, and desktop computers, so you can generate secure passwords anywhere.' }
  ];

  const tips = [
    'Always use a minimum of 12 characters',
    'Include a mix of uppercase, lowercase, numbers, and symbols',
    'Never reuse passwords across multiple accounts',
    'Use a reputable password manager to store them',
    'Enable Two-Factor Authentication (2FA) wherever possible',
    'Avoid using personal info like names or birthdates'
  ];

  const faqs = [
    { q: 'Is this password generator safe to use?', a: 'Yes. Our tool uses your browser\'s native Window.crypto API to ensure mathematically secure and unpredictable password generation. No data leaves your device.' },
    { q: 'What makes a password strong?', a: 'Length is the most critical factor. A 16-character password with a mix of character types is exponentially harder to crack than an 8-character password.' },
    { q: 'Do you store the passwords I generate?', a: 'Absolutely not. The tool runs entirely in your browser. Once you leave or refresh the page, the password is gone forever.' },
    { q: 'Should I use a password manager?', a: 'Yes! We highly recommend using a password manager (like Bitwarden or 1Password) to store the complex passwords you generate here.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Password Generator</h2>
          <p className={styles.paragraph}>
            Our Password Generator is a fast, secure, and reliable online tool designed to help you create strong, uncrackable passwords in an instant. In an era where cyber threats are constantly evolving, using weak or reused passwords is the number one cause of data breaches.
          </p>
          <p className={styles.paragraph}>
            This tool leverages cryptographic algorithms right inside your browser to ensure that every password generated is mathematically secure and completely random. You don't have to worry about server logs or data leaks—your security is our top priority.
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
          <h2 className={styles.sectionTitle}>Tips for High Security</h2>
          <p className={styles.paragraph}>Generating a strong password is just the first step. Follow these best practices to keep your accounts secure:</p>
          <div className={styles.grid}>
            {tips.map((tip, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>✅ {tip}</h3>
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

export default PasswordGeneratorInfo;
