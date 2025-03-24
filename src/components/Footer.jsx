import React from "react";

export default function Footer() {
  return (
    <footer className=" flex justify-center mt-14 px-4 py-2 items-center text-sm text-gray-400 bg-black/20 border-t border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center ">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} YooChat — Desenvolvido por{" "}
          <a
            href="https://github.com/Biasiolo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Biasiolo
          </a>
        </p>

        
      </div>
    </footer>
  );
}
