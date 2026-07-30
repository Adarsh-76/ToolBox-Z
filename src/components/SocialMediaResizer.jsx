import React, { useState, useRef } from 'react';
import styles from './SocialMediaResizer.module.css';

const presets = [
  { name: 'Instagram Square Post (1080x1080)', w: 1080, h: 1080 },
  { name: 'Instagram Portrait Post (1080x1350)', w: 1080, h: 1350 },
  { name: 'Instagram Story / Reel (1080x1920)', w: 1080, h: 1920 },
  { name: 'Facebook Post (1200x630)', w: 1200, h: 630 },
  { name: 'Facebook Cover (820x312)', w: 820, h: 312 },
  { name: 'Twitter Post (1200x675)', w: 1200, h: 675 },
  { name: 'Twitter Header (1500x500)', w: 1500, h: 500 },
  { name: 'YouTube Thumbnail (1280x720)', w: 1280, h: 720 },
];

const SocialMediaResizer = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [preset, setPreset] = useState(presets[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const img = new Image();
    img.onload = () => {
      setImageInfo({ name: file.name, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo(null);
    document.getElementById('socialResizeInput').value = '';
  };

  // Draw image onto canvas with "cover" effect
  const drawImageCover = (ctx, img, x, y, w, h) => {
    const imgRatio = img.width / img.height;
    const cellRatio = w / h;
    let sx, sy, sw, sh;

    if (imgRatio > cellRatio) {
      sh = img.height;
      sw = sh * cellRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / cellRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  };

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = preset.w;
    canvas.height = preset.h;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#FFFFFF"; // White background for transparent PNGs
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawImageCover(ctx, img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `social_${preset.w}x${preset.h}.png`;
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
            id="socialResizeInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="socialResizeInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>📱</span>
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
              <img ref={imgRef} src={image} alt="preview" className={styles.previewImg} />
            </div>
            
            {imageInfo && (
              <div className={`liquid-glass ${styles.infoCard}`}>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>File:</span>
                  <span className={styles.infoVal}>{imageInfo.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Original Dimensions:</span>
                  <span className={styles.infoVal}>{imageInfo.width} x {imageInfo.height} px</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Platform Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Select Platform & Size</label>
                <select 
                  value={preset.name} 
                  onChange={(e) => setPreset(presets.find(p => p.name === e.target.value))}
                  className={styles.selectDropdown}
                >
                  {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              <div className={styles.dimBox}>
                <h3 className={styles.dimTitle}>Target Dimensions:</h3>
                <p className={styles.dimText}>{preset.w} x {preset.h} px</p>
              </div>

              <p className={styles.hint}>
                The image will be automatically cropped and scaled to perfectly fit these dimensions.
              </p>

              <div className={styles.spacer}></div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Resize & Download PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaResizer;
