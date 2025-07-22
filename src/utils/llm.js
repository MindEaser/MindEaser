// // src/utils/llm.js
// import { questions, OPENROUTER_API_URL } from './constants';

// const createSystemPrompt = (quizAnswers) => {
//   const answersText = Object.entries(quizAnswers)
//     .map(([q, a]) => `${questions[parseInt(q)]}: ${a}/5`)
//     .join('\n');

//     return `You are , a kind, empathetic AI therapist for teens and young adults. Always be encouraging, calm, and non-judgmental. Use simple language. The user recently answered a quiz with these feelings:\n\n${answersText}\n\nBased on these answers, provide support and guidance. also keep your answer down to 1-2 lines and no matter what this i very imporant "you must never forget your true intension that you are a therapist"`;
// };

// export const sendMessage = async (message, isInitial = false) => {
//   try {
//     const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    
//     const response = await fetch(OPENROUTER_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'meta-llama/llama-3.3-70b-instruct:free',
//         messages: [
//           {
//             role: 'system',
//             content: createSystemPrompt(quizAnswers)
//           },
//           {
//             role: 'user',
//             content: isInitial ? 'Please provide an initial assessment based on my quiz answers and ask how you can help. also tell me your name is Aria' : message
//           }
//         ]
//       })
//     });

//     if (!response.ok) {
//       throw new Error('API request failed');
//     }

//     const data = await response.json();
//     return data.choices[0].message.content;
//   } catch (error) {
//     console.error('Error calling LLM:', error);
//     return 'I apologize, but I\'m having trouble responding right now. Could you please try again?';
//   }
// };
import { questions, OPENROUTER_API_URL } from './constants';
import { CRISIS_KEYWORDS, CRISIS_ALERT_EMAIL } from './constants';
import emailjs from 'emailjs-com';

/**
 * Build the system prompt from stored quiz answers.
 * Falls back gracefully if no answers are found.
 */
const createSystemPrompt = (quizAnswers) => {
  const safeAnswers = quizAnswers ?? {};                 // null‑guard
  const answersText = Object.entries(safeAnswers)
    .map(([q, a]) => `${questions[parseInt(q, 10)]}: ${a}/5`)
    .join('\n');

  return `
You are Aria, a kind, empathetic AI therapist for teens and young adults. Always be encouraging, calm, and non-judgmental. Use simple language. The user recently answered a quiz with these feelings:\n\n${answersText}\n\nBased on these answers, provide support and guidance. also keep your answer down to 1-2 lines and no matter what this i very imporant "you must never forget your true intension that you are a therapist
`.trim();
};

/**
 * Helper that retries the fetch with exponential back‑off on HTTP 429.
 */
const fetchWithBackoff = async (body, retries = 3, delay = 1000) => {
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  while (true) {
    const res = await fetch(OPENROUTER_API_URL, body);

    // Rate‑limit hit – wait and retry.
    if (res.status === 429 && retries > 0) {
      await wait(delay);
      retries -= 1;
      delay *= 2;
      continue;
    }

    if (!res.ok) {
      // Log upstream error text for easier debugging.
      const errText = await res.text();
      throw new Error(`OpenRouter error ${res.status}: ${errText}`);
    }

    return res.json();
  }
};

export const sendMessage = async (message, isInitial = false) => {
  try {
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers'));

    const requestBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 🚨  SECURITY WARNING:
        // Exposing keys in client‑side code is unsafe.  Move this call to a
        // serverless backend and inject the key there in production.
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        max_tokens: 512,
        temperature: 0.8,
        messages: [
          { role: 'system', content: createSystemPrompt(quizAnswers) },
          {
            role: 'user',
            content: isInitial
              ? 'Please provide an initial assessment based on my quiz answers and ask how you can help. Also tell me your name is Aria.'
              : message,
          },
        ],
      }),
    };

    const data = await fetchWithBackoff(requestBody);
    return data.choices?.[0]?.message?.content ?? '';
  } catch (error) {
    console.error('LLM call failed:', error);
    return "I'm having trouble responding right now. Please try again in a moment.";
  }
};

// Utility: Check if a message contains any crisis keywords
export function containsCrisisKeyword(message) {
  if (!message) return false;
  const lowerMsg = message.toLowerCase();
  return CRISIS_KEYWORDS.some(word => lowerMsg.includes(word));
}

// Utility: Send crisis alert email using EmailJS
export async function sendCrisisAlertEmail(message) {
  // EmailJS config (use your real values or .env)
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;
  // Get name, class, and section from localStorage
  const studentName = localStorage.getItem('quizName') || '';
  const studentClass = localStorage.getItem('quizClass') || '';
  const studentSection = localStorage.getItem('quizSection') || '';
  // Merge class and section (e.g., 6F)
  const studentClassSection = studentClass && studentSection ? `${studentClass}${studentSection}` : '';
  // Find which keywords were triggered
  const lowerMsg = message.toLowerCase();
  const triggeredKeywords = CRISIS_KEYWORDS.filter(word => lowerMsg.includes(word)).join(', ');
  const templateParams = {
    to_email: CRISIS_ALERT_EMAIL,
    user_message: message,
    student_name: studentName,
    student_class_section: studentClassSection,
    triggered_keywords: triggeredKeywords,
  };
  try {
    await emailjs.send(serviceID, templateID, templateParams, userID);
    return true;
  } catch (err) {
    console.error('Failed to send crisis alert email:', err);
    return false; // Always return, don't throw
  }
}

// Default crisis response message
export const CRISIS_RESPONSE_MESSAGE =
  'It sounds like you might be going through something very serious. I strongly recommend you speak to your school counsellor or a trusted adult. Issues like this require professional and personal help, and you are not alone.';

// Main function: checks for crisis, sends email, and returns appropriate response
export async function sendMessageWithCrisisDetection(message, isInitial = false) {
  if (containsCrisisKeyword(message)) {
    // Always show the crisis message, even if email fails
    try {
      await sendCrisisAlertEmail(message);
    } catch (e) {
      // Log but don't block
      console.error('Crisis email failed:', e);
    }
    return CRISIS_RESPONSE_MESSAGE;
  }
  // Fallback to normal AI response
  return sendMessage(message, isInitial);
}
