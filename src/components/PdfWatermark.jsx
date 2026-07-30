import React, { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import styles from './PdfWatermark.module.css';

const PdfWatermark = () => {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState('addText'); // 'addText', 'addImage', 'remove'
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(60);
  const [rotation, setRotation] = useState(45);
  const [imageFile, setImageFile] = useState(null);
  const [coverPosition, setCoverPosition] = useState('bottomCenter');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      setDownloadUrl('');
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (err) {
        setError('Failed to read PDF.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f && f.type.startsWith('image/')) {
      setImageFile(f);
      setError('');
    } else {
      setError('Please select a valid image file (PNG/JPG).');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      for (const page of pages) {
        const { width, height } = page.getSize();

        if (mode === 'addText') {
          const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize);
          page.drawText(watermarkText, {
            x: width / 2 - textWidth / 2,
            y: height / 2,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0.6, 0.6, 0.6),
            opacity: opacity,
            rotate: degrees(rotation),
          });
        } else if (mode === 'addImage' && imageFile) {
          const imgArrayBuffer = await imageFile.arrayBuffer();
          let img;
          if (imageFile.type === 'image/png') {
            img = await pdfDoc.embedPng(imgArrayBuffer);
          } else {
            img = await pdfDoc.embedJpg(imgArrayBuffer);
          }
          const imgScale = 0.3; // Scale image to 30% of page width
          const imgWidth = width * imgScale;
          const imgHeight = (img.height / img.width) * imgWidth;
          page.drawImage(img, {
            x: width / 2 - imgWidth / 2,
            y: height / 2 - imgHeight / 2,
            width: imgWidth,
            height: imgHeight,
            opacity: opacity,
          });
        } else if (mode === 'remove') {
          // Draw a white box to cover the watermark area
          let boxX = 0, boxY = 0, boxW = width, boxH = 50;
          if (coverPosition === 'bottomCenter') {
            boxW = width * 0.6;
            boxX = width / 2 - boxW / 2;
            boxY = 20; // 20 units from bottom
          } else if (coverPosition === 'topCenter') {
            boxW = width * 0.6;
            boxX = width / 2 - boxW / 2;
            boxY = height - 50 - 20;
          } else if (coverPosition === 'fullFooter') {
            boxH = 60;
            boxY = 0;
          } else if (coverPosition === 'fullHeader') {
            boxH = 60;
            boxY = height - 60;
          }

          page.drawRectangle({
            x: boxX,
            y: boxY,
            width: boxW,
            height: boxH,
            color: rgb(1, 1, 1), // White
            opacity: 1,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to process PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPageCount(0);
    setImageFile(null);
    setDownloadUrl('');
    setError('');
    document.getElementById('pdf-watermark-input').value = '';
    if (document.getElementById('image-watermark-input')) {
      document.getElementById('image-watermark-input').value = '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF File</h3>
        <p className={styles.subtitle}>Add or remove watermarks instantly</p>
        
        <label className={styles.fileLabel}>
          <input id="pdf-watermark-input" type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />
          <span className={`${styles.uploadBtn} ${file ? styles.uploaded : ''}`}>
            {file ? `✅ ${file.name.substring(0, 20)}...` : '📁 Choose PDF'}
          </span>
        </label>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {file && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📄</span>
            <div>
              <h3 className={styles.fileName}>{file.name}</h3>
              <p className={styles.fileMeta}>Pages: {pageCount}</p>
            </div>
          </div>

          <div className={styles.modeSelector}>
            <button className={`${styles.modeBtn} ${mode === 'addText' ? styles.modeActive : ''}`} onClick={() => setMode('addText')}>Add Text</button>
            <button className={`${styles.modeBtn} ${mode === 'addImage' ? styles.modeActive : ''}`} onClick={() => setMode('addImage')}>Add Image</button>
            <button className={`${styles.modeBtn} ${mode === 'remove' ? styles.modeActive : ''}`} onClick={() => setMode('remove')}>Remove (Cover)</button>
          </div>

          {mode === 'addText' && (
            <div className={styles.optionsGroup}>
              <div className={styles.inputRow}>
                <label>Watermark Text</label>
                <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className={styles.textInput} />
              </div>
              <div className={styles.inputRow}>
                <label>Opacity: {opacity}</label>
                <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
              </div>
              <div className={styles.inputRow}>
                <label>Font Size: {fontSize}</label>
                <input type="range" min="20" max="120" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
              </div>
              <div className={styles.inputRow}>
                <label>Rotation: {rotation}°</label>
                <input type="range" min="0" max="90" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value))} />
              </div>
            </div>
          )}

          {mode === 'addImage' && (
            <div className={styles.optionsGroup}>
              <label className={styles.fileLabel}>
                <input id="image-watermark-input" type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />
                <span className={`${styles.uploadBtn} ${imageFile ? styles.uploaded : ''}`}>
                  {imageFile ? `✅ ${imageFile.name.substring(0, 15)}...` : '📁 Choose Image'}
                </span>
              </label>
              <div className={styles.inputRow}>
                <label>Opacity: {opacity}</label>
                <input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
              </div>
            </div>
          )}

          {mode === 'remove' && (
            <div className={styles.optionsGroup}>
              <p className={styles.warningText}>Note: This draws a solid white box over the selected area to cover the watermark. It does not delete the embedded data.</p>
              <div className={styles.inputRow}>
                <label>Cover Area</label>
                <select className={styles.selectInput} value={coverPosition} onChange={(e) => setCoverPosition(e.target.value)}>
                  <option value="bottomCenter">Bottom Center</option>
                  <option value="topCenter">Top Center</option>
                  <option value="fullFooter">Entire Footer (Bottom)</option>
                  <option value="fullHeader">Entire Header (Top)</option>
                </select>
              </div>
            </div>
          )}

          {downloadUrl ? (
            <a href={downloadUrl} download={`watermarked_${file.name}`} className={styles.downloadBtn}>
              ⬇️ Download PDF
            </a>
          ) : (
            <button className={styles.generateBtn} onClick={handleGenerate} disabled={mode === 'addImage' && !imageFile}>
              📄 Generate PDF
            </button>
          )}
          
          <button className={styles.clearBtn} onClick={handleClear}>Start Over</button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Processing PDF...</p>
        </div>
      )}
    </div>
  );
};

export default PdfWatermark;
