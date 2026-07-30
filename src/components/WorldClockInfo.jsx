import React, { useState } from 'react';
import styles from './WorldClockInfo.module.css';
import Reveal from './Reveal';

const WorldClockInfo = () => {
  const features = [
    { icon: '🌍', title: 'Global Live Clock', desc: 'See the exact current time in 8 major cities across all continents.' },
    { icon: '🔄', title: 'Instant Conversion', desc: 'Convert your local time to any target timezone in real-time.' },
    { icon: '📅', title: 'Date & Day Display', desc: 'Shows the day of the week and date to prevent crossing days by mistake.' },
    { icon: '⚡', title: 'Real-Time Updates', desc: 'The live clock updates every second without needing to refresh.' },
    { icon: '✈️', title: 'Travel Planning', desc: 'Perfect for scheduling flights, hotel check-ins, and tours.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited conversions with no sign-ups.' }
  ];

  const useCases = [
    'Scheduling international Zoom meetings',
    'Coordinating with remote teams',
    'Booking flights across timezones',
    'Calling family abroad without waking them up',
    'Tracking global stock market hours',
    'Planning multi-city travel itineraries'
  ];

  const faqs = [
    { q: 'How does the timezone converter work?', a: "You input your desired local time using the date/time picker, select a target city from the dropdown, and the tool instantly calculates and displays the corresponding time in that city using standard IANA timezone databases." },
    { q: 'Why do I need a timezone converter?', a: "Timezones are confusing, especially when daylight saving time changes. A converter ensures you never miss an international meeting or call a contact at 3 AM by accident." },
    { q: 'Does it account for Daylight Saving Time (DST)?', a: "Yes! The tool uses your browser's native Intl API, which automatically accounts for DST changes in different regions around the world." },
    { q: 'Is the live clock accurate?', a: "Yes, it syncs directly with your device's system clock, which is kept accurate via internet time servers (NTP)." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our World Clock & Timezone Converter</h2>
          <p className={styles.paragraph}>
            In our globalized world, coordinating with people across different time zones is a daily reality. Whether you are managing a remote team, calling family overseas, or booking travel, knowing the exact time in another city is essential.
          </p>
          <p className={styles.paragraph}>
            Our tool provides a live, ticking clock for 8 major global cities, alongside an instant converter to map your local time to any target timezone.
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

export default WorldClockInfo;
