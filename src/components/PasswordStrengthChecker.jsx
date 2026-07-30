import React, { useState, useMemo } from 'react';
import styles from './PasswordStrengthChecker.module.css';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return { score: 0, label: 'None', color: '#6B7280', crackTime: 'Instantly', checks: {} };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      longLength: password.length >= 12,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password)
    };

    if (checks.length) score += 1;
    if (checks.longLength) score += 1;
    if (checks.upper) score += 1;
    if (checks.lower) score += 1;
    if (checks.number) score += 1;
    if (checks.symbol) score += 1;

    let label = 'Weak';
    let color = '#EF4444'; // Red
    let crackTime = 'Instantly';

    // Rough entropy calculation for crack time estimation
    let poolSize = 0;
    if (checks.lower) poolSize += 26;
    if (checks.upper) poolSize += 26;
    if (checks.number) poolSize += 10;
    if (checks.symbol) poolSize += 32;
    
    const combinations = Math.pow(poolSize, password.length);
    const secondsToCrack = combinations / 1e10; // Assume 10 billion guesses/sec

    if (secondsToCrack < 1) crackTime = 'Instantly';
    else if (secondsToCrack < 60) crackTime = `${Math.round(secondsToCrack)} seconds`;
    else if (secondsToCrack < 3600) crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
    else if (secondsToCrack < 86400) crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
    else if (secondsToCrack < 31536000) crackTime = `${Math.round(secondsToCrack / 86400)} days`;
    else if (secondsToCrack < 31536000 * 100) crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    else if (secondsToCrack < 31536000 * 1e6) crackTime = `${Math.round(secondsToCrack / (31536000 * 100))} centuries`;
    else crackTime = 'Millions of years';

    if (score >= 5) {
      label = 'Strong';
      color = '#10B981'; // Green
    } else if (score >= 3) {
      label = 'Medium';
      color = '#F59E0B'; // Yellow
    }

    const scorePercentage = (score / 6) * 100;

    return { score, scorePercentage, label, color, crackTime, checks };
  }, [password]);

  const handleClear = () => {
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>Password Strength Checker</h3>
        <p className={styles.subtitle}>Type your password below to analyze its strength in real-time. Data never leaves your browser.</p>
        
        <div className={styles.inputWrapper}>
          <input 
            type={showPassword ? 'text' : 'password'}
            className={styles.textInput}
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.toggleBtn} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Strength Bar */}
        <div className={styles.strengthBarBg}>
          <div 
            className={styles.strengthBarFill} 
            style={{ width: `${analysis.scorePercentage}%`, background: analysis.color }}
          ></div>
        </div>
        <div className={styles.strengthLabelRow}>
          <span style={{ color: analysis.color, fontWeight: 700 }}>{analysis.label}</span>
          <span className={styles.crackTime}>⏱️ Time to crack: {analysis.crackTime}</span>
        </div>

        {password && (
          <button className={styles.clearBtn} onClick={handleClear}>
            ✖️ Clear
          </button>
        )}
      </div>

      {password && (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h4 className={styles.checklistTitle}>Security Checklist</h4>
          <div className={styles.checklistGrid}>
            <div className={`${styles.checkItem} ${analysis.checks.length ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.length ? '✅' : '❌'} At least 8 characters
            </div>
            <div className={`${styles.checkItem} ${analysis.checks.longLength ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.longLength ? '✅' : '❌'} 12+ characters (Recommended)
            </div>
            <div className={`${styles.checkItem} ${analysis.checks.upper ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.upper ? '✅' : '❌'} Uppercase letter (A-Z)
            </div>
            <div className={`${styles.checkItem} ${analysis.checks.lower ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.lower ? '✅' : '❌'} Lowercase letter (a-z)
            </div>
            <div className={`${styles.checkItem} ${analysis.checks.number ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.number ? '✅' : '❌'} Number (0-9)
            </div>
            <div className={`${styles.checkItem} ${analysis.checks.symbol ? styles.checkPass : styles.checkFail}`}>
              {analysis.checks.symbol ? '✅' : '❌'} Symbol (!@#$)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthChecker;
