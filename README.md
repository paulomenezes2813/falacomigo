# FalaComigo

App desktop de **Comunicação Alternativa e Aumentativa (CAA)** em Português,
desenhado para crianças com Transtorno do Espectro Autista (TEA) não-verbais.

> Versão atual: **0.1 — protótipo navegável**
> Stack: **Tauri 2 + React 18 + TypeScript + Tailwind**

## O que já funciona (v0.1)

- Prancha 6×4 com 24 símbolos baseados na referência NeuroEdu.
- Codificação por cor (Fitzgerald Key): rosa = sociais, amarelo = pessoas,
  verde = ações, azul = sentimentos/descritivos, laranja = substantivos,
  roxo = perguntas (ainda sem cards roxos no MVP, slot reservado).
- Barra de frase: símbolos selecionados se acumulam; botão **Falar** lê em pt-BR.
- TTS via Web Speech API com seleção automática da voz pt-BR e ajuste de
  velocidade.
- Acessibilidade: áreas de toque grandes, foco visível, respeita
  `prefers-reduced-motion`.

## Como rodar

### Pré-requisitos

- Node.js 20+ ([nvm recomendado](https://github.com/nvm-sh/nvm))
- (Opcional, para build desktop) Rust toolchain — siga
  [tauri.app/start/prerequisites](https://tauri.app/start/prerequisites/)

### 1) Modo navegador (desenvolvimento rápido)

```bash
npm install
npm run dev
```

Abra http://localhost:1420 no Chrome/Edge/Safari. Esta é a forma mais rápida de
iterar na UI — não precisa instalar Rust.

### 2) Modo desktop (Tauri)

Requer Rust instalado.

```bash
npm run tauri:dev    # roda o app em modo desenvolvimento
npm run tauri:build  # gera os instaladores (.dmg, .msi, .deb, etc.)
```

### Verificações

```bash
npm run typecheck    # checa tipos TS
npm run build        # build de produção do frontend
```

## Estrutura

```
falacomigo/
├── src/
│   ├── App.tsx                    # shell principal (header, barra, prancha)
│   ├── main.tsx                   # bootstrap React
│   ├── types.ts                   # tipos compartilhados
│   ├── data/boards.ts             # vocabulário inicial
│   ├── components/
│   │   ├── Board.tsx              # grid de símbolos
│   │   ├── PhraseBar.tsx          # frase + ações (Falar/Limpar/⌫)
│   │   └── SymbolButton.tsx       # botão de pictograma
│   ├── hooks/
│   │   └── useTTS.ts              # síntese de voz pt-BR
│   └── index.css                  # Tailwind + base
├── src-tauri/                     # camada Rust (desktop)
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
└── tailwind.config.js
```

## Roadmap próximos passos

- [ ] Editor de pranchas com PIN do cuidador
- [ ] Persistência local (SQLite via tauri-plugin-sql)
- [ ] Pranchas temáticas e navegação entre pranchas
- [ ] Biblioteca ARASAAC (substituir emojis por pictogramas)
- [ ] Exportação PDF/A4 imprimível
- [ ] Modo varredura (scanning) para acesso por switch
- [ ] Backup/restauração em arquivo `.fcm`
- [ ] Histórico de frases ditas

## Princípios de CAA aplicados

- **Vocabulário core fixo**: palavras de alta frequência (eu, você, quero, mais,
  sim, não) marcadas com `isCore: true` — preparadas para manter posição
  constante em pranchas futuras (motor planning estilo LAMP).
- **Codificação por cor**: estimula reconhecimento por categoria gramatical.
- **Modelagem sem expectativa**: o app fala a palavra ao toque, permitindo ao
  adulto modelar sem exigir resposta da criança.

## Licença

A definir.
