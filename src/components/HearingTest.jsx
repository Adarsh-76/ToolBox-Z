import React, { useState, useRef, useEffect } from 'react';
import styles from './HearingTest.module.css';

const frequencies = [8000, 10000, 12000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];

const HearingTest = () => {
  const [currentFreqIndex, setCurrentFreqIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [ageEstimate, setAgeEstimate] = useState(null);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => stopTone();
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      oscillatorRef.current = audioCtxRef.current.createOscillator();
      gainRef.current = audioCtxRef.current.createGain();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.connect(gainRef.current);
      gainRef.current.connect(audioCtxRef.current.destination);
      gainRef.current.gain.value = 0; // Start silent
      oscillatorRef.current.start();
    }
  };

  const playTone = () => {
    initAudio();
    const freq = frequencies[currentFreqIndex];
    oscillatorRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    gainRef.current.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime); // 5% volume (safe)
    setIsPlaying(true);
  };

  const stopTone = () => {
    if (gainRef.current) {
      gainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    }
    setIsPlaying(false);
  };

  const handleCanHear = () => {
    stopTone();
    if (currentFreqIndex < frequencies.length - 1) {
      setCurrentFreqIndex(currentFreqIndex + 1);
    } else {
      calculateResult(20000);
    }
  };

  const handleCannotHear = () => {
    stopTone();
    calculateResult(frequencies[currentFreqIndex]);
  };

  const calculateResult = (maxFreq) => {
    let age;
    if (maxFreq >= 18000) age = "Under 25";
    else if (maxFreq >= 16000) age = "25 - 35";
    else if (maxFreq >= 14000) age = "35 - 45";
    else if (maxFreq >= 12000) age = "45 - 55";
    else if (maxFreq >= 10000) age = "55 - 65";
    else age = "Over 65";

    setAgeEstimate(age);
    setResult(maxFreq);
  };

  const handleRestart = () => {
    setCurrentFreqIndex(0);
    setResult(null);
    setAgeEstimate(null);
  };

  return (
    <div className={styles.container}>
      {!result ? (
        <div className={`liquid-glass ${styles.testArea}`}>
          <h3>Frequency: {frequencies[currentFreqIndex]} Hz</h3>
          <p>Step {currentFreqIndex + 1} of {frequencies.length}</p>
          
          <div className={styles.controls}>
            <button className={styles.playBtn} onClick={isPlaying ? stopTone : playTone}>
              {isPlaying ? '⏸️ Stop' : '▶️ Play Tone'}
            </button>
          </div>

          <p className={styles.instruction}>Can you hear the tone?</p>
          <div className={styles.buttonRow}>
            <button className={styles.yesBtn} onClick={handleCanHear} disabled={!isPlaying}>✅ Yes, I hear it</button>
            <button className={styles.noBtn} onClick={handleCannotHear} disabled={!isPlaying}>❌ No, I can't</button>
          </div>
          <small className={styles.warning}>⚠️ Please keep your volume low to protect your ears.</small>
        </div>
      ) : (
        <div className={`liquid-glass ${styles.resultArea}`}>
          <h2>Test Complete!</h2>
          <div className={styles.resultStats}>
            <p>Your max hearing frequency: <strong>{result} Hz</strong></p>
            <p>Estimated Ear Age: <strong className={styles.ageText}>{ageEstimate}</strong></p>
          </div>
          <button className={styles.restartBtn} onClick={handleRestart}>🔄 Test Again</button>
        </div>
      )}
    </div>
  );
};

export default HearingTest;
