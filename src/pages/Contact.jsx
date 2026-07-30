import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get In <span>Touch</span></h1>
        <p className={styles.subtitle}>Have a tool request, feedback, or just want to say hi? Drop us a message.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.infoColumn}>
          <div className={`glassmorphism ${styles.infoCard}`}>
            <span className={styles.infoIcon}>📧</span>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <p className={styles.infoText}>support@toolboxz.app</p>
          </div>
          
          <div className={`glassmorphism ${styles.infoCard}`}>
            <span className={styles.infoIcon}>⭐</span>
            <h3 className={styles.infoTitle}>Tool Requests</h3>
            <p className={styles.infoText}>Missing a tool? Let us know what you need!</p>
          </div>

          <div className={`glassmorphism ${styles.infoCard}`}>
            <span className={styles.infoIcon}>🛡️</span>
            <h3 className={styles.infoTitle}>Privacy</h3>
            <p className={styles.infoText}>We never share your data. Messages are securely logged.</p>
          </div>
        </div>

        <form className={`glassmorphism ${styles.form}`} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="John Doe" 
              required 
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="john@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea 
              name="message" 
              placeholder="Your message here..." 
              rows="6" 
              required 
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
            ></textarea>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={sent}>
            {sent ? '✅ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
