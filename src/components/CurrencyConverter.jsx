import React, { useState, useEffect, useMemo } from 'react';
import styles from './CurrencyConverter.module.css';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'http://' + window.location.hostname + ':5000';

const currencyOptions = [
  { code: 'USD', name: '🇺🇸 US Dollar' },
  { code: 'EUR', name: '🇪🇺 Euro' },
  { code: 'GBP', name: '🇬🇧 British Pound' },
  { code: 'INR', name: '🇮🇳 Indian Rupee' },
  { code: 'JPY', name: '🇯🇵 Japanese Yen' },
  { code: 'AUD', name: '🇦🇺 Australian Dollar' },
  { code: 'CAD', name: '🇨🇦 Canadian Dollar' },
  { code: 'CNY', name: '🇨🇳 Chinese Yuan' },
  { code: 'AED', name: '🇦🇪 UAE Dirham' }
];

const CurrencyConverter = () => {
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/currency`);
        const data = await response.json();
        if (data.success) {
          setRates(data.rates);
          setLastUpdated(new Date(data.time).toLocaleString());
        } else {
          setError('Failed to load rates.');
        }
      } catch (err) {
        setError('Failed to connect to server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRates();
  }, []);

  const convertedAmount = useMemo(() => {
    if (!rates || !amount) return '0.00';
    try {
      // Convert From -> USD -> To
      const amountInUSD = parseFloat(amount) / rates[fromCurrency];
      const finalAmount = amountInUSD * rates[toCurrency];
      return finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
      return '0.00';
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>💱 Currency Converter</h3>
        <p className={styles.subtitle}>Live exchange rates updated daily.</p>

        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.inputGroup}>
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className={styles.numberInput}
            min="0"
          />
        </div>

        <div className={styles.selectRow}>
          <div className={styles.inputGroup}>
            <label>From</label>
            <select 
              value={fromCurrency} 
              onChange={(e) => setFromCurrency(e.target.value)} 
              className={styles.selectInput}
              disabled={isLoading}
            >
              {currencyOptions.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>To</label>
            <select 
              value={toCurrency} 
              onChange={(e) => setToCurrency(e.target.value)} 
              className={styles.selectInput}
              disabled={isLoading}
            >
              {currencyOptions.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className={`liquid-glass ${styles.resultArea}`}>
        {isLoading ? (
          <div className={styles.spinner}></div>
        ) : (
          <>
            <span className={styles.resultLabel}>{amount} {fromCurrency} =</span>
            <h3 className={styles.resultValue}>{convertedAmount} {toCurrency}</h3>
            {lastUpdated && <p className={styles.updatedText}>Last Updated: {lastUpdated}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
