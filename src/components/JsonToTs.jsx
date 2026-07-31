import React, { useState } from 'react';
import styles from './JsonToTs.module.css';

const JsonToTs = () => {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "ToolBox",\n  "version": 1.0,\n  "isLive": true,\n  "tags": ["dev", "tools"],\n  "author": {\n    "id": 123,\n    "role": "admin"\n  }\n}');
  const [tsOutput, setTsOutput] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateTs = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      const interfaces = [];
      
      const formatName = (baseName) => {
        if (!baseName) return 'RootObject';
        return baseName.charAt(0).toUpperCase() + baseName.slice(1);
      };

      const process = (obj, name) => {
        if (Array.isArray(obj)) {
          if (obj.length > 0) {
            if (typeof obj[0] === 'object' && obj[0] !== null) {
              const childName = formatName(`${name}Item`);
              process(obj[0], childName);
              interfaces.push(`type ${name} = ${childName}[];`);
            } else {
              interfaces.push(`type ${name} = ${typeof obj[0]}[];`);
            }
          } else {
            interfaces.push(`type ${name} = any[];`);
          }
          return;
        }
        
        if (typeof obj !== 'object' || obj === null) {
          interfaces.push(`type ${name} = ${obj === null ? 'null' : typeof obj};`);
          return;
        }

        let props = [];
        for (const key in obj) {
          const val = obj[key];
          let type = 'any';
          
          if (typeof val === 'string') type = 'string';
          else if (typeof val === 'number') type = 'number';
          else if (typeof val === 'boolean') type = 'boolean';
          else if (val === null) type = 'null';
          else if (Array.isArray(val)) {
            if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
              const childName = formatName(`${key}`);
              process(val[0], childName);
              type = `${childName}[]`;
            } else if (val.length > 0) {
              type = `${typeof val[0]}[]`;
            } else {
              type = 'any[]';
            }
          } else if (typeof val === 'object') {
            const childName = formatName(`${key}`);
            process(val, childName);
            type = childName;
          }
          props.push(`  ${key}: ${type};`);
        }
        interfaces.push(`export interface ${name} {\n${props.join('\n')}\n}`);
      };

      process(parsed, 'RootObject');
      setTsOutput(interfaces.reverse().join('\n\n'));
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
      setTsOutput('');
    }
  };

  const handleCopy = () => {
    if (tsOutput) {
      navigator.clipboard.writeText(tsOutput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={`liquid-glass ${styles.inputWrapper}`}>
          <h3 className={styles.label}>JSON Input</h3>
          <textarea 
            className={styles.textarea}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
          />
          <button className={styles.actionBtn} onClick={generateTs}>
            ⚡ Convert to TypeScript
          </button>
        </div>
        
        <div className={`liquid-glass ${styles.outputWrapper}`}>
          <div className={styles.outputHeader}>
            <h3 className={styles.label}>TypeScript Interfaces</h3>
            {tsOutput && (
              <button 
                className={`${styles.copyBtn} ${isCopied ? styles.copied : ''}`}
                onClick={handleCopy}
              >
                {isCopied ? '✅ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <pre className={styles.outputCode}>{tsOutput || '// Output will appear here'}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonToTs;
