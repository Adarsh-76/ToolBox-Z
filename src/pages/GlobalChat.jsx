import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import styles from './GlobalChat.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view and send messages.');
      return;
    }

    // Connect to the backend Socket.io server
    socketRef.current = io(API_BASE_URL, {
      auth: { token }
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setError('');
    });

    socketRef.current.on('connect_error', (err) => {
      setError('Failed to connect to chat server. The backend might be sleeping. Please wait 60 seconds and refresh.');
      setIsConnected(false);
    });

    socketRef.current.on('chatHistory', (history) => {
      if (Array.isArray(history)) {
        setMessages(history);
      }
    });

    socketRef.current.on('newMessage', (msg) => {
      if (msg) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !socketRef.current || !isConnected) return;

    socketRef.current.emit('sendMessage', text);
    setText('');
  };

     return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* 3. Add the Back Button here */}
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className={styles.title}>💬 Global Chat</h1>
        <div className={`${styles.statusBadge} ${isConnected ? styles.online : styles.offline}`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>


      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={`liquid-glass ${styles.chatWindow}`}>
        <div className={styles.messagesList}>
          {messages.length === 0 && !error ? (
            <p className={styles.emptyText}>No messages yet. Be the first to say hello!</p>
          ) : (
            messages.map((msg, i) => {
              // Safely parse sender name and time
              const senderName = msg?.senderName || 'Anonymous';
              const time = msg?.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <div key={i} className={styles.messageCard}>
                  <div className={styles.messageHeader}>
                    <span className={styles.avatar}>{senderName.charAt(0).toUpperCase()}</span>
                    <span className={styles.senderName}>{senderName}</span>
                    <span className={styles.time}>{time}</span>
                  </div>
                  <p className={styles.messageText}>{msg?.text || ''}</p>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.input}
            disabled={!isConnected}
          />
          <button type="submit" className={styles.sendBtn} disabled={!isConnected || !text.trim()}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlobalChat;
