import React, { useState, useMemo } from 'react';
import styles from './BmiCalculator.module.css';

const BmiCalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(65); // kg

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (newUnit === 'metric') {
      setHeight(170);
      setWeight(65);
    } else {
      setHeight(67); // inches
      setWeight(150); // lbs
    }
  };

  const { bmi, category, categoryColor, gaugeRotation } = useMemo(() => {
    let weightKg = weight;
    let heightM = height / 100;

    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightM = (height * 2.54) / 100; // inches to meters
    }

    if (heightM <= 0 || weightKg <= 0) return { bmi: 0, category: 'Unknown', categoryColor: '#6B7280', gaugeRotation: 0 };

    const calculatedBmi = weightKg / (heightM * heightM);
    
    let cat = 'Normal weight';
    let color = '#10B981'; // Green

    if (calculatedBmi < 18.5) {
      cat = 'Underweight';
      color = '#3B82F6'; // Blue
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      cat = 'Overweight';
      color = '#F59E0B'; // Yellow
    } else if (calculatedBmi >= 30) {
      cat = 'Obese';
      color = '#EF4444'; // Red
    }

    // Map BMI 10-40 to 0-180 degrees
    const rotation = Math.max(0, Math.min(180, ((calculatedBmi - 10) / 30) * 180));

    return { 
      bmi: calculatedBmi.toFixed(1), 
      category: cat, 
      categoryColor: color, 
      gaugeRotation: rotation 
    };
  }, [height, weight, unit]);

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.unitSelector}`}>
        <button className={`${styles.unitBtn} ${unit === 'metric' ? styles.unitActive : ''}`} onClick={() => handleUnitChange('metric')}>📏 Metric (cm/kg)</button>
        <button className={`${styles.unitBtn} ${unit === 'imperial' ? styles.unitActive : ''}`} onClick={() => handleUnitChange('imperial')}>📐 Imperial (ft/lbs)</button>
      </div>

      <div className={styles.mainGrid}>
        {/* Input Area */}
        <div className={`liquid-glass ${styles.inputArea}`}>
          <div className={styles.inputGroup}>
            <label>Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
            <div className={styles.sliderRow}>
              <input 
                type="range" 
                min={unit === 'metric' ? 100 : 40} 
                max={unit === 'metric' ? 220 : 84} 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))} 
                className={styles.slider}
              />
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))} 
                className={styles.numberInput}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <div className={styles.sliderRow}>
              <input 
                type="range" 
                min={unit === 'metric' ? 30 : 66} 
                max={unit === 'metric' ? 150 : 330} 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className={styles.slider}
              />
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))} 
                className={styles.numberInput}
              />
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className={`liquid-glass ${styles.resultArea}`}>
          {/* Visual Gauge */}
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeBackground}>
              <div className={styles.gaugeHalfCircle}></div>
              <div className={styles.gaugeColors}>
                <div style={{ background: '#3B82F6', width: '20%' }}></div>
                <div style={{ background: '#10B981', width: '25%' }}></div>
                <div style={{ background: '#F59E0B', width: '15%' }}></div>
                <div style={{ background: '#EF4444', width: '40%' }}></div>
              </div>
            </div>
            <div className={styles.needle} style={{ transform: `rotate(${gaugeRotation}deg)` }}></div>
            <div className={styles.gaugeCenter}></div>
          </div>

          <div className={styles.bmiHeader}>
            <span className={styles.bmiLabel}>Your BMI</span>
            <h3 className={styles.bmiValue} style={{ color: categoryColor }}>{bmi}</h3>
            <span className={styles.bmiCategory} style={{ background: categoryColor }}>{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
