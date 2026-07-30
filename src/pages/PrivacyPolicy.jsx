import React from 'react';
import styles from './LegalPage.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <p className={styles.text}>This Privacy Policy describes how ToolBox Z ("we", "us") collects, uses, and protects your information when you use our website and services.</p>
      
      <h2 className={styles.heading}>1. Information We Collect</h2>
      <p className={styles.text}>We collect personal information such as your name, email address, and username when you create an account. We also collect data on tool usage to provide achievements and personalized recommendations.</p>
      
      <h2 className={styles.heading}>2. How We Use Your Information</h2>
      <p className={styles.text}>Your information is used to provide and improve our services, authenticate your account, sync your data across devices, and display your personalized dashboard.</p>
      
      <h2 className={styles.heading}>3. Data Security</h2>
      <p className={styles.text}>We use secure MongoDB databases and JWT authentication to protect your data. Passwords are hashed using bcrypt. However, no method of transmission over the Internet is 100% secure.</p>
      
      <h2 className={styles.heading}>4. Third-Party Services</h2>
      <p className={styles.text}>We may use third-party APIs (like YouTube or social media scrapers) to process your tool requests. We do not store the media you download on our servers; it is streamed directly to your device.</p>
      
      <h2 className={styles.heading}>5. Contact Us</h2>
      <p className={styles.text}>If you have questions about this Privacy Policy, please contact us through our Contact page.</p>
    </div>
  );
};

export default PrivacyPolicy;
