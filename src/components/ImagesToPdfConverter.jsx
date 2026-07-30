import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import styles from './ImagesToPdfConverter.module.css';

const ImagesToPdfConverter = () => {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
  };

  const handleClearAll = () => {
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      hotfixes: ['px_scaling']
    });

    for (let i = 0; i < images.length; i++) {
      const imgObj = images[i];
      
      const img = await new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.onload = () => resolve(tempImg);
        tempImg.src = imgObj.url;
      });

      const width = img.width;
      const height = img.height;

      if (i > 0) pdf.addPage([width, height], width > height ? 'landscape' : 'portrait');
      else pdf.internal.pages[1] = [width, height];

      pdf.addImage(imgObj.url, 'JPEG', 0, 0, width, height);
    }

    const date = new Date();
    const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}`;
    pdf.save(`toolverse_images_${timestamp}.pdf`);
    setIsProcessing(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          id="imgToPdfInput" 
          className={styles.hiddenInput}
          ref={fileInputRef}
        />
        <label htmlFor="imgToPdfInput" className={styles.uploadLabel}>
          <span className={styles.uploadIcon}>🖼️</span>
          <span>Click to select multiple images</span>
          <span className={styles.hint}>({images.length} images selected)</span>
        </label>
      </div>

      {images.length > 0 && (
        <>
          <div className={styles.grid}>
            {images.map((img, index) => (
              <div key={index} className={`liquid-glass ${styles.previewCard}`}>
                <img src={img.url} alt={`preview ${index}`} className={styles.previewImg} />
                <div className={styles.reorderButtons}>
                  <button className={styles.arrowBtn} onClick={() => moveImage(index, -1)} disabled={index === 0}>←</button>
                  <button className={styles.removeBtn} onClick={() => removeImage(index)}>❌</button>
                  <button className={styles.arrowBtn} onClick={() => moveImage(index, 1)} disabled={index === images.length - 1}>→</button>
                </div>
                <span className={styles.pageNumber}>Page {index + 1}</span>
              </div>
            ))}
          </div>

          <div className={styles.actionRow}>
            <button className={styles.downloadBtn} onClick={handleDownload} disabled={isProcessing}>
              {isProcessing ? '⏳ Generating PDF...' : `⬇️ Convert to PDF (${images.length} Images)`}
            </button>
            <button className={styles.clearAllBtn} onClick={handleClearAll}>
              🗑️ Remove All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImagesToPdfConverter;
