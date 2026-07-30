import React, { useState, useRef, useEffect } from 'react';
import styles from './YoutubeBannerMaker.module.css';

const YoutubeBannerMaker = () => {
  const [image, setImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const canvasRef = useRef(null);
  
  // YouTube Banner Dimensions
  const BANNER_W = 2560;
  const BANNER_H = 1440;
  // Safe Zone Dimensions
  const SAFE_W = 1546;
  const SAFE_H = 423;

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to actual YouTube Banner size for high-quality download
    canvas.width = BANNER_W;
    canvas.height = BANNER_H;

    // Calculate cover dimensions
    const imgRatio = image.width / image.height;
    const canvasRatio = BANNER_W / BANNER_H;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = BANNER_H;
      drawWidth = drawHeight * imgRatio;
      offsetX = (BANNER_W - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = BANNER_W;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (BANNER_H - drawHeight) / 2;
    }

    // Draw the image scaled to cover the whole canvas
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    
    // Generate Download URL (without the safe zone overlay)
    setDownloadUrl(canvas.toDataURL('image/jpeg', 0.95));

  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => setImage(img);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'youtube_banner_2560x1440.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setImage(null);
    setDownloadUrl('');
    document.getElementById('yt-banner-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>YouTube Banner Maker</h3>
        <p className={styles.subtitle}>Upload an image to format it perfectly for YouTube Channel Art</p>
        
        <label className={styles.fileLabel}>
          <input id="yt-banner-input" type="file" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
          <span className={styles.uploadBtn}>
            📁 Choose Image
          </span>
        </label>
      </div>

      {image && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.previewTitle}>Live Preview (With Safe Zone)</h3>
          <p className={styles.previewDesc}>The white box shows what is visible on mobile devices. Make sure your main subject is inside it!</p>
          
          <div className={styles.previewWrapper}>
            <img src={image.src} alt="Preview" className={styles.previewImage} />
            <div className={styles.safeZone}></div>
          </div>

          <div className={styles.actions}>
            <button className={styles.downloadBtn} onClick={handleDownload}>
              ⬇️ Download Banner (2560x1440)
            </button>
            <button className={styles.clearBtn} onClick={handleClear}>
              ✖️ Clear
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas used for processing the actual download file */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default YoutubeBannerMaker;
