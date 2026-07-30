import React, { useState } from 'react';
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import styles from './PowerpointToPdfConverter.module.css';

const PowerpointToPdfConverter = () => {
  const [fileData, setFileData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setFileData(null);

    if (!file.name.toLowerCase().endsWith('.pptx')) {
      setError('Please upload a valid .pptx file. (Old .ppt format is not supported)');
      return;
    }

    setIsProcessing(true);

    try {
      const zip = await JSZip.loadAsync(file);
      
      // Find all slide XML files
      const slideFiles = Object.keys(zip.files).filter(name => name.match(/^ppt\/slides\/slide[0-9]+\.xml$/));
      
      // Sort slides correctly (slide1, slide2, ..., slide10)
      slideFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slide([0-9]+)/)[1], 10);
        const numB = parseInt(b.match(/slide([0-9]+)/)[1], 10);
        return numA - numB;
      });

      const slidesText = [];

      for (const slideFile of slideFiles) {
        const content = await zip.files[slideFile].async('string');
        // Extract text using regex from XML <a:t> tags
        const matches = content.match(/<a:t>([^<]*)<\/a:t>/g);
        const text = matches ? matches.map(m => m.replace(/<\/?a:t>/g, '')).join('\n') : '';
        slidesText.push(text);
      }

      setFileData({ name: file.name, slides: slidesText });
    } catch (err) {
      console.error(err);
      setError('Failed to read PowerPoint file. It might be corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvert = () => {
    if (!fileData) return;

    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 40;
      const maxWidth = pageWidth - margin * 2;

      fileData.slides.forEach((text, index) => {
        if (index > 0) doc.addPage();
        
        // Add Slide Number Header
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(`Slide ${index + 1}`, margin, margin);
        
        // Add a line under the header
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, margin + 10, pageWidth - margin, margin + 10);

        // Add Slide Text
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(30, 30, 30);
        
        const splitText = doc.splitTextToSize(text, maxWidth);
        doc.text(splitText, margin, margin + 30, {
          maxHeight: pageHeight - margin * 2 - 30
        });
      });

      const pdfName = fileData.name.replace(/\.pptx$/i, '') + '.pdf';
      doc.save(pdfName);
    } catch (err) {
      console.error(err);
      setError('Failed to generate PDF.');
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('pptx-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload PowerPoint</h3>
        <p className={styles.subtitle}>Supports .pptx format</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="pptx-input"
            type="file" 
            accept=".pptx" 
            onChange={handleFileChange} 
            className={styles.fileInput}
          />
          <span className={styles.uploadBtn}>📁 Choose File</span>
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
            <span className={styles.fileIcon}>📽️</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Found {fileData.slides.length} slides</p>
            </div>
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert}
          >
            ⬇️ Convert & Download PDF
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PowerpointToPdfConverter;
