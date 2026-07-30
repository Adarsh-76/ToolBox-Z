import React, { useState, useEffect } from 'react';
import ToolBuilder from '../components/ToolBuilder';
import ToolRunner from '../components/ToolRunner';
import styles from './MyCustomTools.module.css';

const MyCustomTools = () => {
  const [tools, setTools] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [runningTool, setRunningTool] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('customTools') || '[]');
    setTools(saved);
  }, []);

  const handleSaveTool = (newTool) => {
    const updatedTools = [...tools, { ...newTool, id: `custom-${Date.now()}` }];
    setTools(updatedTools);
    localStorage.setItem('customTools', JSON.stringify(updatedTools));
    setShowBuilder(false);
  };

  const handleDeleteTool = (id) => {
    const updatedTools = tools.filter(t => t.id !== id);
    setTools(updatedTools);
    localStorage.setItem('customTools', JSON.stringify(updatedTools));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛠️ My Custom Tools</h1>
        <p className={styles.subtitle}>Build your own mini-tools by chaining inputs, formatters, and outputs.</p>
        <button className={styles.createBtn} onClick={() => setShowBuilder(true)}>+ Create New Tool</button>
      </div>

      {tools.length === 0 ? (
        <div className={`liquid-glass ${styles.emptyState}`}>
          <span className={styles.emptyIcon}>🧩</span>
          <h2>No Custom Tools Yet</h2>
          <p>Click "Create New Tool" to build your own personalized pipeline.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {tools.map(tool => (
            <div key={tool.id} className={`liquid-glass ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{tool.icon}</span>
                <h3 className={styles.cardTitle}>{tool.name}</h3>
              </div>
              <p className={styles.cardDesc}>
                <strong>Steps:</strong> {tool.steps.map(s => s.label).join(' → ')}
              </p>
              <div className={styles.cardActions}>
                <button className={styles.runBtn} onClick={() => setRunningTool(tool)}>▶️ Run Tool</button>
                <button className={styles.deleteBtn} onClick={() => handleDeleteTool(tool.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showBuilder && (
        <ToolBuilder onClose={() => setShowBuilder(false)} onSave={handleSaveTool} />
      )}

      {runningTool && (
        <ToolRunner tool={runningTool} onClose={() => setRunningTool(null)} />
      )}
    </div>
  );
};

export default MyCustomTools;
