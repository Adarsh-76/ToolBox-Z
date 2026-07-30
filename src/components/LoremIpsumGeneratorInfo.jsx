import React, { useState } from 'react';
import styles from './LoremIpsumGeneratorInfo.module.css';
import Reveal from './Reveal';

const LoremIpsumGeneratorInfo = () => {
  const features = [
    { icon: '📝', title: 'Paragraphs, Sentences, Words', desc: 'Choose exactly how you want your placeholder text structured.' },
    { icon: '🔢', title: 'Custom Amount', desc: 'Generate anywhere from 1 to 100 units of text instantly.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Instantly copy the generated text to your clipboard.' },
    { icon: '⚡', title: 'Instant Generation', desc: 'Creates randomized, natural-sounding text instantly in your browser.' },
    { icon: '🎨', title: 'For Designers & Devs', desc: 'Perfect for filling out wireframes, mockups, and testing typography.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited text generation with no sign-ups.' }
  ];

  const useCases = [
    'Filling empty website templates',
    'Testing how long text affects layouts',
    'Creating mockups for clients',
    'Testing font readability and sizing',
    'Populating database fields for testing',
    'Drafting presentations with placeholder content'
  ];

  const faqs = [
    { q: 'What is Lorem Ipsum?', a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { q: 'Why do we use Lorem Ipsum?', a: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Using Lorem Ipsum allows designers to focus on the visual layout without being distracted by meaningful text." },
    { q: 'Is the text random every time?', a: "Yes! Our generator pulls from a dictionary of standard Latin words and randomizes the sentence structure and length every time you click generate." },
    { q: 'Can I copy the text easily?', a: "Absolutely. Just click the 'Copy Text' button and the entire generated block will be copied to your clipboard instantly." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Lorem Ipsum Generator</h2>
          <p className={styles.paragraph}>
            When designing a website or creating a layout, you need to see how it looks with text, but you don't want people to read the content yet. That's where Lorem Ipsum comes in.
          </p>
          <p className={styles.paragraph}>
            Our tool lets you generate as much placeholder text as you need, in paragraphs, sentences, or words, with a single click.
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

export default LoremIpsumGeneratorInfo;
