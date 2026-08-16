# Comprar ou Alugar um Imóvel

Modelo determinístico para análise comparativa entre compra (Tabela PRICE
e Sistema de Amortização Constante) e aluguel de imóveis, considerando o
valor do dinheiro no tempo e o custo de oportunidade de investimentos.

## Rodando localmente

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Publicando como site

**Vercel (recomendado, zero configuração):**
1. Suba este repositório no GitHub.
2. Em vercel.com, clique em "New Project" e importe o repositório.
3. O Vercel detecta Vite automaticamente — não precisa mudar nada.

**Netlify:**
1. "Add new site" → "Import an existing project" → selecione o repositório.
2. Build command: `npm run build`. Publish directory: `dist`.

**GitHub Pages:**
1. No `vite.config.js`, descomente a linha `base: '/nome-do-repo/'`.
2. Instale o pacote `gh-pages`: `npm install -D gh-pages`.
3. Adicione ao `package.json`:
   `"deploy": "vite build && gh-pages -d dist"`
4. Rode `npm run deploy`.

## Estrutura do projeto

```
src/
├── main.jsx              # ponto de entrada
├── App.jsx                # orquestrador de estado de topo
├── index.css               # Tailwind + estilos auxiliares
├── config/
│   └── constants.js        # constantes de navegação, thresholds, exportação
├── lib/
│   ├── theme.js             # paleta de cores
│   ├── format.js            # formatação de moeda/números
│   ├── finance.js            # motor de cálculo financeiro (funções puras)
│   ├── exportXlsx.js          # modelagem e exportação de planilhas
│   └── tableColumns.js         # configuração das colunas das tabelas
├── hooks/
│   ├── useSimulation.js      # orquestra a simulação financeira
│   └── useActiveSection.js    # detecta seção visível no scroll
├── components/               # componentes de apresentação reutilizáveis
└── pages/
    ├── ParamsPage.jsx        # guia de parâmetros
    └── ResultsPage.jsx        # guia de resultados
```

## Boas práticas de desenvolvimento aplicadas

| Prática | Onde | Referência |
|---|---|---|
| Decomposição em componentes pequenos e testáveis | `src/components/*`, `src/pages/*` | Paula Filho (2019) |
| Motor de cálculo isolado, sem JSX, testável isoladamente | `src/lib/finance.js` | Paula Filho (2019) |
| Separação entre modelagem de dados e efeito colateral (I/O) | `src/lib/exportXlsx.js` | Paula Filho (2019) |
| Componente genérico reaproveitado nas 3 tabelas comparativas | `src/components/ComparativeTable.jsx` | Silva (2021) |
| `useMemo` evitando recálculo redundante a cada render | `src/hooks/useSimulation.js` | Silva (2021) |
| Comportamento reativo sem reload de página | `src/App.jsx` | Silva (2021) |

---

Artur Guilherme Schneider · Projeto Final · Análise e Desenvolvimento de Sistemas · 2026
