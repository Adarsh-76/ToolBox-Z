import React, { useState, useRef } from 'react';
import styles from './ColorPickerImage.module.css';

const ColorPickerImage = () => {
  const [image, setImage] = useState(null);
  const [pickedColor, setPickedColor] = useState('#00FFAB');
  const [copied, setCopied] = useState('');
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      setPickedColor('#00FFAB');
      setZoom(1); // Reset zoom on new image
    };
    reader.readAsDataURL(file);
  };

  const handlePickColor = (e) => {
    if (!imgRef.current) return;
    
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    
    // FIXED: Mathematically calculate exact pixel regardless of zoom level
    const x = Math.floor((e.clientX - rect.left) * (img.naturalWidth / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (img.naturalHeight / rect.height));

    const canvas = canvasRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = "#" + ("000000" + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16)).slice(-6).toUpperCase();
      setPickedColor(hex);
    } catch (err) {
      console.error("Could not pick color", err);
    }
  };

  const rgbToHex = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleClear = () => {
    setImage(null);
    setPickedColor('#00FFAB');
    setZoom(1);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input type="file" accept="image/*" onChange={handleFile} id="img-color-upload" hidden />
        <label htmlFor="img-color-upload" className={styles.uploadLabel}>
          {image ? '🔄 Choose Another Image' : '📁 Upload Image'}
        </label>
        <p>Click anywhere on your uploaded image to pick a color.</p>
        {image && <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>}
      </div>

      {/* Hidden canvas for reading pixel data */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {image && (
        <>
          {/* Zoom Controls */}
          <div className={styles.zoomControls}>
            <label>🔍 Zoom: {Math.round(zoom * 100)}%</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="0.1" 
              value={zoom} 
              onChange={(e) => setZoom(Number(e.target.value))} 
              className={styles.zoomSlider}
            />
          </div>

          {/* Scrollable Image Container */}
          <div className={styles.imageWrapper}>
            <img 
              ref={imgRef} 
              src={image} 
              alt="Pick Color" 
              className={styles.image} 
              onClick={handlePickColor} 
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', cursor: 'crosshair' }} 
            />
          </div>
        </>
      )}

      {image && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3>Picked Color</h3>
          <div className={styles.colorDisplay} style={{ backgroundColor: pickedColor }}>
            <span>{pickedColor}</span>
          </div>
          <div className={styles.codesGrid}>
            <div className={styles.codeCard} onClick={() => handleCopy(pickedColor, 'hex')}>
              <span className={styles.label}>HEX</span>
              <span className={styles.value}>{pickedColor}</span>
              <span className={styles.copyText}>{copied === 'hex' ? '✅ Copied!' : '📋 Click to copy'}</span>
            </div>
            <div className={styles.codeCard} onClick={() => handleCopy(rgbToHex(pickedColor), 'rgb')}>
              <span className={styles.label}>RGB</span>
              <span className={styles.value}>{rgbToHex(pickedColor)}</span>
              <span className={styles.copyText}>{copied === 'rgb' ? '✅ Copied!' : '📋 Click to copy'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPickerImage;
