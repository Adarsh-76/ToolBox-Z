import React, { useState } from 'react';
import styles from './PlagiarismCheckerInfo.module.css';
import Reveal from './Reveal';

const PlagiarismCheckerInfo = () => {
  const features = [
    { icon: '🎯', title: 'Originality Score', desc: 'Calculates a unique score from 0-100 based on lexical diversity and word choice.' },
    { icon: '🔍', title: 'Duplicate Sentence Finder', desc: 'Scans your document and highlights any sentences that are repeated internally.' },
    { icon: '📉', title: 'Overused Word Detection', desc: 'Identifies common filler words that are used too frequently, lowering quality.' },
    { icon: '⚡', title: 'Instant Analysis', desc: 'Processes your text instantly in your browser without uploading to a server.' },
    { icon: '🔒', title: '100% Private', desc: 'Your text never leaves your device. All analysis happens locally.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited text checks with no sign-ups or credits required.' }
  ];

  const useCases = [
    'Checking essays before submission',
    'Improving blog post originality',
    'Finding accidental repetition in drafts',
    'Reducing filler words in academic writing',
    'Self-editing creative writing pieces',
    'Verifying text uniqueness for SEO'
  ];

  const faqs = [
    { q: 'Does this check the internet for plagiarism?', a: "No. Scanning the entire internet requires expensive paid APIs. This tool analyzes the internal originality of your text using advanced NLP metrics like lexical diversity and sentence repetition. It helps you improve your writing before you use a paid internet scanner." },
    { q: 'How is the Originality Score calculated?', a: "The score is based on the ratio of unique words to total words (Lexical Diversity). A higher ratio of unique words means higher originality. Points are deducted for repeating the same sentence multiple times." },
    { q: 'Why does it flag "filler words"?', a: "Overusing common words like 'the', 'and', or 'is' makes writing sound robotic and lowers the lexical diversity score. Reducing these words improves the flow and originality of your text." },
    { q: 'Is my text uploaded to a server?', a: "Absolutely not. All text analysis happens directly in your browser. Your writing is completely private and is never sent over the internet." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Plagiarism & Originality Checker</h2>
          <p className={styles.paragraph}>
            Ensuring your writing is original is crucial for academic, professional, and SEO success. Accidental repetition or overuse of common words can make your text sound unoriginal.
          </p>
          <p className={styles.paragraph}>
            Our tool analyzes your text locally to calculate an Originality Score, find duplicate sentences, and identify overused filler words, helping you polish your writing before submission.
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

export default PlagiarismCheckerInfo;
