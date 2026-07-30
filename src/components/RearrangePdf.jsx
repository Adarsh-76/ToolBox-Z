import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './RearrangePdf.module.css';

const RearrangePdf = () => {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageOrder, setPageOrder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      setDownloadUrl('');
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const count = pdfDoc.getPageCount();
        setPageCount(count);
        // Pre-fill with default order (1, 2, 3...)
        setPageOrder(Array.from({ length: count }, (_, i) => i + 1).join(', '));
      } catch (err) {
        setError('Failed to read PDF. It might be corrupted.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      // Parse the page order string
      const desiredOrder = pageOrder.split(',')
        .map(p => parseInt(p.trim(), 10))
        .filter(p => !isNaN(p) && p >= 1 && p <= pageCount);

      if (desiredOrder.length === 0) {
        throw new Error('No valid pages entered. Please check your page numbers.');
      }

      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Copy pages in the desired order
      for (const pageNum of desiredOrder) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageNum - 1]); // -1 because array is 0-indexed
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPageCount(0);
    setPageOrder('');
    setDownloadUrl('');
    setError('');
    document.getElementById('rearrange-pdf-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF File</h3>
        <p className={styles.subtitle}>Reorder or delete pages from your PDF</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="rearrange-pdf-input"
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
            <label className={styles.rangeLabel}>New Page Order</label>
            <input 
              type="text" 
              value={pageOrder} 
              onChange={(e) => setPageOrder(e.target.value)} 
              placeholder="e.g., 3, 1, 2, 5" 
              className={styles.pageInput} 
            />
            <small className={styles.hint}>
              Enter pages in your desired order, separated by commas. <br/>
              <strong>Example:</strong> To delete page 2 and swap pages 1 and 3, type: <code>3, 1</code>
            </small>
          </div>

          {downloadUrl ? (
            <a href={downloadUrl} download={`rearranged_${file.name}`} className={styles.downloadBtn}>
              ⬇️ Download Rearranged PDF
            </a>
          ) : (
            <button className={styles.generateBtn} onClick={handleGenerate}>
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

export default RearrangePdf;
