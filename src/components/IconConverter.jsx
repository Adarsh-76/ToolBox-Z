import React, { useState, useRef } from 'react';
import styles from './IconConverter.module.css';

const IconConverter = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);

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
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = imageUrl;
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo(null);
    document.getElementById('iconInput').value = '';
  };

  const getPngBlob = (size) => {
    return new Promise((resolve) => {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
    });
  };

  // Manually construct an ICO file from a PNG blob
  const createIco = async (size) => {
    const pngBlob = await getPngBlob(size);
    const pngBuffer = await pngBlob.arrayBuffer();
    
    // ICO Header (6 bytes) + Directory Entry (16 bytes)
    const icoHeader = new Uint8Array([0, 0, 1, 0, 1, 0]); 
    const icoEntry = new Uint8Array(16);
    icoEntry[0] = size === 256 ? 0 : size; // Width (0 means 256)
    icoEntry[1] = size === 256 ? 0 : size; // Height
    icoEntry[2] = 0; // Palette
    icoEntry[3] = 0; // Reserved
    icoEntry[4] = 1; // Color planes
    icoEntry[5] = 0;
    icoEntry[6] = 32; // Bits per pixel
    icoEntry[7] = 0;
    
    const view = new DataView(icoEntry.buffer);
    view.setUint32(8, pngBuffer.byteLength, true); // Image size
    view.setUint32(12, 22, true); // Offset to image data (6 + 16)

    // Combine Header + Entry + PNG data
    const icoBuffer = new Uint8Array(22 + pngBuffer.byteLength);
    icoBuffer.set(icoHeader, 0);
    icoBuffer.set(icoEntry, 6);
    icoBuffer.set(new Uint8Array(pngBuffer), 22);

    return new Blob([icoBuffer], { type: 'image/x-icon' });
  };

  const downloadBlob = (blob, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleDownloadPNG = async (size) => {
    if (!image) return;
    setIsProcessing(true);
    const blob = await getPngBlob(size);
    downloadBlob(blob, `icon_${size}x${size}.png`);
    setIsProcessing(false);
  };

  const handleDownloadICO = async () => {
    if (!image) return;
    setIsProcessing(true);
    // Generate a 32x32 favicon for basic browser tabs, and 256 for desktop
    const blob = await createIco(32); 
    downloadBlob(blob, 'favicon.ico');
    setIsProcessing(false);
  };

  const handleDownloadSVG = async () => {
    if (!image) return;
    setIsProcessing(true);
    // Embed the 512px PNG inside an SVG wrapper
    const pngBlob = await getPngBlob(512);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image href="data:image/png;base64,${base64}" width="512" height="512"/></svg>`;
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      downloadBlob(blob, 'icon.svg');
      setIsProcessing(false);
    };
    reader.readAsDataURL(pngBlob);
  };

  const sizes = [16, 32, 48, 128, 256, 512];

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="iconInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="iconInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>💠</span>
            <span>Select Image to Convert</span>
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
                  <span className={styles.infoKey}>Format:</span>
                  <span className={styles.infoVal}>{imageInfo.type}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoKey}>Dimensions:</span>
                  <span className={styles.infoVal}>{imageInfo.width} x {imageInfo.height} px</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Download Options</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Favicons (.ico)</h3>
                <p className={styles.sectionHint}>For browser tabs</p>
              </div>
              <button className={styles.downloadBtn} onClick={handleDownloadICO} disabled={isProcessing}>
                ⬇️ Download favicon.ico (32x32)
              </button>

              <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                <h3 className={styles.sectionTitle}>PNG Icons (.png)</h3>
                <p className={styles.sectionHint}>For apps and web</p>
              </div>
              <div className={styles.sizeGrid}>
                {sizes.map(size => (
                  <button 
                    key={size} 
                    className={styles.sizeBtn} 
                    onClick={() => handleDownloadPNG(size)}
                    disabled={isProcessing}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>

              <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                <h3 className={styles.sectionTitle}>Vector (.svg)</h3>
                <p className={styles.sectionHint}>Scalable format</p>
              </div>
              <button className={styles.downloadBtn} onClick={handleDownloadSVG} disabled={isProcessing}>
                ⬇️ Download icon.svg (512x512)
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconConverter;
