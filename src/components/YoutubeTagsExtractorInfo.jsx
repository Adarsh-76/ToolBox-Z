import React, { useState } from 'react';
import styles from './YoutubeTagsExtractorInfo.module.css';
import Reveal from './Reveal';

const YoutubeTagsExtractorInfo = () => {
  const features = [
    { icon: '🏷️', title: 'Extract Video Tags', desc: 'Pull all hidden keywords and tags used in any YouTube video.' },
    { icon: '🔍', title: 'SEO Analysis', desc: 'Analyze what keywords your competitors are ranking for.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Copy all tags at once, or click individual tags to copy them separately.' },
    { icon: '⚡', title: 'Instant Fetching', desc: 'Tags are fetched and parsed directly from the YouTube page in seconds.' },
    { icon: '🔒', title: 'Privacy Friendly', desc: 'We do not store your searches or track the URLs you analyze.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Extract tags from unlimited videos with no sign-ups.' }
  ];

  const steps = [
    'Open YouTube and find the video you want to analyze.',
    'Copy the video URL from your browser\'s address bar.',
    'Paste the copied URL into the input box above.',
    'Click the "Extract Tags" button and wait a few seconds.',
    'Copy the tags and use them in your own YouTube videos for SEO!'
  ];

  const faqs = [
    { q: 'Why are tags important for YouTube?', a: 'Tags help YouTube understand the content of your video, which helps it appear in search results and suggested videos. Analyzing competitor tags is a great way to boost your own SEO.' },
    { q: 'Why did the extraction fail?', a: 'Sometimes YouTube hides tags for certain videos, or the public page structure changes. Also, YouTube may block automated requests if you extract too many too quickly.' },
    { q: 'Can I extract tags from private videos?', a: 'No. This tool only works for public YouTube videos. We respect privacy and cannot access private content.' },
    { q: 'Is it legal to copy tags?', a: 'Yes, tags are public metadata. However, you should also create original content rather than just copying someone else\'s exact video idea.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our YouTube Tags Extractor</h2>
          <p className={styles.paragraph}>
            If you want your YouTube videos to rank higher, you need to use the right keywords. Finding those keywords can be difficult without expensive SEO software.
          </p>
          <p className={styles.paragraph}>
            Our tool simplifies the process. Just paste the URL of a top-ranking video in your niche, and we will instantly extract all the tags they used so you can optimize your own content.
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
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, i) => (
              <li key={i} className={styles.stepItem}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </li>
            ))}
          </ol>
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

export default YoutubeTagsExtractorInfo;
