import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './MergePdf.module.css';

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== selectedFiles.length) {
      setError('Some files were ignored. Please select only PDF files.');
    } else {
      setError('');
    }

    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    if ((direction === -1 && index === 0) || (direction === 1 && index === files.length - 1)) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + direction];
    newFiles[index + direction] = temp;
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      
      // Create Blob and trigger download
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_document_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Failed to merge PDFs. One of the files might be corrupted or password protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFiles([]);
    setError('');
    document.getElementById('merge-pdf-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF Files</h3>
        <p className={styles.subtitle}>Choose 2 or more PDFs to combine</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="merge-pdf-input"
            type="file" 
            accept="application/pdf" 
            multiple
            onChange={handleFileChange} 
            className={styles.fileInput}
          />
          <span className={styles.uploadBtn}>📁 Add PDF Files</span>
        </label>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Merging documents...</p>
        </div>
      )}

      {files.length > 0 && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.listTitle}>Files to Merge ({files.length})</h3>
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={index} className={styles.fileItem}>
                <span className={styles.fileIcon}>📄</span>
                <span className={styles.fileName}>{file.name}</span>
                <div className={styles.fileActions}>
                  <button className={styles.arrowBtn} onClick={() => moveFile(index, -1)} disabled={index === 0}>↑</button>
                  <button className={styles.arrowBtn} onClick={() => moveFile(index, 1)} disabled={index === files.length - 1}>↓</button>
                  <button className={styles.removeBtn} onClick={() => removeFile(index)}>✖️</button>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={styles.convertBtn} 
            onClick={handleMerge}
            disabled={files.length < 2}
          >
            ⬇️ Merge & Download PDF
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default MergePdf;
