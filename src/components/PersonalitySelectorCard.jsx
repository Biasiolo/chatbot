import React from "react";
import { useTranslation } from "react-i18next";

export default function PersonalitySelectorCard({ personality, selected, onSelect }) {
  const { t } = useTranslation("personalities");

  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer 
        rounded-xl 
        p-4 
        flex flex-col 
        items-center 
        text-center 
        w-full 
        max-w-[180px] 
        mx-auto
        transition-all 
        duration-300 
        ease-in-out
        shadow-indigo-600
        relative
        overflow-hidden
        ${selected 
          ? "bg-gradient-to-br from-purple-600/90 to-indigo-800/90 shadow-lg shadow-purple-500/30 border border-purple-400/50" 
          : "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/60"
        }
      `}
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Indicador de seleção */}
      {selected && (
        <div className="absolute top-0 right-0 -mt-1 -mr-1 p-2">
          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Imagem */}
      <div className={`
        relative 
        w-15 h-15 
        mb-4 
        rounded-full 
        overflow-hidden 
        group-hover:scale-105
        transition-transform
        duration-300
        ${selected 
          ? "ring-3 ring-purple-400 ring-offset-2 ring-offset-purple-900" 
          : "ring-2 ring-indigo-300/30"
        }
      `}>
        <img
          src={personality.image}
          alt={t(`${personality.id}.name`)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`
          absolute inset-0 
          rounded-full 
          transition-opacity
          ${selected 
            ? "bg-gradient-to-b from-purple-500/20 to-transparent" 
            : "bg-gradient-to-b from-indigo-500/10 to-transparent"
          }
        `} />
      </div>

      {/* Nome */}
      <h3 className={`font-bold text-sm mb-2 transition-colors duration-300 ${selected ? "text-zinc-200" : "text-gray-100"}`}>
        {t(`${personality.id}.name`)}
      </h3>

      {/* Descrição */}
      <p className={`text-xs line-clamp-3 transition-colors duration-300 ${selected ? "text-purple-100" : "text-gray-300"}`}>
        {t(`${personality.id}.description`)}
      </p>

      {/* Botão */}
      <div className={`mt-3 py-1 px-3 rounded-full text-xs font-medium transition-all duration-300 ${selected 
        ? "bg-white/20 text-white" 
        : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30"}`}>
        {selected ? t("selected_label", { ns: "translation" }) : t("select_label", { ns: "translation" })}
      </div>
    </div>
  );
}
