import React, { useState } from 'react';
import styles from './PdfToTextInfo.module.css';
import Reveal from './Reveal';

const PdfToTextInfo = () => {
  const features = [
    { icon: '📄', title: 'Instant Extraction', desc: 'Pulls all digital text from your PDF documents in milliseconds.' },
    { icon: '📋', title: 'Copy & Download', desc: 'Easily copy the extracted text to your clipboard or download it as a .txt file.' },
    { icon: '🔍', title: 'Scanned PDF Detection', desc: 'Smartly detects if a PDF is scanned (images) and suggests the OCR tool.' },
    { icon: '🔒', title: 'Private & Secure', desc: 'Your documents are processed in real-time and never stored on our servers.' }
  ];
  const faqs = [
    { q: 'Why did I get a "No digital text found" warning?', a: 'This happens when the PDF is essentially a collection of scanned images, not actual text. You need to use an OCR (Optical Character Recognition) tool to read images. We have an "Image to Text" tool perfectly built for this!' },
    { q: 'Is there a file size limit?', a: 'To keep the tool fast and free, we recommend PDFs under 10MB. Very large PDFs might take a few seconds longer to process.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className={styles.infoContainer}>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>About PDF Text Extractor</h2><p className={styles.paragraph}>Need to grab text out of a PDF without copying all the weird formatting? Our tool extracts all raw, digital text instantly.</p></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Key Features</h2><div className={styles.grid}>{features.map((feat, i) => (<div key={i} className={`liquid-glass ${styles.card}`}><span className={styles.cardIcon}>{feat.icon}</span><h3 className={styles.cardTitle}>{feat.title}</h3><p className={styles.cardDesc}>{feat.desc}</p></div>))}</div></section></Reveal>
      <Reveal><section className={styles.section}><h2 className={styles.sectionTitle}>Frequently Asked Questions</h2><div className={styles.faqList}>{faqs.map((faq, i) => (<div key={i} className={`liquid-glass ${styles.faqItem} ${openFaq === i ? styles.active : ''}`} onClick={() => toggleFaq(i)}><div className={styles.faqQ}><h3>{faq.q}</h3><span>{openFaq === i ? '−' : '+'}</span></div><div className={styles.faqAWrapper}><p className={styles.faqA}>{faq.a}</p></div></div>))}</div></section></Reveal>
    </div>
  );
};

export default PdfToTextInfo;
