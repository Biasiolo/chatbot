import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data?.user && !data?.session) {
      setError("Verifique seu e-mail para confirmar o cadastro.");
    } else {
      navigate("/");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-800">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <img src="/logo-w.webp" alt="YooChat Logo" className="h-10 w-10 rounded-full mx-auto" />
          <div className="w-5" />
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-8">
          {isSignUp ? "Criar Conta" : "Entrar"}
        </h1>

        {error && (
          <div className="bg-red-900/40 border border-red-800 text-red-200 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-5">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-300 mb-1 block">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white cursor-pointer"
          >
            {isLoading ? "Aguarde..." : isSignUp ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="mt-6">
          <div className="text-center text-sm text-gray-400">ou entre com</div>
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 cursor-pointer text-white py-3 rounded-lg transition"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
          <button
            type="button"
            onClick={toggleView}
            className="ml-1 text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
          >
            {isSignUp ? "Entrar" : "Cadastrar"}
          </button>
        </p>
      </div>
    </div>
  );
}
