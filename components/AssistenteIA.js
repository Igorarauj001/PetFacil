// components/AssistenteIA.js
// RF09 — Assistente com IA. Fase 1: respostas simuladas a partir de um
// conjunto de perguntas e respostas frequentes (sem serviço de IA real).
// Fica disponível durante toda a navegação (botão flutuante global).

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { listarProdutos, estaEmPromocao, formatarPreco, precoFinal } from '../utils/mockProdutos';

const SAUDACAO =
  'Oi! Sou o assistente do PetFácil 🐾 Posso ajudar com dúvidas sobre produtos, promoções ou como finalizar seu pedido. O que você quer saber?';

function gerarResposta(pergunta) {
  const texto = pergunta.toLowerCase();

  if (texto.includes('promo')) {
    const produtosPromo = listarProdutos().filter(estaEmPromocao);
    if (produtosPromo.length === 0) {
      return 'No momento não temos produtos em promoção, mas fique de olho — atualizamos sempre!';
    }
    const lista = produtosPromo
      .map((p) => `• ${p.nome} — ${formatarPreco(precoFinal(p))}`)
      .join('\n');
    return `Hoje estão em promoção:\n${lista}`;
  }

  if (texto.includes('filhote')) {
    const racoesFilhote = listarProdutos().filter(
      (p) => p.tipo.toLowerCase() === 'ração' && p.nome.toLowerCase().includes('filhote')
    );
    if (racoesFilhote.length > 0) {
      return `Recomendo a ${racoesFilhote[0].nome}, ideal para filhotes de todas as raças.`;
    }
    return 'Procure pelo filtro "Ração" na lista de produtos — temos opções para filhotes.';
  }

  if (texto.includes('finaliz') || texto.includes('pedido') || texto.includes('comprar')) {
    return 'Para finalizar seu pedido: adicione produtos ao carrinho, toque no ícone do carrinho, revise os itens e toque em "Finalizar pedido". O pagamento é feito no caixa da loja, na retirada.';
  }

  if (texto.includes('remover') || texto.includes('excluir') || texto.includes('tirar')) {
    return 'No carrinho, cada item tem um "x" ao lado — é só tocar para removê-lo.';
  }

  if (texto.includes('pagamento') || texto.includes('pagar')) {
    return 'O pagamento é feito no caixa da loja, no momento da retirada do pedido. Pelo app você só monta e registra seu pedido.';
  }

  return 'Ainda não tenho uma resposta pronta para isso. Você pode perguntar sobre promoções, produtos para filhotes, ou como finalizar seu pedido.';
}

export default function AssistenteIA() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState([{ id: '0', autor: 'ia', texto: SAUDACAO }]);
  const [textoInput, setTextoInput] = useState('');
  const listaRef = useRef(null);

  function handleEnviar() {
    const pergunta = textoInput.trim();
    if (pergunta.length === 0) return;

    const mensagemUsuario = { id: `u-${Date.now()}`, autor: 'usuario', texto: pergunta };
    const resposta = { id: `ia-${Date.now()}`, autor: 'ia', texto: gerarResposta(pergunta) };

    setMensagens((atual) => [...atual, mensagemUsuario, resposta]);
    setTextoInput('');

    setTimeout(() => listaRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <>
      <TouchableOpacity style={styles.botaoFlutuante} onPress={() => setAberto(true)}>
        <Text style={styles.botaoFlutuanteTexto}>IA</Text>
      </TouchableOpacity>

      <Modal visible={aberto} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitulo}>Assistente PetFácil</Text>
              <TouchableOpacity onPress={() => setAberto(false)}>
                <Text style={styles.fechar}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              ref={listaRef}
              data={mensagens}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listaMensagens}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.bolha,
                    item.autor === 'usuario' ? styles.bolhaUsuario : styles.bolhaIA,
                  ]}
                >
                  <Text style={item.autor === 'usuario' ? styles.textoUsuario : styles.textoIA}>
                    {item.texto}
                  </Text>
                </View>
              )}
            />

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua dúvida..."
                value={textoInput}
                onChangeText={setTextoInput}
                onSubmitEditing={handleEnviar}
              />
              <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviar}>
                <Text style={styles.botaoEnviarTexto}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const VERDE = '#2E7D5B';
const ROXO = '#5B4FE8';

const styles = StyleSheet.create({
  botaoFlutuante: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ROXO,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 999,
  },
  botaoFlutuanteTexto: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  chatContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '75%',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  chatTitulo: { fontSize: 16, fontWeight: '700', color: VERDE },
  fechar: { fontSize: 18, color: '#999' },
  listaMensagens: { padding: 16 },
  bolha: { maxWidth: '80%', borderRadius: 14, padding: 12, marginBottom: 10 },
  bolhaIA: { backgroundColor: '#F0F4F2', alignSelf: 'flex-start' },
  bolhaUsuario: { backgroundColor: VERDE, alignSelf: 'flex-end' },
  textoIA: { color: '#333', fontSize: 14, lineHeight: 20 },
  textoUsuario: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginRight: 8,
  },
  botaoEnviar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: VERDE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoEnviarTexto: { color: '#FFF', fontSize: 16 },
});