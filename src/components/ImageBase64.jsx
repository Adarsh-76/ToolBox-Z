import React, { useState } from 'react';
import styles from './ImageBase64.module.css';

const ImageBase64 = () => {
  const [mode, setMode] = useState('encode');
  const [base64String, setBase64String] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      setBase64String(reader.result);
      setImagePreview(reader.result);
    };
    reader.onerror = () => setError('Failed to read file.');
    reader.readAsDataURL(file);
  };

  const handleDecode = () => {
    setError('');
    if (!base64String) return;
    
    // Basic validation to see if it's a valid image base64 string
    if (!base64String.startsWith('data:image/')) {
      setError('Invalid Base64 string. It must start with "data:image/..."');
      setImagePreview('');
      return;
    }
    setImagePreview(base64String);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imagePreview;
    link.download = 'decoded-image.png';
    link.click();
  };

  const handleClear = () => {
    setBase64String('');
    setImagePreview('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.modeToggle}>
        <button className={`${styles.modeBtn} ${mode === 'encode' ? styles.active : ''}`} onClick={() => { setMode('encode'); handleClear(); }}>Image → Base64</button>
        <button className={`${styles.modeBtn} ${mode === 'decode' ? styles.active : ''}`} onClick={() => { setMode('decode'); handleClear(); }}>Base64 → Image</button>
      </div>

      <div className={`liquid-glass ${styles.inputArea}`}>
        {mode === 'encode' ? (
          <div className={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleFileUpload} id="img-upload" hidden />
            <label htmlFor="img-upload" className={styles.uploadLabel}>📁 Choose Image</label>
            <p>Upload an image to instantly generate its Base64 string.</p>
          </div>
        ) : (
          <div className={styles.decodeBox}>
            <textarea
              className={styles.textarea}
              placeholder="Paste Base64 string here (e.g., data:image/png;base64,...)"
              value={base64String}
              onChange={(e) => setBase64String(e.target.value)}
            />
            <button className={styles.decodeBtn} onClick={handleDecode}>🔍 Decode Image</button>
          </div>
        )}
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {base64String && mode === 'encode' && (
        <div className={`liquid-glass ${styles.outputArea}`}>
          <h3>Base64 String</h3>
          <textarea className={styles.outputText} value={base64String} readOnly />
          <div className={styles.buttonRow}>
            <button className={styles.copyBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy String'}</button>
            <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
          </div>
        </div>
      )}

      {imagePreview && (
        <div className={`liquid-glass ${styles.previewArea}`}>
          <h3>Image Preview</h3>
          <div className={styles.previewWrapper}>
            <img src={imagePreview} alt="Preview" className={styles.previewImg} />
          </div>
          {mode === 'decode' && (
            <div className={styles.buttonRow}>
              <button className={styles.downloadBtn} onClick={handleDownload}>⬇️ Download Image</button>
              <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageBase64;
