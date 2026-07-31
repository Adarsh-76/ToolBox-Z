import React, { useState } from 'react';
import styles from './PdfToText.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PdfToText = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [text, setText] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    setError('');
    setText('');
    setWarning('');
    setPdfFile(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPdfBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleExtract = async () => {
    if (!pdfBase64) {
      setError('Please upload a PDF first.');
      return;
    }
    setLoading(true);
    setError('');
    setText('');
    setWarning('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/pdf-to-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64 })
      });
      const data = await res.json();
      if (data.success) {
        setText(data.text);
        if (data.warning) setWarning(data.warning);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted_text_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setPdfFile(null);
    setPdfBase64(null);
    setText('');
    setWarning('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <label>Upload PDF Document</label>
        <input type="file" accept="application/pdf" onChange={handleFile} className={styles.fileInput} />
        {pdfFile && <p className={styles.fileName}>📄 {pdfFile}</p>}
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.buttonRow}>
        <button className={styles.extractBtn} onClick={handleExtract} disabled={loading || !pdfBase64}>
          {loading ? '⏳ Extracting...' : '🔍 Extract Text'}
        </button>
        <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
      </div>

      {warning && (
        <div className={styles.warningBox}>
          <strong>⚠️ Notice:</strong> {warning}
        </div>
      )}

      {text && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.headerRow}>
            <h3>Extracted Text</h3>
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
              <button className={styles.actionBtn} onClick={handleDownload}>⬇️ Download .txt</button>
            </div>
          </div>
          <textarea 
            className={styles.textOutput} 
            value={text} 
            readOnly 
          />
        </div>
      )}
    </div>
  );
};

export default PdfToText;
