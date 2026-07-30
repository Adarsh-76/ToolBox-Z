import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import styles from './BackgroundRemover.module.css';

const BackgroundRemover = () => {
  const [image, setImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setResultUrl(null);
    setProgress(0);
  };

  const handleRemove = async () => {
    if (!image) return;
    setIsProcessing(true);
    setResultUrl(null);

    try {
      const blob = await removeBackground(image, {
        progress: (key, current, total) => {
          // Update progress bar when downloading the model
          const percentage = Math.round((current / total) * 100);
          setProgress(percentage);
        }
      });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      console.error('Removal failed:', err);
      alert('Failed to remove background. Please try another image.');
    }
    setIsProcessing(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setResultUrl(null);
    document.getElementById('bgRemoverInput').value = '';
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'toolverse_no_bg.png';
    link.click();
  };

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="bgRemoverInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="bgRemoverInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🪄</span>
            <span>Select Image to Remove Background</span>
          </label>
        </div>
      )}

      {image && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Original Image</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>
                🗑️ Remove
              </button>
            </div>
            <div className={`liquid-glass ${styles.imageWrapper}`}>
              <img src={image} alt="Original" className={styles.previewImg} />
            </div>
            <button 
              className={styles.magicBtn} 
              onClick={handleRemove} 
              disabled={isProcessing}
            >
              {isProcessing ? `⏳ AI Processing... ${progress}%` : '✨ Remove Background'}
            </button>
            {isProcessing && (
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Result (Transparent)</label>
            </div>
            <div className={`liquid-glass ${styles.imageWrapper} ${styles.checkerboard}`}>
              {resultUrl ? (
                <img src={resultUrl} alt="No Background" className={styles.previewImg} />
              ) : (
                <div className={styles.placeholderText}>
                  {isProcessing ? 'Processing...' : 'Your result will appear here'}
                </div>
              )}
            </div>
            {resultUrl && (
              <button className={styles.downloadBtn} onClick={handleDownload}>
                ⬇️ Download HD PNG
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
