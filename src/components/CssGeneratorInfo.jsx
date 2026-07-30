import React, { useState } from 'react';
import styles from './CssGeneratorInfo.module.css';
import Reveal from './Reveal';

const CssGeneratorInfo = () => {
  const features = [
    { icon: '👁️', title: 'Live Visual Preview', desc: 'See exactly how your box-shadow and border-radius will look in real-time as you drag the sliders.' },
    { icon: '🎛️', title: 'Granular Controls', desc: 'Fine-tune horizontal/vertical offsets, blur, spread, radius, and color with pinpoint accuracy.' },
    { icon: '📋', title: 'Instant CSS Code', desc: 'Get the exact CSS code generated for you. Just click copy and paste it directly into your project.' },
    { icon: '🎨', title: 'Custom Colors', desc: 'Use the native color picker to match your shadows perfectly to your brand or design guidelines.' },
    { icon: '📱', title: 'Fully Responsive', desc: 'Design and test your CSS shadows on any device, from desktop monitors to mobile phones.' },
    { icon: '⚡', title: 'Zero Setup', desc: 'No installations, no dependencies. Just open the tool and start generating beautiful UI elements instantly.' }
  ];

  const useCases = [
    'Frontend Developers styling UIs',
    'UI/UX Designers prototyping',
    'Students learning CSS',
    'Quickly copying shadow values',
    'Creating Neumorphism designs',
    'Testing dark/light mode shadows'
  ];

  const faqs = [
    { q: 'How do I use the generated CSS?', a: 'Simply adjust the sliders until the preview looks right, then click the "Copy CSS" button. Paste that code into your CSS file under the class or element you want to style.' },
    { q: 'Can I create an inner shadow (inset)?', a: 'Currently, this version focuses on standard drop shadows for simplicity. Inset shadow support may be added in a future update!' },
    { q: 'Does it support border-radius?', a: 'Yes! Along with shadows, you can control the border-radius of the preview box, and the code will be included in the copy output.' },
    { q: 'Is this tool free?', a: 'Yes, our CSS Generator is 100% free to use with no limits, ads, or required sign-ups.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our CSS Generator</h2>
          <p className={styles.paragraph}>
            Creating the perfect box-shadow and border-radius often involves tedious trial and error. You tweak a pixel value, save, refresh the browser, and repeat. Our CSS Generator eliminates that workflow.
          </p>
          <p className={styles.paragraph}>
            By providing a live, visual interface, you can instantly see the results of your adjustments. Once you find the perfect design, just copy the generated CSS code and paste it directly into your project. It saves time and helps you learn how CSS properties interact.
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
          <p className={styles.paragraph}>This tool is a daily driver for many web professionals, including:</p>
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

export default CssGeneratorInfo;
