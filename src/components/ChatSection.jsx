import React, { useEffect } from "react";

export default function ChatSection({
  personality,
  input,
  setInput,
  messages,
  loading,
  inputRef,
  chatContainerRef,
  messagesEndRef,
  handleSend,
  handleClearChat,
  handleFocus,
  handleBlur,
  isMobile,
  isKeyboardOpen
}) {
  useEffect(() => {
    if (!loading) {
      inputRef?.current?.focus();
    }
  }, [inputRef, loading]);

  return (
    <div
      ref={chatContainerRef}
      className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black/10 shadow-lg shadow-indigo-500/10"
      style={{
        transform: isMobile ? 'translateZ(0)' : undefined,
        willChange: isMobile ? 'transform' : undefined,
        backdropFilter: 'blur(8px)',
      }}
    >
      {personality && (
        <div className="bg-gradient-to-r from-indigo-700 to-purple-900 text-zinc-100 p-4">
          <h2 className="text-lg font-semibold">
            Conversando com: {personality.name}
          </h2>
          <p className="text-sm text-purple-100">{personality.description}</p>
        </div>
      )}

      <div
        className={`${
          isMobile && isKeyboardOpen ? 'h-[200px]' : 'h-[380px]'
        } overflow-y-auto p-4 space-y-3 bg-gray-600/20`}
      >
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-300 p-4">
            {personality
              ? "Envie uma mensagem para começar a conversa."
              : "Selecione uma personalidade para começar."}
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <img
                  src={personality.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2 object-cover border border-purple-600 shadow-md"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-md whitespace-pre-wrap break-words font-sans ${
                  isUser
                    ? "bg-indigo-600 text-zinc-100 rounded-br-sm"
                    : "bg-gray-700 text-zinc-100 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start items-center">
            <img
              src={personality.image}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover border border-purple-600 shadow-md"
            />
            <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%] text-sm shadow-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input e botão */}
      <div className="border-t border-gray-700 p-4 flex flex-col gap-2 bg-black/30">
        <div className="flex gap-2">
        <textarea
  ref={inputRef}
  className="flex-1 border border-gray-600 rounded-xl px-4 py-2 text-base bg-gray-900 text-zinc-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
  rows={2}
  placeholder="Digite sua mensagem..."
  value={input}
  maxLength={500} // 🔒 Limite de caracteres aqui (ajustável)
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }}
  onFocus={handleFocus}
  onBlur={handleBlur}
  disabled={!personality || loading}
  style={{ fontSize: '16px' }}
/>
<p className="text-right text-xs text-gray-400 mt-1">
  {input.length}/500
</p>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !personality || loading || !input.trim()
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-zinc-100 hover:bg-purple-700"
            }`}
            onClick={handleSend}
            disabled={loading || !personality || !input.trim()}
          >
            Enviar
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handleClearChat}
            className="text-gray-400 text-xs hover:text-red-400 transition p-1 cursor-pointer"
            disabled={messages.length === 0}
          >
            🗑️ Limpar conversa
          </button>
        </div>
      </div>
    </div>
  );
}
