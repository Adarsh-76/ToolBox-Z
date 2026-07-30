import React, { useState } from 'react';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import styles from './GifMaker.module.css';

const GifMaker = () => {
  const [images, setImages] = useState([]);
  const [delay, setDelay] = useState(300); // 300ms default
  const [isGenerating, setIsGenerating] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    
    setImages((prev) => [...prev, ...newImages]);
    setGifUrl(null);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setGifUrl(null);
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
    setGifUrl(null);
  };

  const handleGenerate = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    const gif = GIFEncoder();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load all images to get dimensions
    const loadedImages = await Promise.all(
      images.map((imgObj) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = imgObj.url;
      }))
    );

    // Set canvas size based on the first image, cap max width at 480px for web optimization
    const firstImg = loadedImages[0];
    const maxW = 480;
    const scale = Math.min(1, maxW / firstImg.naturalWidth);
    canvas.width = Math.round(firstImg.naturalWidth * scale);
    canvas.height = Math.round(firstImg.naturalHeight * scale);

    // Loop through images and add to GIF
    for (let i = 0; i < loadedImages.length; i++) {
      ctx.fillStyle = '#000000'; // Background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(loadedImages[i], 0, 0, canvas.width, canvas.height);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const palette = quantize(data, 256);
      const index = applyPalette(data, palette);

      gif.writeFrame(index, canvas.width, canvas.height, { palette, delay });
    }

    gif.finish();
    const buffer = gif.bytes();
    const blob = new Blob([buffer], { type: 'image/gif' });
    setGifUrl(URL.createObjectURL(blob));
    setIsGenerating(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          id="gifInput" 
          className={styles.hiddenInput}
        />
        <label htmlFor="gifInput" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>🎞️</span>
          <span>Select Multiple Images</span>
        </label>
      </div>

      {images.length > 0 && (
        <>
          <div className={styles.controls}>
            <div className={styles.controlRow}>
              <label>Frame Delay: <span className={styles.val}>{delay}ms</span></label>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="50"
                value={delay} 
                onChange={(e) => setDelay(parseInt(e.target.value))} 
                className={styles.slider}
              />
            </div>
            <button className={styles.generateBtn} onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? '⏳ Generating...' : '✨ Generate GIF'}
            </button>
          </div>

          <div className={styles.grid}>
            {images.map((img, index) => (
              <div key={index} className={`liquid-glass ${styles.previewCard}`}>
                <img src={img.url} alt={`frame ${index}`} className={styles.previewImg} />
                <div className={styles.reorderButtons}>
                  <button className={styles.arrowBtn} onClick={() => moveImage(index, -1)} disabled={index === 0}>←</button>
                  <button className={styles.removeBtn} onClick={() => removeImage(index)}>❌</button>
                  <button className={styles.arrowBtn} onClick={() => moveImage(index, 1)} disabled={index === images.length - 1}>→</button>
                </div>
                <span className={styles.frameNum}>Frame {index + 1}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {gifUrl && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Your GIF is Ready!</h3>
          <img src={gifUrl} alt="Generated GIF" className={styles.gifPreview} />
          <a href={gifUrl} download="toolverse_animation.gif" className={styles.downloadBtn}>
            ⬇️ Download GIF
          </a>
        </div>
      )}
    </div>
  );
};

export default GifMaker;
