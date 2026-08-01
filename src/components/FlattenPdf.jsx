import React, { useState, useEffect, useRef } from 'react';
import styles from './FlattenPdf.module.css';

const FlattenPdf = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const libLoaded = useRef(false);

  useEffect(() => {
    if (window.PDFLib || libLoaded.current) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
    script.async = true;
    script.onload = () => { libLoaded.current = true; };
    script.onerror = () => setError('Failed to load PDF processing library.');
    document.body.appendChild(script);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('');
      setError('');
      setDownloadUrl('');
    }
  };

  const handleFlatten = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }
    if (!window.PDFLib) {
      setError('Library is still loading. Please wait 2 seconds and try again.');
      return;
    }

    setIsProcessing(true);
    setStatus('Reading PDF...');
    setError('');
    setDownloadUrl('');

    try {
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const form = pdfDoc.getForm();
      
      setStatus('Flattening form fields...');
      // Flatten converts form fields into static page content
      form.flatten();

      setStatus('Saving flattened PDF...');
      const pdfBytes = await pdfDoc.save();
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus('✅ PDF flattened successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to flatten PDF. The file might be encrypted or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.label}>Upload Interactive PDF</h3>
        <input 
          type="file" 
          accept=".pdf"
          onChange={handleFileChange}
          className={styles.fileInput}
          id="flatten-pdf-upload"
        />
        <label htmlFor="flatten-pdf-upload" className={styles.fileLabel}>
          {file ? `📄 ${file.name}` : 'Click to select PDF file'}
        </label>
      </div>

      <button 
        className={styles.actionBtn} 
        onClick={handleFlatten}
        disabled={!file || isProcessing}
      >
        {isProcessing ? '⏳ Processing...' : '🔒 Flatten PDF'}
      </button>

      {status && <p className={styles.status}>{status}</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {downloadUrl && (
        <div className={`liquid-glass ${styles.downloadBox}`}>
          <h4>✅ Success!</h4>
          <a href={downloadUrl} download={`${file.name.replace('.pdf', '')}-flattened.pdf`} className={styles.downloadLink}>
            ⬇️ Download Flattened PDF
          </a>
        </div>
      )}

      <div className={`liquid-glass ${styles.noteBox}`}>
        <h4>📝 What does flattening do?</h4>
        <p>Flattening a PDF converts all interactive form fields (text boxes, checkboxes, radio buttons) into standard, static text and graphics on the page. This prevents anyone from editing the form data later.</p>
      </div>
    </div>
  );
};

export default FlattenPdf;
