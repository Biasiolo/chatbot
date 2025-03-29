import React from "react";
import { Link } from "react-router-dom";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 py-10 text-center">
      <div className="max-w-3xl mx-auto">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="/logo1.png" 
              alt="Logo"
              className="h-20"
            />
          </Link>
        </div>

        {/* TÍTULO */}
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Política de Privacidade
        </h1>

        {/* TEXTO */}
        <p className="mb-4">
          Esta aplicação respeita a sua privacidade e valoriza a transparência no tratamento de dados.
        </p>

        <p className="mb-4">
          Não coletamos nem armazenamos nenhum dado sensível ou pessoal dos usuários além do necessário para o funcionamento básico da plataforma. Isso inclui apenas as informações de login, que são utilizadas unicamente para oferecer uma melhor experiência de uso.
        </p>

        <p className="mb-4">
          Conversas e interações realizadas nos chats não são armazenadas em nossos servidores. Caso algum histórico seja salvo, isso acontece apenas localmente no navegador do usuário, com o objetivo de manter o contexto e facilitar o uso.
        </p>

        <p className="mb-4">
          Seguimos os princípios da <strong>Lei Geral de Proteção de Dados (LGPD)</strong> e demais regulamentações aplicáveis. Não compartilhamos informações com terceiros e não utilizamos dados para fins de publicidade ou rastreamento.
        </p>

        {/* DATA */}
        <p className="mt-8 text-center text-gray-400">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        {/* BOTÃO VOLTAR */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
