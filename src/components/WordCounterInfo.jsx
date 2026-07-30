import React, { useState } from 'react';
import styles from './WordCounterInfo.module.css';
import Reveal from './Reveal'; // Import the Reveal component

const WordCounterInfo = () => {
  const features = [
    { icon: '⚡', title: 'Instant Word Count', desc: 'Count the total number of words in your text with real-time updates. Useful for assignments, blog posts, and reports.' },
    { icon: '🔤', title: 'Character Counter', desc: 'Instantly calculate the total number of characters, including spaces. Ideal for social media, SMS, and SEO meta descriptions.' },
    { icon: '📖', title: 'Sentence Counter', desc: 'Accurately detects sentences within your text, helping you analyze writing structure and readability.' },
    { icon: '⏱️', title: 'Estimated Reading Time', desc: 'Calculates how long it will take an average reader to read your content, helping you create reader-friendly material.' },
    { icon: '🔄', title: 'Real-Time Updates', desc: 'As soon as you type, delete, or paste text, all statistics refresh automatically without reloading the page.' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on smartphones, tablets, laptops, and desktop computers, making it easy to use anywhere.' },
    { icon: '🚀', title: 'Fast Performance', desc: 'Built with optimized algorithms, the tool processes lengthy documents quickly without slowing down your browser.' },
    { icon: '🔒', title: 'Privacy Focused', desc: 'Your text stays in your browser and is never stored on our servers. Confidently analyze sensitive documents.' }
  ];

  const users = [
    'Students writing assignments', 'Teachers checking document length', 'Bloggers creating SEO articles', 'Copywriters writing advertisements', 'Journalists preparing news', 'Authors working on books', 'Researchers preparing papers', 'Social media managers', 'Digital marketers', 'Business professionals'
  ];

  const benefits = [
    'Save time while writing', 'Meet assignment requirements', 'Improve content organization', 'Optimize articles for SEO', 'Create highly readable content', 'Monitor document length', 'Enhance writing productivity', 'Track writing progress'
  ];

  const faqs = [
    { q: 'Is this Word Counter free?', a: 'Yes. The tool is completely free to use with no hidden charges or subscriptions.' },
    { q: 'Does the tool save my text?', a: 'No. Your content is processed locally in your browser and is not stored or shared.' },
    { q: 'Can I use it on my mobile phone?', a: 'Absolutely. The tool is fully responsive and works on Android, iPhone, tablets, and desktop devices.' },
    { q: 'Is the word count accurate?', a: 'Yes. The tool uses reliable text-processing methods to provide highly accurate word, character, sentence, and reading time statistics.' },
    { q: 'What types of text can I analyze?', a: 'You can analyze essays, articles, emails, reports, blog posts, research papers, social media captions, stories, books, and virtually any plain text.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      
      {/* Intro Section */}
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Word Counter Tool</h2>
          <p className={styles.paragraph}>
            Our Word Counter is a fast, accurate, and easy-to-use online tool designed to help writers, students, bloggers, content creators, developers, marketers, and professionals analyze their text in real time. Whether you're writing an essay, article, social media post, email, or research paper, our tool instantly provides detailed statistics to improve your writing.
          </p>
          <p className={styles.paragraph}>
            Unlike traditional word counting methods, this tool updates all statistics automatically as you type or paste your content. There is no need to refresh the page or click a button. Everything is calculated instantly, saving time and improving productivity.
          </p>
        </section>
      </Reveal>

      {/* Key Features */}
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

      {/* Who Can Use */}
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who Can Use This Tool?</h2>
          <p className={styles.paragraph}>This Word Counter is useful for many different users, including:</p>
          <div className={styles.pillGrid}>
            {users.map((user, i) => (
              <div key={i} className={`liquid-glass ${styles.pill}`}>{user}</div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Benefits */}
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Benefits of Using a Word Counter</h2>
          <p className={styles.paragraph}>
            Using a word counting tool helps improve writing quality and efficiency. Many websites, schools, and publishers have strict word or character limits. By monitoring your content in real time, you can easily stay within those limits. Benefits include:
          </p>
          <div className={styles.grid}>
            {benefits.map((ben, i) => (
              <div key={i} className={`liquid-glass ${styles.card}`}>
                <h3 className={styles.cardTitle}>✅ {ben}</h3>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Why Choose */}
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Choose Our Word Counter?</h2>
          <div className={`liquid-glass ${styles.highlightBox}`}>
            <p className={styles.paragraph}>
              Our Word Counter combines simplicity with powerful functionality. The clean interface makes it easy for beginners, while the accurate calculations make it reliable for professionals.
            </p>
            <p className={styles.paragraph}>
              Unlike many online tools, there are no unnecessary ads, downloads, or registrations required. Simply open the tool, start typing, or paste your text to receive instant results. Our goal is to provide a free, fast, reliable, and user-friendly text analysis experience for everyone.
            </p>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
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

export default WordCounterInfo;
