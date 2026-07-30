import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './AddPagesPdf.module.css';

const AddPagesPdf = () => {
  const [baseFile, setBaseFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [insertAfter, setInsertAfter] = useState('end'); // 'end' or page number
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleBaseFile = async (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setBaseFile(f);
      setError('');
      setDownloadUrl('');
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (err) {
        setError('Failed to read base PDF.');
      }
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      setError('');
    }
  };

  const handleGenerate = async () => {
    if (!baseFile) {
      setError('Please select a base PDF first.');
      return;
    }
    if (imageFiles.length === 0) {
      setError('Please select at least one image to insert.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await baseFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      // 1. Determine insertion index
      let insertIndex = sourcePdf.getPageCount(); // Default to end
      if (insertAfter !== 'end') {
        const num = parseInt(insertAfter, 10);
        if (!isNaN(num) && num >= 0 && num <= sourcePdf.getPageCount()) {
          insertIndex = num; // Insert AFTER the specified page number (0 means at the very beginning)
        }
      }

      // 2. Copy base pages up to insertion point
      if (insertIndex > 0) {
        const basePagesIndices = Array.from({ length: insertIndex }, (_, i) => i);
        const basePages = await newPdf.copyPages(sourcePdf, basePagesIndices);
        basePages.forEach(p => newPdf.addPage(p));
      }

      // 3. Embed images and add as new pages
      for (const imgFile of imageFiles) {
        const imgArrayBuffer = await imgFile.arrayBuffer();
        let img;
        if (imgFile.type === 'image/png') {
          img = await newPdf.embedPng(imgArrayBuffer);
        } else {
          img = await newPdf.embedJpg(imgArrayBuffer);
        }
        const page = newPdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }

      // 4. Copy the rest of the base pages
      if (insertIndex < sourcePdf.getPageCount()) {
        const restPagesIndices = Array.from({ length: sourcePdf.getPageCount() - insertIndex }, (_, i) => i + insertIndex);
        const restPages = await newPdf.copyPages(sourcePdf, restPagesIndices);
        restPages.forEach(p => newPdf.addPage(p));
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate PDF. One of the images might be corrupted or in an unsupported format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setBaseFile(null);
    setPageCount(0);
    setImageFiles([]);
    setInsertAfter('end');
    setDownloadUrl('');
    setError('');
    document.getElementById('base-pdf-input').value = '';
    document.getElementById('image-files-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <div className={styles.fileGrid}>
          <div className={styles.fileBox}>
            <h3 className={styles.fileTitle}>1. Base PDF</h3>
            <label className={styles.fileLabel}>
              <input id="base-pdf-input" type="file" accept="application/pdf" onChange={handleBaseFile} className={styles.fileInput} />
              <span className={`${styles.uploadBtn} ${baseFile ? styles.uploaded : ''}`}>
                {baseFile ? `✅ ${baseFile.name.substring(0, 15)}...` : '📁 Choose PDF'}
              </span>
            </label>
            {baseFile && <small className={styles.hint}>Pages: {pageCount}</small>}
          </div>

          <div className={styles.fileBox}>
            <h3 className={styles.fileTitle}>2. New Pages (Images)</h3>
            <label className={styles.fileLabel}>
              <input id="image-files-input" type="file" accept="image/*" multiple onChange={handleImageFiles} className={styles.fileInput} />
              <span className={`${styles.uploadBtn} ${imageFiles.length > 0 ? styles.uploaded : ''}`}>
                {imageFiles.length > 0 ? `✅ ${imageFiles.length} Images` : '📁 Choose Images'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {baseFile && imageFiles.length > 0 && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.inputGroup}>
            <label className={styles.rangeLabel}>Insert images after page:</label>
            <select 
              className={styles.selectInput} 
              value={insertAfter} 
              onChange={(e) => setInsertAfter(e.target.value)}
            >
              <option value="end">At the End</option>
              <option value="0">At the Beginning (Page 1)</option>
              {Array.from({ length: pageCount }, (_, i) => (
                <option key={i} value={i + 1}>After Page {i + 1}</option>
              ))}
            </select>
            <small className={styles.hint}>The images will be added in the order you selected them.</small>
          </div>

          {downloadUrl ? (
            <a href={downloadUrl} download={`updated_${baseFile.name}`} className={styles.downloadBtn}>
              ⬇️ Download Updated PDF
            </a>
          ) : (
            <button className={styles.generateBtn} onClick={handleGenerate}>
              📄 Generate New PDF
            </button>
          )}
          
          <button className={styles.clearBtn} onClick={handleClear}>
            Start Over
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

export default AddPagesPdf;
