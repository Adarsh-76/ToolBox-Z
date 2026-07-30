import React, { useState, useEffect } from 'react';
import styles from './WorldClock.module.css';

const cities = [
  { name: 'Los Angeles', zone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'New York', zone: 'America/New_York', flag: '🇺🇸' },
  { name: 'London', zone: 'Europe/London', flag: '🇬🇧' },
  { name: 'Paris', zone: 'Europe/Paris', flag: '🇫🇷' },
  { name: 'Dubai', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'Karachi', zone: 'Asia/Karachi', flag: '🇵🇰' },
  { name: 'Delhi', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Mumbai', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Lucknow', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Beijing', zone: 'Asia/Shanghai', flag: '🇨🇳' },
  { name: 'Singapore', zone: 'Asia/Singapore', flag: '🇸🇬' },
  { name: 'Tokyo', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sydney', zone: 'Australia/Sydney', flag: '🇦🇺' }
];

const WorldClock = () => {
  const [now, setNow] = useState(new Date());
  const [inputTime, setInputTime] = useState('');
  const [targetZone, setTargetZone] = useState('Asia/Kolkata');

  // Update the live clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize converter input with current local time
  useEffect(() => {
    const localDt = new Date();
    const dtString = localDt.toISOString().slice(0, 16);
    setInputTime(dtString);
  }, []);

  const formatLiveTime = (zone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(now);
  };

  const formatDate = (zone) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(now);
  };

  const getConvertedTime = () => {
    if (!inputTime) return 'Select a time';
    try {
      // inputTime is in local time (from datetime-local input)
      const date = new Date(inputTime);
      return new Intl.DateTimeFormat('en-US', {
        timeZone: targetZone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (e) {
      return 'Invalid time';
    }
  };

  return (
    <div className={styles.container}>
      {/* Live World Clock Grid */}
      <div className={`liquid-glass ${styles.section}`}>
        <h3 className={styles.sectionTitle}>🌍 Live World Clock</h3>
        <div className={styles.clockGrid}>
          {cities.map((city) => (
            <div key={city.zone + city.name} className={styles.clockCard}>
              <span className={styles.flag}>{city.flag}</span>
              <h4 className={styles.cityName}>{city.name}</h4>
              <p className={styles.cityTime}>{formatLiveTime(city.zone)}</p>
              <span className={styles.cityDate}>{formatDate(city.zone)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timezone Converter */}
      <div className={`liquid-glass ${styles.section}`}>
        <h3 className={styles.sectionTitle}>⏱️ Timezone Converter</h3>
        <p className={styles.desc}>Enter your local time and see what time it is in another city.</p>
        
        <div className={styles.inputGroup}>
          <label>Your Local Time</label>
          <input 
            type="datetime-local" 
            value={inputTime} 
            onChange={(e) => setInputTime(e.target.value)} 
            className={styles.datetimeInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Target City</label>
          <select 
            value={targetZone} 
            onChange={(e) => setTargetZone(e.target.value)} 
            className={styles.selectInput}
          >
            {cities.map(city => (
              <option key={city.zone + city.name} value={city.zone}>{city.flag} {city.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.resultBox}>
          <span className={styles.resultLabel}>Converted Time:</span>
          <h4 className={styles.resultValue}>{getConvertedTime()}</h4>
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
