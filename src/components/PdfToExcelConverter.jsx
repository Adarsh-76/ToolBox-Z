import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import styles from './PdfToExcelConverter.module.css';

// Dynamically set the worker URL to match the exact installed version.
// This prevents Vite from crashing if the .mjs or .js file is missing.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToExcelConverter = () => {
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
      
      const allRows = [];

      // Loop through each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        
        // Group text items by their Y position to form rows
        const rows = {};
        content.items.forEach(item => {
          const y = item.transform[5];
          const x = item.transform[4];
          const text = item.str;
          
          // Find an existing row close to this Y (within 3 pixels)
          let rowKey = Object.keys(rows).find(k => Math.abs(parseFloat(k) - y) < 3);
          if (!rowKey) {
            rowKey = y.toString();
            rows[rowKey] = [];
          }
          rows[rowKey].push({ x, text });
        });

        // Sort rows by Y (top to bottom usually means high Y to low Y in PDF.js)
        const sortedYs = Object.keys(rows).map(Number).sort((a, b) => b - a);

        for (const y of sortedYs) {
          const items = rows[y].sort((a, b) => a.x - b.x); // Sort left to right
          let row = [];
          let currentText = '';
          let prevX = null;
          
          // Group items into columns based on X distance
          items.forEach(item => {
            if (prevX !== null && (item.x - prevX) > 20) { // 20px gap means new column
              row.push(currentText.trim());
              currentText = item.text;
            } else {
              currentText += ' ' + item.text;
            }
            prevX = item.x;
          });
          
          if (currentText) row.push(currentText.trim());
          
          // Only push non-empty rows
          if (row.some(cell => cell.length > 0)) {
            allRows.push(row);
          }
        }
      }

      setFileData({ name: file.name, rows: allRows });
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
      // Create a new worksheet from the array of arrays
      const ws = XLSX.utils.aoa_to_sheet(fileData.rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Extracted Data');

      // Download the Excel file
      const excelName = fileData.name.replace(/\.pdf$/i, '') + '.xlsx';
      XLSX.writeFile(wb, excelName);
    } catch (err) {
      console.error(err);
      setError('Failed to generate Excel file.');
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('pdf-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload PDF File</h3>
        <p className={styles.subtitle}>Supports text-based PDFs</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="pdf-input"
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
          <p>Extracting tables...</p>
        </div>
      )}

      {fileData && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📉</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Extracted {fileData.rows.length} rows of data</p>
            </div>
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert}
          >
            ⬇️ Download Excel File
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToExcelConverter;
