import React, { useState, useRef, useEffect } from 'react';
import styles from './FbCoverResizer.module.css';

const FbCoverResizer = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  // 820x312 is the standard Facebook Cover size
  const targetW = 820;
  const targetH = 312;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const img = new Image();
    img.onload = () => {
      setImageInfo({ name: file.name, width: img.width, height: img.height, size: (file.size / 1024).toFixed(2) + ' KB' });
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo(null);
    document.getElementById('fbCoverInput').value = '';
  };

  // Draw to hidden canvas for HD Download
  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = targetW;
    canvas.height = targetH;
    
    // Fill black background fallback
    ctx.fillStyle = '#1A1B1F';
    ctx.fillRect(0, 0, targetW, targetH);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Cover Fit Algorithm
      const scale = Math.max(targetW / img.width, targetH / img.height);
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const x = (targetW - newWidth) / 2;
      const y = (targetH - newHeight) / 2;
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };
    img.src = image;
  }, [image]);

  const handleDownload = () => {
    setIsProcessing(true);
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'fb_cover_toolboxz.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsProcessing(false);
  };

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {!image ? (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input type="file" accept="image/*" onChange={handleFileChange} id="fbCoverInput" className={styles.hiddenInput} />
          <label htmlFor="fbCoverInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🖼️</span>
            <span>Choose Image</span>
            <span className={styles.hint}>Upload a photo to resize for Facebook</span>
          </label>
        </div>
      ) : (
        <div className={styles.previewArea}>
          {/* Live HTML Preview */}
          <div className={`liquid-glass ${styles.previewCard}`}>
            <h3 className={styles.previewTitle}>Live Preview (820x312)</h3>
            <div className={styles.previewWrapper}>
              <img src={image} alt="FB Cover Preview" className={styles.previewImg} />
            </div>
            
            {imageInfo && (
              <div className={styles.infoBar}>
                <span>Original: {imageInfo.width}x{imageInfo.height}px</span>
                <span>{imageInfo.size}</span>
              </div>
            )}

            <div className={styles.buttonRow}>
              <button className={styles.downloadBtn} onClick={handleDownload} disabled={isProcessing}>
                {isProcessing ? '⏳ Processing...' : '⬇️ Download HD Cover'}
              </button>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>✖️</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FbCoverResizer;
