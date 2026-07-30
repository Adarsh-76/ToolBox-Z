import React, { useState } from 'react';
import styles from './LoremIpsumGenerator.module.css';

const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const generateSentence = () => {
  const sentenceLength = Math.floor(Math.random() * 10) + 8; // 8-17 words
  let sentence = [];
  for (let i = 0; i < sentenceLength; i++) {
    sentence.push(getRandomWord());
  }
  let str = sentence.join(" ");
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
};

const generateParagraph = () => {
  const paragraphLength = Math.floor(Math.random() * 4) + 4; // 4-7 sentences
  let paragraph = [];
  for (let i = 0; i < paragraphLength; i++) {
    paragraph.push(generateSentence());
  }
  return paragraph.join(" ");
};

const LoremIpsumGenerator = () => {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let result = [];
    for (let i = 0; i < count; i++) {
      if (type === 'paragraphs') result.push(generateParagraph());
      else if (type === 'sentences') result.push(generateSentence());
      else if (type === 'words') result.push(getRandomWord());
    }
    
    // Join based on type
    let finalText = '';
    if (type === 'paragraphs') finalText = result.join("\n\n");
    else if (type === 'sentences') finalText = result.join(" ");
    else if (type === 'words') finalText = result.join(" ");
    
    setOutput(finalText);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!output) return;
    
    // Fallback for non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = output;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
      alert('Failed to copy. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>Lorem Ipsum Generator</h3>
        
        <div className={styles.inputGroup}>
          <label>Type:</label>
          <div className={styles.typeSelector}>
            <button className={`${styles.typeBtn} ${type === 'paragraphs' ? styles.typeActive : ''}`} onClick={() => setType('paragraphs')}>Paragraphs</button>
            <button className={`${styles.typeBtn} ${type === 'sentences' ? styles.typeActive : ''}`} onClick={() => setType('sentences')}>Sentences</button>
            <button className={`${styles.typeBtn} ${type === 'words' ? styles.typeActive : ''}`} onClick={() => setType('words')}>Words</button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Amount:</label>
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))} 
            className={styles.numberInput}
          />
        </div>

        <button className={styles.generateBtn} onClick={handleGenerate}>
          ✨ Generate Text
        </button>
      </div>

      {output && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.resultHeader}>
            <h3 className={styles.resultTitle}>Generated Text</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✅ Copied!' : '📋 Copy Text'}
            </button>
          </div>
          <div className={styles.outputBox}>
            <pre className={styles.outputText}>{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoremIpsumGenerator;
