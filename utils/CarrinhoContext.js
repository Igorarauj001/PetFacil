// utils/CarrinhoContext.js
// Estado global do carrinho (RF04-RF06), acessível de qualquer tela via
// useCarrinho(). Substitui o mockCarrinhoLocal.js usado nos testes isolados.

import React, { createContext, useContext, useState } from 'react';
import { precoFinal } from './mockProdutos';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarAoCarrinho(produto) {
    const itemCarrinho = {
      ...produto,
      carrinhoItemId: `${produto.id}-${Date.now()}-${Math.random()}`,
    };
    setItens((atual) => [...atual, itemCarrinho]);
  }

  function removerDoCarrinho(carrinhoItemId) {
    setItens((atual) => atual.filter((item) => item.carrinhoItemId !== carrinhoItemId));
  }

  function limparCarrinho() {
    setItens([]);
  }

  function calcularTotal() {
    return itens.reduce((soma, item) => soma + precoFinal(item), 0);
  }

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, calcularTotal }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider.');
  }
  return contexto;
}