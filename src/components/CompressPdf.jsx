import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import styles from './CompressPdf.module.css';

// Vite-safe worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const CompressPdf = () => {
  const [file, setFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setOriginalSize(f.size);
      setCompressedSize(0);
      setDownloadUrl('');
      setError('');
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load original PDF with pdfjs
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Create new PDF with pdf-lib
      const newPdf = await PDFDocument.create();

      // Map compression levels to scale and JPEG quality
      const settings = {
        low: { scale: 1.5, quality: 0.9 },
        medium: { scale: 1.0, quality: 0.7 },
        high: { scale: 0.8, quality: 0.5 }
      };
      const { scale, quality } = settings[compressionLevel];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        
        // Render page to canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({ canvasContext: context, viewport }).promise;
        
        // Convert canvas to JPEG
        const imgData = canvas.toDataURL('image/jpeg', quality);
        
        // Embed JPEG into new PDF
        const img = await newPdf.embedJpg(imgData);
        
        // Add page with original aspect ratio
        const originalViewport = page.getViewport({ scale: 1 });
        const p = newPdf.addPage([originalViewport.width, originalViewport.height]);
        p.drawImage(img, { 
          x: 0, 
          y: 0, 
          width: originalViewport.width, 
          height: originalViewport.height 
        });
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setCompressedSize(blob.size);
    } catch (err) {
      console.error(err);
      setError('Failed to compress PDF. It might be corrupted or password protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setDownloadUrl('');
    setError('');
    document.getElementById('compress-pdf-input').value = '';
  };

  const reduction = originalSize && compressedSize ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF File</h3>
        <p className={styles.subtitle}>Reduce file size while keeping good quality</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="compress-pdf-input"
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

      {file && !isProcessing && !downloadUrl && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📄</span>
            <div>
              <h3 className={styles.fileName}>{file.name}</h3>
              <p className={styles.fileMeta}>Original Size: {formatBytes(originalSize)}</p>
            </div>
          </div>

          <div className={styles.modeSelector}>
            <button 
              className={`${styles.modeBtn} ${compressionLevel === 'low' ? styles.modeActive : ''}`}
              onClick={() => setCompressionLevel('low')}
            >
              🟢 Less Compression<br/><small>Best Quality</small>
            </button>
            <button 
              className={`${styles.modeBtn} ${compressionLevel === 'medium' ? styles.modeActive : ''}`}
              onClick={() => setCompressionLevel('medium')}
            >
              🟡 Medium<br/><small>Recommended</small>
            </button>
            <button 
              className={`${styles.modeBtn} ${compressionLevel === 'high' ? styles.modeActive : ''}`}
              onClick={() => setCompressionLevel('high')}
            >
              🔴 High Compression<br/><small>Smallest Size</small>
            </button>
          </div>

          <button className={styles.compressBtn} onClick={handleCompress}>
            🗜️ Compress PDF
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Compressing PDF... This may take a moment.</p>
        </div>
      )}

      {downloadUrl && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.successTitle}>✅ Compression Complete!</h3>
          
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Original</span>
              <span className={styles.statValue}>{formatBytes(originalSize)}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Compressed</span>
              <span className={styles.statValue}>{formatBytes(compressedSize)}</span>
            </div>
            <div className={`${styles.statBox} ${styles.highlightBox}`}>
              <span className={styles.statLabel}>Savings</span>
              <span className={styles.statValue}>{reduction}%</span>
            </div>
          </div>

          <a href={downloadUrl} download={`compressed_${file.name}`} className={styles.downloadBtn}>
            ⬇️ Download Compressed PDF
          </a>
          <button className={styles.clearBtn} onClick={handleClear}>
            Compress Another File
          </button>
        </div>
      )}
    </div>
  );
};

export default CompressPdf;
