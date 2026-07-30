import React, { useState, useRef } from 'react';
import styles from './ImageToJpgConverter.module.css';

const ImageToJpgConverter = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [quality, setQuality] = useState(100);
  const [progressive, setProgressive] = useState(true);
  const [maxWidth, setMaxWidth] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [optimizeSize, setOptimizeSize] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setResultUrl(null);
    setResultInfo(null);

    const img = new Image();
    img.onload = () => {
      setImageInfo({
        name: file.name,
        type: file.type,
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: formatFileSize(file.size)
      });
      setMaxWidth(img.naturalWidth);
      setMaxHeight(img.naturalHeight);
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo(null);
    setResultUrl(null);
    setResultInfo(null);
    document.getElementById('imgToJpgInput').value = '';
  };

  const handleConvert = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const origW = img.naturalWidth;
    const origH = img.naturalHeight;
    
    let targetW = parseInt(maxWidth) || origW;
    let targetH = parseInt(maxHeight) || origH;

    if (maintainAspect) {
      const ratio = origW / origH;
      if (targetW / targetH > ratio) {
        targetW = Math.round(targetH * ratio);
      } else {
        targetH = Math.round(targetW / ratio);
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');

    // White background for JPG (no transparency)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetW, targetH);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetW, targetH);

    // If optimize size is checked, cap quality at 80%
    const finalQuality = optimizeSize ? Math.min(quality / 100, 0.8) : quality / 100;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultInfo({
        width: targetW,
        height: targetH,
        size: formatFileSize(blob.size),
        quality: quality
      });
      setIsProcessing(false);
    }, 'image/jpeg', finalQuality);
  };

  const handleReset = () => {
    setQuality(100);
    setProgressive(true);
    setOptimizeSize(false);
    setMaintainAspect(true);
    if (imageInfo) {
      setMaxWidth(imageInfo.width);
      setMaxHeight(imageInfo.height);
    }
    setResultUrl(null);
    setResultInfo(null);
  };

  return (
    <div className={styles.container}>
      {!image ? (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="imgToJpgInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="imgToJpgInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>📁</span>
            <span>Upload Image</span>
            <span className={styles.hint}>Drop file here or click to upload</span>
          </label>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Image Preview</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>✖️ Remove</button>
            </div>
            
            <div className={`liquid-glass ${styles.imagePreviewWrapper}`}>
              <img ref={imgRef} src={image} alt="preview" className={styles.previewImg} />
            </div>
            
            {imageInfo && (
              <div className={styles.infoBar}>
                {imageInfo.width} × {imageInfo.height} pixels • {imageInfo.size} • {imageInfo.type}
              </div>
            )}
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Conversion Options</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Quality: <span className={styles.val}>{quality}%</span></label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))} 
                  className={styles.slider}
                />
              </div>

              <div className={styles.toggleRow} onClick={() => setProgressive(!progressive)}>
                <div className={`${styles.toggleSwitch} ${progressive ? styles.toggleOn : ''}`}>
                  <div className={styles.toggleKnob}></div>
                </div>
                <span>JPG Format: {progressive ? 'Progressive (Better for web)' : 'Baseline (Standard)'}</span>
              </div>

              <div className={styles.dimRow}>
                <div className={styles.dimGroup}>
                  <label>Max Width (px)</label>
                  <input 
                    type="number" 
                    value={maxWidth} 
                    onChange={(e) => setMaxWidth(e.target.value)} 
                    className={styles.dimInput}
                  />
                </div>
                <div className={styles.dimGroup}>
                  <label>Max Height (px)</label>
                  <input 
                    type="number" 
                    value={maxHeight} 
                    onChange={(e) => setMaxHeight(e.target.value)} 
                    className={styles.dimInput}
                  />
                </div>
              </div>

              <div className={styles.toggleRow} onClick={() => setMaintainAspect(!maintainAspect)}>
                <div className={`${styles.toggleSwitch} ${maintainAspect ? styles.toggleOn : ''}`}>
                  <div className={styles.toggleKnob}></div>
                </div>
                <span>Maintain Aspect Ratio</span>
              </div>

              <div className={styles.toggleRow} onClick={() => setOptimizeSize(!optimizeSize)}>
                <div className={`${styles.toggleSwitch} ${optimizeSize ? styles.toggleOn : ''}`}>
                  <div className={styles.toggleKnob}></div>
                </div>
                <span>Optimize File Size (Caps quality at 80%)</span>
              </div>

              <div className={styles.actionRow}>
                <button className={styles.convertBtn} onClick={handleConvert} disabled={isProcessing}>
                  {isProcessing ? '⏳ Converting...' : 'Convert to JPG'}
                </button>
                <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {resultUrl && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Conversion Result</h3>
          <div className={styles.resultPreview}>
            <img src={resultUrl} alt="Result Preview" className={styles.previewImg} />
          </div>
          <div className={styles.successBar}>
            JPG converted successfully • {resultInfo.width} × {resultInfo.height} pixels • Quality: {resultInfo.quality}% • {resultInfo.size}
          </div>
          <a href={resultUrl} download={`converted_${Date.now()}.jpg`} className={styles.downloadBtn}>
            ⬇️ Download JPG
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageToJpgConverter;
