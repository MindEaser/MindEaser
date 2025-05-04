// src/components/Therapist.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Breathing from './animations/Breathing';
import { sendMessage } from '../utils/llm';

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing chat and its timestamp
    const savedTimestamp = localStorage.getItem('chatTimestamp');
    const savedChat = localStorage.getItem('therapistChat');
    const quizAnswers = localStorage.getItem('quizAnswers');

    if (!quizAnswers) {
      navigate('/quiz');
      return;
    }

    if (savedTimestamp && savedChat) {
      const timeDiff = Date.now() - parseInt(savedTimestamp);
      const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

      if (timeDiff < TWO_DAYS) {
        setMessages(JSON.parse(savedChat));
        return;
      }
    }

    // Start new chat
    initializeChat();
  }, [navigate]);

  const initializeChat = async () => {
    setIsLoading(true);
    const response = await sendMessage('', true);
    
    if (response) {
      const initialMessages = [
        { id: Date.now(), text: response, isAi: true }
      ];
      setMessages(initialMessages);
      saveChat(initialMessages);
    }
    setIsLoading(false);
  };

  const saveChat = (chatMessages) => {
    localStorage.setItem('therapistChat', JSON.stringify(chatMessages));
    localStorage.setItem('chatTimestamp', Date.now().toString());
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { id: Date.now(), text: input, isAi: false }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await sendMessage(input);
    if (response) {
      const updatedMessages = [...newMessages, { id: Date.now(), text: response, isAi: true }];
      setMessages(updatedMessages);
      saveChat(updatedMessages);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  message.isAi
                    ? 'bg-white text-gray-800'
                    : 'bg-primary-green text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 p-4 rounded-xl">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {showBreathing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl">
            <Breathing />
            <Button onClick={() => setShowBreathing(false)}>Close</Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-white/90 border-t">
        <div className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-4 rounded-xl border-2 border-primary-green/30 focus:outline-none
                     focus:border-primary-green"
            placeholder="Type your message..."
          />
          <Button onClick={handleSend} disabled={isLoading}>
            Send
          </Button>
          <Button onClick={() => setShowBreathing(true)}>
            Take a Break
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Therapist;