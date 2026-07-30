import React, { useState } from 'react';
import styles from './PaletteGeneratorInfo.module.css';
import Reveal from './Reveal';

const PaletteGeneratorInfo = () => {
  const features = [
    { icon: '🎲', title: 'Instant Generation', desc: 'Generate beautiful, random 5-color palettes with a single click.' },
    { icon: '🔒', title: 'Lock Colors', desc: 'Found a color you love? Lock it and generate new colors for the rest of the palette.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Simply click on any color swatch to instantly copy its HEX code to your clipboard.' },
    { icon: '👁️', title: 'Visual Contrast', desc: 'View how colors look together in large blocks, perfect for testing UI harmony.' },
    { icon: '♾️', title: 'Unlimited Palettes', desc: 'Generate as many palettes as you want. The possibilities are literally infinite.' },
    { icon: '⚡', title: 'Fast & Private', desc: 'Everything runs locally in your browser. No waiting, no data tracking.' }
  ];

  const useCases = [
    'UI/UX Designers creating wireframes',
    'Artists seeking painting inspiration',
    'Web Developers styling CSS themes',
    'Marketers designing brand identities',
    'Interior Designers testing room colors',
    'Students learning color theory'
  ];

  const faqs = [
    { q: 'How do I use the locked colors?', a: 'When you click the lock icon on a color, it turns solid. The next time you click "Generate", that color will stay the same while the others change.' },
    { q: 'Can I export the palette?', a: 'Currently, you can copy the HEX codes individually by clicking the colors. A feature to export as an image or JSON may be added soon!' },
    { q: 'Are the colors completely random?', a: 'Yes, they are generated using a random hex code algorithm. This means you might get a beautiful harmony or a wild clash—just keep generating!' },
    { q: 'Is this tool free?', a: 'Yes, our Palette Generator is 100% free to use with no limits.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Palette Generator</h2>
          <p className={styles.paragraph}>
            Choosing the right color scheme is one of the hardest parts of design. Our Palette Generator takes away the guesswork by providing you with infinite random color combinations at the click of a button.
          </p>
          <p className={styles.paragraph}>
            Whether you are building a website, designing a poster, or painting a room, you can use this tool to break out of creative ruts. Lock the colors that catch your eye, and reroll the rest until you find the perfect harmony.
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
          <h2 className={styles.sectionTitle}>Who Uses This Tool?</h2>
          <p className={styles.paragraph}>Creative professionals and hobbyists use this tool daily:</p>
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

export default PaletteGeneratorInfo;
