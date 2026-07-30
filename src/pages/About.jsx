import React from 'react';
import styles from './About.module.css';

const About = () => {
  const features = [
    { icon: '⚡', title: 'High Performance', desc: 'Built with React and Vite, ToolBox Z loads instantly and processes data in real-time. No waiting, no lag.' },
    { icon: '🔒', title: 'Privacy First', desc: 'All our tools run entirely in your browser. Your data never leaves your device. We don\'t have servers processing your data.' },
    { icon: '🆓', title: 'Free Forever', desc: 'Utility software should be open and accessible. No ads, no sign-ups, no paywalls. Just open and use.' },
    { icon: '🛠️', title: 'Open & Modular', desc: 'Our architecture is scalable and community-driven. We are constantly adding new tools based on user feedback.' }
  ];

  const values = [
    { icon: '🛡️', title: 'Privacy by Design', desc: 'We believe your data is yours alone. That’s why every tool runs locally in your browser. No tracking, no uploads, no compromises.' },
    { icon: '🚀', title: 'Zero Latency', desc: 'By eliminating server round-trips, our tools process your inputs instantly. What you type is what you get, immediately.' },
    { icon: '🤝', title: 'Accessibility', desc: 'Tools should be for everyone. Our interface is clean, responsive, and works flawlessly on any device, completely free of charge.' },
    { icon: '💡', title: 'Innovation', desc: 'We constantly explore new web technologies—like WebAssembly and WebGL—to bring desktop-grade tools to your browser.' }
  ];

  const stats = [
    { value: 'Every', label: 'Tool You Need' },
    { value: '50+', label: 'Countries' },
    { value: '100%', label: 'Free Forever' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>About <span>ToolBox Z</span></h1>
        <p className={styles.subtitle}>
          ToolBox Z is a fast, accurate, and easy-to-use online platform designed to help writers, developers, and professionals.
        </p>
      </div>

      {/* Mission Section */}
      <div className={`${styles.clayCard} ${styles.missionCard}`}>
        <div className={styles.clayIcon}>🚀</div>
        <h2 className={styles.cardTitle}>Our Mission</h2>
        <p className={styles.cardText}>
          ToolBox Z was created with a single goal: to provide fast, reliable, and completely free online tools without the clutter of ads, sign-ups, or paywalls. We believe utility software should be open, accessible, and privacy-respecting. Whether you're writing an essay, formatting JSON, or generating a secure password, our tools are built to make your life easier.
        </p>
      </div>

      {/* Why Choose Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Why Choose <span>ToolBox Z?</span></h2>
      </div>
      <div className={styles.grid}>
        {features.map((feat, i) => (
          <div key={i} className={styles.clayCard}>
            <div className={styles.clayIcon}>{feat.icon}</div>
            <h3 className={styles.cardTitle}>{feat.title}</h3>
            <p className={styles.cardText}>{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Technology Section */}
      <div className={`${styles.clayCard} ${styles.missionCard}`} style={{ marginTop: '3rem' }}>
        <div className={styles.clayIcon}>⚙️</div>
        <h2 className={styles.cardTitle}>The Technology Behind ToolBox Z</h2>
        <p className={styles.cardText}>
          We don't just build tools; we engineer experiences. ToolBox Z is powered by a modern React and Vite frontend, ensuring blazing-fast load times and a highly responsive user interface. For heavy tasks like AI image analysis and OCR, we utilize WebAssembly and TensorFlow.js to tap into your device's native GPU power. This means we can offer desktop-grade performance entirely within your web browser, without you ever having to install an application.
        </p>
      </div>

      {/* Core Values Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Core <span>Values</span></h2>
      </div>
      <div className={styles.grid}>
        {values.map((val, i) => (
          <div key={i} className={styles.clayCard}>
            <div className={styles.clayIcon}>{val.icon}</div>
            <h3 className={styles.cardTitle}>{val.title}</h3>
            <p className={styles.cardText}>{val.desc}</p>
          </div>
        ))}
      </div>

      {/* Roadmap Section */}
      <div className={`${styles.clayCard} ${styles.missionCard}`} style={{ marginTop: '3rem' }}>
        <div className={styles.clayIcon}>🗺️</div>
        <h2 className={styles.cardTitle}>The Roadmap Ahead</h2>
        <p className={styles.cardText}>
          We are just getting started. Our team is actively working on expanding the ToolBox Z suite. In the coming months, we plan to introduce Progressive Web App (PWA) support so you can install ToolBox Z on your devices for offline access. We are also expanding our AI toolset, adding more developer utilities, and building a community platform where users can request and vote on the next features they want to see. Your feedback directly shapes our roadmap.
        </p>
      </div>

      {/* Stats Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>ToolBox Z <span>by the Numbers</span></h2>
      </div>
      <div className={`${styles.clayCard} ${styles.statsCard}`}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
