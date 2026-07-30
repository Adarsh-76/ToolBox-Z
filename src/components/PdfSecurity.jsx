import React, { useState, useMemo } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from './PdfSecurity.module.css';

const PdfSecurity = () => {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('protect');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Granular Permissions State
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [allowCopying, setAllowCopying] = useState(true);
  const [allowEditing, setAllowEditing] = useState(true);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // Password Strength Analyzer Logic
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'None', color: '#666' };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score: 33, label: 'Weak', color: '#ff4d4d' };
    if (score <= 4) return { score: 66, label: 'Medium', color: '#ffc107' };
    return { score: 100, label: 'Strong', color: '#4caf50' };
  }, [password]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') {
      setFile(f);
      setError('');
      setDownloadUrl('');
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleGenerate = async () => {
    if (!file) return;
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (mode === 'protect' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      if (mode === 'protect') {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pdfBytes = await pdfDoc.save({
          userPassword: password,
          ownerPassword: password,
          permissions: {
            printing: allowPrinting ? 'highResolution' : 'denied',
            copying: allowCopying,
            modifying: allowEditing,
            annotating: allowEditing,
            fillingForms: allowEditing,
            extractingContent: allowCopying,
            assembling: allowEditing,
          },
        });
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
      }
    } catch (err) {
      console.error(err);
      if (mode === 'unlock') {
        setError('Failed to unlock. The password might be incorrect.');
      } else {
        setError('Failed to secure PDF.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPassword('');
    setConfirmPassword('');
    setAllowPrinting(true);
    setAllowCopying(true);
    setAllowEditing(true);
    setDownloadUrl('');
    setError('');
    document.getElementById('pdf-security-input').value = '';
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.uploadArea}`}>
        <h3 className={styles.title}>Advanced PDF Protection Tool</h3>
        <p className={styles.subtitle}>Enterprise-level encryption, permissions, and strength analysis</p>
        
        <label className={styles.fileLabel}>
          <input id="pdf-security-input" type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />
          <span className={`${styles.uploadBtn} ${file ? styles.uploaded : ''}`}>
            {file ? `✅ ${file.name.substring(0, 20)}...` : '📁 Choose PDF'}
          </span>
        </label>
      </div>

      {error && <div className={styles.errorBox}>{error}</div>}

      {file && !isProcessing && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>🛡️</span>
            <div>
              <h3 className={styles.fileName}>{file.name}</h3>
            </div>
          </div>

          <div className={styles.modeSelector}>
            <button className={`${styles.modeBtn} ${mode === 'protect' ? styles.modeActive : ''}`} onClick={() => setMode('protect')}>
              🔒 Protect (Add Password)
            </button>
            <button className={`${styles.modeBtn} ${mode === 'unlock' ? styles.modeActive : ''}`} onClick={() => setMode('unlock')}>
              🔓 Unlock (Remove Password)
            </button>
          </div>

          <div className={styles.optionsGroup}>
            <div className={styles.inputRow}>
              <label>{mode === 'protect' ? 'Create Password' : 'Enter Current Password'}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.textInput} placeholder="Enter password..." />
              
              {mode === 'protect' && password && (
                <div className={styles.strengthMeter}>
                  <div className={styles.strengthBar} style={{ width: `${passwordStrength.score}%`, background: passwordStrength.color }}></div>
                  <span className={styles.strengthLabel} style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                </div>
              )}
            </div>
            
            {mode === 'protect' && (
              <div className={styles.inputRow}>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.textInput} placeholder="Confirm password..." />
              </div>
            )}
          </div>

          {mode === 'protect' && (
            <div className={styles.permissionsGroup}>
              <h4 className={styles.permTitle}>Granular Permissions</h4>
              <p className={styles.permDesc}>Restrict what users can do with the document (requires a PDF reader that enforces permissions).</p>
              
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={allowPrinting} onChange={(e) => setAllowPrinting(e.target.checked)} />
                <span>Allow Printing</span>
              </label>
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={allowCopying} onChange={(e) => setAllowCopying(e.target.checked)} />
                <span>Allow Copying Text & Images</span>
              </label>
              <label className={styles.checkboxRow}>
                <input type="checkbox" checked={allowEditing} onChange={(e) => setAllowEditing(e.target.checked)} />
                <span>Allow Editing & Annotations</span>
              </label>
            </div>
          )}

          {downloadUrl ? (
            <a href={downloadUrl} download={`${mode === 'protect' ? 'secured' : 'unlocked'}_${file.name}`} className={styles.downloadBtn}>
              ⬇️ Download {mode === 'protect' ? 'Secured' : 'Unlocked'} PDF
            </a>
          ) : (
            <button className={styles.generateBtn} onClick={handleGenerate}>
              🛡️ {mode === 'protect' ? 'Encrypt PDF' : 'Unlock PDF'}
            </button>
          )}
          
          <button className={styles.clearBtn} onClick={handleClear}>Start Over</button>
        </div>
      )}

      {isProcessing && (
        <div className={styles.processingBox}>
          <div className={styles.spinner}></div>
          <p>Processing PDF...</p>
        </div>
      )}
    </div>
  );
};

export default PdfSecurity;
