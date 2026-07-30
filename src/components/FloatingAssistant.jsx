import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsList } from '../data/toolsData';
import styles from './FloatingAssistant.module.css';

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! 👋 Need help finding a tool? Just type what you want to do (e.g., 'convert pdf', 'make a password').", tools: [] }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: 'user', text: input, tools: [] };
    setMessages(prev => [...prev, userMessage]);
    
    const query = input.toLowerCase();
    const matchedTools = toolsList.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.desc.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    ).slice(0, 3);

    let botResponse;
    if (matchedTools.length > 0) {
      botResponse = { 
        sender: 'bot', 
        text: "I found these tools for you. Click to open:", 
        tools: matchedTools 
      };
    } else {
      botResponse = { 
        sender: 'bot', 
        text: "I couldn't find an exact match, but you can browse all our tools here.", 
        tools: [{ id: 'all-tools', name: 'Explore All Tools', icon: '🧰' }] 
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 600);
    
    setInput('');
  };

  const handleToolClick = (toolId) => {
    if (toolId === 'all-tools') {
      navigate('/tools');
    } else {
      navigate(`/tools/${toolId}`);
    }
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button 
          className={styles.assistantBtn} 
          onClick={() => setIsOpen(true)}
          title="Ask AI Assistant"
        >
          🤖
        </button>
      )}

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
          
          <div className={styles.chatWindow}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <h3>ToolBot Assistant</h3>
                <span className={styles.onlineDot}></span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✖️</button>
            </div>
            
            <div className={styles.chatBody}>
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${styles[msg.sender]}`}>
                  <p>{msg.text}</p>
                  {msg.tools.length > 0 && (
                    <div className={styles.toolSuggestions}>
                      {msg.tools.map(tool => (
                        <button 
                          key={tool.id} 
                          className={styles.toolBtn}
                          onClick={() => handleToolClick(tool.id)}
                        >
                          <span>{tool.icon}</span> {tool.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.inputArea}>
              <input 
                type="text" 
                placeholder="Type what you need..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>➤</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingAssistant;
