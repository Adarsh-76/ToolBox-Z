import React, { useState } from 'react';
import styles from './FakeDataGenerator.module.css';

// Simple internal data arrays (no external API needed!)
const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Chris', 'Jessica', 'Daniel'];
const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson'];
const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com'];
const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm Dr', 'Maple Ln', 'Cedar Blvd'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Diego'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
const jobs = ['Software Engineer', 'Designer', 'Teacher', 'Product Manager', 'Data Analyst', 'Marketing Lead'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateUser = () => {
  const firstName = getRandom(firstNames);
  const lastName = getRandom(lastNames);
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomInt(10, 99)}`;
  
  return {
    id: getRandomInt(1000, 9999),
    firstName,
    lastName,
    username,
    email: `${username}@${getRandom(domains)}`,
    phone: `+1-${getRandomInt(200, 999)}-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
    avatar: `https://i.pravatar.cc/150?u=${username}`,
    address: `${getRandomInt(100, 9999)} ${getRandom(streets)}`,
    city: getRandom(cities),
    state: getRandom(states),
    zipCode: `${getRandomInt(10000, 99999)}`,
    jobTitle: getRandom(jobs),
    company: `TechCorp Inc`,
    creditCard: `${getRandomInt(4000, 4999)} ${getRandomInt(1000, 9999)} ${getRandomInt(1000, 9999)} ${getRandomInt(1000, 9999)}`,
  };
};

const FakeDataGenerator = () => {
  const [users, setUsers] = useState([generateUser()]);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState('json');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newUsers = [];
    for (let i = 0; i < count; i++) {
      newUsers.push(generateUser());
    }
    setUsers(newUsers);
  };

  const handleClear = () => {
    setUsers([]);
  };

  const handleCopy = () => {
    const text = format === 'json' 
      ? JSON.stringify(users, null, 2) 
      : users.map(u => `${u.firstName},${u.lastName},${u.username},${u.email},${u.phone}`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderedText = format === 'json' 
    ? JSON.stringify(users, null, 2) 
    : users.map(u => `${u.firstName},${u.lastName},${u.username},${u.email},${u.phone}`).join('\n');

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.controlsArea}`}>
        <div className={styles.inputGroup}>
          <label>Number of Users</label>
          <input type="number" min="1" max="10" value={count} onChange={(e) => setCount(e.target.value)} className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <label>Format</label>
          <select className={styles.select} value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.generateBtn} onClick={handleGenerate}>
            🔄 Generate Data
          </button>
          <button className={styles.clearBtn} onClick={handleClear} disabled={users.length === 0}>
            🗑️ Clear
          </button>
        </div>
      </div>

      {users.length > 0 ? (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.headerRow}>
            <h3>Generated Data ({users.length} users)</h3>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>

          <div className={styles.userCardsGrid}>
            {users.map((user, i) => (
              <div key={i} className={styles.userCard}>
                <img src={user.avatar} alt="avatar" className={styles.avatar} />
                <div className={styles.userInfo}>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p className={styles.job}>{user.jobTitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.codeBlock}>
            <pre>{renderedText}</pre>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          No data generated yet. Click "Generate Data" to create fake users!
        </div>
      )}
    </div>
  );
};

export default FakeDataGenerator;
