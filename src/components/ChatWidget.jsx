import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from "../services/gemini";
import { PERSONALITIES } from "../services/personalities";
import PersonalitySelector from "./PersonalitySelector";

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll para o fim das mensagens quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detectar se o dispositivo é móvel
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Verificar inicialmente e ao redimensionar
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Lidar com o problema do teclado virtual em dispositivos móveis
  useEffect(() => {
    const handleResize = () => {
      // Ajustar a posição do scroll para manter a visualização das mensagens
      if (isMobile && messagesEndRef.current) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleSend = async () => {
    if (!input.trim() || !personality) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const promptFinal = `${personality.prompt}\nUsuário: ${input}`;
      const responseText = await sendMessageToGemini(promptFinal);

      const botMessage = { role: "bot", text: responseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = { 
        role: "bot", 
        text: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      // Após enviar a mensagem, garantir que o scroll está no fundo
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      ref={chatContainerRef}
      className={`fixed bg-white shadow-xl flex flex-col z-50 rounded-[28px] overflow-hidden border border-gray-200
        ${isMobile 
          ? "bottom-20 left-0 right-0 mx-auto max-w-full md:max-w-[420px] h-[80vh] max-h-[720px]" 
          : "bottom-20 right-5 max-w-[420px] w-full h-[720px]"
        }`}
    >
      {/* Header */}
      <div className="p-4 border-b bg-blue-600 text-white flex justify-between items-start">
        <div>
          <h1 className="text-sm font-semibold mb-1">💬 ChatBot com Personalidade</h1>
          <PersonalitySelector
            selected={personality}
            onSelect={(p) => {
              setPersonality(p);
              setMessages([]);
            }}
          />
        </div>
        <button 
          onClick={onClose} 
          className="text-yellow-500 font-bold text-lg hover:opacity-80 p-2"
          aria-label="Fechar chat"
        >
          X
        </button>
      </div>

      {personality && (
        <div className="bg-blue-50 text-blue-900 text-xs text-center py-1 px-3">
          Conversando com: <strong>{personality.name}</strong> — {personality.description}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-500 p-4">
            {personality 
              ? "Envie uma mensagem para começar a conversa." 
              : "Selecione uma personalidade para começar."}
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-gray-200 text-gray-900 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%] text-sm shadow">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={personality ? "Digite sua mensagem..." : "Selecione uma personalidade primeiro"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!personality || loading}
          />
          <button
            className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition ${
              !personality || loading || !input.trim()
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={handleSend}
            disabled={!personality || loading || !input.trim()}
          >
            Enviar
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleClearChat}
            className="text-gray-500 text-xs hover:text-red-500 transition p-1"
            disabled={messages.length === 0}
          >
            🗑️ Limpar conversa
          </button>
        </div>
      </div>
    </div>
  );
}