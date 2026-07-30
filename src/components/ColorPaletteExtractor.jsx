import React, { useState } from 'react';
import styles from './ColorPaletteExtractor.module.css';

const ColorPaletteExtractor = () => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setColors([]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
      extractColors(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (src) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxSize = 100; // Scale down for fast processing
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorMap = {};
      
      for (let i = 0; i < data.length; i += 4) {
        // Round colors to nearest 16 to group similar colors
        const r = Math.round(data[i] / 16) * 16;
        const g = Math.round(data[i + 1] / 16) * 16;
        const b = Math.round(data[i + 2] / 16) * 16;
        const rgb = `${r},${g},${b}`;
        colorMap[rgb] = (colorMap[rgb] || 0) + 1;
      }

      // Sort by frequency and take top 6
      const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
      setColors(sortedColors.map(c => c[0]));
    };
    img.src = src;
  };

  const rgbToHex = (rgb) => {
    return '#' + rgb.split(',').map(c => parseInt(c).toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const handleCopy = (color) => {
    navigator.clipboard.writeText(rgbToHex(color));
    alert(`Copied ${rgbToHex(color)}`);
  };

  const handleClear = () => {
    setImage(null);
    setColors([]);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input type="file" accept="image/*" onChange={handleFile} id="palette-upload" hidden />
        <label htmlFor="palette-upload" className={styles.uploadLabel}>
          {image ? '🔄 Choose Another Image' : '📁 Upload Image'}
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {image && (
        <div className={styles.resultArea}>
          <div className={styles.previewWrapper}>
            <img src={image} alt="Source" className={styles.previewImg} />
          </div>
          
          <div className={styles.paletteGrid}>
            {colors.map((color, i) => (
              <div key={i} className={styles.colorCard} style={{ backgroundColor: `rgb(${color})` }} onClick={() => handleCopy(color)}>
                <span className={styles.hexCode}>{rgbToHex(color)}</span>
              </div>
            ))}
          </div>

          <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteExtractor;
