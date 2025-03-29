import React from "react";
import { Link } from "react-router-dom";

const Termos = () => {
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
          Termos de Serviço
        </h1>

        {/* TEXTO */}
        <p className="mb-4">
          Ao utilizar esta aplicação, você concorda com os termos descritos abaixo. É importante ler com atenção antes de continuar utilizando nossos serviços.
        </p>

        <p className="mb-4">
          Oferecemos um sistema de chat com personalidades variadas, que simulam diferentes perfis de interação e estilos de linguagem. Novas personalidades podem ser lançadas periodicamente para aprimorar a experiência do usuário.
        </p>

        <p className="mb-4">
          Algumas personalidades são disponibilizadas de forma gratuita. Outras, mais avançadas ou especializadas, poderão ser liberadas mediante o pagamento de um valor único.
        </p>

        <p className="mb-4">
          Ao efetuar uma compra, você concorda que <strong>não haverá reembolso</strong>. Os pagamentos são considerados definitivos e a liberação das personalidades é imediata.
        </p>

        <p className="mb-4">
          Esta aplicação não oferece garantias quanto à precisão, adequação ou confiabilidade das respostas geradas. As interações ocorrem com base em modelos de linguagem automática, e eventuais erros ou imprecisões são possíveis.
        </p>

        <p className="mb-4">
          O conteúdo, os riscos e os resultados das conversas são de inteira responsabilidade do usuário. Recomendamos sempre o uso consciente e respeitoso da ferramenta.
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

export default Termos;
