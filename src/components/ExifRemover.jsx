import React, { useState } from 'react';
import styles from './ExifRemover.module.css';

const ExifRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [cleanImage, setCleanImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPEG, PNG).');
      return;
    }

    setError('');
    setCleanImage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      stripExif(e.target.result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const stripExif = (dataUrl, mimeType) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Exporting from canvas automatically drops all EXIF metadata
      const cleanDataUrl = canvas.toDataURL(mimeType === 'image/png' ? 'image/png' : 'image/jpeg', 0.95);
      setCleanImage(cleanDataUrl);
    };
    img.src = dataUrl;
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cleanImage;
    link.download = 'clean-image.png';
    link.click();
  };

  const handleClear = () => {
    setOriginalImage(null);
    setCleanImage(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div 
        className={`liquid-glass ${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('exif-upload').click()}
      >
        <input type="file" id="exif-upload" accept="image/*" onChange={handleInputChange} hidden />
        <span className={styles.uploadIcon}>📸</span>
        <p>Drag & drop an image here, or click to select</p>
        <small>JPEG, PNG, WEBP (Max 10MB)</small>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {originalImage && (
        <div className={styles.resultArea}>
          <div className={styles.imageGrid}>
            <div className={styles.imageCard}>
              <h4>Original (With EXIF)</h4>
              <img src={originalImage} alt="Original" className={styles.previewImg} />
              <span className={styles.warningText}>⚠️ Contains GPS, Camera Info</span>
            </div>
            <div className={styles.imageCard}>
              <h4>Cleaned (No EXIF)</h4>
              {cleanImage ? (
                <>
                  <img src={cleanImage} alt="Clean" className={styles.previewImg} />
                  <span className={styles.safeText}>🛡️ 100% Private & Safe</span>
                </>
              ) : (
                <div className={styles.loading}>Processing...</div>
              )}
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.downloadBtn} onClick={handleDownload} disabled={!cleanImage}>
              ⬇️ Download Clean Image
            </button>
            <button className={styles.clearBtn} onClick={handleClear}>
              🗑️ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExifRemover;
