// screens/PedidoFinalizadoScreen.js
// Tela de confirmação exibida após o RF07 (Finalizar pedido).

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PedidoFinalizadoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.titulo}>Pedido registrado!</Text>
      <Text style={styles.subtitulo}>
        Pague no caixa da loja no momento da retirada.
      </Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ListaProdutos')}
      >
        <Text style={styles.botaoTexto}>Voltar para os produtos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F5',
    padding: 24,
  },
  emoji: { fontSize: 56, marginBottom: 16 },
  titulo: { fontSize: 20, fontWeight: '700', color: '#2E7D5B' },
  subtitulo: { fontSize: 14, color: '#777', marginTop: 8, textAlign: 'center' },
  botao: {
    backgroundColor: '#2E7D5B',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  botaoTexto: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});