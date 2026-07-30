import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import styles from './RotatePdf.module.css';

const RotatePdf = () => {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagesInput, setPagesInput] = useState('');
  const [rotations, setRotations] = useState({}); // { 1: 90, 3: 180 }
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const parsePages = (input, total) => {
    if (!input || input.trim() === '') return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set();
    input.split(',').forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= total) pages.add(i);
        }
      } else {
        const num = Number(part);
        if (num >= 1 && num <= total) pages.add(num);
      }
    });
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      setRotations({});
      setDownloadUrl('');
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (err) {
        setError('Failed to read PDF. It might be corrupted.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleApplyRotation = (angle) => {
    if (!file) return;
    const targetPages = parsePages(pagesInput, pageCount);
    if (targetPages.length === 0) {
      setError('No valid pages selected. Check your page numbers.');
      return;
    }
    setError('');
    setRotations(prev => {
      const updated = { ...prev };
      targetPages.forEach(p => {
        updated[p] = ((updated[p] || 0) + angle) % 360;
      });
      return updated;
    });
  };

  const handleDownload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const pageNum = index + 1;
        if (rotations[pageNum]) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + rotations[pageNum]) % 360));
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate the new PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPageCount(0);
    setPagesInput('');
    setRotations({});
    setDownloadUrl('');
    setError('');
    document.getElementById('rotate-pdf-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF File</h3>
        <p className={styles.subtitle}>Choose a PDF to rotate specific pages</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="rotate-pdf-input"
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
            className={styles.fileInput}
          />
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
              <p className={styles.fileMeta}>Total Pages: {pageCount}</p>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.rangeLabel}>Pages to rotate (e.g., 1, 3, 5-7)</label>
            <input 
              type="text" 
              value={pagesInput} 
              onChange={(e) => setPagesInput(e.target.value)} 
              placeholder="Leave empty for ALL pages" 
              className={styles.pageInput} 
            />
            <small className={styles.hint}>Select the pages, then click a rotation direction below.</small>
          </div>

          <div className={styles.modeSelector}>
            <button className={styles.modeBtn} onClick={() => handleApplyRotation(90)}>
              <span className={styles.icon}>↻</span> 90° Right
            </button>
            <button className={styles.modeBtn} onClick={() => handleApplyRotation(180)}>
              <span className={styles.icon}>⇅</span> 180°
            </button>
            <button className={styles.modeBtn} onClick={() => handleApplyRotation(270)}>
              <span className={styles.icon}>↺</span> 90° Left
            </button>
          </div>

          {Object.keys(rotations).length > 0 && (
            <div className={styles.rotationList}>
              <h4 className={styles.actionTitle}>Applied Rotations:</h4>
              <div className={styles.chipGrid}>
                {Object.entries(rotations).map(([page, angle]) => (
                  <div key={page} className={styles.chip}>
                    Page {page}: {angle}°
                  </div>
                ))}
              </div>
            </div>
          )}

          {downloadUrl ? (
            <a href={downloadUrl} download={`rotated_${file.name}`} className={styles.downloadBtn}>
              ⬇️ Download Rotated PDF
            </a>
          ) : (
            <button className={styles.generateBtn} onClick={handleDownload} disabled={Object.keys(rotations).length === 0}>
              📄 Generate New PDF
            </button>
          )}
          
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Generating new PDF...</p>
        </div>
      )}
    </div>
  );
};

export default RotatePdf;
