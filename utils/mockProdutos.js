// utils/mockProdutos.js
// "Base de dados" simulada em memória para o catálogo (Fase 1, sem servidor).
// Entidade Produto conforme o documento: nome, precoAtual, precoPromocional,
// tipo, descricao e dataValidade.

const produtos = [
  {
    id: '1',
    nome: 'Ração Golden Filhotes 15kg',
    imagem: 'racaogolden15kg',
    precoAtual: 189.9,
    precoPromocional: 159.9,
    tipo: 'Ração',
    descricao:
      'Ração super premium para cães filhotes de todas as raças, rica em proteínas e ômega 6 para o desenvolvimento saudável.',
    dataValidade: '2027-03-15',
  },
  {
    id: '2',
    nome: 'Areia Higiênica para Gatos 4kg',
    imagem: 'areiapgatos',
    precoAtual: 34.9,
    precoPromocional: null,
    tipo: 'Higiene',
    descricao:
      'Areia sanitária com alta absorção de odores, formação de grumos firmes para fácil limpeza.',
    dataValidade: '2028-01-10',
  },
  {
    id: '3',
    nome: 'Brinquedo Mordedor Osso de Borracha',
    precoAtual: 24.9,
    precoPromocional: 17.9,
    tipo: 'Brinquedo',
    descricao:
      'Brinquedo resistente de borracha atóxica, ideal para cães de médio e grande porte aliviarem a ansiedade e cuidarem dos dentes.',
    dataValidade: '2030-01-01',
  },
  {
    id: '4',
    nome: 'Ração Whiskas Gatos Adultos 10kg',
    imagem: 'racaowhiskasadulto',
    precoAtual: 149.9,
    precoPromocional: null,
    tipo: 'Ração',
    descricao:
      'Ração completa para gatos adultos com carne, sabor irresistível e nutrientes para pele e pelo saudáveis.',
    dataValidade: '2027-06-20',
  },
  {
    id: '5',
    nome: 'Shampoo Neutro Pet Clean 500ml',
    imagem: 'shampoo_neutroclean',
    precoAtual: 29.9,
    precoPromocional: 22.9,
    tipo: 'Higiene',
    descricao:
      'Shampoo neutro hipoalergênico para cães e gatos de todas as idades, com pH balanceado para a pele do pet.',
    dataValidade: '2027-11-30',
  },
  {
    id: '6',
    nome: 'Coleira Ajustável Nylon M',
    imagem: 'coleiranylon',
    precoAtual: 39.9,
    precoPromocional: null,
    tipo: 'Acessório',
    descricao:
      'Coleira resistente em nylon reforçado, tamanho ajustável, ideal para cães de porte médio.',
    dataValidade: '2032-01-01',
  },
  {
    id: '7',
    nome: 'Petisco Bifinho Sabor Carne 500g',
    imagem: 'petiscobifinho',
    precoAtual: 19.9,
    precoPromocional: 14.9,
    tipo: 'Petisco',
    descricao:
      'Petisco saboroso e nutritivo para recompensar seu cão durante o treinamento ou apenas para agradar.',
    dataValidade: '2026-12-05',
  },
  {
    id: '8',
    nome: 'Arranhador para Gatos Torre 80cm',
    imagem: 'arranhador',
    precoAtual: 119.9,
    precoPromocional: 99.9,
    tipo: 'Acessório',
    descricao:
      'Arranhador em sisal natural com plataformas, ideal para gatos brincarem, arranharem e descansarem.',
    dataValidade: '2032-01-01',
  },
];

export function listarProdutos() {
  return produtos;
}

export function buscarProdutoPorId(id) {
  return produtos.find((p) => p.id === id);
}

/**
 * Filtra produtos pelo texto de busca (nome ou tipo), ignorando
 * maiúsculas/minúsculas e acentos simples.
 */
export function buscarProdutosPorTexto(texto) {
  const termo = (texto || '').trim().toLowerCase();
  if (termo.length === 0) {
    return produtos;
  }
  return produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(termo) || p.tipo.toLowerCase().includes(termo)
  );
}

export function estaEmPromocao(produto) {
  return produto.precoPromocional != null && produto.precoPromocional < produto.precoAtual;
}

export function precoFinal(produto) {
  return estaEmPromocao(produto) ? produto.precoPromocional : produto.precoAtual;
}

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}