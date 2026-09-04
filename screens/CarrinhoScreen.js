// screens/CarrinhoScreen.js
// RF05 — Visualizar carrinho
// RF06 — Remover do carrinho
// RF07 — Finalizar pedido
import { Image } from 'react-native';
import { obterImagemProduto } from '../utils/imagensProdutos';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useCarrinho } from '../utils/CarrinhoContext';
import { precoFinal, formatarPreco } from '../utils/mockProdutos';
import { registrarComprasDoCarrinho } from '../utils/mockCompras';

export default function CarrinhoScreen({ navigation }) {
  const { itens, removerDoCarrinho, limparCarrinho, calcularTotal } = useCarrinho();

  function handleFinalizarPedido() {
    if (itens.length === 0) return;

    // RF08 — gera uma Compra para cada produto do carrinho.
    registrarComprasDoCarrinho(itens);
    limparCarrinho();
    navigation.navigate('PedidoFinalizado');
  }

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <View style={styles.itemImagem}>
  {item.imagem && obterImagemProduto(item.imagem) ? (
    <Image
      source={obterImagemProduto(item.imagem)}
      style={styles.itemImagemFoto}
      resizeMode="cover"
    />
  ) : (
    <Text style={styles.itemImagemTexto}>IMG</Text>
  )}
</View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemNome} numberOfLines={2}>
            {item.nome}
          </Text>
          <Text style={styles.itemPreco}>{formatarPreco(precoFinal(item))}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removerDoCarrinho(item.carrinhoItemId)}
          style={styles.botaoRemover}
        >
          <Text style={styles.botaoRemoverTexto}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>‹ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu carrinho</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.carrinhoItemId}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazioTexto}>Seu carrinho está vazio.</Text>
        }
      />

      <View style={styles.rodape}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValor}>{formatarPreco(calcularTotal())}</Text>
        </View>
        <TouchableOpacity
          style={[styles.botaoFinalizar, itens.length === 0 && styles.botaoDesabilitado]}
          onPress={handleFinalizarPedido}
          disabled={itens.length === 0}
        >
          <Text style={styles.botaoFinalizarTexto}>Finalizar pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const VERDE = '#2E7D5B';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  voltar: { color: VERDE, fontWeight: '600', fontSize: 15 },
  titulo: { fontSize: 18, fontWeight: '700', color: '#222' },
  lista: { paddingHorizontal: 20, paddingBottom: 16 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  itemImagem: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#E4EFE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemImagemFoto: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},
  itemImagemTexto: { fontSize: 10, color: '#8FAFA0', fontWeight: '600' },
  itemInfo: { flex: 1 },
  itemNome: { fontSize: 14, fontWeight: '600', color: '#222' },
  itemPreco: { fontSize: 14, fontWeight: '700', color: VERDE, marginTop: 4 },
  botaoRemover: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FBEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botaoRemoverTexto: { color: '#C0392B', fontWeight: '700' },
  vazioTexto: { textAlign: 'center', color: '#999', marginTop: 40 },
  rodape: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalLabel: { fontSize: 15, color: '#555' },
  totalValor: { fontSize: 20, fontWeight: '700', color: '#222' },
  botaoFinalizar: {
    backgroundColor: VERDE,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoDesabilitado: { backgroundColor: '#A9CBB9' },
  botaoFinalizarTexto: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});