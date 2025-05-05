// src/utils/llm.js
import { questions, OPENROUTER_API_URL } from './constants';

const createSystemPrompt = (quizAnswers) => {
  const answersText = Object.entries(quizAnswers)
    .map(([q, a]) => `${questions[parseInt(q)]}: ${a}/5`)
    .join('\n');

  return `You are Aria,You are a supportive, friendly, and non-judgmental AI therapist designed to help teenagers talk about their thoughts and feelings. Speak with kindness, use simple but respectful language, and never give medical advice or make diagnoses. Always encourage positive thinking, self-care, and reaching out to a trusted adult or mental health professional if the issue is serious. You are here to listen, offer support, and gently guide them through difficult emotions. Use inclusive, age-appropriate language and validate their feelings. Avoid pushing for too much detail. Always ensure the user feels heard and safe`;
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
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [
          {
            role: 'system',
            content: createSystemPrompt(quizAnswers)
          },
          {
            role: 'user',
            content: isInitial ? '. The user recently answered a quiz with these feelings:\n\n${answersText}\n\nBased on these answers,Please provide an initial assessment based on my quiz answers and ask how you can help. also tell me your name best is Aria' : message
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