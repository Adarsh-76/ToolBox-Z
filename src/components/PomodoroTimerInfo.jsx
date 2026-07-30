import React, { useState } from 'react';
import styles from './PomodoroTimerInfo.module.css';
import Reveal from './Reveal';

const PomodoroTimerInfo = () => {
  const features = [
    { icon: '⏱️', title: 'Classic Intervals', desc: '25 minutes of focus followed by a 5-minute break to keep your mind fresh.' },
    { icon: '🔄', title: 'Automatic Phases', desc: 'The timer automatically switches between focus and break modes for you.' },
    { icon: '🧘', title: 'Long Breaks', desc: 'After 4 focus cycles, you earn a 15-minute long break to fully recharge.' },
    { icon: '🔔', title: 'Audio Alerts', desc: 'A gentle beep plays when the timer ends, so you don\'t have to watch the screen.' },
    { icon: '⭕', title: 'Visual Progress', desc: 'A beautiful circular progress ring shows exactly how much time is left.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Boost your productivity with no ads, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Studying for exams',
    'Deep coding sessions',
    'Writing essays or blogs',
    'Cleaning and organizing',
    'Reading books',
    'Avoiding social media burnout'
  ];

  const faqs = [
    { q: 'What is the Pomodoro Technique?', a: 'It is a time management method that uses a timer to break work into 25-minute intervals separated by 5-minute breaks. It helps prevent mental fatigue and maintains high focus.' },
    { q: 'How long should I work for?', a: 'The classic method uses 25 minutes of work. However, some people prefer 50-minute work intervals with 10-minute breaks. You can use the tabs to manually switch phases if you prefer.' },
    { q: 'When do I get a long break?', a: 'After you complete 4 "Focus" cycles, the timer will automatically switch to a 15-minute Long Break.' },
    { q: 'Does the timer work if I close the tab?', a: 'No, the timer runs in the browser tab. If you close or refresh the page, the current session will reset. Keep the tab open while you work!' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Pomodoro Timer</h2>
          <p className={styles.paragraph}>
            Procrastination and mental fatigue are the biggest enemies of productivity. The Pomodoro Technique solves this by breaking your work into manageable, highly focused sprints.
          </p>
          <p className={styles.paragraph}>
            Our timer automates the entire process. Just hit "Start", focus on your task, and the tool will tell you exactly when it's time to rest.
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

export default PomodoroTimerInfo;
