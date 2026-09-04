// utils/mockCompras.js
// RF08 — Registrar compra. "Base de dados" simulada de compras em memória.
// Entidade Compra: nomeProduto, preco, dataDaCompra (uma por produto do
// carrinho, gerada ao finalizar o pedido).

import { precoFinal } from './mockProdutos';

let compras = [];

export function registrarCompra({ nomeProduto, preco, dataDaCompra }) {
  const compra = {
    id: `${Date.now()}-${Math.random()}`,
    nomeProduto,
    preco,
    dataDaCompra,
  };
  compras = [...compras, compra];
  return compra;
}

export function listarCompras() {
  return compras;
}

/**
 * Gera uma Compra para cada item do carrinho ao finalizar o pedido,
 * conforme regra da seção 7 do documento.
 */
export function registrarComprasDoCarrinho(itensCarrinho) {
  const dataAtual = new Date().toISOString();
  return itensCarrinho.map((item) =>
    registrarCompra({
      nomeProduto: item.nome,
      preco: precoFinal(item),
      dataDaCompra: dataAtual,
    })
  );
}