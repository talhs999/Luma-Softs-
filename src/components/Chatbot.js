"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

const Chatbot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Assalam o Alaikum! 👋 I am the Lumasofts AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMsg = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please contact us on WhatsApp." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={`${styles.chatWindow} glass-panel animate-fade-in`} style={{ marginBottom: "1rem" }}>
          <div className={styles.chatHeader}>
            <div className={styles.headerTitle}>
              <span className={styles.botIcon}>🤖</span>
              <h3>Lumasofts AI</h3>
            </div>
            <button onClick={toggleChat} className={styles.closeBtn}>×</button>
          </div>
          <div className={styles.chatBody} ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'ai' ? styles.messageAi : styles.messageUser}`}>
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageWrapper} ${styles.messageAi}`}>
                <div className={styles.messageBubble} style={{ fontStyle: "italic", opacity: 0.7 }}>
                  Typing...
                </div>
              </div>
            )}
          </div>
          <form className={styles.chatFooter} onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button type="submit" className={styles.sendBtn} disabled={isLoading}>
              {isLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
      
      {!isOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
          <a 
            href="https://wa.me/923136661921" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#25D366", 
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="32" height="32" style={{ objectFit: "contain" }} />
          </a>
          <button 
            onClick={toggleChat} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              color: "black",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px var(--primary-glow)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <span style={{ fontSize: "1.5rem" }}>💬</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
