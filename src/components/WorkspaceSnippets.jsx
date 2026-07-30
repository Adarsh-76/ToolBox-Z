import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './WorkspaceSnippets.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;

const WorkspaceSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snippetToDelete, setSnippetToDelete] = useState(null); // State for delete confirmation

  useEffect(() => {
    const fetchSnippets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view saved snippets.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/snippets`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setSnippets(data.snippets);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch snippets.');
      }
      setLoading(false);
    };

    fetchSnippets();
  }, []);

  const handleConfirmDelete = async () => {
    if (!snippetToDelete) return;
    
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/api/snippets/${snippetToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSnippets(snippets.filter(s => s._id !== snippetToDelete._id));
      setSnippetToDelete(null); // Close modal
    } catch (err) {
      alert('Failed to delete snippet.');
      setSnippetToDelete(null);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  if (loading) return <div className={styles.loading}>Loading saved results...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>💾 Saved Results & Snippets</h2>
      <p className={styles.subtitle}>Results you save from tools are stored here permanently.</p>

      {error && <div className={styles.errorBox}>{error}</div>}

      {snippets.length === 0 && !error ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📂</span>
          <h3>No Saved Results Yet</h3>
          <p>Open any tool, generate a result, and click "Save to Workspace" to store it here.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {snippets.map(snip => (
            <div key={snip._id} className={`liquid-glass ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{snip.toolIcon}</span>
                <h3 className={styles.cardTitle}>{snip.title}</h3>
              </div>
              <div className={styles.contentBox}>
                <pre>{snip.content}</pre>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.toolName}>From: {snip.toolName}</span>
                <div className={styles.actions}>
                  <button className={styles.copyBtn} onClick={() => handleCopy(snip.content)}>📋 Copy</button>
                  <button className={styles.deleteBtn} onClick={() => setSnippetToDelete(snip)}>🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {snippetToDelete && createPortal(
        <div className={styles.modalOverlay} onClick={() => setSnippetToDelete(null)}>
          <div className={`liquid-glass ${styles.confirmModal}`} onClick={(e) => e.stopPropagation()}>
            <h3>Delete Snippet?</h3>
            <p>Are you sure you want to permanently delete "<strong>{snippetToDelete.title}</strong>"? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setSnippetToDelete(null)}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={handleConfirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default WorkspaceSnippets;
