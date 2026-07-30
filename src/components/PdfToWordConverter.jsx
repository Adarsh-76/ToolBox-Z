import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import styles from './PdfToWordConverter.module.css';

// Vite-safe worker URL (matches exact installed version automatically)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToWordConverter = () => {
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
      let extractedText = [];

      // Loop through each page and extract text
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        extractedText.push(pageText);
      }

      setFileData({ name: file.name, text: extractedText.join('\n\n') });
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
      // Wrap text in basic HTML that Microsoft Word can read
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Exported Document</title></head>
        <body style="font-family: Arial, sans-serif; font-size: 12pt;">
        ${fileData.text.split('\n').map(p => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')}
        </body>
        </html>
      `;

      // Create a .doc file blob
      const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileData.name.replace(/\.pdf$/i, '') + '.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate Word document.');
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('pdf-to-word-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload PDF File</h3>
        <p className={styles.subtitle}>Supports text-based PDFs</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="pdf-to-word-input"
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
          <p>Extracting text...</p>
        </div>
      )}

      {fileData && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📝</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Text extracted successfully</p>
            </div>
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert}
          >
            ⬇️ Download Word Document
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToWordConverter;
