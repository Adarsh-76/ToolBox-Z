import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fixed: Check for 'token' instead of 'tbz_token'
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';

      // Include username and phone only for signup
      const payload = isLogin
        ? { email, password }
        : { name, username, email, phone, password };

       const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        // Fixed: Save as 'token' and 'user' so the rest of the app recognizes it
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Tell the navbar to update instantly
        window.dispatchEvent(new Event('storage'));
        
        // Redirect to home
        navigate('/');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div className={styles.authWrapper}>
      <div className={`liquid-glass ${styles.authCard}`}>
        <div className={styles.tabSwitcher}>
          <button
            className={`${styles.tabBtn} ${isLogin ? styles.activeTab : ''}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Login
          </button>
          <button
            className={`${styles.tabBtn} ${!isLogin ? styles.activeTab : ''}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Sign Up
          </button>
          <div className={`${styles.tabSlider} ${!isLogin ? styles.sliderRight : ''}`}></div>
        </div>

        <h2 className={styles.title}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className={styles.subtitle}>
          {isLogin ? 'Login to sync your tools and achievements.' : 'Join ToolBox Z to unlock all features.'}
        </p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="johndoe123"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Phone Number <span style={{opacity: 0.5, fontWeight: 400}}>(Optional)</span></label>
                <input
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '⏳ Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR CONTINUE WITH</span>
        </div>

        <div className={styles.socialRow}>
          <button className={styles.socialBtn}>G</button>
          <button className={styles.socialBtn}></button>
          <button className={styles.socialBtn}></button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
