import React, { useState, useRef, useEffect } from 'react';
import styles from './ImageConverter.module.css';

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [format, setFormat] = useState('image/png');
  const [enhance, setEnhance] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [estSize, setEstSize] = useState('Calculating...');
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
    document.getElementById('convertInput').value = ''; // Reset input so same file can be re-uploaded
  };

  // Calculate exact expected output size whenever format, enhance, or image changes
  useEffect(() => {
    if (!image || !imgRef.current || !imageInfo) return;
    
    const img = imgRef.current;
    if (!img.complete) return;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    if (enhance) {
      ctx.filter = 'contrast(1.15) saturate(1.3) brightness(1.05)';
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Use 1.0 for 100% quality (no visible compression)
    canvas.toBlob((blob) => {
      if (blob) {
        setEstSize(formatFileSize(blob.size));
      }
    }, format, 1.0);
  }, [image, format, enhance, imageInfo]);

  const handleConvertAndDownload = () => {
    if (!image || !imgRef.current) return;
    setIsProcessing(true);

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    if (enhance) {
      ctx.filter = 'contrast(1.15) saturate(1.3) brightness(1.05)';
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const ext = format === 'image/png' ? 'png' : format === 'image/jpeg' ? 'jpg' : 'webp';
    
    // Use 1.0 for 100% quality (no visible compression)
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `toolverse_converted.${ext}`;
      link.click();
      setIsProcessing(false);
    }, format, 1.0);
  };

  return (
    <div className={styles.container}>
      {/* Upload box ONLY shows if there is no image */}
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="convertInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="convertInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>🖼️</span>
            <span>Select Image to Convert</span>
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
              <img 
                ref={imgRef} 
                src={image} 
                alt="preview" 
                className={styles.previewImg} 
              />
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
              <label className={styles.paneLabel}>Conversion Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Output Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className={styles.selectDropdown}
                >
                  <option value="image/png">PNG (High Quality)</option>
                  <option value="image/jpeg">JPEG (Compressed)</option>
                  <option value="image/webp">WEBP (Modern/Web)</option>
                </select>
              </div>

              <div className={styles.controlRow}>
                <label>Enhance Image?</label>
                <div className={styles.toggleWrapper} onClick={() => setEnhance(!enhance)}>
                  <div className={`${styles.toggleSwitch} ${enhance ? styles.toggleOn : ''}`}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                  <span>{enhance ? '✅ Auto-Enhance On' : 'No Enhancement'}</span>
                </div>
              </div>

              {/* Expected Size Box */}
              <div className={styles.controlRow}>
                <label>Expected Output Size</label>
                <div className={styles.estSizeBox}>
                  {estSize}
                </div>
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleConvertAndDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Converting...' : '⬇️ Convert & Download'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
