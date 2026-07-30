import React, { useState } from 'react';
import styles from './JsonFormatter.module.css';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [fixesApplied, setFixesApplied] = useState([]);
  const [copied, setCopied] = useState(false);

  const autoFixJson = (str) => {
    let fixed = str;
    let fixes = [];

    // Fix 1: Replace single quotes with double quotes
    if (/['']/.test(fixed)) {
      fixed = fixed.replace(/['']/g, '"');
      fixes.push('Converted single quotes to double quotes');
    }

    // Fix 2: Remove trailing commas (common in Python dicts)
    if (/,\s*([}\]])/.test(fixed)) {
      fixed = fixed.replace(/,\s*([}\]])/g, '$1');
      fixes.push('Removed trailing commas');
    }

    // Fix 3: Convert Python booleans/null to JSON standard
    if (/\bTrue\b/.test(fixed) || /\bFalse\b/.test(fixed) || /\bNone\b/.test(fixed)) {
      fixed = fixed.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
      fixes.push('Converted Python (True/False/None) to JSON (true/false/null)');
    }

    // Fix 4: Add quotes to unquoted keys (e.g. {name: "John"} -> {"name": "John"})
    // This regex matches word characters followed by a colon
    if (/{\s*([a-zA-Z_]\w*)\s*:/.test(fixed) || /,\s*([a-zA-Z_]\w*)\s*:/.test(fixed)) {
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z_]\w*)(\s*:)/g, '$1"$2"$3');
      fixes.push('Added missing quotes around object keys');
    }

    return { fixedString: fixed, fixes };
  };

  const handleFormat = () => {
    setError('');
    setOutput('');
    setFixesApplied([]);

    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      return;
    }

    try {
      // Try parsing as-is first
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // If it fails, attempt to fix it
      const { fixedString, fixes } = autoFixJson(input);
      
      try {
        // Try parsing the fixed string
        const parsed = JSON.parse(fixedString);
        setOutput(JSON.stringify(parsed, null, 2));
        setFixesApplied(fixes); // Show the user what was fixed
      } catch (finalErr) {
        // If it still fails, show the error
        setError('Invalid JSON: ' + finalErr.message + '. Auto-fix could not resolve this issue.');
      }
    }
  };

  const handleFixClick = () => {
    // Manually trigger fix and apply it to the input area
    const { fixedString, fixes } = autoFixJson(input);
    try {
      const parsed = JSON.parse(fixedString);
      setInput(JSON.stringify(parsed, null, 2));
      setOutput(JSON.stringify(parsed, null, 2));
      setFixesApplied(fixes);
      setError('');
    } catch (finalErr) {
      setError('Invalid JSON: ' + finalErr.message + '. Auto-fix could not resolve this issue.');
    }
  };

  const handleMinify = () => {
    setError('');
    setFixesApplied([]);
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setFixesApplied([]);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <label>Input JSON</label>
        <textarea 
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste broken or valid JSON here... {"name": "ToolBox Z", "version": 1.0,}' // Example with trailing comma
          rows={8}
        />
        
        <div className={styles.buttonRow}>
          <button className={styles.formatBtn} onClick={handleFormat}>✨ Format</button>
          <button className={styles.minifyBtn} onClick={handleMinify}>📦 Minify</button>
          <button className={styles.clearBtn} onClick={handleClear}>🗑️ Clear</button>
        </div>
      </div>

      {/* Error Area with Auto-Fix Button */}
      {error && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>⚠️ {error}</p>
          <button className={styles.fixBtn} onClick={handleFixClick}>
            🪄 Fix Automatically
          </button>
        </div>
      )}

      {/* Success Fixes Log */}
      {fixesApplied.length > 0 && !error && (
        <div className={styles.fixesBox}>
          <h4>✨ Auto-Fix Applied Successfully!</h4>
          <ul>
            {fixesApplied.map((fix, i) => <li key={i}>{fix}</li>)}
          </ul>
        </div>
      )}

      {/* Output Area */}
      {output && (
        <div className={`liquid-glass ${styles.outputArea}`}>
          <div className={styles.outputHeader}>
            <h3>Formatted Output</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre className={styles.codeBlock}>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;
