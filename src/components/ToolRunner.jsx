import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ToolRunner.module.css';

const ToolRunner = ({ tool, onClose }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runPipeline = () => {
    setError('');
    setOutput('');
    let result = input;

    try {
      for (const step of tool.steps) {
        result = step.fn(result);
      }
      setOutput(result);
    } catch (err) {
      setError('Error running pipeline: ' + err.message + '. (Did you try to decode invalid text?)');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.name.replace(/\s/g, '_')}_output.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={`liquid-glass ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{tool.icon} {tool.name}</h3>
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <div className={styles.ioGrid}>
          <div className={styles.inputGroup}>
            <label>Input Data</label>
            <textarea 
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to process..."
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Output</label>
            <textarea 
              className={styles.textarea}
              value={output}
              readOnly
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.actions}>
          <button className={styles.runBtn} onClick={runPipeline}>▶️ Run Pipeline</button>
          {output && tool.outputType === 'text' && (
            <button className={styles.copyBtn} onClick={handleCopy}>📋 Copy</button>
          )}
          {output && tool.outputType === 'download' && (
            <button className={styles.downloadBtn} onClick={handleDownload}>⬇️ Download</button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ToolRunner;
