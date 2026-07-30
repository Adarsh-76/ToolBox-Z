import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import CommandPalette from './CommandPalette';
import FloatingAssistant from './FloatingAssistant';
import FeedbackWidget from './FeedbackWidget';
import styles from './Layout.module.css';

const Layout = ({ children, themeClass }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is already typing in an input/textarea/select
      const target = e.target;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable;

      // '/' to focus search (only if not typing)
      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`${styles.layoutWrapper} ${themeClass}`}>
      {/* Background blobs */}
      <div className={`${styles.bgBlob} ${styles.blob1}`}></div>
      <div className={`${styles.bgBlob} ${styles.blob2}`}></div>

      {/* Soft Glow Behind Navbar */}
      <div className={styles.navbarGlow}></div>

      <Navbar />
      
      {/* Animated Page Content */}
      <motion.main 
        className={styles.mainContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {!isHome && (
          <div className={styles.backBtnContainer}>
            <button className={styles.backHomeBtn} onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>
        )}
        {children}
      </motion.main>

      <BackToTop />
      <CommandPalette />
      <FloatingAssistant />
      <FeedbackWidget />
      
      <Footer />
    </div>
  );
};

export default Layout;
