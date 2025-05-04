// src/utils/llm.js
import { questions, OPENROUTER_API_URL } from './constants';

const createSystemPrompt = (quizAnswers) => {
  const answersText = Object.entries(quizAnswers)
    .map(([q, a]) => `${questions[parseInt(q)]}: ${a}/5`)
    .join('\n');

  return `You are a kind, empathetic AI therapist for teens and young adults. Always be encouraging, calm, and non-judgmental. Use simple language. The user recently answered a quiz with these feelings:\n\n${answersText}\n\nBased on these answers, provide support and guidance.`;
};

export const sendMessage = async (message, isInitial = false) => {
  try {
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content: createSystemPrompt(quizAnswers)
          },
          {
            role: 'user',
            content: isInitial ? 'Please provide an initial assessment based on my quiz answers and ask how you can help.' : message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling LLM:', error);
    return 'I apologize, but I\'m having trouble responding right now. Could you please try again?';
  }
};