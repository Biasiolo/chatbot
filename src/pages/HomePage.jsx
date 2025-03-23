import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from "../services/gemini";
import { PERSONALITIES } from "../services/personalities";
import PersonalitySelectorCard from "../components/PersonalitySelectorCard";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState(PERSONALITIES.amigo_ofensivo);
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
    <div className="min-h-screen px-4 py-8 bg-gray-950">
      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Escolha um Modelo de ChatBot 🤖
      </h1>

      {/* Cards de modelos */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10 place-items-center ">
        {Object.values(PERSONALITIES).map((personalityOption) => (
          <PersonalitySelectorCard
            key={personalityOption.id}
            personality={personalityOption}
            selected={personality?.id === personalityOption.id}
            onSelect={() => {
              setPersonality(personalityOption);
              setMessages([]);
            }}
          />
        ))}
      </div>

      {/* Chat */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        {personality && (
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-lg font-semibold">
              Conversando com: {personality.name}
            </h2>
            <p className="text-sm text-blue-100">{personality.description}</p>
          </div>
        )}

        {/* Mensagens */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md ${
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
            <div className="text-center text-gray-500 text-sm">Pensando...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!personality}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
              onClick={handleSend}
              disabled={loading || !personality}
            >
              Enviar
            </button>
          </div>
          <div className="text-center">
            <button
              onClick={handleClearChat}
              className="text-gray-500 text-xs hover:text-red-500 transition"
              disabled={messages.length === 0}
            >
              🗑️ Limpar conversa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
