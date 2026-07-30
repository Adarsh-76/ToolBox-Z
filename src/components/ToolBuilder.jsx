import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ToolBuilder.module.css';

const availableSteps = [
  { id: 'uppercase', label: 'Uppercase', fn: (val) => val.toUpperCase() },
  { id: 'lowercase', label: 'Lowercase', fn: (val) => val.toLowerCase() },
  { id: 'trim', label: 'Trim Spaces', fn: (val) => val.trim() },
  { id: 'reverse', label: 'Reverse Text', fn: (val) => val.split('').reverse().join('') },
  { id: 'removeSpaces', label: 'Remove All Spaces', fn: (val) => val.replace(/\s+/g, '') },
  { id: 'base64Encode', label: 'Base64 Encode', fn: (val) => btoa(val) },
  { id: 'base64Decode', label: 'Base64 Decode', fn: (val) => atob(val) },
  { id: 'urlEncode', label: 'URL Encode', fn: (val) => encodeURIComponent(val) },
  { id: 'urlDecode', label: 'URL Decode', fn: (val) => decodeURIComponent(val) },
];

const ToolBuilder = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('⚡');
  const [steps, setSteps] = useState([]);
  const [outputType, setOutputType] = useState('text');

  const addStep = (step) => {
    setSteps([...steps, step]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name || steps.length === 0) {
      alert('Please give your tool a name and add at least one step.');
      return;
    }
    onSave({ name, icon, steps, outputType });
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={`liquid-glass ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>🛠️ Create Custom Tool</h3>
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <div className={styles.formGroup}>
          <label>Tool Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder="e.g., My Secret Encoder" />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Icon (Emoji)</label>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className={styles.input} maxLength="2" />
          </div>
          <div className={styles.formGroup}>
            <label>Output Type</label>
            <select value={outputType} onChange={(e) => setOutputType(e.target.value)} className={styles.select}>
              <option value="text">Display as Text</option>
              <option value="download">Download as File</option>
            </select>
          </div>
        </div>

        <div className={styles.pipelineArea}>
          <h4>Your Pipeline (Steps run top to bottom)</h4>
          <div className={styles.pipelineList}>
            {steps.length === 0 ? (
              <p className={styles.emptyPipeline}>Add steps from the list below...</p>
            ) : (
              steps.map((step, i) => (
                <div key={i} className={styles.pipelineItem}>
                  <span>{i + 1}. {step.label}</span>
                  <button onClick={() => removeStep(i)}>✖</button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.availableSteps}>
          <h4>Available Formatters</h4>
          <div className={styles.stepsGrid}>
            {availableSteps.map(step => (
              <button key={step.id} className={styles.stepBtn} onClick={() => addStep(step)}>
                + {step.label}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>💾 Save Custom Tool</button>
      </div>
    </div>,
    document.body
  );
};

export default ToolBuilder;
