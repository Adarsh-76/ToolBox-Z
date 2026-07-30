import React, { useState, useRef } from 'react';
import styles from './ImageSharpener.module.css';

const ImageSharpener = () => {
  const [image, setImage] = useState(null);
  const [sharpness, setSharpness] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setSharpness(50);
  };

  const handleRemoveImage = () => {
    setImage(null);
    document.getElementById('sharpenInput').value = '';
  };

  // We map the 0-100 slider to a contrast multiplier (1.0 to 2.5)
  const contrastVal = 1.0 + (sharpness / 100) * 1.5;
  const filterStyle = `contrast(${contrastVal}) saturate(1.1)`;

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    // Apply the exact same CSS filter to the canvas context
    ctx.filter = filterStyle;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_sharpened.png`;
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
            id="sharpenInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="sharpenInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🔪</span>
            <span>Select Image to Sharpen</span>
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
                style={{ filter: filterStyle }}
              />
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Sharpness Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Sharpness: <span className={styles.val}>{sharpness}%</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sharpness} 
                  onChange={(e) => setSharpness(parseInt(e.target.value))} 
                  className={styles.slider}
                />
                <p className={styles.hint}>Slide right to increase clarity and bring out details.</p>
              </div>

              <button className={styles.resetBtn} onClick={() => setSharpness(0)}>
                🔄 Reset (0%)
              </button>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Download Sharpened PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSharpener;
