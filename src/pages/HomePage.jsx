import React, { useState } from "react";
import ChatWidget from "../components/ChatWidget";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-gray-100 flex items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-gray-800">
        CLIQUE NO BOTÃO E CONVERSE COM DIFERENTES PERSONALIDADES
      </h1>

      {/* ✅ Botão flutuante - canto inferior direito */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-5 py-3 cursor-pointer rounded-full shadow-lg text-sm hover:bg-blue-700 transition z-40"
        >
          💬 INICIAR
        </button>
      )}

      {/* Chat flutuante no canto inferior direito */}
      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)}  className="rounded-3xl p-4" />}
    </div>
  );
}
