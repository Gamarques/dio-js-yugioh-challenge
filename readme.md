# 🎴 Yu-Gi-Oh! | Jo-Ken-Pô Edition

Um jogo de cartas inspirado no universo Yu-Gi-Oh! que combina elementos de Jokenpô (Pedra, Papel e Tesoura) com uma interface moderna e responsiva.

![Yu-Gi-Oh Jo-Ken-Pô](https://img.shields.io/badge/Status-Concluído-green) ![Versão](https://img.shields.io/badge/Versão-2.0-blue) ![Licença](https://img.shields.io/badge/Licença-MIT-yellow)

## 🎯 Sobre o Projeto

Este projeto é uma recriação moderna do clássico jogo de Jokenpô, ambientada no universo Yu-Gi-Oh!. O jogador enfrenta o computador em duelos de cartas, onde cada carta possui atributos que determinam quem vence (similar ao sistema de Pedra, Papel e Tesoura).

### ✨ Funcionalidades Principais

- 🎮 **Duelo Automático**: Sistema de combate entre cartas do jogador e computador
- 🎵 **Sistema de Áudio Avançado**: Sons e música tema com preload inteligente
- 📱 **Design Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Vídeo de fundo dinâmico e animações suaves
- 🏆 **Sistema de Pontuação**: Acompanhamento de vitórias e derrotas
- 🎯 **Estados do Jogo**: Gerenciamento inteligente dos diferentes estados (início, seleção, duelo, fim)
- 🔄 **Reinício Automático**: Botão para iniciar novo duelo após cada rodada

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com Flexbox, Grid e Media Queries
- **JavaScript (ES6+)**: Lógica do jogo, gerenciamento de estado e interações
- **Web Audio**: Sistema avançado de áudio com preload

## 🎮 Como Jogar

1. **Clique em "INICIAR JOGO"** para ativar os sons
2. **Selecione uma carta** clicando nela
3. **Assista ao duelo** entre sua carta e a do computador
4. **Veja o resultado** e clique em "GANHOU/PERDEU/EMPATE" para jogar novamente

### 📋 Regras do Jogo

- **Blue Eyes White Dragon** (Paper) vence **Dark Magician** (Rock)
- **Dark Magician** (Rock) vence **Exodia** (Scizor)  
- **Exodia** (Scizor) vence **Blue Eyes White Dragon** (Paper)
- Empate quando cartas iguais são selecionadas

## 🚀 Conceitos de Programação Abordados

### 📊 Gerenciamento de Estado Manual
```javascript
const state = {
    score: { playerScore: 0, computerScore: 0 },
    currentGameState: "inicio",
    audioInitialized: false,
    userInteracted: false
}
```

### 🎵 Sistema de Áudio Profissional
- **Pré-carregamento inteligente** de todos os sons
- **Múltiplas instâncias** para sons frequentes (evita conflitos)
- **Respeito às políticas de autoplay** dos navegadores modernos
- **Overlay de boas-vindas** para primeira interação obrigatória

### 📱 Design Responsivo Avançado
- **Media Queries estratificadas**: Desktop → Tablet → Smartphone
- **Função clamp()**: Escalabilidade suave dos elementos
- **Otimizações para touch**: Feedback visual em dispositivos móveis
- **Layout paisagem**: Adaptação especial para mobile em modo paisagem

### 🔧 Arquitetura Limpa
- **Separação de responsabilidades**: HTML, CSS e JS bem organizados
- **Funções assíncronas**: Para carregamento de áudio e animações
- **Tratamento de erros**: Sistema robusto que não quebra com falhas
- **Performance otimizada**: Reutilização de instâncias e preload estratégico

## 📁 Estrutura do Projeto

```
dio-js-yugioh-challenge/
├── index.html                 # Estrutura principal
├── readme.md                  # Documentação (este arquivo)
└── src/
    ├── scripts/
    │   └── engine.js          # Lógica principal do jogo
    ├── styles/
    │   ├── main.css           # Estilos responsivos
    │   ├── reset.css          # Reset de estilos
    │   ├── buttons.css        # Estilos dos botões
    │   └── containers_and_frames.css
    └── assets/
        ├── audios/            # Arquivos de som
        ├── icons/             # Ícones das cartas
        ├── video/             # Vídeo de fundo
        ├── cursor/            # Cursor personalizado
        └── favicon/           # Ícone da aba
```

## 🎯 Melhorias Implementadas

### 🔊 Sistema de Áudio
- ✅ Pré-carregamento automático de todos os sons
- ✅ Múltiplas instâncias para sons de clique/nav
- ✅ Desbloqueio automático após primeira interação
- ✅ Música tema que inicia automaticamente
- ✅ Tratamento robusto de erros

### 📱 Responsividade
- ✅ Layout flexível que se adapta a qualquer tela
- ✅ Breakpoints otimizados (320px, 480px, 768px, 1024px)
- ✅ Elementos escaláveis com clamp()
- ✅ Otimizações específicas para dispositivos touch
- ✅ Layout especial para orientação paisagem

### 🎨 Interface e UX
- ✅ Overlay de boas-vindas com animações
- ✅ Vídeo de fundo dinâmico
- ✅ Cursor personalizado temático
- ✅ Animações suaves de hover e seleção
- ✅ Feedback visual em todas as interações

## 🚀 Como Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/dio-js-yugioh-challenge.git
   ```

2. **Abra o arquivo `index.html`** no navegador:
   - Navegador Chrome/Edge recomendado
   - Certifique-se de que o JavaScript está habilitado

3. **Clique em "INICIAR JOGO"** para começar!

## 🎓 O que Aprendi

Este projeto foi desenvolvido para demonstrar conceitos avançados de desenvolvimento web:

- **Gerenciamento de Estado**: Controle manual do estado da aplicação
- **Programação Assíncrona**: Promises, async/await para carregamento de recursos
- **Web Audio API**: Manipulação avançada de áudio no navegador
- **CSS Moderno**: Flexbox, Grid, Media Queries e animações
- **Responsividade**: Design que funciona em qualquer dispositivo
- **Tratamento de Erros**: Código robusto que não quebra facilmente
- **Performance**: Otimizações para carregamento rápido e suave

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para demonstrar conceitos avançados de JavaScript e desenvolvimento web moderno(e Yu-Gi-Oh!).**

🎮 **Divirta-se duelando!** 🎮
