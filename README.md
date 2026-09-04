# PetFácil — App Mobile (React Native)

Aplicativo de compras para pet shop com recomendações personalizadas, desenvolvido em React Native para a disciplina de Sistemas de Informação (Desenvolvimento Mobile).

**Fase 1:** front-end completo com dados simulados (mock), sem servidor, banco de dados ou autenticação real.

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Igor | Login e Cadastro (RF01, RF02) |
| Israel | Catálogo e detalhe do produto (RF03) |
| Nathan | Carrinho e finalização de pedido (RF04–RF08) |
| Kaik | Assistente com IA (RF09) |

## Funcionalidades implementadas

- ✅ Cadastro de usuário com validação completa (nome, e-mail, CPF com dígitos verificadores, senha + confirmação)
- ✅ Login simulado
- ✅ Catálogo de produtos com busca, preços e selo de promoção
- ✅ Fotos reais dos produtos
- ✅ Tela de detalhe do produto (descrição, tipo, validade)
- ✅ Carrinho de compras (adicionar, remover, ver total)
- ✅ Finalização de pedido com registro de compra
- ✅ Assistente virtual com IA (respostas simuladas sobre produtos, promoções e pedidos)
- ✅ Botão de sair (logout)

## Tecnologias

- React Native (via Expo, SDK 54)
- React Navigation
- React Context API (estado global do carrinho)
- Dados mockados em memória (sem back-end nesta fase)

## Como clonar e rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Igorarauj001/PetFacil.git
cd PetFacil
```

### 2. Instalar as dependências

```bash
npm install
npx expo install --fix
```

### 3. Rodar o projeto

```bash
npx expo start -c
```

Vai aparecer um QR code no terminal. Formas de abrir o app:

- **Celular:** instale o app **Expo Go** (Android/iOS) e escaneie o QR code. O celular precisa estar na **mesma rede Wi-Fi** do computador (dica: se não tiver Wi-Fi disponível, ative o compartilhamento de internet do próprio celular e conecte o computador nele).
- **Navegador:** aperte `w` no terminal.
- **Emulador Android:** aperte `a` (precisa ter um emulador configurado).

### 4. Credenciais de teste (login)

Existe um usuário mock pré-cadastrado para testes rápidos:
- **Login:** `teste@petfacil.com`
- **Senha:** `123456`

Também é possível criar uma conta nova pela tela de Cadastro. Use um CPF válido (com dígitos verificadores corretos) — CPFs aleatórios são rejeitados pela validação.

## Estrutura de pastas
assets/produtos/ -> Fotos dos produtos do catálogo
components/ -> Componentes compartilhados (ex: Assistente com IA)
screens/ -> Telas do app (Login, Cadastro, Produtos, Carrinho, etc.)
utils/ -> Funções auxiliares, dados mockados e Context do carrinho
App.js -> Ponto de entrada, configuração das rotas
