# Memory Card Game 🃏

Jogo da memória desenvolvido para praticar conceitos de desenvolvimento web. Encontre todos os pares de cartas para vencer ✨.

<div align=center>

![image](https://user-images.githubusercontent.com/55285816/171072451-4d173c11-a0a7-4bd3-8b55-6bd457a14602.png)

</div>

<div display="inline-block" align="center">

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

</div>

## Funcionalidades

- **4 níveis de dificuldade** — 4, 6, 8 ou 10 pares de cartas
- **Cronômetro** — tempo contado desde o início da partida
- **Contador de jogadas** — total de tentativas e erros separados
- **Barra de progresso** — indica quantos pares já foram encontrados
- **Melhor tempo** — salvo por nível no `localStorage` e exibido na tela inicial
- **Animação de flip 3D** — virada de carta com duas faces reais (sem troca de imagem)
- **Pré-carregamento de imagens** — frente e verso carregados ao iniciar, sem delay no flip
- **Feedback visual** — brilho verde nos pares encontrados, tremor vermelho nos erros
- **Tela de resultado** — exibe tempo, jogadas, erros e precisão ao fim da partida

## Configurando e rodando o projeto

Instale as dependências com pnpm:

```bash
pnpm install
```

Execute o script desejado:

```bash
# Rodar em modo dev
pnpm dev

# Rodar os testes
pnpm test

# Rodar os testes em modo watch
pnpm test:watch

# Gerar build de produção
pnpm build

# Visualizar o build gerado
pnpm preview
```

## Estrutura do projeto

```
src/
├── index.ts               # Entrada da aplicação
├── GameController.ts      # Lógica principal do jogo (timer, pontuação, game over)
├── EventEmitter.ts        # Utilitário de eventos
├── components/
│   ├── Card.ts            # Componente de carta (flip 3D, shake, match)
│   └── CardList.ts        # Grade de cartas e seleção de pares
├── util/
│   ├── generate-cards.ts  # Geração e embaralhamento das cartas
│   └── shuffle-array.ts   # Algoritmo Fisher-Yates
└── styles/
    ├── index.scss          # Estilos globais e layout
    ├── _game.scss          # Estilos e animações do jogo
    ├── _variables.scss     # Variáveis de cor
    └── _mixins.scss        # Mixins SCSS
```
