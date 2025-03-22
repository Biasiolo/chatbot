import React from "react";
import { PERSONALITIES } from "../services/personalities";

export default function PersonalitySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.values(PERSONALITIES).map((personality) => (
        <button
          key={personality.id}
          onClick={() => onSelect(personality)}
          className={`text-center px-2 py-2 text-xs sm:text-sm cursor-pointer  rounded-md transition-all h-14 font-medium
            ${
              selected?.id === personality.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
        >
          {personality.name}
        </button>
      ))}
    </div>
  );
}
