import React, { useState, useRef } from 'react';
import styles from './WatermarkAdder.module.css';

const WatermarkAdder = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('© ToolVerse');
  const [color, setColor] = useState('#FFFFFF');
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.8);
  const [position, setPosition] = useState('bottom-right');
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    document.getElementById('watermarkInput').value = '';
  };

  const getCoordinates = (w, h, ctx) => {
    const padding = 30;
    ctx.font = `${size}px sans-serif`;
    const textWidth = ctx.measureText(text).width;
    
    switch(position) {
      case 'top-left': return { x: padding, y: padding + size };
      case 'top-right': return { x: w - textWidth - padding, y: padding + size };
      case 'center': return { x: (w - textWidth) / 2, y: h / 2 };
      case 'bottom-left': return { x: padding, y: h - padding };
      case 'bottom-right': return { x: w - textWidth - padding, y: h - padding };
      default: return { x: padding, y: h - padding };
    }
  };

  const handleDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Setup text
    ctx.font = `${size * (canvas.width / imgRef.current.clientWidth)}px sans-serif`; // Scale font size to canvas size
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    
    const { x, y } = getCoordinates(canvas.width, canvas.height, ctx);
    
    // Scale coordinates to canvas size
    const scaleX = canvas.width / imgRef.current.clientWidth;
    const scaleY = canvas.height / imgRef.current.clientHeight;
    
    ctx.fillText(text, x * scaleX, y * scaleY);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_watermarked.png`;
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
            id="watermarkInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="watermarkInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>💧</span>
            <span>Select Image to Watermark</span>
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
              <div className={styles.previewContainer}>
                <img ref={imgRef} src={image} alt="preview" className={styles.previewImg} />
                <div 
                  className={styles.watermarkOverlay}
                  style={{
                    color: color,
                    fontSize: `${size}px`,
                    opacity: opacity,
                    top: position.includes('top') ? '30px' : position === 'center' ? '50%' : 'auto',
                    bottom: position.includes('bottom') ? '30px' : 'auto',
                    left: position.includes('left') ? '30px' : position === 'center' ? '50%' : 'auto',
                    right: position.includes('right') ? '30px' : 'auto',
                    transform: position === 'center' ? 'translate(-50%, -50%)' : 'none'
                  }}
                >
                  {text}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Watermark Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Watermark Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputRow}>
                <div className={styles.controlRow}>
                  <label>Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.colorPicker} />
                </div>
                <div className={styles.controlRow}>
                  <label>Size: <span>{size}px</span></label>
                  <input type="range" min="10" max="100" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className={styles.slider} />
                </div>
              </div>

              <div className={styles.controlRow}>
                <label>Opacity: <span>{Math.round(opacity * 100)}%</span></label>
                <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className={styles.slider} />
              </div>

              <div className={styles.controlRow}>
                <label>Position</label>
                <div className={styles.positionGrid}>
                  <button className={`${styles.posBtn} ${position === 'top-left' ? styles.posActive : ''}`} onClick={() => setPosition('top-left')}>↖</button>
                  <button className={`${styles.posBtn} ${position === 'center' ? styles.posActive : ''}`} onClick={() => setPosition('center')}>⬛</button>
                  <button className={`${styles.posBtn} ${position === 'top-right' ? styles.posActive : ''}`} onClick={() => setPosition('top-right')}>↗</button>
                  <button className={`${styles.posBtn} ${position === 'bottom-left' ? styles.posActive : ''}`} onClick={() => setPosition('bottom-left')}>↙</button>
                  <button className={`${styles.posBtn} ${position === 'bottom-right' ? styles.posActive : ''}`} onClick={() => setPosition('bottom-right')}>↘</button>
                </div>
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '⬇️ Download Watermarked PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatermarkAdder;
