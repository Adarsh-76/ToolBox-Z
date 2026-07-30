import React, { useState } from 'react';
import styles from './IpLookupInfo.module.css';
import Reveal from './Reveal';

const IpLookupInfo = () => {
  const features = [
    { icon: '🌍', title: 'Global Geolocation', desc: 'Pinpoint the physical location of any IP address, including country, region, and city.' },
    { icon: '📡', title: 'ISP & ASN Details', desc: 'Identify the Internet Service Provider, organization, and Autonomous System Number.' },
    { icon: '🗺️', title: 'Interactive Maps', desc: 'Instantly view the approximate location of the IP on a global map.' },
    { icon: '🕒', title: 'Timezone Data', desc: 'Get the exact timezone and UTC offset for the IP address location.' },
    { icon: '🔗', title: 'IPv4 & IPv6 Support', desc: 'Fully compatible with both legacy 32-bit IPv4 and modern 128-bit IPv6 addresses.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited IP lookups with no API keys, fees, or sign-ups required.' }
  ];

  const useCases = [
    'Debugging network routing issues',
    'Investigating suspicious login attempts',
    'Blocking malicious traffic by region',
    'Setting up geo-targeted redirects',
    'Verifying VPN or proxy locations',
    'Learning about network infrastructure'
  ];

  const faqs = [
    { q: 'How accurate is IP geolocation?', a: "IP geolocation is highly accurate for country and region-level data (often 99%+). City-level accuracy varies depending on the ISP, typically ranging from 50% to 80%. It provides the location of the ISP's hub, not the exact house." },
    { q: 'Can I find someone\'s exact address with this?', a: "No. IP addresses do not contain personal address information. They point to the Internet Service Provider's regional hub. You need legal authority to request a user's exact address from their ISP." },
    { q: 'Does this tool work with IPv6?', a: "Yes! This tool fully supports both IPv4 (e.g., 192.168.1.1) and IPv6 (e.g., 2001:db8::1) addresses." },
    { q: 'Are my lookups logged or tracked?', a: "No. The requests are made directly from your browser to a free public API. We do not log or store the IP addresses you search." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our IP Address Lookup Tool</h2>
          <p className={styles.paragraph}>
            Every device connected to the internet has an IP address. Whether you are investigating a suspicious login, debugging a network issue, or just curious where a website is hosted, an IP lookup tool is essential.
          </p>
          <p className={styles.paragraph}>
            Our tool instantly queries global databases to retrieve the geolocation, ISP, and network details for any IPv4 or IPv6 address.
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

export default IpLookupInfo;
