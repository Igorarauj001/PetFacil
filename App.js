// App.js
// Ponto de entrada do PetFácil — todas as telas integradas.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarrinhoProvider } from './utils/CarrinhoContext';

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import ListaProdutosScreen from './screens/ListaProdutosScreen';
import DetalheProdutoScreen from './screens/DetalheProdutoScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import PedidoFinalizadoScreen from './screens/PedidoFinalizadoScreen';
import AssistenteIA from './components/AssistenteIA';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="ListaProdutos" component={ListaProdutosScreen} />
          <Stack.Screen name="DetalheProduto" component={DetalheProdutoScreen} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          <Stack.Screen name="PedidoFinalizado" component={PedidoFinalizadoScreen} />
        </Stack.Navigator>

        {/* Assistente com IA disponível durante toda a navegação (RF09) */}
        <AssistenteIA />
      </NavigationContainer>
    </CarrinhoProvider>
  );
}