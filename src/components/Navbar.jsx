import React from "react";


export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-b from-gray-900/90 to-transparent text-white shadow-md shadow-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo1.png" alt="YooChat Logo" className="h-11 w-11 rounded-full" />
          
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            to="/signup"
            className="px-4 cursor-pointer py-1.5 rounded-full text-sm font-medium bg-indigo-600  text-indigo-300 hover:bg-indigo-600/50 transition"
          >
            Sign Up
          </button>
          <button
            to="/login"
            className="px-4 cursor-pointer py-1.5 rounded-full text-sm font-medium bg-purple-600 text-purple-300 hover:bg-purple-600/50 transition"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
