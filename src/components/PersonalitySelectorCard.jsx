import React from "react";

export default function PersonalitySelectorCard({ personality, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border transition p-3 shadow shadow-cyan-300  hover:shadow-md bg-white flex flex-col items-center text-center w-full max-w-[180px] mx-auto
        ${selected ? "border-blue-600 ring-2 ring-blue-300" : "border-gray-200"}`}
    >
      {/* Imagem do avatar */}
      <div className="w-16 h-16 mb-3 overflow-hidden rounded-full bg-gray-100 shadow">
        <img
          src={personality.image}
          alt={personality.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-semibold text-1xl text-gray-800 mb-1">
        {personality.name}
      </h3>
      <p className="text-xs text-gray-500 text-center line-clamp-3">
        {personality.description}
      </p>
    </div>
  );
}
