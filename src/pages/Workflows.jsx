import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import { workflowsList } from '../data/workflows';
import styles from './Workflows.module.css';

const Workflows = () => {
  const navigate = useNavigate();
  const [activeWorkflow, setActiveWorkflow] = useState(null);

  const getToolInfo = (toolId) => {
    return toolsList.find(t => t.id === toolId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛤️ Fastest Routes</h1>
        <p className={styles.subtitle}>Complex tasks made simple. Follow these guided workflows instead of searching for tools one by one.</p>
      </div>

      <div className={styles.grid}>
        {workflowsList.map((wf) => (
          <div 
            key={wf.id} 
            className={`liquid-glass ${styles.card} ${activeWorkflow === wf.id ? styles.activeCard : ''}`}
            onClick={() => setActiveWorkflow(activeWorkflow === wf.id ? null : wf.id)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{wf.icon}</span>
              <div>
                <h3 className={styles.cardTitle}>{wf.title}</h3>
                <p className={styles.cardDesc}>{wf.desc}</p>
              </div>
              <span className={styles.chevron}>{activeWorkflow === wf.id ? '▲' : '▼'}</span>
            </div>

            {activeWorkflow === wf.id && (
              <div className={styles.stepsContainer}>
                <h4 className={styles.stepsTitle}>Follow these steps:</h4>
                {wf.steps.map((step, i) => {
                  const tool = getToolInfo(step.toolId);
                  if (!tool) return null;
                  return (
                    <div key={i} className={styles.stepItem}>
                      <div className={styles.stepNumber}>{i + 1}</div>
                      <div className={styles.stepContent}>
                        <h5 className={styles.stepToolName}>{tool.icon} {tool.name}</h5>
                        <p className={styles.stepAction}>{step.action}</p>
                      </div>
                      <button 
                        className={styles.openToolBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tools/${tool.id}`);
                        }}
                      >
                        Open →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflows;
