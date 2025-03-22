import React, { useState, useEffect } from "react";
import ChatWidget from "../components/ChatWidget";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Configurar viewport meta tag para dispositivos móveis
  useEffect(() => {
    // Verificar se já existe uma meta viewport
    let metaViewport = document.querySelector('meta[name=viewport]');
    
    if (!metaViewport) {
      // Criar e adicionar meta viewport se não existir
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      document.head.appendChild(metaViewport);
    }
    
    // Configurar o conteúdo da meta viewport
    metaViewport.setAttribute('content', 
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    return () => {
      // Opcionalmente, restaurar para um valor padrão quando o componente for desmontado
      metaViewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0');
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center text-center p-4">
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

      {/* Chat flutuante */}
      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}