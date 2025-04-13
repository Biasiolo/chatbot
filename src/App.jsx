import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // 👈 IMPORTANTE!

import HomePage from "./pages/HomePage";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
      </Routes>
    </HelmetProvider>
  );
}
