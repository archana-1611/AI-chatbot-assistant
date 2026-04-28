import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-area-wrapper">
      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Nova a question..."
            className="chat-textarea"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="send-btn"
            style={{ 
              backgroundColor: input.trim() && !isLoading ? 'var(--accent-color)' : 'var(--bg-secondary)',
              color: input.trim() && !isLoading ? '#fff' : 'var(--text-secondary)'
            }}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} style={{ transform: input.trim() ? 'translateX(1px)' : 'none' }} />
            )}
          </button>
        </form>
        <div className="disclaimer">
          Nova is an AI customer service agent. It may occasionally provide inaccurate information.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
