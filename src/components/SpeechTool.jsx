import React, { useState, useEffect, useRef } from 'react';
import styles from './SpeechTool.module.css';

const SpeechTool = () => {
  const [activeTab, setActiveTab] = useState('tts');
  
  // TTS State
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // STT State
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize TTS Voices
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleDownloadScript = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toolverse_script.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Initialize STT
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalText = '';
        for (let i = 0; i < event.results.length; i++) {
          finalText += event.results[i][0].transcript;
        }
        setTranscript(finalText);
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleListen = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support Speech Recognition. Try Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleDownloadTranscript = () => {
    if (!transcript) return;
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toolverse_transcript.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'tts' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('tts')}
        >
          🔊 Text to Speech
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'stt' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('stt')}
        >
          🎙️ Speech to Text
        </button>
      </div>

      {activeTab === 'tts' && (
        <div className={`liquid-glass ${styles.pane}`}>
          <div className={styles.controlRow}>
            <label>Select Voice</label>
            <select 
              value={selectedVoice || ''} 
              onChange={(e) => setSelectedVoice(e.target.value)}
              className={styles.selectDropdown}
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controlRow}>
            <label>Text to Read</label>
            <textarea 
              className={styles.textarea}
              placeholder="Type or paste text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
            />
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.actionBtn} onClick={handleSpeak} disabled={isSpeaking || !text}>
              ▶️ Speak
            </button>
            <button className={`${styles.actionBtn} ${styles.stopBtn}`} onClick={handleStopSpeaking} disabled={!isSpeaking}>
              ⏹️ Stop
            </button>
            <button className={styles.actionBtn} onClick={handleDownloadScript} disabled={!text}>
              ⬇️ Download Script (.txt)
            </button>
          </div>
        </div>
      )}

      {activeTab === 'stt' && (
        <div className={`liquid-glass ${styles.pane}`}>
          <div className={styles.micArea}>
            <button 
              className={`${styles.micBtn} ${isListening ? styles.micListening : ''}`} 
              onClick={handleListen}
            >
              {isListening ? '🛑 Stop Listening' : '🎙️ Start Listening'}
            </button>
            <p className={styles.hint}>
              {isListening ? 'Listening... Speak clearly into your microphone.' : 'Click the button and grant microphone permissions.'}
            </p>
          </div>

          <div className={styles.controlRow}>
            <label>Transcript</label>
            <textarea 
              className={styles.textarea}
              placeholder="Your speech will appear here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows="6"
            />
          </div>

          <div className={styles.buttonRow}>
            <button 
              className={styles.actionBtn} 
              onClick={() => navigator.clipboard.writeText(transcript)} 
              disabled={!transcript}
            >
              📋 Copy Transcript
            </button>
            <button 
              className={styles.actionBtn} 
              onClick={handleDownloadTranscript} 
              disabled={!transcript}
            >
              ⬇️ Download Transcript (.txt)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechTool;
