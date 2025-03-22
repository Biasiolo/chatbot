import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Escolha do modelo (rápido e econômico)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Envia uma mensagem para o modelo Gemini e retorna a resposta.
 * @param {string} userMessage
 * @returns {Promise<string>} resposta do modelo
 */
export async function sendMessageToGemini(userMessage) {
  try {
    const result = await model.generateContent(
      userMessage,
      {
        generationConfig: {
          temperature: 0.7,         // Menor = mais direto, maior = mais criativo
          topP: 0.8,                // Nucleus sampling
          topK: 20,                 // Considera as 20 melhores opções
          maxOutputTokens: 80,    // Limita o comprimento da resposta
        },
      }
    );

    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "⚠️ Erro ao obter resposta do modelo.";
  }
}
