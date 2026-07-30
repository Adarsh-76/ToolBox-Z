import React, { useState, useMemo } from 'react';
import styles from './EmiCalculator.module.css';

const EmiCalculator = () => {
  const [loanType, setLoanType] = useState('home');
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const presets = {
    home: { defaultAmt: 2500000, defaultRate: 8.5, defaultYears: 20 },
    car: { defaultAmt: 800000, defaultRate: 9.5, defaultYears: 7 },
    personal: { defaultAmt: 500000, defaultRate: 11.5, defaultYears: 5 },
    education: { defaultAmt: 1500000, defaultRate: 10.5, defaultYears: 10 }
  };

  const handleLoanTypeChange = (type) => {
    setLoanType(type);
    setPrincipal(presets[type].defaultAmt);
    setRate(presets[type].defaultRate);
    setTenure(presets[type].defaultYears);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(amount);
  };

  const { emi, totalInterest, totalPayment, principalPct, interestPct } = useMemo(() => {
    const P = principal;
    const R = rate / 12 / 100;
    const N = tenure * 12;

    let calculatedEmi = 0;
    if (R === 0) {
      calculatedEmi = P / N;
    } else {
      calculatedEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    const calculatedTotalPayment = calculatedEmi * N;
    const calculatedTotalInterest = calculatedTotalPayment - P;

    const pPct = P > 0 ? (P / calculatedTotalPayment) * 100 : 0;
    const iPct = calculatedTotalPayment > 0 ? (calculatedTotalInterest / calculatedTotalPayment) * 100 : 0;

    return {
      emi: calculatedEmi,
      totalInterest: calculatedTotalInterest,
      totalPayment: calculatedTotalPayment,
      principalPct: pPct,
      interestPct: iPct
    };
  }, [principal, rate, tenure]);

  return (
    <div className={styles.container}>
      {/* Loan Type Selector */}
      <div className={`liquid-glass ${styles.typeSelector}`}>
        {Object.keys(presets).map(type => (
          <button 
            key={type} 
            className={`${styles.typeBtn} ${loanType === type ? styles.typeActive : ''}`}
            onClick={() => handleLoanTypeChange(type)}
          >
            {type === 'home' && '🏠 Home'}
            {type === 'car' && '🚗 Car'}
            {type === 'personal' && '👤 Personal'}
            {type === 'education' && '🎓 Education'}
          </button>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Input Area */}
        <div className={`liquid-glass ${styles.inputArea}`}>
          <div className={styles.inputGroup}>
            <label>Loan Amount</label>
            <div className={styles.sliderRow}>
              <input 
                type="range" 
                min="50000" 
                max="50000000" 
                step="50000" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))} 
                className={styles.slider}
              />
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))} 
                className={styles.numberInput}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Interest Rate (% per annum)</label>
            <div className={styles.sliderRow}>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="0.1" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))} 
                className={styles.slider}
              />
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))} 
                className={styles.numberInput}
                step="0.1"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Loan Tenure (Years)</label>
            <div className={styles.sliderRow}>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))} 
                className={styles.slider}
              />
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))} 
                className={styles.numberInput}
              />
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className={`liquid-glass ${styles.resultArea}`}>
          <div className={styles.emiHeader}>
            <span className={styles.emiLabel}>Your Monthly EMI</span>
            <h3 className={styles.emiValue}>{formatCurrency(emi)}</h3>
          </div>

          {/* Donut Chart */}
          <div className={styles.chartContainer}>
            <div 
              className={styles.donut} 
              style={{ background: `conic-gradient(var(--accent-color) ${principalPct}%, #FF4D4D ${principalPct}% 100%)` }}
            >
              <div className={styles.donutHole}>
                <span className={styles.totalPayLabel}>Total Payment</span>
                <span className={styles.totalPayValue}>{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statColor} style={{ background: 'var(--accent-color)' }}></span>
              <div>
                <span className={styles.statLabel}>Principal</span>
                <span className={styles.statValue}>{formatCurrency(principal)}</span>
              </div>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statColor} style={{ background: '#FF4D4D' }}></span>
              <div>
                <span className={styles.statLabel}>Total Interest</span>
                <span className={styles.statValue}>{formatCurrency(totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
