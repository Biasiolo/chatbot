import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-14 px-4 py-4 text-sm text-gray-400 bg-black/20 border-t border-gray-800 backdrop-blur-md">
      <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left side: copyright */}
        <p className="text-center sm:text-left w-full sm:w-auto">
          © {new Date().getFullYear()} YooChat! — {t("footer_copyright")}{" "}
          <a
            href="https://github.com/Biasiolo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Biasiolo
          </a>
        </p>

        {/* Center: Product Hunt badge */}
        <div className="w-full sm:w-auto flex justify-center">
          <a
            href="https://www.producthunt.com/posts/yoochat?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yoochat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=952937&theme=dark&t=1744556767902"
              alt="YooChat - Chatbot with unique and fun personalities | Product Hunt"
              width="180"
              height="40"
              className="mx-auto"
            />
          </a>
        </div>

        {/* Right side: links */}
        <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
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
