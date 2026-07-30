import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pptxgen from 'pptxgenjs';
import styles from './PdfToPptConverter.module.css';

// Vite-safe worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToPptConverter = () => {
  const [fileData, setFileData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setFileData(null);

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const slidesData = [];

      // Loop through each page and extract text
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        slidesData.push(pageText);
      }

      setFileData({ name: file.name, slides: slidesData });
    } catch (err) {
      console.error(err);
      setError('Failed to read PDF. It might be corrupted or scanned (needs OCR).');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvert = () => {
    if (!fileData) return;

    try {
      let pptx = new pptxgen();
      
      fileData.slides.forEach(text => {
        let slide = pptx.addSlide();
        slide.background = { color: 'FFFFFF' };
        
        // Add text box to slide
        slide.addText(text, {
          x: 0.5,
          y: 0.5,
          w: 9.0,
          h: 5.0,
          fontSize: 18,
          color: '363636',
          align: 'left',
          valign: 'top'
        });
      });

      const pptxName = fileData.name.replace(/\.pdf$/i, '');
      pptx.writeFile({ fileName: pptxName + '.pptx' });
    } catch (err) {
      console.error(err);
      setError('Failed to generate PowerPoint file.');
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('pdf-to-pptx-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload PDF File</h3>
        <p className={styles.subtitle}>Supports text-based PDFs</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="pdf-to-pptx-input"
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
            className={styles.fileInput}
          />
          <span className={styles.uploadBtn}>📁 Choose PDF</span>
        </label>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Extracting slides...</p>
        </div>
      )}

      {fileData && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>🖥️</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Found {fileData.slides.length} pages</p>
            </div>
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert}
          >
            ⬇️ Convert & Download PPTX
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToPptConverter;
