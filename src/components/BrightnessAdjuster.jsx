import React, { useState, useRef } from 'react';
import styles from './BrightnessAdjuster.module.css';

const BrightnessAdjuster = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const handleRemoveImage = () => {
    setImage(null);
    document.getElementById('brightInput').value = '';
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const filterStyle = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

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
      link.download = `toolverse_adjusted.png`;
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
            id="brightInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="brightInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🔆</span>
            <span>Select Image to Adjust</span>
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
              <label className={styles.paneLabel}>Adjustments</label>
              <button className={styles.resetBtn} onClick={handleReset}>
                🔄 Reset All
              </button>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Brightness: <span className={styles.val}>{brightness}%</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))} 
                  className={styles.slider}
                />
              </div>

              <div className={styles.controlRow}>
                <label>Contrast: <span className={styles.val}>{contrast}%</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))} 
                  className={styles.slider}
                />
              </div>

              <div className={styles.controlRow}>
                <label>Saturation: <span className={styles.val}>{saturation}%</span></label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={saturation} 
                  onChange={(e) => setSaturation(parseInt(e.target.value))} 
                  className={styles.slider}
                />
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Download Adjusted PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrightnessAdjuster;
