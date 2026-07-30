import React, { useState, useRef } from 'react';
import styles from './PhotoCollageMaker.module.css';

const gridShapes = [
  { name: '1x2', cols: 1, rows: 2 },
  { name: '2x1', cols: 2, rows: 1 },
  { name: '2x2', cols: 2, rows: 2 },
  { name: '3x2', cols: 3, rows: 2 },
  { name: '3x3', cols: 3, rows: 3 },
];

const layoutStyles = ['Grid Layout', 'Masonry Style', 'Polaroid Style', 'Free Form'];

const sizes = [
  { name: '1200x1200 (Square)', w: 1200, h: 1200 },
  { name: '1200x630 (Banner)', w: 1200, h: 630 },
  { name: '800x800 (Standard)', w: 800, h: 800 },
  { name: '1080x1920 (Story)', w: 1080, h: 1920 },
];

const PhotoCollageMaker = () => {
  const [images, setImages] = useState([]);
  const [layoutStyle, setLayoutStyle] = useState('Grid Layout');
  const [gridShape, setGridShape] = useState(gridShapes[2]);
  const [size, setSize] = useState(sizes[0]);
  const [spacing, setSpacing] = useState(10);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [resultUrl, setResultUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
    setResultUrl(null);
  };

  const handleReset = () => {
    setImages([]);
    setResultUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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

  const handleCreate = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load all images
    const loadedImages = await Promise.all(
      images.map(src => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      }))
    );

    if (layoutStyle === 'Masonry Style') {
      // Dynamic Masonry Layout
      const cols = 3;
      const colWidth = (size.w - (cols + 1) * spacing) / cols;
      const colHeights = new Array(cols).fill(spacing);
      
      // Calculate dynamic canvas height
      const tempHeights = [...colHeights];
      loadedImages.forEach(img => {
        const shortestCol = tempHeights.indexOf(Math.min(...tempHeights));
        const imgRatio = img.height / img.width;
        const drawHeight = colWidth * imgRatio;
        tempHeights[shortestCol] += drawHeight + spacing;
      });
      
      canvas.width = size.w;
      canvas.height = Math.max(...tempHeights);
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      loadedImages.forEach(img => {
        const shortestCol = colHeights.indexOf(Math.min(...colHeights));
        const x = spacing + shortestCol * (colWidth + spacing);
        const y = colHeights[shortestCol];
        const imgRatio = img.height / img.width;
        const drawHeight = colWidth * imgRatio;
        
        ctx.drawImage(img, x, y, colWidth, drawHeight);
        colHeights[shortestCol] += drawHeight + spacing;
      });

    } else if (layoutStyle === 'Polaroid Style') {
      // Polaroid Style (2 columns)
      const cols = 2;
      canvas.width = size.w;
      canvas.height = size.w; // Square canvas
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = (canvas.width - (cols + 1) * spacing) / cols;
      const cellH = cellW;
      const required = Math.min(loadedImages.length, 4);
      
      for (let i = 0; i < required; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const x = spacing + c * (cellW + spacing);
        const y = spacing + r * (cellH + spacing);
        
        ctx.save();
        // Random rotation
        const rot = (Math.random() - 0.5) * 0.1; 
        ctx.translate(x + cellW/2, y + cellH/2);
        ctx.rotate(rot);
        
        // Draw white polaroid background
        const polW = cellW;
        const polH = cellH + 60; // Extra space at bottom
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-polW/2, -polH/2, polW, polH);
        
        // Draw image inside
        drawImageCover(ctx, loadedImages[i], -polW/2 + 10, -polH/2 + 10, polW - 20, polH - 70);
        ctx.restore();
      }

    } else {
      // Standard Grid Layout (or Free Form fallback)
      const requiredSlots = gridShape.cols * gridShape.rows;
      if (images.length < requiredSlots) {
        alert(`Please upload at least ${requiredSlots} images for this grid shape.`);
        setIsProcessing(false);
        return;
      }

      canvas.width = size.w;
      canvas.height = size.h;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellW = (canvas.width - (gridShape.cols + 1) * spacing) / gridShape.cols;
      const cellH = (canvas.height - (gridShape.rows + 1) * spacing) / gridShape.rows;

      let index = 0;
      for (let r = 0; r < gridShape.rows; r++) {
        for (let c = 0; c < gridShape.cols; c++) {
          const x = spacing + c * (cellW + spacing);
          const y = spacing + r * (cellH + spacing);
          
          if (layoutStyle === 'Free Form') {
            ctx.save();
            ctx.translate(x + cellW/2, y + cellH/2);
            ctx.rotate((Math.random() - 0.5) * 0.2);
            drawImageCover(ctx, loadedImages[index], -cellW/2 + 15, -cellH/2 + 15, cellW - 30, cellH - 30);
            ctx.restore();
          } else {
            drawImageCover(ctx, loadedImages[index], x, y, cellW, cellH);
          }
          index++;
        }
      }
    }

    const url = canvas.toDataURL('image/png', 1.0);
    setResultUrl(url);
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `toolverse_collage.png`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          id="collage-multi-input" 
          className={styles.hiddenInput}
          ref={fileInputRef}
        />
        <label htmlFor="collage-multi-input" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>🖼️</span>
          <span>Click to select multiple images</span>
          <span className={styles.hint}>({images.length} images selected)</span>
        </label>
      </div>

      <div className={styles.grid}>
        <div className={styles.paneWrapper}>
          <div className={styles.paneHeader}>
            <label className={styles.paneLabel}>Collage Settings</label>
          </div>
          <div className={`liquid-glass ${styles.controlsArea}`}>
            
            <div className={styles.controlRow}>
              <label>Layout Style</label>
              <select 
                value={layoutStyle} 
                onChange={(e) => { setLayoutStyle(e.target.value); setResultUrl(null); }}
                className={styles.selectDropdown}
              >
                {layoutStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {layoutStyle === 'Grid Layout' && (
              <div className={styles.controlRow}>
                <label>Grid Shape</label>
                <div className={styles.btnGrid}>
                  {gridShapes.map((l) => (
                    <button 
                      key={l.name} 
                      className={`${styles.optBtn} ${gridShape.name === l.name ? styles.optActive : ''}`}
                      onClick={() => { setGridShape(l); setResultUrl(null); }}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.controlRow}>
              <label>Collage Size</label>
              <select 
                value={size.name} 
                onChange={(e) => { setSize(sizes.find(s => s.name === e.target.value)); setResultUrl(null); }}
                className={styles.selectDropdown}
              >
                {sizes.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>

            <div className={styles.controlRow}>
              <label>Spacing Between Photos: <span className={styles.val}>{spacing}px</span></label>
              <input 
                type="range" 
                min="0" 
                max="30" 
                value={spacing} 
                onChange={(e) => { setSpacing(parseInt(e.target.value)); setResultUrl(null); }} 
                className={styles.slider}
              />
            </div>

            <div className={styles.controlRow}>
              <label>Background Color</label>
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => { setBgColor(e.target.value); setResultUrl(null); }} 
                className={styles.colorPicker}
              />
            </div>

            <div className={styles.actionRow}>
              <button className={styles.createBtn} onClick={handleCreate} disabled={isProcessing || images.length === 0}>
                {isProcessing ? '⏳ Creating...' : '✨ Create Collage'}
              </button>
              <button className={styles.resetBtn} onClick={handleReset} disabled={images.length === 0}>
                🗑️ Reset
              </button>
            </div>
          </div>
        </div>

        <div className={styles.paneWrapper}>
          <div className={styles.paneHeader}>
            <label className={styles.paneLabel}>Live Preview</label>
            {resultUrl && (
              <button className={styles.downloadBtn} onClick={handleDownload}>
                ⬇️ Download PNG
              </button>
            )}
          </div>
          <div className={`liquid-glass ${styles.previewWrapper}`}>
            {resultUrl ? (
              <img src={resultUrl} alt="Collage Preview" className={styles.previewImg} />
            ) : (
              <div className={styles.placeholder}>
                <span>⚙️</span>
                <p>Your generated collage will appear here.</p>
                <p className={styles.hint}>Select images and click "Create Collage".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCollageMaker;
