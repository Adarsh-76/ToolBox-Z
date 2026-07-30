import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import styles from './PdfToCsvConverter.module.css';

// Vite-safe worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToCsvConverter = () => {
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

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        
        const rows = {};
        content.items.forEach(item => {
          const y = item.transform[5];
          const x = item.transform[4];
          const text = item.str;
          
          let rowKey = Object.keys(rows).find(k => Math.abs(parseFloat(k) - y) < 3);
          if (!rowKey) {
            rowKey = y.toString();
            rows[rowKey] = [];
          }
          rows[rowKey].push({ x, text });
        });

        const sortedYs = Object.keys(rows).map(Number).sort((a, b) => b - a);

        for (const y of sortedYs) {
          const items = rows[y].sort((a, b) => a.x - b.x);
          let row = [];
          let currentText = '';
          let prevX = null;
          
          items.forEach(item => {
            if (prevX !== null && (item.x - prevX) > 20) {
              row.push(currentText.trim());
              currentText = item.text;
            } else {
              currentText += ' ' + item.text;
            }
            prevX = item.x;
          });
          
          if (currentText) row.push(currentText.trim());
          
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
      // Convert array of arrays to a CSV string using SheetJS
      const ws = XLSX.utils.aoa_to_sheet(fileData.rows);
      const csv = XLSX.utils.sheet_to_csv(ws);
      
      // Download the CSV file
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileData.name.replace(/\.pdf$/i, '') + '.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate CSV file.');
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('pdf-csv-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload PDF File</h3>
        <p className={styles.subtitle}>Extracts tables and structured data</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="pdf-csv-input"
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
          <p>Extracting data...</p>
        </div>
      )}

      {fileData && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>🗂️</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Extracted {fileData.rows.length} rows of data</p>
            </div>
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleConvert}
          >
            ⬇️ Download CSV File
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToCsvConverter;
