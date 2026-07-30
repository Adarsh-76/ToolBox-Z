import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { diffLines } from 'diff';
import styles from './ComparePdf.module.css';

// Vite-safe worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ComparePdf = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [diffResult, setDiffResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFile(file);
      setError('');
    } else {
      setError('Please select valid PDF files.');
    }
  };

  const extractText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text;
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please select both PDF files to compare.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const text1 = await extractText(file1);
      const text2 = await extractText(file2);

      const diff = diffLines(text1, text2);
      
      // Map diff into left/right aligned rows
      const leftLines = [];
      const rightLines = [];

      diff.forEach(part => {
        const lines = part.value.split('\n').filter(l => l.trim() !== '');
        
        if (part.added) {
          lines.forEach(l => rightLines.push({ text: l, type: 'added' }));
          lines.forEach(_ => leftLines.push({ text: '', type: 'empty' }));
        } else if (part.removed) {
          lines.forEach(l => leftLines.push({ text: l, type: 'removed' }));
          lines.forEach(_ => rightLines.push({ text: '', type: 'empty' }));
        } else {
          lines.forEach(l => {
            leftLines.push({ text: l, type: 'normal' });
            rightLines.push({ text: l, type: 'normal' });
          });
        }
      });

      setDiffResult({ leftLines, rightLines });
    } catch (err) {
      console.error(err);
      setError('Failed to read PDFs. They might be corrupted or scanned.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile1(null);
    setFile2(null);
    setDiffResult(null);
    setError('');
    document.getElementById('pdf-file-1').value = '';
    document.getElementById('pdf-file-2').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <div className={styles.fileGrid}>
          <div className={styles.fileBox}>
            <h3 className={styles.fileTitle}>Original PDF</h3>
            <label className={styles.fileLabel}>
              <input id="pdf-file-1" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setFile1)} className={styles.fileInput} />
              <span className={`${styles.uploadBtn} ${file1 ? styles.uploaded : ''}`}>
                {file1 ? `✅ ${file1.name.substring(0, 15)}...` : '📁 Choose File 1'}
              </span>
            </label>
          </div>

          <div className={styles.fileBox}>
            <h3 className={styles.fileTitle}>Modified PDF</h3>
            <label className={styles.fileLabel}>
              <input id="pdf-file-2" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setFile2)} className={styles.fileInput} />
              <span className={`${styles.uploadBtn} ${file2 ? styles.uploaded : ''}`}>
                {file2 ? `✅ ${file2.name.substring(0, 15)}...` : '📁 Choose File 2'}
              </span>
            </label>
          </div>
        </div>

        <button className={styles.compareBtn} onClick={handleCompare} disabled={isProcessing || !file1 || !file2}>
          {isProcessing ? '⏳ Comparing...' : '🔍 Compare PDFs'}
        </button>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {diffResult && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h3 className={styles.resultTitle}>Differences Found</h3>
          <div className={styles.diffContainer}>
            <div className={styles.diffColumn}>
              <div className={styles.columnHeader}>Original</div>
              {diffResult.leftLines.map((line, i) => (
                <div key={i} className={`${styles.diffLine} ${styles[line.type]}`}>
                  <span className={styles.lineNum}>{i + 1}</span>
                  <span className={styles.lineText}>{line.text || ' '}</span>
                </div>
              ))}
            </div>
            <div className={styles.diffColumn}>
              <div className={styles.columnHeader}>Modified</div>
              {diffResult.rightLines.map((line, i) => (
                <div key={i} className={`${styles.diffLine} ${styles[line.type]}`}>
                  <span className={styles.lineNum}>{i + 1}</span>
                  <span className={styles.lineText}>{line.text || ' '}</span>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.clearBtn} onClick={handleClear}>Clear Comparison</button>
        </div>
      )}
    </div>
  );
};

export default ComparePdf;
