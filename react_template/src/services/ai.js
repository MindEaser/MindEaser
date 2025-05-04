// src/services/ai.js
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/";

class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    this.modelId = import.meta.env.VITE_HUGGINGFACE_MODEL_ID;
  }

  async generateResponse(message) {
    try {
      const response = await fetch(`${HUGGINGFACE_API_URL}${this.modelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data[0]?.generated_text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  }
}

export const aiService = new AIService();