import React, { useState, useRef, useEffect } from 'react';
import styles from './PdfSigner.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PdfSigner = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signedPdf, setSignedPdf] = useState(null);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctxRef.current = ctx;
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    setError('');
    setSignedPdf(null);
    setHash('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setPdfData(e.target.result);
      setPdfFile(file.name);
    };
    reader.readAsDataURL(file);
  };

  const startDraw = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    if (!pdfData) {
      setError('Please upload a PDF first.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const sigBase64 = canvasRef.current.toDataURL('image/png');
      const res = await fetch(`${API_BASE_URL}/api/sign-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64: pdfData, sigBase64 })
      });
      const data = await res.json();
      if (data.success) {
        setSignedPdf(data.signedPdf);
        setHash(data.hash);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to backend.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = signedPdf;
    link.download = `signed_${pdfFile || 'document.pdf'}`;
    link.click();
  };

  const handleClear = () => {
    setPdfFile(null);
    setPdfData(null);
    setSignedPdf(null);
    setHash('');
    clearCanvas();
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <label>1. Upload PDF Document</label>
        <input type="file" accept="application/pdf" onChange={handleFile} className={styles.fileInput} />
        {pdfFile && <p className={styles.fileName}>📄 {pdfFile}</p>}
      </div>

      <div className={`liquid-glass ${styles.signArea}`}>
        <label>2. Draw your Signature</label>
        <canvas 
          ref={canvasRef}
          className={styles.canvas}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        <button className={styles.clearBtn} onClick={clearCanvas}>Clear Signature</button>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.buttonRow}>
        <button className={styles.signBtn} onClick={handleSign} disabled={loading || !pdfData}>
          {loading ? '⏳ Signing...' : '✍️ Sign Document'}
        </button>
        <button className={styles.resetBtn} onClick={handleClear}>🗑️ Reset</button>
      </div>

      {signedPdf && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3>✅ Document Signed Successfully!</h3>
          <p className={styles.hashLabel}>Cryptographic Tamper Seal (SHA-256):</p>
          <div className={styles.hashBox}>{hash}</div>
          <p className={styles.hint}>If this document is edited, this hash will change, proving it was tampered with.</p>
          <button className={styles.downloadBtn} onClick={handleDownload}>⬇️ Download Signed PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfSigner;
