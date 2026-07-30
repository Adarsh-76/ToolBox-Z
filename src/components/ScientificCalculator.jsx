import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import styles from './ScientificCalculator.module.css';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('');

  const handleAppend = (val) => {
    setDisplay((prev) => prev === 'Error' ? val : prev + val);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev === 'Error' ? '' : prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (!display) return;
    try {
      // mathjs handles sin, cos, log, sqrt, pi, e, ^, etc.
      const result = evaluate(display);
      setDisplay(String(result));
    } catch (err) {
      setDisplay('Error');
    }
  };

  const buttons = [
    { label: 'sin(', val: 'sin(' }, { label: 'cos(', val: 'cos(' }, { label: 'tan(', val: 'tan(' }, { label: '^', val: '^' }, { label: 'C', val: 'C', action: 'clear' },
    { label: 'log(', val: 'log(' }, { label: 'ln(', val: 'log(' }, { label: '√', val: 'sqrt(' }, { label: 'π', val: 'pi' }, { label: '⌫', val: 'B', action: 'back' },
    { label: '(', val: '(' }, { label: ')', val: ')' }, { label: '%', val: '/100' }, { label: 'e', val: 'e' }, { label: '/', val: '/' },
    { label: '7', val: '7' }, { label: '8', val: '8' }, { label: '9', val: '9' }, { label: '*', val: '*' }, { label: '-', val: '-' },
    { label: '4', val: '4' }, { label: '5', val: '5' }, { label: '6', val: '6' }, { label: '+', val: '+' }, { label: '=', val: '=', action: 'calc', rowspan: 2 },
    { label: '1', val: '1' }, { label: '2', val: '2' }, { label: '3', val: '3' }, { label: '.', val: '.' },
    { label: '0', val: '0', colspan: 2 }, { label: '00', val: '00' }
  ];

  const handleClick = (btn) => {
    if (btn.action === 'clear') return handleClear();
    if (btn.action === 'back') return handleBackspace();
    if (btn.action === 'calc') return handleCalculate();
    return handleAppend(btn.val);
  };

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.calculatorCard}`}>
        <div className={styles.displayWrapper}>
          <div className={styles.history}>{display && display !== 'Error' ? display.substring(0, Math.max(0, display.length - 1)) : ''}</div>
          <div className={styles.display}>{display || '0'}</div>
        </div>

        <div className={styles.buttonGrid}>
          {buttons.map((btn, i) => (
            <button
              key={i}
              className={`${styles.btn} ${btn.action === 'calc' ? styles.equalsBtn : ''} ${['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√', 'π', 'e', '^', '%', '(', ')'].includes(btn.label) ? styles.sciBtn : ''} ${['C', '⌫'].includes(btn.label) ? styles.clearBtn : ''}`}
              onClick={() => handleClick(btn)}
              style={{ gridColumn: btn.colspan ? `span ${btn.colspan}` : 'auto', gridRow: btn.rowspan ? `span ${btn.rowspan}` : 'auto' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
