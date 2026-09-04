// screens/ListaProdutosScreen.js
// RF03 — Visualizar produtos (catálogo com nome, preço atual e promocional).
// RF04 — Adicionar ao carrinho (botão "+" em cada card).
import { Image } from 'react-native';
import { obterImagemProduto } from '../utils/imagensProdutos';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  buscarProdutosPorTexto,
  estaEmPromocao,
  precoFinal,
  formatarPreco,
} from '../utils/mockProdutos';
import { useCarrinho } from '../utils/CarrinhoContext';

export default function ListaProdutosScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const { itens, adicionarAoCarrinho } = useCarrinho();
  const quantidadeCarrinho = itens.length;
  const produtosFiltrados = buscarProdutosPorTexto(busca);

  function handleAdicionarAoCarrinho(produto) {
    adicionarAoCarrinho(produto);
  }

  function renderProduto({ item: produto }) {
    const emPromocao = estaEmPromocao(produto);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetalheProduto', { produtoId: produto.id })}
      >
       <View style={styles.cardImagem}>
  {produto.imagem && obterImagemProduto(produto.imagem) ? (
    <Image
      source={obterImagemProduto(produto.imagem)}
      style={styles.cardImagemFoto}
      resizeMode="cover"
    />
  ) : (
    <Text style={styles.cardImagemTexto}>IMG</Text>
  )}
          {emPromocao ? (
            <View style={styles.selosPromo}>
              <Text style={styles.selosPromoTexto}>promo</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardNome} numberOfLines={2}>
            {produto.nome}
          </Text>
          <Text style={styles.cardTipo}>{produto.tipo}</Text>

          <View style={styles.cardPrecos}>
            {emPromocao ? (
              <Text style={styles.precoAntigo}>{formatarPreco(produto.precoAtual)}</Text>
            ) : null}
            <Text style={styles.precoAtual}>{formatarPreco(precoFinal(produto))}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => handleAdicionarAoCarrinho(produto)}
        >
          <Text style={styles.botaoAdicionarTexto}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <Text style={styles.titulo}>Produtos</Text>
  <View style={styles.headerBotoes}>
    <TouchableOpacity
      style={styles.iconeCarrinho}
      onPress={() => navigation.navigate('Carrinho')}
    >
      <Text style={styles.iconeCarrinhoTexto}>🛒</Text>
      {quantidadeCarrinho > 0 ? (
        <View style={styles.badgeCarrinho}>
          <Text style={styles.badgeCarrinhoTexto}>{quantidadeCarrinho}</Text>
        </View>
      ) : null}
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.iconeSair}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }
    >
      <Text style={styles.iconeSairTexto}>Sair</Text>
    </TouchableOpacity>
  </View>
      </View>

      <TextInput
        style={styles.busca}
        placeholder="Buscar..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazioTexto}>Nenhum produto encontrado.</Text>
        }
      />

      <TouchableOpacity style={styles.botaoIA}>
        <Text style={styles.botaoIATexto}>IA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const VERDE = '#2E7D5B';
const LARANJA = '#E8772E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: VERDE,
  },
  iconeCarrinho: {
    padding: 6,
  },
  iconeCarrinhoTexto: {
    fontSize: 22,
  },
  badgeCarrinho: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: LARANJA,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeCarrinhoTexto: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  headerBotoes: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
},
iconeSair: {
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: '#FBEAEA',
},
iconeSairTexto: {
  color: '#C0392B',
  fontWeight: '600',
  fontSize: 13,
},
  busca: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardImagem: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#E4EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardImagemFoto: {
  width: '100%',
  height: '100%',
  borderRadius: 10,
},
  cardImagemTexto: {
    fontSize: 11,
    color: '#8FAFA0',
    fontWeight: '600',
  },
  selosPromo: {
    position: 'absolute',
    top: -6,
    left: -6,
    backgroundColor: LARANJA,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  selosPromoTexto: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardInfo: {
    flex: 1,
  },
  cardNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  cardTipo: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  cardPrecos: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
    gap: 6,
  },
  precoAntigo: {
    fontSize: 12,
    color: '#AAA',
    textDecorationLine: 'line-through',
  },
  precoAtual: {
    fontSize: 15,
    fontWeight: '700',
    color: VERDE,
  },
  botaoAdicionar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: VERDE,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botaoAdicionarTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  vazioTexto: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
  botaoIA: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#5B4FE8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  botaoIATexto: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
});