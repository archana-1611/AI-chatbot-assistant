import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.role === 'model';

  return (
    <div 
      className={`message-container animate-fade-in ${isBot ? 'bot-message' : 'user-message'}`}
      style={{
        backgroundColor: isBot ? 'var(--glass-bg)' : 'transparent',
        borderTop: isBot ? '1px solid var(--glass-border)' : 'none',
        borderBottom: isBot ? '1px solid var(--glass-border)' : 'none',
      }}
    >
      <div className="message-inner">
        <div className="avatar-wrapper">
          {isBot ? (
            <div className="avatar" style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}>
              <Bot size={18} />
            </div>
          ) : (
            <div className="avatar" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              <User size={18} />
            </div>
          )}
        </div>
        
        <div className="message-content">
          <div className="message-author" style={{ color: isBot ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {isBot ? 'Nova Support' : 'You'}
          </div>
          <div className="markdown-body" style={{ color: 'var(--text-primary)' }}>
            {isBot ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
