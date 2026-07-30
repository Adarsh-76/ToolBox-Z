import React, { useState } from 'react';
import styles from './SpeechToolInfo.module.css';
import Reveal from './Reveal';

const SpeechToolInfo = () => {
  const features = [
    { icon: '🔊', title: 'Text to Speech', desc: 'Listen to your text read aloud in natural-sounding voices.' },
    { icon: '🎙️', title: 'Speech to Text', desc: 'Dictate using your microphone and instantly convert it to text.' },
    { icon: '🌐', title: 'Multiple Languages', desc: 'Supports dozens of languages and regional dialects for both TTS and STT.' },
    { icon: '⚡', title: 'Instant Processing', desc: 'All processing happens locally in your browser. No uploads required.' },
    { icon: '📋', title: 'One-Click Copy', desc: 'Easily copy your transcribed text to your clipboard.' },
    { icon: '🔒', title: '100% Private', desc: 'Your voice and text never leave your device. No server tracking.' }
  ];

  const useCases = [
    'Accessibility for visually impaired users',
    'Transcribing meetings or lectures',
    'Proofreading written work by listening',
    'Practicing language pronunciation',
    'Creating voiceovers for videos',
    'Hands-free typing'
  ];

  const faqs = [
    { q: 'Why isn\'t Speech to Text working?', a: 'Speech Recognition requires the Google Chrome browser. It also requires you to grant microphone permissions when prompted. Ensure you are not on private/incognito mode.' },
    { q: 'Can I download the audio file?', a: 'Currently, the Text to Speech tool plays the audio live in your browser. Downloading as an MP3 is a feature we plan to add in the future.' },
    { q: 'Does it support my language?', a: 'It supports almost all major languages. For Text to Speech, you can select the language in the voice dropdown. For Speech to Text, it defaults to English (US) but can be configured in browser settings.' },
    { q: 'Is my voice recorded or saved?', a: 'No. The recognition happens entirely in your browser. Your audio is never uploaded to a server or saved.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our Voice Tools</h2>
          <p className={styles.paragraph}>
            Whether you prefer to read by listening, or type by speaking, our Voice Tools bridge the gap between text and audio. 
          </p>
          <p className={styles.paragraph}>
            The Text to Speech (TTS) engine allows you to hear your documents read aloud in a variety of natural voices. The Speech to Text (STT) engine lets you dictate emails, essays, or notes hands-free. Everything runs instantly and privately in your browser.
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

export default SpeechToolInfo;
