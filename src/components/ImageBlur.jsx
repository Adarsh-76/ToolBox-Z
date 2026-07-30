import React, { useState, useRef } from 'react';
import styles from './ImageBlur.module.css';

const ImageBlur = () => {
  const [image, setImage] = useState(null);
  const [blur, setBlur] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setBlur(5);
  };

  const handleRemoveImage = () => {
    setImage(null);
    document.getElementById('blurInput').value = '';
  };

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    // Apply the blur filter to the canvas
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_blurred.png`;
      link.click();
      setIsProcessing(false);
    }, 'image/png', 1.0);
  };

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="blurInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="blurInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🌫️</span>
            <span>Select Image to Blur</span>
          </label>
        </div>
      )}

      {image && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Live Preview</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>
                🗑️ Remove
              </button>
            </div>
            
            <div className={`liquid-glass ${styles.imagePreviewWrapper}`}>
              <img 
                ref={imgRef} 
                src={image} 
                alt="preview" 
                className={styles.previewImg} 
                style={{ filter: `blur(${blur}px)` }}
              />
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Blur Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Blur Intensity: <span className={styles.val}>{blur}px</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={blur} 
                  onChange={(e) => setBlur(parseInt(e.target.value))} 
                  className={styles.slider}
                />
                <p className={styles.hint}>Slide right to increase blur. Great for depth-of-field or censoring.</p>
              </div>

              <button className={styles.resetBtn} onClick={() => setBlur(0)}>
                🔄 Reset (0px)
              </button>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Download Blurred PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlur;
