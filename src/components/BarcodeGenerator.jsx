import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import styles from './BarcodeGenerator.module.css';

const BarcodeGenerator = () => {
  const [text, setText] = useState('123456789012');
  const [format, setFormat] = useState('CODE128');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [lineColor, setLineColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: format,
          width: width,
          height: height,
          lineColor: lineColor,
          background: bgColor,
          displayValue: true,
          fontSize: 16,
          margin: 10
        });
        setError('');
      } catch (e) {
        setError('Invalid input for the selected format.');
      }
    }
  }, [text, format, width, height, lineColor, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const pngUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `barcode_${format}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <h3 className={styles.title}>📊 Barcode Generator</h3>
        
        <div className={styles.inputGroup}>
          <label>Content</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className={styles.textInput}
            placeholder="Enter text or number..."
          />
        </div>

        <div className={styles.selectRow}>
          <div className={styles.inputGroup}>
            <label>Format</label>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)} 
              className={styles.selectInput}
            >
              <option value="CODE128">CODE128 (Default)</option>
              <option value="CODE39">CODE39</option>
              <option value="EAN13">EAN13 (13 digits)</option>
              <option value="EAN8">EAN8 (8 digits)</option>
              <option value="UPC">UPC (12 digits)</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Line Width</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value))} 
              className={styles.numberInput}
            />
          </div>
        </div>

        <div className={styles.colorRow}>
          <div className={styles.inputGroup}>
            <label>Bar Color</label>
            <input 
              type="color" 
              value={lineColor} 
              onChange={(e) => setLineColor(e.target.value)} 
              className={styles.colorInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Background</label>
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
              className={styles.colorInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Height</label>
            <input 
              type="number" 
              min="40" 
              max="200" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))} 
              className={styles.numberInput}
            />
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.previewArea}`}>
        {error && <div className={styles.errorBox}>{error}</div>}
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef}></canvas>
        </div>
        <button className={styles.downloadBtn} onClick={handleDownload} disabled={!!error}>
          ⬇️ Download PNG
        </button>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
