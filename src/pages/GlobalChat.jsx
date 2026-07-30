import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import styles from './GlobalChat.module.css';

// Automatically detect IP for local network testing

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null); // Changed to container ref
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      setIsLoggedIn(false);
      return;
    }
    
    setIsLoggedIn(true);
    const user = JSON.parse(userStr);
    setCurrentUser(user);

    // Connect to Socket.io server with auth token
    socketRef.current = io(API_BASE_URL, {
      auth: { token }
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setIsConnected(false);
    });

    // Receive chat history
    socketRef.current.on('chatHistory', (history) => {
      setMessages(history);
    });

    // Receive new messages
    socketRef.current.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [navigate]);

  // Auto-scroll to bottom on new messages (Without scrolling the whole page!)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !socketRef.current) return;
    
    socketRef.current.emit('sendMessage', inputText.trim());
    setInputText('');
  };

  if (!isLoggedIn) {
    return (
      <div className={`liquid-glass ${styles.authBox}`}>
        <h2>🔒 Authentication Required</h2>
        <p>You need to be logged in to join the live discussion.</p>
        <button className={styles.authBtn} onClick={() => navigate('/auth')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>💬 Live Discussion</h1>
        <div className={styles.statusBadge}>
          <span className={`${styles.statusDot} ${isConnected ? styles.online : styles.offline}`}></span>
          {isConnected ? 'Connected' : 'Connecting...'}
        </div>
      </div>

      <div className={`liquid-glass ${styles.chatWindow}`}>
        <div className={styles.messagesList} ref={messagesContainerRef}>
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`${styles.messageWrapper} ${currentUser && msg.senderId === currentUser.id ? styles.myMessage : ''}`}
            >
              {currentUser && msg.senderId !== currentUser.id && (
                <div className={styles.avatar}>
                  {msg.senderName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={styles.messageContent}>
                {currentUser && msg.senderId !== currentUser.id && (
                  <span className={styles.senderName}>{msg.senderName}</span>
                )}
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
                <span className={styles.timestamp}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
            disabled={!isConnected}
          />
          <button 
            type="submit" 
            className={styles.sendBtn} 
            disabled={!isConnected || !inputText.trim()}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default GlobalChat;
