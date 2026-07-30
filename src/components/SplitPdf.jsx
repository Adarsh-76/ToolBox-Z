import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import styles from './SplitPdf.module.css';

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState('everyPage'); // 'everyPage' or 'ranges'
  const [ranges, setRanges] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (err) {
        setError('Failed to read PDF. It might be corrupted.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const zip = new JSZip();

      if (splitMode === 'everyPage') {
        for (let i = 0; i < sourcePdf.getPageCount(); i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          zip.file(`page_${i + 1}.pdf`, pdfBytes);
        }
      } else {
        if (!ranges) {
          setError('Please enter page ranges (e.g., 1-3, 4, 5-8).');
          setIsProcessing(false);
          return;
        }
        
        const rangeParts = ranges.split(',').map(r => r.trim());
        let fileIndex = 1;
        
        for (const part of rangeParts) {
          const newPdf = await PDFDocument.create();
          
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n, 10));
            if (isNaN(start) || isNaN(end) || start > end) throw new Error(`Invalid range: ${part}`);
            
            const indices = [];
            for (let i = start - 1; i <= end - 1; i++) {
              if (i >= 0 && i < sourcePdf.getPageCount()) indices.push(i);
            }
            
            if (indices.length > 0) {
              const pages = await newPdf.copyPages(sourcePdf, indices);
              pages.forEach(p => newPdf.addPage(p));
            }
          } else {
            const pageNum = parseInt(part, 10);
            if (isNaN(pageNum)) throw new Error(`Invalid page number: ${part}`);
            
            const index = pageNum - 1;
            if (index >= 0 && index < sourcePdf.getPageCount()) {
              const [page] = await newPdf.copyPages(sourcePdf, [index]);
              newPdf.addPage(page);
            }
          }
          
          const pdfBytes = await newPdf.save();
          zip.file(`split_part_${fileIndex}.pdf`, pdfBytes);
          fileIndex++;
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `split_pdfs_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      setError('Failed to split PDF. Check your ranges and file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPageCount(0);
    setRanges('');
    setError('');
    document.getElementById('split-pdf-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Select PDF File</h3>
        <p className={styles.subtitle}>Choose a PDF to split into multiple files</p>
        
        <label className={styles.fileLabel}>
          <input 
            id="split-pdf-input"
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

          <div className={styles.modeSelector}>
            <button 
              className={`${styles.modeBtn} ${splitMode === 'everyPage' ? styles.modeActive : ''}`}
              onClick={() => setSplitMode('everyPage')}
            >
              Split into single pages
            </button>
            <button 
              className={`${styles.modeBtn} ${splitMode === 'ranges' ? styles.modeActive : ''}`}
              onClick={() => setSplitMode('ranges')}
            >
              Split by custom ranges
            </button>
          </div>

          {splitMode === 'ranges' && (
            <div className={styles.inputGroup}>
              <label className={styles.rangeLabel}>Page Ranges (e.g., 1-3, 5, 7-9)</label>
              <input 
                type="text" 
                value={ranges} 
                onChange={(e) => setRanges(e.target.value)} 
                placeholder="1-3, 4, 5-8" 
                className={styles.rangeInput} 
              />
              <small className={styles.hint}>Each range will become a separate PDF file.</small>
            </div>
          )}

          <button 
            className={styles.splitBtn} 
            onClick={handleSplit}
            disabled={splitMode === 'ranges' && !ranges}
          >
            ✂️ Split & Download ZIP
          </button>
          <button className={styles.clearBtn} onClick={handleClear}>
            Remove File
          </button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Splitting PDF and packaging ZIP...</p>
        </div>
      )}
    </div>
  );
};

export default SplitPdf;
