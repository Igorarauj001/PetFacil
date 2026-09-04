// utils/imagensProdutos.js
// Mapa de imagens dos produtos. O require() do React Native precisa de um
// caminho fixo (não aceita variável), por isso listamos aqui manualmente.

const mapaImagens = {
  racaogolden15kg: require('../assets/produtos/racaogolden15kg.jpg'),
  areiapgatos: require('../assets/produtos/areiapgatos.jpg'),
  racaowhiskasadulto: require('../assets/produtos/racaowhiskasadulto.jpg'),
  shampoo_neutroclean: require('../assets/produtos/shampoo_neutroclean.jpg'),
  coleiranylon: require('../assets/produtos/coleiranylon.jpg'),
  petiscobifinho: require('../assets/produtos/petiscobifinho.jpg'),
  arranhador: require('../assets/produtos/arranhador.jpg'),
};

export function obterImagemProduto(chave) {
  return mapaImagens[chave] || null;
}