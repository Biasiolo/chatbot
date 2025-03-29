import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-14 px-4 py-4 items-center text-sm text-gray-400 bg-black/20 border-t border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
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

        <div className="flex gap-4">
          <Link
            to="/termos"
            className="hover:text-white transition"
          >
            Termos de Serviço
          </Link>
          <Link
            to="/privacidade"
            className="hover:text-white transition"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
