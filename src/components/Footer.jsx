import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`liquid-glass ${styles.footer}`}>
      <div className={styles.footerCopy}>
        © {new Date().getFullYear()} ToolBox Z. All rights reserved.
      </div>
      <div className={styles.footerLinks}>
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;
