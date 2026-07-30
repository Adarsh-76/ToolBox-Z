import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import styles from './ImageCropper.module.css';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const handleDownload = async () => {
    if (!image || !croppedAreaPixels) return;
    setIsProcessing(true);

    try {
      const img = await createImage(image);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `toolverse_cropped.png`;
        link.click();
        setIsProcessing(false);
      }, 'image/png', 1.0);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const aspectRatios = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '9:16', value: 9 / 16 },
  ];

  return (
    <div className={styles.container}>
      {!image && (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            id="cropInput" 
            className={styles.hiddenInput}
            ref={fileInputRef}
          />
          <label htmlFor="cropInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>✂️</span>
            <span>Select Image to Crop</span>
          </label>
        </div>
      )}

      {image && (
        <div className={styles.grid}>
          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Crop Area</label>
              <button className={styles.removeBtn} onClick={handleRemoveImage}>
                🗑️ Remove
              </button>
            </div>

            <div className={styles.cropperWrapper}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspect || undefined}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                restrictPosition={false}
              />
            </div>
          </div>

          <div className={styles.paneWrapper}>
            <div className={styles.paneHeader}>
              <label className={styles.paneLabel}>Settings</label>
            </div>
            <div className={`liquid-glass ${styles.controlsArea}`}>
              
              <div className={styles.controlRow}>
                <label>Aspect Ratio</label>
                <div className={styles.aspectGrid}>
                  {aspectRatios.map((ar) => (
                    <button 
                      key={ar.label} 
                      className={`${styles.aspectBtn} ${aspect === ar.value ? styles.aspectActive : ''}`}
                      onClick={() => setAspect(ar.value)}
                    >
                      {ar.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.controlRow}>
                <label>Zoom: <span className={styles.zoomVal}>{zoom.toFixed(1)}x</span></label>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1"
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                  className={styles.slider}
                />
              </div>

              <button 
                className={styles.downloadBtn} 
                onClick={handleDownload}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Cropping...' : '⬇️ Crop & Download PNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
