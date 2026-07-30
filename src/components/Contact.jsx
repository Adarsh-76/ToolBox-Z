import React, { useState } from 'react';
import styles from './Contact.module.css';
import Reveal from './Reveal';

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
      // Send data to our Node.js backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
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
    <Reveal>
      <section id="contact" className={styles.contactSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>Have a tool request or feedback? Drop us a message.</p>
        </div>

        <form className={`liquid-glass ${styles.form}`} onSubmit={handleSubmit}>
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
              rows="4" 
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
      </section>
    </Reveal>
  );
};

export default Contact;
