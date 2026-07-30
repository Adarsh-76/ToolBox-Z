import React from 'react';
import { Link } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './HomeCategories.module.css';
import Reveal from './Reveal';

const categories = [
  { name: 'Text Tools', icon: '📝', desc: 'Counters, converters, and formatters.' },
  { name: 'Developer Tools', icon: '👨‍💻', desc: 'JSON, Base64, CSS, and Markdown.' },
  { name: 'Image & Design', icon: '🎨', desc: 'Pickers, generators, and AI image tools.' },
  { name: 'Social Media Tools', icon: '📱', desc: 'Resizers and downloaders for social platforms.' },
  { name: 'Math & Calculators', icon: '🧮', desc: 'Calculators and numerical utilities.' },
  { name: 'Productivity', icon: '⏱️', desc: 'Timers and focus tools.' },
  { name: 'PDF Tools', icon: '📄', desc: 'Convert, merge, and edit PDF files.' },
  { name: 'Security & Encryption', icon: '🔐', desc: 'Encoders, decoders, and hashers.' },
  { name: 'Generators', icon: '⚙️', desc: 'Passwords, QR codes, and palettes.' }
];

const HomeCategories = () => {
  return (
    <Reveal>
      {/* Added id="categories" here */}
      <section id="categories" className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Browse by Category</h2>
          <p className={styles.subtitle}>Find exactly what you need, fast.</p>
        </div>
        <div className={styles.grid}>
          {categories.map((cat, i) => {
            const count = toolsList.filter(tool => tool.category === cat.name).length;
            
            return (
              <Link 
                key={i} 
                to={`/tools?category=${encodeURIComponent(cat.name)}`} 
                className={`liquid-glass ${styles.card}`}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.icon}>{cat.icon}</span>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                </div>
                <p className={styles.cardDesc}>{cat.desc}</p>
                
                <div className={styles.cardFooter}>
                  <span className={styles.toolCount}>{count} {count === 1 ? 'Tool' : 'Tools'}</span>
                  <span className={styles.linkText}>Explore <span>&rarr;</span></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
};

export default HomeCategories;
