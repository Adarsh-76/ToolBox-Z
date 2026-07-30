import React, { useState } from 'react';
import styles from './LinkedInSchedulerInfo.module.css';
import Reveal from './Reveal';

const LinkedInSchedulerInfo = () => {
  const features = [
    { icon: '📅', title: 'Plan Ahead', desc: 'Draft your posts and assign specific dates and times for them to go live.' },
    { icon: '📈', title: 'Optimal Timing', desc: 'Get tips on the best days and hours to post for maximum reach.' },
    { icon: '💾', title: 'Save Drafts', desc: 'All scheduled posts are saved locally in your browser so you never lose your ideas.' },
    { icon: '🗑️', title: 'Easy Management', desc: 'Delete or reschedule posts with a single click.' },
    { icon: '⚡', title: 'Instant Saving', desc: 'No waiting. Schedules are saved instantly to your local storage.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Plan unlimited posts with no sign-ups or hidden fees.' }
  ];

  const steps = [
    'Type your LinkedIn post content into the text area.',
    'Select the date and time you want the post to go live.',
    'Click "Schedule Post" to save it to your local dashboard.',
    'Review your scheduled posts in the dashboard below.',
    'Copy your text on the scheduled date and paste it directly into LinkedIn!'
  ];

  const faqs = [
    { q: 'Does this tool post directly to LinkedIn?', a: 'No. Posting directly to LinkedIn requires complex OAuth authentication and API access which is only available to approved developers. This tool acts as a powerful planning dashboard to draft and schedule your content locally.' },
    { q: 'When is the best time to post on LinkedIn?', a: 'Engagement is typically highest Tuesday through Thursday, between 7:30 AM and 9:00 AM, or 12:00 PM and 1:00 PM. Avoid weekends as professional activity drops significantly.' },
    { q: 'Is my post text saved?', a: 'Yes! Everything is saved to your browser\'s local storage. You can close the page, come back later, and your scheduled drafts will still be there.' },
    { q: 'Is this tool free?', a: 'Yes, our LinkedIn Post Scheduler is 100% free to use.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our LinkedIn Scheduler</h2>
          <p className={styles.paragraph}>
            Consistency is key on LinkedIn. Planning your content ahead of time ensures you maintain a steady professional presence without scrambling for ideas at the last minute.
          </p>
          <p className={styles.paragraph}>
            Our Scheduler tool gives you a clean dashboard to draft your posts, assign dates, and track what you have coming up. It also provides valuable insights into the best times to post for B2B engagement.
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

export default LinkedInSchedulerInfo;
