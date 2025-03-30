import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from "../services/gemini";
import { PERSONALITIES } from "../services/personalities";
import Navbar from "../components/Navbar";
import PersonalitySelectorCard from "../components/PersonalitySelectorCard";

import ChatSection from "../components/ChatSection";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState(PERSONALITIES.psicologa);
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const sliderRef = useRef(null);

  

  useEffect(() => {
    let metaViewport = document.querySelector('meta[name=viewport]');
    const originalContent = metaViewport?.getAttribute('content') || '';
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      document.head.appendChild(metaViewport);
    }
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    return () => {
      if (metaViewport && originalContent) {
        metaViewport.setAttribute('content', originalContent);
      } else if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const initialHeight = window.innerHeight;
    const handleResizeKeyboard = () => {
      const currentHeight = window.innerHeight;
      if (currentHeight < initialHeight * 0.75) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
        
      }
    };
    window.addEventListener('resize', handleResizeKeyboard);
    return () => {
      window.removeEventListener('resize', handleResizeKeyboard);
    };
  }, [isMobile]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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

    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (isMobile) {
      document.documentElement.style.fontSize = '16px';
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      document.documentElement.style.fontSize = '';
    }
  };

  // Configurações do carrossel com react-slick
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 pt-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      
    <h1 className="text-5xl font-extrabold text-center mb-2 titlepage">
      <span style={{ color: '#6834fa' }}>Yoo</span>
      <span
        style={{
          color: '#d16ce6',
          WebkitTextStroke: '1px black',
          paddingLeft: '4px'
        }}
      >
        Chat!
      </span>
    </h1>

    {/* Slogan */}
    <p className="text-center text-gray-400 text-sm mb-8">
      Inteligência Artificial com personalidade!
    </p>

        <div className="max-w-6xl mx-auto mb-10 relative">
        <h2 className="text-3xl font-bold text-center mb-8 text-zinc-100">
          Escolha um modelo de chatbot para conversar
        </h2>
          {/* Botões de navegação personalizados */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/-2 z-10 bg-gray-800 bg-opacity-80 p-2 rounded-full text-white shadow-lg hover:bg-gray-700"
            onClick={prevSlide}
            style={{ marginLeft: '-15px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carrossel usando react-slick */}
          <Slider ref={sliderRef} {...sliderSettings}>
            {Object.values(PERSONALITIES).map((personalityOption) => (
              <div key={personalityOption.id} className="p-2">
                <PersonalitySelectorCard
                  personality={personalityOption}
                  selected={personality?.id === personalityOption.id}
                  onSelect={() => {
                    setPersonality(personalityOption);
                    setMessages([]);
                  }}
                />
              </div>
            ))}
          </Slider>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/-2 z-10 bg-gray-800 bg-opacity-80 p-2 rounded-full text-white shadow-lg hover:bg-gray-700"
            onClick={nextSlide}
            style={{ marginRight: '-15px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <ChatSection
          personality={personality}
          input={input}
          setInput={setInput}
          messages={messages}
          loading={loading}
          inputRef={inputRef}
          chatContainerRef={chatContainerRef}
          messagesEndRef={messagesEndRef}
          handleSend={handleSend}
          handleClearChat={handleClearChat}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isMobile={isMobile}
          isKeyboardOpen={isKeyboardOpen}
        />
        <Footer />
      </div>
      
    </>
  );
}