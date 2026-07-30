import React, { useState, useRef } from 'react';
import styles from './ImageRotator.module.css';

const ImageRotator = () => {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setRotation(0);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setRotation(0);
    document.getElementById('rotateInput').value = '';
  };

  const rotateLeft = () => setRotation(prev => prev - 90);
  const rotateRight = () => setRotation(prev => prev + 90);

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Swap width and height if rotation is 90 or 270 degrees
    if (Math.abs(rotation) % 180 === 90) {
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalWidth;
    } else {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    // Move to center, rotate, draw image
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_rotated.png`;
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
            id="rotateInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="rotateInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🔄</span>
            <span>Select Image to Rotate</span>
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
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Rotation Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.quickRotations}>
                <button className={styles.rotateBtn} onClick={rotateLeft}>
                  ↩️ Rotate 90° Left
                </button>
                <button className={styles.rotateBtn} onClick={rotateRight}>
                  ↪️ Rotate 90° Right
                </button>
              </div>

              <div className={styles.controlRow}>
                <label>Fine Tune: <span className={styles.val}>{rotation}°</span></label>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  value={rotation} 
                  onChange={(e) => setRotation(parseInt(e.target.value))} 
                  className={styles.slider}
                />
                <button className={styles.resetBtn} onClick={() => setRotation(0)}>
                  Reset to 0°
                </button>
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Download Rotated PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageRotator;
