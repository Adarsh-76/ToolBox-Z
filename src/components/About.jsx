import React from 'react';
import styles from './About.module.css';
import Reveal from './Reveal';

const About = () => {
  return (
    <Reveal>
      <section id="about" className={styles.aboutSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>About ToolVerse</h2>
          <p className={styles.subtitle}>Built by developers, for everyone.</p>
        </div>

        <div className={styles.grid}>
          <div className={`liquid-glass ${styles.card}`}>
            <h3 className={styles.cardTitle}>🚀 Our Mission</h3>
            <p className={styles.cardText}>
              ToolVerse was created with a single goal: to provide fast, reliable, and completely free online tools without the clutter of ads, sign-ups, or paywalls. We believe utility software should be open, accessible, and privacy-respecting.
            </p>
          </div>
          
          <div className={`liquid-glass ${styles.card}`}>
            <h3 className={styles.cardTitle}>🔒 Privacy First</h3>
            <p className={styles.cardText}>
              All our tools run entirely in your browser. Your text, files, and generated passwords never leave your device. We don't have servers processing your data, ensuring 100% privacy and zero data leaks.
            </p>
          </div>

          <div className={`liquid-glass ${styles.card}`}>
            <h3 className={styles.cardTitle}>⚡ High Performance</h3>
            <p className={styles.cardText}>
              Built with modern web technologies like React and Vite, ToolVerse loads instantly and processes data in real-time. No waiting, no lag, just immediate results on any device.
            </p>
          </div>

          <div className={`liquid-glass ${styles.card}`}>
            <h3 className={styles.cardTitle}>🛠️ Open & Modular</h3>
            <p className={styles.cardText}>
              Our architecture is scalable and community-driven. We are constantly adding new tools based on user feedback. If there's a tool you need, let us know and we'll build it!
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default About;
