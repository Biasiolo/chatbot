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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !personality) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const promptFinal = `${personality.prompt}\nUsuário: ${input}`;
    const responseText = await sendMessageToGemini(promptFinal);

    const botMessage = { role: "bot", text: responseText };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92vw] h-[90vh] bg-white shadow-xl flex flex-col z-50 rounded-2xl overflow-hidden border border-gray-200
  md:bottom-20 md:right-4 md:left-auto md:translate-x-0 md:w-[35vw] md:h-[80vh] md:rounded-[28px]">

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
        <button onClick={onClose} className="text-yellow-500 font-bold text-sm hover:opacity-80">
          X
        </button>
      </div>

      {personality && (
        <div className="bg-blue-50 text-blue-900 text-xs text-center py-1 px-3">
          Conversando com: <strong>{personality.name}</strong> — {personality.description}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
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
        {loading && <div className="text-center text-gray-500 text-sm">Pensando...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-full text-sm font-medium hover:bg-blue-700 transition"
            onClick={handleSend}
            disabled={loading}
          >
            Enviar
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleClearChat}
            className="text-gray-500 text-xs hover:text-red-500 transition"
          >
            🗑️ Limpar conversa
          </button>
        </div>
      </div>
    </div>
  );
}
