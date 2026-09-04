// screens/DetalheProdutoScreen.js
// Tela de Detalhe do Produto (seção 9 do documento): descrição, tipo,
// validade e preços, com opção de adicionar ao carrinho (RF04).
import { Image } from 'react-native';
import { obterImagemProduto } from '../utils/imagensProdutos';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {
  buscarProdutoPorId,
  estaEmPromocao,
  precoFinal,
  formatarPreco,
  formatarData,
} from '../utils/mockProdutos';
import { useCarrinho } from '../utils/CarrinhoContext';

export default function DetalheProdutoScreen({ route, navigation }) {
  const { produtoId } = route.params;
  const produto = buscarProdutoPorId(produtoId);
  const [adicionado, setAdicionado] = useState(false);
const { adicionarAoCarrinho } = useCarrinho();

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={styles.erroTexto}>Produto não encontrado.</Text>
      </View>
    );
  }

  const emPromocao = estaEmPromocao(produto);

 function handleAdicionar() {
  adicionarAoCarrinho(produto);
  setAdicionado(true);
  setTimeout(() => setAdicionado(false), 1500);
}

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>‹ Voltar</Text>
      </TouchableOpacity>

      <View style={styles.imagemGrande}>
  {produto.imagem && obterImagemProduto(produto.imagem) ? (
    <Image
      source={obterImagemProduto(produto.imagem)}
      style={styles.imagemGrandeFoto}
      resizeMode="cover"
    />
  ) : (
    <Text style={styles.imagemGrandeTexto}>IMG</Text>
  )}
        {emPromocao ? (
          <View style={styles.selosPromo}>
            <Text style={styles.selosPromoTexto}>promo</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.tipo}>{produto.tipo}</Text>
        <Text style={styles.nome}>{produto.nome}</Text>

        <View style={styles.precos}>
          {emPromocao ? (
            <Text style={styles.precoAntigo}>{formatarPreco(produto.precoAtual)}</Text>
          ) : null}
          <Text style={styles.precoAtual}>{formatarPreco(precoFinal(produto))}</Text>
        </View>

        <Text style={styles.secaoTitulo}>Descrição</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>

        <Text style={styles.secaoTitulo}>Validade</Text>
        <Text style={styles.validade}>{formatarData(produto.dataValidade)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.botaoAdicionar, adicionado && styles.botaoAdicionado]}
        onPress={handleAdicionar}
      >
        <Text style={styles.botaoAdicionarTexto}>
          {adicionado ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const VERDE = '#2E7D5B';
const LARANJA = '#E8772E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F5',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  voltar: {
    marginBottom: 12,
  },
  voltarTexto: {
    color: VERDE,
    fontWeight: '600',
    fontSize: 15,
  },
  imagemGrande: {
    height: 200,
    borderRadius: 16,
    backgroundColor: '#E4EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagemGrandeTexto: {
    fontSize: 14,
    color: '#8FAFA0',
    fontWeight: '600',
  },
  selosPromo: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: LARANJA,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  selosPromoTexto: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  info: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  tipo: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  nome: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
  },
  precos: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 10,
  },
  precoAntigo: {
    fontSize: 14,
    color: '#AAA',
    textDecorationLine: 'line-through',
  },
  imagemGrandeFoto: {
  width: '100%',
  height: '100%',
  borderRadius: 16,
},
  precoAtual: {
    fontSize: 22,
    fontWeight: '700',
    color: VERDE,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginTop: 18,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  validade: {
    fontSize: 14,
    color: '#555',
  },
  botaoAdicionar: {
    backgroundColor: VERDE,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoAdicionado: {
    backgroundColor: '#1F5A41',
  },
  botaoAdicionarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  erroTexto: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
});