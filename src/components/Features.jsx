import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed. All tools run instantly in your browser without lag.' },
    { icon: '🔒', title: 'Privacy First', desc: 'Your data never leaves your device. Everything runs client-side for maximum security.' },
    { icon: '🆓', title: 'No Sign-up', desc: 'Free forever. No accounts, no emails, no paywalls. Just open and use.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Works flawlessly on desktop, tablet, or mobile devices.' },
    { icon: '🎨', title: 'Modern UI', desc: 'Beautiful liquid glass interface designed to make your workflow enjoyable.' },
    { icon: '🛠️', title: 'Open Source', desc: 'Built with love by the community. Contribute or suggest new tools anytime.' }
  ];

  return (
    // Add id="features" here!
    <section id="features" className={styles.featuresSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Why choose ToolVerse?</h2>
        <p className={styles.subtitle}>Built for developers, designers, and everyday users.</p>
      </div>

      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={`liquid-glass ${styles.card}`}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
