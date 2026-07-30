import React, { useState, useRef, useEffect } from 'react';
import styles from './ImageCompressor.module.css';

const ImageCompressor = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [quality, setQuality] = useState(0.8); // Default 80% quality
  const [estSize, setEstSize] = useState('Calculating...');
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
    
    const img = new Image();
    img.onload = () => {
      setImageInfo({
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo(null);
    setEstSize('Calculating...');
    document.getElementById('compressInput').value = '';
  };

  // Calculate expected compressed size whenever image or quality changes
  useEffect(() => {
    if (!image || !imgRef.current || !imageInfo) return;
    
    const img = imgRef.current;
    if (!img.complete) return;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Use JPEG for compression as PNG doesn't support quality loss
    canvas.toBlob((blob) => {
      if (blob) {
        setEstSize(formatFileSize(blob.size));
      }
    }, 'image/jpeg', quality);

  }, [image, quality, imageInfo]);

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    
    // White background for JPEG (in case original had transparency)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_compressed.jpg`;
      link.click();
      setIsProcessing(false);
    }, 'image/jpeg', quality);
  };

  // Calculate savings percentage
  const savings = imageInfo && estSize !== 'Calculating...' ? 
    Math.max(0, Math.round((1 - (parseFloat(estSize) / imageInfo.sizeBytes)) * 100)) : 0;

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="compressInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="compressInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🗜️</span>
            <span>Select Image to Compress</span>
          </label>
        </div>
      )}

      {image && imageInfo && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Original Preview & Details</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>
                🗑️ Remove Image
              </button>
            </div>
            
            <div className={`liquid-glass ${styles.imagePreviewWrapper}`}>
              <img ref={imgRef} src={image} alt="preview" className={styles.previewImg} />
            </div>
            
            <div className={`liquid-glass ${styles.infoCard}`}>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>File Name:</span>
                <span className={styles.infoVal}>{imageInfo.name}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Original Format:</span>
                <span className={styles.infoVal}>{imageInfo.type}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Resolution:</span>
                <span className={styles.infoVal}>{imageInfo.width} x {imageInfo.height} px</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Original Size:</span>
                <span className={styles.infoVal}>{imageInfo.size}</span>
              </div>
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Compression Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Quality Level: <span className={styles.qualityVal}>{Math.round(quality * 100)}%</span></label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <p className={styles.hint}>Lower quality = smaller file size. (80% is usually perfect)</p>
              </div>

              <div className={styles.sizeComparison}>
                <div className={styles.sizeBox}>
                  <span className={styles.sizeLabel}>Original</span>
                  <span className={styles.sizeNum}>{imageInfo.size}</span>
                </div>
                <span className={styles.arrow}>➔</span>
                <div className={`${styles.sizeBox} ${styles.compressedBox}`}>
                  <span className={styles.sizeLabel}>Compressed</span>
                  <span className={styles.sizeNum}>{estSize}</span>
                </div>
              </div>

              {savings > 0 && (
                <div className={styles.savingsBadge}>🎉 You save {savings}% file size!</div>
              )}

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Compressing...' : '⬇️ Compress & Download JPEG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
