import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // Recupera o usuário ao carregar a Navbar
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();

    // Listener para login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const displayName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email;

  return (
    <header className="w-full bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-md shadow-black/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-w.webp"
            alt="YooChat Logo"
            className="h-11 w-11 rounded-full"
          />
        </Link>

        {/* Autenticação */}
        {user ? (
          <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={displayName}
                className="w-8 h-8 rounded-full border border-purple-500 shadow-sm object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="text-sm text-zinc-300 hidden sm:block max-w-[150px] truncate">
              {displayName}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 hover:bg-red-600 transition rounded-full cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full text-sm text-zinc-100 font-medium bg-indigo-600 hover:bg-indigo-600/50 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-600 text-zinc-100 hover:bg-purple-600/50 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
