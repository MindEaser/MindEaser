// src/components/Therapist.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Breathing from './animations/Breathing';
import { sendMessageWithCrisisDetection } from '../utils/llm';

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
    const response = await sendMessageWithCrisisDetection('', true);
    
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

    // Optionally, you can pass user email if available, here left blank
    const response = await sendMessageWithCrisisDetection(input);
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
    <div className="min-h-screen flex flex-col relative max-h-screen overflow-hidden">
      <img 
        src="/favicon.png" 
        alt="Home" 
        className="fixed top-4 left-4 z-50 w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-transform"
        onClick={() => navigate('/')}
      />

      <div 
        className="fixed top-4 right-4 z-50 cursor-pointer hover:scale-110 transition-transform text-gray-800 flex items-center gap-2"
        onClick={() => navigate('/resources')}
      >
        <span className="text-sm font-medium">Resources</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl ${
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
              <div className="bg-white text-gray-800 p-3 sm:p-4 rounded-xl">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {showBreathing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white p-4 sm:p-8 rounded-2xl w-full max-w-lg mx-2 sm:mx-4">
            <Breathing />
            <Button onClick={() => setShowBreathing(false)}>Close</Button>
          </div>
        </div>
      )}

      <div className="sticky bottom-0 p-2 sm:p-4 bg-white/90 border-t">
        <div className="max-w-3xl mx-auto relative">
          <img 
            src="/bubble.png" 
            alt="Take a Break"
            onClick={() => setShowBreathing(true)}
            className="absolute -top-24 sm:-top-36 right-1 animate-[bounce_3s_ease-in-out_infinite] hover:animate-none 
                     w-12 sm:w-16 h-12 sm:h-16 
                     transition-transform duration-300 hover:scale-105
                     cursor-pointer"
            style={{
              animationName: 'gentleBounce',
              '--bounce-height': '8px'
            }}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 sm:p-4 rounded-xl border-2 border-primary-green/30 focus:outline-none
                       focus:border-primary-green text-sm sm:text-base"
              placeholder="Type your message..."
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading}
              className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base whitespace-nowrap"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapist;