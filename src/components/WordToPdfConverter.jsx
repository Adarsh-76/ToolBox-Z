import React, { useState, useRef } from 'react';
import mammoth from 'mammoth/mammoth.browser';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import styles from './WordToPdfConverter.module.css';

const WordToPdfConverter = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const hiddenRenderRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith('.docx')) {
      setError('Please upload a valid .docx file. (Legacy .doc is not supported)');
      return;
    }
    setFile(selectedFile);
    setError('');
    setProgress(0);
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById('wordPdfInput').value = '';
    if (hiddenRenderRef.current) hiddenRenderRef.current.innerHTML = '';
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');
    setProgress(10);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      // Extract HTML from DOCX
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setProgress(50);

      // Render HTML to hidden container
      if (hiddenRenderRef.current) {
        hiddenRenderRef.current.innerHTML = result.value;
      }
      setProgress(70);

      // Wait a brief moment for DOM to render
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture HTML to Canvas
      const canvas = await html2canvas(hiddenRenderRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      setProgress(85);

      // Generate PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Calculate image height to fit width
      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add extra pages if content is taller than one A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      setProgress(100);
      pdf.save(file.name.replace('.docx', '.pdf'));

    } catch (err) {
      console.error(err);
      setError('Failed to convert Word document. The file might be corrupted or password protected.');
    }
    setIsProcessing(false);
  };

  return (
    <div className={styles.container}>
      {!file ? (
        <div className={`liquid-glass ${styles.uploadArea}`}>
          <input 
            type="file" 
            accept=".docx" 
            onChange={handleFileChange} 
            id="wordPdfInput" 
            className={styles.hiddenInput}
          />
          <label htmlFor="wordPdfInput" className={styles.uploadLabel}>
            <span className={styles.uploadIcon}>📄</span>
            <span>Select Word Document (.docx)</span>
          </label>
        </div>
      ) : (
        <div className={styles.fileInfo}>
          <div className={`liquid-glass ${styles.fileCard}`}>
            <span className={styles.fileIcon}>📄</span>
            <div className={styles.fileDetails}>
              <h3 className={styles.fileName}>{file.name}</h3>
              <p className={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <button className={styles.removeBtn} onClick={handleRemoveFile}>✖️</button>
          </div>

          {isProcessing && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {error && <div className={styles.errorBox}>{error}</div>}

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert} 
            disabled={isProcessing}
          >
            {isProcessing ? `⏳ Converting... ${progress}%` : '📄 Convert to PDF'}
          </button>
        </div>
      )}

      {/* Hidden render area for html2canvas */}
      <div ref={hiddenRenderRef} className={styles.hiddenRender} style={{ width: '800px', padding: '40px', background: '#fff', color: '#000' }}></div>
    </div>
  );
};

export default WordToPdfConverter;
