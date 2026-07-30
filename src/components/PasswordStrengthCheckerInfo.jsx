import React, { useState } from 'react';
import styles from './PasswordStrengthCheckerInfo.module.css';
import Reveal from './Reveal';

const PasswordStrengthCheckerInfo = () => {
  const features = [
    { icon: '📊', title: 'Real-Time Analysis', desc: 'Password strength is calculated instantly as you type.' },
    { icon: '⏱️', title: 'Crack Time Estimation', desc: 'Estimates how long it would take a supercomputer to brute-force your password.' },
    { icon: '✅', title: 'Security Checklist', desc: 'Visual checklist shows exactly what your password is missing (length, symbols, etc.).' },
    { icon: '👁️', title: 'Show/Hide Toggle', desc: 'Easily toggle password visibility to verify what you are typing.' },
    { icon: '🔒', title: '100% Private', desc: 'Your password is never sent over the internet. All analysis is local.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited checks with no sign-ups or ads.' }
  ];

  const useCases = [
    'Testing the strength of your current passwords',
    'Creating a new secure password',
    'Educating users on password security',
    'Auditing account security',
    'Checking if a password needs to be updated',
    'Learning about password entropy'
  ];

  const faqs = [
    { q: 'Is it safe to type my password here?', a: "Absolutely. This tool runs 100% in your browser. The text you type is never transmitted to any server, logged, or stored. You can even disconnect your internet and it will still work." },
    { q: 'How is the "Time to crack" calculated?', a: "We calculate the theoretical 'entropy' of your password based on its length and the variety of characters used (uppercase, lowercase, numbers, symbols). We then estimate how long it would take a computer making 10 billion guesses per second to crack it." },
    { q: 'What makes a password strong?', a: "Length is the most important factor. A 12+ character password with a mix of uppercase, lowercase, numbers, and symbols is considered strong and would take centuries to crack." },
    { q: 'Should I use the same password everywhere?', a: "Never. Even a strong password should be unique to each account. If one site gets breached, hackers will try that password on your other accounts. Use a Password Manager to keep track." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Password Strength Checker</h2>
          <p className={styles.paragraph}>
            Weak passwords are the leading cause of data breaches. If your password can be cracked in seconds, your accounts are at risk.
          </p>
          <p className={styles.paragraph}>
            Our tool analyzes your password in real-time, checking for length, character variety, and estimating the exact time it would take a hacker to break it. All processing happens locally in your browser for maximum privacy.
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

export default PasswordStrengthCheckerInfo;
