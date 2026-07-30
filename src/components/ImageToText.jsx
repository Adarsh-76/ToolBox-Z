import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import styles from './ImageToText.module.css';

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setText('');
    setProgress(0);
  };

  const extractText = async () => {
    if (!image) return;
    setIsProcessing(true);
    setText('');
    setProgress(0);

    try {
      const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      });
      setText(result.data.text);
    } catch (err) {
      setText('Error extracting text. Please try another image.');
    }
    setIsProcessing(false);
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          id="ocrInput" 
          className={styles.hiddenInput}
        />
        <label htmlFor="ocrInput" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>🖼️</span>
          <span>Select Image with Text</span>
        </label>
      </div>

      {image && (
        <div className={styles.previewRow}>
          <div className={styles.imageWrapper}>
            <img src={image} alt="Selected" className={styles.previewImg} />
          </div>
          <button className={styles.extractBtn} onClick={extractText} disabled={isProcessing}>
            {isProcessing ? `⏳ Scanning... ${progress}%` : '🔍 Extract Text'}
          </button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {text && (
        <div className={`liquid-glass ${styles.outputArea}`}>
          <div className={styles.outputHeader}>
            <h3 className={styles.outputTitle}>Extracted Text</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {isCopied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <textarea 
            className={styles.textarea}
            value={text}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default ImageToText;
