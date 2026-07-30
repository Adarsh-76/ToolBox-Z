import React, { useState, useRef } from 'react';
import styles from './MediaEnhancer.module.css';

const MediaEnhancer = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });
  const [targetQuality, setTargetQuality] = useState('1080p');
  const [canEnhance, setCanEnhance] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const imgRef = useRef(null);

  // Target heights instead of fixed dimensions to preserve aspect ratio
  const qualities = {
    '720p': { h: 720, label: 'HD 720p' },
    '1080p': { h: 1080, label: 'Full HD 1080p' },
    '2K': { h: 1440, label: 'QHD 2K' }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResultUrl(null);
    setCanEnhance(null);

    if (selectedFile.type.startsWith('image/')) {
      setFileType('image');
      const img = new Image();
      img.onload = () => {
        setOriginalDims({ w: img.width, h: img.height });
      };
      img.src = URL.createObjectURL(selectedFile);
    } else if (selectedFile.type.startsWith('video/')) {
      setFileType('video');
      setOriginalDims({ w: 0, h: 0 });
    }
  };

  const checkCompatibility = () => {
    if (!file) return;
    
    if (fileType === 'image') {
      const target = qualities[targetQuality];
      if (originalDims.h >= target.h) {
        setCanEnhance(false);
      } else {
        setCanEnhance(true);
      }
    } else {
      setCanEnhance(true);
    }
  };

  const handleEnhance = () => {
    if (!file) return;
    setIsProcessing(true);

    if (fileType === 'image') {
      const img = imgRef.current;
      const target = qualities[targetQuality];
      
      // Calculate scale to hit target height while keeping aspect ratio
      const scale = target.h / originalDims.h;
      const newWidth = Math.round(originalDims.w * scale);
      const newHeight = target.h;
      
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      
      // High-quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // STRONGER Enhancement filters (Vibrance, Contrast, Brightness)
      ctx.filter = 'contrast(1.2) saturate(1.4) brightness(1.08)';
      
      // Draw image scaled up
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Reset filter for overlay
      ctx.filter = 'none';
      
      // Apply a simulated sharpening overlay (Unsharp Mask effect)
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.3;
      ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      const enhancedUrl = canvas.toDataURL('image/jpeg', 0.95);
      setResultUrl(enhancedUrl);
      setIsProcessing(false);
    } else {
      alert('Video enhancement preview is supported, but browser-based video export requires a backend. Please upload an image to download an enhanced HD file.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={handleFileChange} 
          id="mediaInput" 
          className={styles.hiddenInput}
        />
        <label htmlFor="mediaInput" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>📸</span>
          <span>Select Image or Video</span>
        </label>
      </div>

      {file && (
        <div className={`liquid-glass ${styles.previewArea}`}>
          <div className={styles.fileInfo}>
            <p><strong>File:</strong> {file.name}</p>
            {fileType === 'image' && <p><strong>Original Size:</strong> {originalDims.w} x {originalDims.h}px</p>}
            {fileType === 'video' && <p><strong>Type:</strong> Video (Preview Mode)</p>}
          </div>

          {fileType === 'image' && (
            <img 
              ref={imgRef} 
              src={URL.createObjectURL(file)} 
              alt="source" 
              className={styles.hiddenImg}
            />
          )}
          {fileType === 'video' && (
            <video src={URL.createObjectURL(file)} controls className={styles.previewVideo}></video>
          )}
        </div>
      )}

      {file && (
        <div className={`liquid-glass ${styles.controls}`}>
          <div className={styles.controlRow}>
            <label>Select Target Quality:</label>
            <select 
              value={targetQuality} 
              onChange={(e) => { setTargetQuality(e.target.value); setCanEnhance(null); }}
              className={styles.selectDropdown}
            >
              <option value="720p">HD 720p (Height: 720px)</option>
              <option value="1080p">Full HD 1080p (Height: 1080px)</option>
              <option value="2K">QHD 2K (Height: 1440px)</option>
            </select>
          </div>

          <button className={styles.checkBtn} onClick={checkCompatibility}>
            🔍 Check Compatibility
          </button>

          {canEnhance === false && (
            <div className={styles.errorBox}>
              ❌ Cannot enhance: The original file is already larger than or equal to {targetQuality}. Enhancing would reduce quality.
            </div>
          )}
          {canEnhance === true && (
            <div className={styles.successBox}>
              ✅ Compatibility confirmed! This media can be enhanced to {targetQuality}.
            </div>
          )}

          <button 
            className={styles.enhanceBtn} 
            onClick={handleEnhance} 
            disabled={canEnhance !== true || isProcessing}
          >
            {isProcessing ? '⏳ Enhancing...' : '✨ Enhance Media'}
          </button>
        </div>
      )}

      {resultUrl && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Enhanced Result ({targetQuality})</h3>
          <img src={resultUrl} alt="enhanced" className={styles.resultImg} />
          <a href={resultUrl} download={`enhanced_${targetQuality}.jpg`} className={styles.downloadBtn}>
            ⬇️ Download HD Image
          </a>
        </div>
      )}
    </div>
  );
};

export default MediaEnhancer;
