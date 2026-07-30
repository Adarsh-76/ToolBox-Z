import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toolsList } from '../data/toolsData';
import styles from './CommandPalette.module.css';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearch('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  const filteredTools = toolsList.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (tool) => {
    navigate(`/tools/${tool.id}`);
    setIsOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === 'Enter' && filteredTools.length > 0) {
      handleSelect(filteredTools[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            className={`liquid-glass ${styles.modal}`}
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.inputWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search tools..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
                onKeyDown={handleListKeyDown}
                className={styles.input}
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>
            
            <div className={styles.resultsList}>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => (
                  <div 
                    key={tool.id} 
                    className={`${styles.resultItem} ${index === activeIndex ? styles.active : ''}`}
                    onClick={() => handleSelect(tool)}
                  >
                    <span className={styles.resultIcon}>{tool.icon}</span>
                    <div className={styles.resultText}>
                      <span className={styles.resultName}>{tool.name}</span>
                      <span className={styles.resultDesc}>{tool.desc}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No tools found.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
