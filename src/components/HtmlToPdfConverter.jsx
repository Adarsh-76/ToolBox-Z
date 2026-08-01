import React, { useState, useEffect, useRef } from 'react';
import styles from './HtmlToPdfConverter.module.css';

const HtmlToPdfConverter = () => {
  const [htmlContent, setHtmlContent] = useState('<h1 style="color: blue;">Hello ToolBox Z!</h1>\n<p>Edit this HTML to generate your PDF.</p>');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const previewRef = useRef(null);
  const libLoaded = useRef(false);

  // Dynamically load html2pdf.js from CDN to keep Vite bundle small
  useEffect(() => {
    if (window.html2pdf || libLoaded.current) return;
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.onload = () => { libLoaded.current = true; };
    script.onerror = () => setError('Failed to load PDF generation library.');
    document.body.appendChild(script);
  }, []);

  const handleGenerate = () => {
    if (!window.html2pdf) {
      setError('Library is still loading, please wait 2 seconds and try again.');
      return;
    }

    setIsGenerating(true);
    setError('');

    // Clone the preview div so we don't mess up the live DOM styles
    const element = previewRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'toolbox-converted.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      html2pdf: { useCORS: true }
    };

    // Generate PDF
    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
    }).catch((err) => {
      console.error(err);
      setError('Error generating PDF. Please check your HTML for external images blocking CORS.');
      setIsGenerating(false);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={`liquid-glass ${styles.inputWrapper}`}>
          <h3 className={styles.label}>HTML Code Input</h3>
          <textarea 
            className={styles.textarea}
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            placeholder="<h1>Hello World</h1>"
          />
          <button 
            className={styles.actionBtn} 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? '⏳ Generating...' : '⚡ Convert to PDF'}
          </button>
        </div>
        
        <div className={`liquid-glass ${styles.outputWrapper}`}>
          <h3 className={styles.label}>Live Preview</h3>
          <div className={styles.previewArea}>
            {/* This is the hidden element that actually gets rendered to PDF */}
            <div 
              ref={previewRef} 
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </div>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={`liquid-glass ${styles.noteBox}`}>
        <h4>📝 Note on External Images</h4>
        <p>If your HTML contains external images, they must allow Cross-Origin Resource Sharing (CORS), otherwise the PDF generation might block them to prevent canvas tainted errors.</p>
      </div>
    </div>
  );
};

export default HtmlToPdfConverter;
