import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '100+', label: 'Tools Available' },
    { value: '100%', label: 'Free Forever' },
    { value: 'Fast', label: 'Lightning Speed' },
    { value: 'Mobile', label: 'Friendly UI' }
  ];

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>All Your Everyday Tools in One Place</h1>
      <p className={styles.heroSubtitle}>
        Fast, free, modern online tools built for everyone.
      </p>
      
      <div className={styles.heroButtons}>
        <button 
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => navigate('/tools')}
        >
          Explore Tools
        </button>
        
        <button 
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={scrollToFeatures}
        >
          Learn More
        </button>
      </div>

      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={`liquid-glass ${styles.statCard}`}>
            <h3 className={styles.statValue}>{stat.value}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
