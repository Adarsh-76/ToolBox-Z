import React, { useState, useRef } from 'react';
import styles from './ImageResizer.module.css';

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const img = new Image();
    img.onload = () => {
      setOriginalDims({ w: img.naturalWidth, h: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setOriginalDims({ w: 0, h: 0 });
    document.getElementById('resizeInput').value = '';
  };

  const handleWidthChange = (e) => {
    let val = parseInt(e.target.value) || 0;
    setWidth(val);
    if (maintainAspect && originalDims.w > 0) {
      setHeight(Math.round((val / originalDims.w) * originalDims.h));
    }
  };

  const handleHeightChange = (e) => {
    let val = parseInt(e.target.value) || 0;
    setHeight(val);
    if (maintainAspect && originalDims.h > 0) {
      setWidth(Math.round((val / originalDims.h) * originalDims.w));
    }
  };

  const handleDownload = () => {
    if (!image || !imgRef.current || width === 0 || height === 0) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // High-quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_resized_${width}x${height}.png`;
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
            id="resizeInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="resizeInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>📐</span>
            <span>Select Image to Resize</span>
          </label>
        </div>
      )}

      {image && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Original Preview</label>
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
              />
            </div>
            
            <div className={`liquid-glass ${styles.infoCard}`}>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Original Dimensions:</span>
                <span className={styles.infoVal}>{originalDims.w} x {originalDims.h} px</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Aspect Ratio:</span>
                <span className={styles.infoVal}>{(originalDims.w / originalDims.h).toFixed(2)} : 1</span>
              </div>
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Resize Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>Width (px)</label>
                  <input 
                    type="number" 
                    value={width} 
                    onChange={handleWidthChange}
                    className={styles.numberInput}
                  />
                </div>
                <span className={styles.xIcon}>✖️</span>
                <div className={styles.inputGroup}>
                  <label>Height (px)</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={handleHeightChange}
                    className={styles.numberInput}
                  />
                </div>
              </div>

              <div className={styles.controlRow} onClick={() => setMaintainAspect(!maintainAspect)}>
                <div className={styles.toggleWrapper}>
                  <div className={`${styles.toggleSwitch} ${maintainAspect ? styles.toggleOn : ''}`}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                  <span>{maintainAspect ? '🔗 Aspect Ratio Locked' : '🔓 Aspect Ratio Unlocked'}</span>
                </div>
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing || width === 0 || height === 0}
              >
                {isProcessing ? '⏳ Resizing...' : '⬇️ Resize & Download PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
