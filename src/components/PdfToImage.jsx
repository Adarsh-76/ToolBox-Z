import React, { useState, useEffect, useRef } from 'react';
import styles from './PdfToImage.module.css';

const PdfToImage = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('png'); // 'png' or 'jpeg'
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const libsLoaded = useRef(false);

  useEffect(() => {
    if (libsLoaded.current) return;
    
    const loadScript = (src) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js')
    ]).then(() => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      libsLoaded.current = true;
    }).catch(() => setError('Failed to load processing libraries.'));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImages([]);
      setError('');
      setStatus('');
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a PDF file first.');
      return;
    }

    if (!libsLoaded.current || !window.pdfjsLib) {
      setError('Libraries are still loading. Please wait 2 seconds and try again.');
      return;
    }

    setIsProcessing(true);
    setStatus('Reading PDF...');
    setError('');
    setImages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const extractedImages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setStatus(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        
        // Scale 2 for high-definition (HD) output
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 0.92);
        
        extractedImages.push({ page: i, dataUrl });
      }

      setImages(extractedImages);
      setStatus(`✅ Successfully converted ${pdf.numPages} pages!`);
    } catch (err) {
      console.error(err);
      setError('Failed to convert PDF. The file might be corrupted or password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (!window.JSZip) {
      setError('Zip library not loaded yet.');
      return;
    }

    setStatus('Preparing ZIP file...');
    const zip = new window.JSZip();
    const folder = zip.folder('pdf-images');

    images.forEach((img) => {
      const base64Data = img.dataUrl.split(',')[1];
      folder.file(`page-${img.page}.${format}`, base64Data, { base64: true });
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-pdf-images.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus('');
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.label}>Upload PDF File</h3>
        <input 
          type="file" 
          accept=".pdf"
          onChange={handleFileChange}
          className={styles.fileInput}
          id="pdf-to-img-upload"
        />
        <label htmlFor="pdf-to-img-upload" className={styles.fileLabel}>
          {file ? `📄 ${file.name}` : 'Click to select PDF'}
        </label>
      </div>

      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.formatSelector}>
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="format" 
              value="png" 
              checked={format === 'png'} 
              onChange={(e) => setFormat(e.target.value)} 
            />
            <span>PNG (HD Quality)</span>
          </label>
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="format" 
              value="jpeg" 
              checked={format === 'jpeg'} 
              onChange={(e) => setFormat(e.target.value)} 
            />
            <span>JPEG (Smaller Size)</span>
          </label>
        </div>

        <button 
          className={styles.actionBtn} 
          onClick={handleConvert}
          disabled={!file || isProcessing}
        >
          {isProcessing ? '⏳ Converting...' : '⚡ Convert to Images'}
        </button>
      </div>

      {status && <p className={styles.status}>{status}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {images.length > 0 && (
        <div className={styles.resultsHeader}>
          <h3>Converted Images ({images.length})</h3>
          <button className={styles.zipBtn} onClick={downloadAllAsZip}>
            📦 Download All as ZIP
          </button>
        </div>
      )}

      <div className={styles.imageGrid}>
        {images.map((img, i) => (
          <div key={i} className={`liquid-glass ${styles.imageCard}`}>
            <img src={img.dataUrl} alt={`Page ${img.page}`} className={styles.previewImg} />
            <a 
              href={img.dataUrl} 
              download={`page-${img.page}.${format}`}
              className={styles.downloadLink}
            >
              ⬇️ Download Page {img.page}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfToImage;
