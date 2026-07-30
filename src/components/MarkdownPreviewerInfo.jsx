import React, { useState } from 'react';
import styles from './MarkdownPreviewerInfo.module.css';
import Reveal from './Reveal';

const MarkdownPreviewerInfo = () => {
  const features = [
    { icon: '⚡', title: 'Live Preview', desc: 'See your formatted HTML update instantly as you type Markdown on the left.' },
    { icon: '🛡️', title: 'Safe Rendering', desc: 'Uses secure parsing to prevent XSS attacks. Your HTML is sanitized automatically.' },
    { icon: '💻', title: 'Code Blocks', desc: 'Fully supports syntax highlighting for inline code and multi-line code blocks.' },
    { icon: '📱', title: 'Responsive Design', desc: 'The split-pane layout stacks beautifully on mobile devices for easy editing.' },
    { icon: '📋', title: 'Copy HTML', desc: 'Easily copy the generated HTML to use in your blogs, READMEs, or websites.' },
    { icon: '🔒', title: '100% Private', desc: 'Your text never leaves your browser. Write sensitive notes securely.' }
  ];

  const useCases = [
    'Writing README files for GitHub',
    'Drafting blog posts',
    'Creating documentation',
    'Taking formatted notes',
    'Formatting comments for Reddit/StackOverflow',
    'Learning Markdown syntax'
  ];

  const faqs = [
    { q: 'What is Markdown?', a: 'Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. It is the standard for README files and web writing.' },
    { q: 'Does it support GitHub Flavored Markdown?', a: 'Yes! It supports standard Markdown including lists, code blocks, blockquotes, links, and bold/italic text.' },
    { q: 'Can I export the result to PDF?', a: 'Currently, the tool is for live previewing. You can copy the generated HTML, or use your browser\'s "Print to PDF" feature on the preview pane.' },
    { q: 'Is my text saved anywhere?', a: 'No. Everything runs locally in your browser. If you refresh the page, the text will reset.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Markdown Previewer</h2>
          <p className={styles.paragraph}>
            Markdown is the lingua franca of the web, used by developers, writers, and bloggers to format text without writing complex HTML. Our Markdown Previewer makes writing Markdown a breeze.
          </p>
          <p className={styles.paragraph}>
            With a clean, split-screen interface, you can write your syntax on the left and see the beautifully formatted result on the right in real-time. It’s perfect for drafting READMEs, documentation, or forum posts.
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
          <p className={styles.paragraph}>This tool is a daily driver for many tech professionals:</p>
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

export default MarkdownPreviewerInfo;
