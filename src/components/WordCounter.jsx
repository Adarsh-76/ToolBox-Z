import React, { useState } from 'react';
import styles from './WordCounter.module.css';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Calculate stats
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length;
  const readTime = Math.ceil(words / 200); // Assuming 200 words per minute

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // Reset the button text back to "Copy Text" after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={`liquid-glass ${styles.statBox}`}>
          <h3>{words}</h3>
          <p>Words</p>
        </div>
        <div className={`liquid-glass ${styles.statBox}`}>
          <h3>{characters}</h3>
          <p>Characters</p>
        </div>
        <div className={`liquid-glass ${styles.statBox}`}>
          <h3>{sentences}</h3>
          <p>Sentences</p>
        </div>
        <div className={`liquid-glass ${styles.statBox}`}>
          <h3>{readTime} min</h3>
          <p>Read Time</p>
        </div>
      </div>

      <div className={`liquid-glass ${styles.textAreaWrapper}`}>
        <textarea 
          className={styles.textarea}
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className={styles.buttonRow}>
        <button 
          className={`${styles.actionBtn} ${isCopied ? styles.copied : ''}`}
          onClick={handleCopy}
          disabled={!text}
        >
          {isCopied ? '✅ Copied!' : '📋 Copy Text'}
        </button>

        {text && (
          <button 
            className={`${styles.actionBtn} ${styles.clearBtn}`} 
            onClick={() => setText('')}
          >
            🗑️ Clear Text
          </button>
        )}
      </div>
    </div>
  );
};

export default WordCounter;
