import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="flex justify-center mt-14 px-4 py-4 items-center text-sm text-gray-400 bg-black/20 border-t border-gray-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} YooChat — {t("footer_copyright")}{" "}
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
            className="text-purple-400 hover:text-purple-300 transition"
          >
            {t("footer_terms")}
          </Link>
          <Link
            to="/privacidade"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            {t("footer_privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
