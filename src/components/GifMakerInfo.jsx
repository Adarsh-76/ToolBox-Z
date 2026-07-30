import React, { useState } from 'react';
import styles from './GifMakerInfo.module.css';
import Reveal from './Reveal';

const GifMakerInfo = () => {
  const features = [
    { icon: '🎞️', title: 'Multi-Image Compilation', desc: 'Easily combine multiple images into a single, seamless animated GIF.' },
    { icon: '⏱️', title: 'Custom Frame Speed', desc: 'Adjust the frame delay slider to control exactly how fast or slow your GIF plays.' },
    { icon: '🔀', title: 'Easy Reordering', desc: 'Drag and rearrange frames easily using the intuitive arrow buttons before generating.' },
    { icon: '⚡', title: 'Fast Client-Side Generation', desc: 'Uses the high-performance gifenc library to compile your GIF instantly in the browser.' },
    { icon: '🔒', title: '100% Private', desc: 'Your images are processed locally. No data is ever uploaded to a server.' },
    { icon: '🆓', title: 'Completely Free', desc: 'Create unlimited GIFs with no watermarks, sign-ups, or hidden fees.' }
  ];

  const useCases = [
    'Creating memes',
    'Designing web banners',
    'Making micro-animations',
    'Compiling photo bursts',
    'Building UI loading states',
    'Creating social media content'
  ];

  const faqs = [
    { q: 'What is a GIF?', a: 'A GIF (Graphics Interchange Format) is an image file that supports animation. It loops continuously, making it perfect for short, soundless animations on the web.' },
    { q: 'How do I control the speed of the GIF?', a: 'Use the "Frame Delay" slider. A lower number (e.g., 50ms) makes the GIF play very fast, while a higher number (e.g., 500ms) makes it play slower.' },
    { q: 'Are my images uploaded to a server?', a: 'No. This tool runs entirely in your browser using the gifenc WebAssembly library. Your images never leave your device.' },
    { q: 'Is there a limit to how many images I can use?', a: 'There is no hard limit, but because the GIF is generated in your browser, using dozens of high-resolution images may slow down your device temporarily.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our GIF Maker</h2>
          <p className={styles.paragraph}>
            GIFs are the universal language of the internet. Whether you are making a meme, a tutorial, or a micro-animation, our GIF Maker makes the process effortless.
          </p>
          <p className={styles.paragraph}>
            Simply upload your sequence of images, arrange them in the desired order, set your frame delay, and hit generate. The tool compiles the GIF locally in your browser, ensuring maximum privacy and instant results.
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

export default GifMakerInfo;
