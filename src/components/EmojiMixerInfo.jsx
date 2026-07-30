import React, { useState } from 'react';
import styles from './EmojiMixerInfo.module.css';
import Reveal from './Reveal';

const EmojiMixerInfo = () => {
  const features = [
    { icon: '🤖', title: 'AI-Powered Generation', desc: 'Uses advanced AI image models to create completely new, never-before-seen emojis.' },
    { icon: '🧩', title: 'Smart Ingredients', desc: 'Mix and match ingredient buttons to help build the perfect AI prompt.' },
    { icon: '✍️', title: 'Custom Prompts', desc: 'Type any crazy idea you have, like "a robot eating a burger", and watch it come to life.' },
    { icon: '⚡', title: 'Instant Rendering', desc: 'Generates your unique emoji in seconds directly in your browser.' },
    { icon: '📥', title: 'HD PNG Download', desc: 'Download your newly created emoji as a high-quality PNG image with a white background.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Unlimited AI emoji generation with no sign-ups or API keys required.' }
  ];

  const useCases = [
    'Creating custom emojis for Discord or Slack',
    'Designing unique stickers for WhatsApp',
    'Generating fun avatars for social media',
    'Visualizing crazy concepts ("pizza riding a skateboard")',
    'Making custom reaction faces for chats',
    'Just having fun seeing what AI can draw!'
  ];

  const faqs = [
    { q: 'How does the AI generate a new emoji?', a: "We use a free AI image generation API (Pollinations.ai). When you type a prompt or select ingredients, the AI creates a brand new image from scratch based on your description, formatted to look like an emoji." },
    { q: 'Can I use these emojis on my phone?', a: "Yes! You can download the generated image as a PNG file. You can then send it in WhatsApp, iMessage, Discord, or use it as a custom sticker." },
    { q: 'Why did my emoji look weird?', a: "AI image generation is highly creative but sometimes unpredictable. If the result isn't what you wanted, try rephrasing your prompt or clicking Generate again for a new variation!" },
    { q: 'Is this tool free?', a: "Yes! This tool uses a free, open-source AI API and costs absolutely nothing to use. You can generate unlimited emojis." }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our AI Emoji Mixer</h2>
          <p className={styles.paragraph}>
            Standard keyboards only have a limited set of emojis. But what if you want an emoji that doesn't exist? Like a "Cat made of fire" or a "Robot eating pizza"?
          </p>
          <p className={styles.paragraph}>
            Our AI Emoji Mixer uses powerful artificial intelligence to generate completely new emoji images based on your text. Just describe what you want, hit Generate, and download your custom emoji!
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

export default EmojiMixerInfo;
