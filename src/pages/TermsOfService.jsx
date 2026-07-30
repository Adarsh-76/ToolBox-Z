import React from 'react';
import styles from './LegalPage.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <p className={styles.text}>Welcome to ToolBox Z. By using our website, you agree to these Terms and Conditions. Please read them carefully.</p>
      
      <h2 className={styles.heading}>1. Acceptance of Terms</h2>
      <p className={styles.text}>By accessing or using ToolBox Z, you agree to be bound by these Terms. If you do not agree, please do not use the service.</p>
      
      <h2 className={styles.heading}>2. Use of Services</h2>
      <p className={styles.text}>Our tools are provided for personal and commercial use. You agree not to use the tools for illegal activities, including copyright infringement or downloading unauthorized content.</p>
      
      <h2 className={styles.heading}>3. Intellectual Property</h2>
      <p className={styles.text}>The ToolBox Z name, logo, and codebase are the property of their respective owners. You may not copy or distribute the platform's code without permission.</p>
      
      <h2 className={styles.heading}>4. Limitation of Liability</h2>
      <p className={styles.text}>ToolBox Z is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our tools, including data loss or service interruptions.</p>
      
      <h2 className={styles.heading}>5. Changes to Terms</h2>
      <p className={styles.text}>We reserve the right to update these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
    </div>
  );
};

export default TermsOfService;
