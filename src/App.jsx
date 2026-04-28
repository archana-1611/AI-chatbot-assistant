import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { generateChatResponse } from './services/gemini';
import { Bot, Menu, Plus } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Hello! I'm Nova, your AI customer service assistant. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content) => {
    try {
      setError(null);
      
      const newUserMessage = { role: 'user', content };
      setMessages(prev => [...prev, newUserMessage]);
      setIsLoading(true);

      const aiResponseContent = await generateChatResponse(messages, content);
      
      setMessages(prev => [...prev, { role: 'model', content: aiResponseContent }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setError(err.message || "An error occurred while communicating with Nova.");
      
      let displayMessage = err.message;
      if (!displayMessage.includes("Google's free Gemini") && !displayMessage.includes("missing")) {
        displayMessage = `I apologize, but I encountered an error: ${displayMessage}`;
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        content: displayMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        role: 'model',
        content: "Hello! I'm Nova, your AI customer service assistant. How can I help you today?"
      }
    ]);
    setError(null);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'mobile-open' : 'mobile-hidden'}`}>
        <div className="sidebar-header">
          <button onClick={startNewChat} className="new-chat-btn">
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="history-title">Chat History</div>
          <div className="history-item">
            <Bot size={16} style={{ color: 'var(--text-secondary)' }} />
            <span>Current Session</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">U</div>
          <div>User Account</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="mobile-header">
          <button onClick={() => setIsSidebarOpen(true)} className="menu-btn">
            <Menu size={24} />
          </button>
          <div className="header-title">
            <Bot size={20} style={{ color: 'var(--accent-color)' }} />
            <span>Nova Support</span>
          </div>
          <div style={{ width: '40px' }}></div>
        </header>

        {/* Chat Area */}
        <div className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <Bot size={32} style={{ color: 'var(--accent-color)' }} />
              </div>
              <h1 className="empty-title">How can I help you today?</h1>
              <p className="empty-desc">
                I'm Nova, your customer service assistant. Ask me anything about our products, your account, or general support.
              </p>
            </div>
          ) : (
            <div>
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              {isLoading && (
                <div className="message-container bot-message animate-fade-in" style={{ backgroundColor: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                  <div className="message-inner">
                    <div className="avatar-wrapper">
                      <div className="avatar" style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}>
                        <Bot size={18} />
                      </div>
                    </div>
                    <div className="typing-indicator">
                      <div className="typing-dot animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="typing-dot animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="typing-dot animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
