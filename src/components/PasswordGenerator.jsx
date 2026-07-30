import React, { useState, useEffect } from 'react';
import styles from './PasswordGenerator.module.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [clue, setClue] = useState(''); // New state for the clue
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('Weak');
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (number) charset += '0123456789';
    if (symbol) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (charset === '' && !clue) {
      setPassword('Select at least one option');
      return;
    }

    let pass = '';

    // If a clue is provided, process it
    if (clue) {
      let processedClue = clue;
      
      // Adjust case based on settings
      if (!lower && upper) processedClue = processedClue.toUpperCase();
      if (!upper && lower) processedClue = processedClue.toLowerCase();

      // Leet Speak transformations (e.g., John -> J0hn)
      const leetMap = {
        'a': '@', 'A': '@',
        'e': '3', 'E': '3',
        'i': '1', 'I': '1',
        'o': '0', 'O': '0',
        's': '$', 'S': '$',
        't': '7', 'T': '7'
      };
      
      processedClue = processedClue.split('').map(char => {
        // Only replace if numbers/symbols are enabled
        if (number && 'eEiIoO'.includes(char) && leetMap[char]) return leetMap[char];
        if (symbol && 'aAsStT'.includes(char) && leetMap[char]) return leetMap[char];
        return char;
      }).join('');

      pass += processedClue;
    }

    // Fallback if no clue and no charset selected
    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';

    // Fill the rest of the password with random characters to meet length
    while (pass.length < length) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // If the clue is longer than the selected length, truncate it
    if (pass.length > length) {
      pass = pass.substring(0, length);
    }

    setPassword(pass);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (upper && lower) score++;
    if (number && symbol) score++;
    
    if (score <= 1) setStrength('Weak');
    else if (score === 2 || score === 3) setStrength('Medium');
    else setStrength('Strong');
  };

  // Regenerate password automatically when settings or clue change
  useEffect(() => {
    generatePassword();
  }, [length, upper, lower, number, symbol, clue]);

  useEffect(() => {
    calculateStrength();
  }, [password]);

  const handleCopy = () => {
    if (password && password !== 'Select at least one option') {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.displayArea}`}>
        <span className={styles.passwordText}>{password}</span>
        <button onClick={handleCopy} className={styles.copyBtn}>
          {isCopied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div className={styles.strengthBar}>
        <div 
          className={styles.strengthFill} 
          style={{ 
            width: strength === 'Weak' ? '33%' : strength === 'Medium' ? '66%' : '100%',
            backgroundColor: strength === 'Weak' ? '#ff4d4d' : strength === 'Medium' ? '#ffaa00' : '#008170'
          }}
        ></div>
      </div>
      <p className={styles.strengthText}>Strength: <span style={{color: strength === 'Weak' ? '#ff4d4d' : strength === 'Medium' ? '#ffaa00' : '#008170'}}>{strength}</span></p>

      <div className={`liquid-glass ${styles.controls}`}>
        
        {/* New Clue Input */}
        <div className={styles.controlRow}>
          <label>Clue / Word (Optional)</label>
          <input 
            type="text" 
            className={styles.clueInput}
            placeholder="e.g., John, myDog, 2010..."
            value={clue}
            onChange={(e) => setClue(e.target.value)}
          />
        </div>

        <div className={styles.controlRow}>
          <label>Length: <span className={styles.lengthVal}>{length}</span></label>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>

        <div className={styles.checkboxGrid}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={upper} onChange={() => setUpper(!upper)} /> Uppercase (A-Z)
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={lower} onChange={() => setLower(!lower)} /> Lowercase (a-z)
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={number} onChange={() => setNumber(!number)} /> Numbers (0-9)
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)} /> Symbols (!@#$)
          </label>
        </div>

        <button onClick={generatePassword} className={styles.generateBtn}>
          🔄 Generate New Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
