import React, { useState, useMemo } from 'react';
import styles from './AgeCalculator.module.css';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');

  const ageData = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) return { error: 'Birth date cannot be in the future.' };

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor((now - birth) / (1000 * 60 * 60));

    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

    // Exam Eligibility Data (General Category Limits)
    const exams = [
      { name: 'UPSC Civil Services (CSE)', minAge: 21, maxAge: 32 },
      { name: 'SSC CGL', minAge: 18, maxAge: 32 },
      { name: 'SSC CHSL', minAge: 18, maxAge: 27 },
      { name: 'RRB NTPC', minAge: 18, maxAge: 36 },
      { name: 'IBPS / SBI PO', minAge: 20, maxAge: 30 },
      { name: 'IBPS / SBI Clerk', minAge: 20, maxAge: 28 }
    ];

    const eligibility = exams.map(exam => {
      if (years > exam.maxAge) {
        return { ...exam, status: 'Over Age', color: '#EF4444' };
      } else if (years < exam.minAge) {
        return { ...exam, status: `Eligible in ${exam.minAge - years} yr`, color: '#F59E0B' };
      } else {
        return { ...exam, status: 'Eligible', color: '#10B981' };
      }
    });

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      daysToBirthday,
      eligibility,
      error: null
    };
  }, [birthDate]);

  return (
    <div className={styles.container}>
      <div className={`liquid-glass ${styles.inputArea}`}>
        <h3 className={styles.title}>🎂 Age Calculator</h3>
        <p className={styles.subtitle}>Enter your birth date to calculate your exact age and exam eligibility.</p>
        
        <div className={styles.inputGroup}>
          <label>Date of Birth</label>
          <input 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            className={styles.dateInput}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {ageData?.error && <div className={styles.errorBox}>{ageData.error}</div>}

      {ageData && !ageData.error && (
        <div className={styles.resultArea}>
          {/* Main Result */}
          <div className={`liquid-glass ${styles.mainResult}`}>
            <h3 className={styles.resultLabel}>Your Exact Age</h3>
            <div className={styles.ageBreakdown}>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{ageData.years}</span>
                <span className={styles.ageUnitLabel}>Years</span>
              </div>
              <div className={styles.ageDivider}>,</div>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{ageData.months}</span>
                <span className={styles.ageUnitLabel}>Months</span>
              </div>
              <div className={styles.ageDivider}>,</div>
              <div className={styles.ageUnit}>
                <span className={styles.ageValue}>{ageData.days}</span>
                <span className={styles.ageUnitLabel}>Days</span>
              </div>
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={`liquid-glass ${styles.statCard}`}>
              <span className={styles.statIcon}>📅</span>
              <h4 className={styles.statValue}>{ageData.totalMonths.toLocaleString()}</h4>
              <p className={styles.statLabel}>Total Months</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <span className={styles.statIcon}>🗓️</span>
              <h4 className={styles.statValue}>{ageData.totalWeeks.toLocaleString()}</h4>
              <p className={styles.statLabel}>Total Weeks</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <span className={styles.statIcon}>📆</span>
              <h4 className={styles.statValue}>{ageData.totalDays.toLocaleString()}</h4>
              <p className={styles.statLabel}>Total Days</p>
            </div>
            <div className={`liquid-glass ${styles.statCard}`}>
              <span className={styles.statIcon}>⏰</span>
              <h4 className={styles.statValue}>{ageData.totalHours.toLocaleString()}</h4>
              <p className={styles.statLabel}>Total Hours</p>
            </div>
          </div>

          {/* Exam Eligibility Section */}
          <div className={`liquid-glass ${styles.examSection}`}>
            <h3 className={styles.examTitle}>🎓 Exam Eligibility (Gen)</h3>
            <p className={styles.examDisclaimer}>Based on current age. Age relaxations apply for reserved categories.</p>
            <div className={styles.examGrid}>
              {ageData.eligibility.map((exam, i) => (
                <div key={i} className={styles.examCard}>
                  <span className={styles.examName}>{exam.name}</span>
                  <span className={styles.examStatus} style={{ color: exam.color, borderColor: exam.color }}>
                    {exam.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Birthday */}
          <div className={`liquid-glass ${styles.birthdayCard}`}>
            <span className={styles.bdayIcon}>🎉</span>
            <div>
              <h4 className={styles.bdayTitle}>Next Birthday</h4>
              <p className={styles.bdayText}>Only <strong>{ageData.daysToBirthday} days</strong> left!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
