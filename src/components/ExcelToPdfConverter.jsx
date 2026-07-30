import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './ExcelToPdfConverter.module.css';

const ExcelToPdfConverter = () => {
  const [fileData, setFileData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setFileData(null);

    const validTypes = ['.xlsx', '.xls', '.csv'];
    const fileName = file.name.toLowerCase();
    if (!validTypes.some(type => fileName.endsWith(type))) {
      setError('Please upload a valid Excel or CSV file.');
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheetsData = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
          return { name: sheetName, data: json };
        });

        setFileData({ name: file.name, sheets: sheetsData });
      } catch (err) {
        console.error(err);
        setError('Failed to read the Excel file. It might be corrupted.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
      setIsProcessing(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConvert = () => {
    if (!fileData) return;

    setIsProcessing(true);
    try {
      const doc = new jsPDF('landscape', 'pt', 'a4');
      let firstSheet = true;

      fileData.sheets.forEach((sheet) => {
        if (!firstSheet) doc.addPage();
        
        // Add Sheet name as a title
        doc.setFontSize(16);
        doc.text(`Sheet: ${sheet.name}`, 40, 40);

        if (sheet.data.length > 0) {
          autoTable(doc, {
            startY: 60,
            head: [sheet.data[0]], // First row as header
            body: sheet.data.slice(1), // Rest as body
            theme: 'grid',
            headStyles: { fillColor: [46, 125, 50], textColor: 255, fontStyle: 'bold' }, // Excel Green theme
            styles: { fontSize: 8, cellPadding: 4, overflow: 'linebreak' },
            columnStyles: { 0: { cellWidth: 100 } } // First column slightly wider
          });
        } else {
          doc.text("This sheet is empty.", 40, 60);
        }

        firstSheet = false;
      });

      const pdfName = fileData.name.replace(/\.(xlsx|xls|csv)$/i, '') + '.pdf';
      doc.save(pdfName);
    } catch (err) {
      console.error(err);
      setError('Failed to generate PDF. The spreadsheet might be too large or complex.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFileData(null);
    setError('');
    document.getElementById('excel-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Upload Excel File</h3>
        <p className={styles.subtitle}>Supports .xlsx, .xls, and .csv formats</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="excel-input"
            type="file" 
            accept=".xlsx,.xls,.csv" 
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
          <p>Processing data...</p>
        </div>
      )}

      {fileData && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📊</span>
            <div>
              <h3 className={styles.fileName}>{fileData.name}</h3>
              <p className={styles.fileMeta}>Contains {fileData.sheets.length} sheet(s)</p>
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

export default ExcelToPdfConverter;
