import React, { useState } from 'react';
import styles from './ImageDescriberInfo.module.css';
import Reveal from './Reveal';

const ImageDescriberInfo = () => {
  const features = [
    { icon: '🧠', title: 'AI Object Detection', desc: 'Uses the MobileNet neural network to identify and tag objects within your image with confidence scores.' },
    { icon: '🎨', title: 'Color Palette Extraction', desc: 'Automatically calculates and extracts the 4 most dominant colors from your image.' },
    { icon: '💡', title: 'Lighting Analysis', desc: 'Determines the overall brightness and mood of the image, from dark and moody to bright and vibrant.' },
    { icon: '📝', title: 'Readable Summaries', desc: 'Combines all data points into a coherent, human-readable paragraph describing the image.' },
    { icon: '🔒', title: '100% Private AI', desc: 'The neural network runs directly in your browser. Your images are never uploaded to a server.' },
    { icon: '⚡', title: 'Fast Processing', desc: 'Optimized to run inference in milliseconds using WebGL acceleration.' }
  ];

  const faqs = [
    { q: 'How does the AI describe the image?', a: 'We use TensorFlow.js with the MobileNet model. It analyzes the pixels, identifies patterns it was trained on, and outputs predictions (tags) with probability scores.' },
    { q: 'Why is the AI sometimes wrong?', a: 'MobileNet is a lightweight model designed to run in the browser. It is very good at recognizing common objects (dogs, cars, cups) but may struggle with abstract concepts or highly specific items.' },
    { q: 'Is this tool free to use?', a: 'Yes! Because the AI runs locally in your browser using your device\'s GPU, we have no server costs. It is 100% free.' },
    { q: 'Does it work on mobile?', a: 'Yes, but analyzing images on older mobile phones may take a few seconds longer as it requires some processing power.' }
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About Our AI Image Describer</h2>
          <p className={styles.paragraph}>
            Computer vision used to require massive servers and expensive API keys. Our Image Describer brings the power of neural networks directly to your browser. 
          </p>
          <p className={styles.paragraph}>
            By leveraging TensorFlow.js, this tool analyzes your image for objects, extracts the dominant color palette, and evaluates the lighting conditions to generate a comprehensive summary. It's perfect for developers testing image datasets, accessibility tools, or just satisfying your curiosity.
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

export default ImageDescriberInfo;
