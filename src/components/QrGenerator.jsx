import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './QrGenerator.module.css';

const QrGenerator = () => {
  const [text, setText] = useState('https://localhost:5173');
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState('#1A1B1F');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'toolverse_qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Left Side: Controls */}
        <div className={styles.paneWrapper}>
          <label className={styles.paneLabel}>Enter URL or Text</label>
          <div className={styles.clayInputWrapper}>
            <input 
              type="text" 
              className={styles.clayInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., https://google.com"
            />
          </div>

          <div className={styles.controlRow}>
            <label>Size: <span>{size}px</span></label>
            <input 
              type="range" 
              min="100" 
              max="400" 
              value={size} 
              onChange={(e) => setSize(parseInt(e.target.value))} 
              className={styles.slider}
            />
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorPickerGroup}>
              <label>QR Color</label>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className={styles.colorPicker} />
            </div>
            <div className={styles.colorPickerGroup}>
              <label>Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className={styles.colorPicker} />
            </div>
          </div>
        </div>

        {/* Right Side: Preview & Download */}
        <div className={styles.paneWrapper}>
          <label className={styles.paneLabel}>Live Preview</label>
          <div className={styles.clayPreviewCard}>
            <div ref={canvasRef} className={styles.qrWrapper} style={{ backgroundColor: bgColor }}>
              {text ? (
                <QRCodeCanvas 
                  value={text} 
                  size={size} 
                  fgColor={fgColor} 
                  bgColor={bgColor} 
                  level={'H'} // High error correction
                  includeMargin={true}
                />
              ) : (
                <p className={styles.placeholder}>Enter text to generate QR</p>
              )}
            </div>
          </div>
          
          <button className={styles.clayBtn} onClick={handleDownload} disabled={!text}>
            ⬇️ Download HD PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
