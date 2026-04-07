# AVM Slides — Contexto para Post LinkedIn

> Arquivo de contexto acumulado. Cada feature entregue deve ter suas decisões técnicas registradas aqui antes dos arquivos de spec/plan serem deletados.

---

## Projeto

**AVM Slides** — app React para gerar carrosséis do LinkedIn como PNG exportável.
Stack: React 19, TypeScript strict, Vite, Tailwind 4, shadcn/ui, html-to-image, Shiki.
5 templates de slide (Cover, Content, Code, Comparison, Closing) em dois formatos (1080×1350 e 1080×1080).

---

## Feature: Export Pipeline
*Spec: `05-04-26-export-pipeline.spec.md` | Plan: `05-04-26-export-pipeline.plan.md`*

### O que foi construído
Exportação de slides individuais e em batch como PNG de alta resolução (2160px com pixelRatio 2x), com botões contextuais abaixo de cada slide, loading state e toast de confirmação via `sonner`.

### Decisões técnicas

**`useExport` como único ponto de lógica de export**
Hook centraliza toPng + download + estado isExporting. Componentes são burros — apenas chamam `exportOne` ou `exportAll` e mostram o estado. Alternativa descartada: colocar lógica de export diretamente em App.tsx — violaria separação de responsabilidades e dificultaria reuso futuro.

**`exportingRef` + `useState` em paralelo**
Dois mecanismos de guard: `exportingRef.current` previne race condition em cliques rápidos (sem esperar re-render), `isExporting` state dispara re-render para desabilitar UI. Usar só state causaria janela de race condition entre clique e re-render.

**`exportAll` sequencial, não paralelo**
Itera os refs em sequência (`await` dentro de `for`), não com `Promise.all`. Razão: browsers têm limite de downloads simultâneos e a sequência evita que o usuário perca arquivos por bloqueio do browser.

**`document.fonts.ready` antes do toPng**
html-to-image captura o DOM antes das fontes Google carregarem se chamado cedo demais. Aguardar `document.fonts.ready` garante que DM Sans, Inter e JetBrains Mono estejam disponíveis no momento da captura.

**Fallback com `@fontsource`**
Se fontes de CDN não embedarem corretamente no PNG (CORS do html-to-image), substituir `@import` do Google Fonts por pacotes `@fontsource-variable/*` instalados via npm. Elimina dependência externa e garante embed.

**`slug` no tipo `Carousel`**
Adicionado campo `slug: string` ao tipo para compor filenames de export (`{slug}-{type}.png`). Alternativa descartada: derivar slug do `title` em runtime com replace/toLowerCase — frágil para títulos com acentos ou caracteres especiais.

**Nomenclatura de arquivos exportados**
Padrão `{slug}-{slideType}.png`, ex: `piloto-testes-cover.png`. Legível, identificável sem abrir o arquivo, ordenável por tipo.

### Fora de escopo (decisão consciente)
- Outros formatos (SVG, PDF, WEBP)
- Batch parcial com seleção de slides
- Progress bar por slide
- Nomenclatura customizada pelo usuário

---

## Feature: Floating Download Button
*Spec: `06-04-26-floating-download-button.spec.md` | Plan: `06-04-26-floating-download-button.plan.md`*

### O que foi construído
Botão de download individual movido para flutuante fixo no canto superior direito de cada slide (sempre visível, não por hover). Botão "Todos os slides" reposicionado como ação global única abaixo de todos os slides.

### Decisões técnicas

**`SlideItem` como componente próprio em App.tsx**
Cada slide virou um `SlideItem` que instancia `useExport` individualmente para obter `exportOne`. Alternativa descartada: instanciar todos os hooks em `App` e passar `exportOne` por prop — criaria array de funções que viola regras de hooks em loops e complica o tipo das props.

**`useExport` com `ref` opcional**
`SlideExportControls` só precisa de `exportAll` — não faz sentido exigir `ref` individual. Tornar `ref: RefObject | null` elimina o workaround `allRefs[0] ?? { current: null }` que seria necessário para satisfazer a assinatura anterior.

**Botão flutuante dentro do wrapper escalado, ref no elemento interno**
O botão fica no wrapper visual (tamanho de preview escalado), mas o `ref` passado ao `useExport` aponta para o `div` interno no tamanho real (1080px). Razão: html-to-image precisa do elemento no tamanho real para o pixelRatio: 2 produzir 2160px. Capturar o wrapper escalado geraria PNG no tamanho de preview, não de exportação.

**`captureElement` reseta transform antes de capturar**
Para garantir que a captura ignore o `scale(0.5)` de preview, a função salva e restaura `el.style.transform` ao redor do `toPng`. Isso evita que o PNG saia no tamanho de preview caso o ref aponte para o elemento transformado.

**`useCallback` no handler de `SlideItem`**
Sem React Compiler ativo no projeto, funções inline em componentes são recriadas a cada render. `useCallback` estabiliza `handleExportOne` para evitar renders desnecessários nos filhos — padrão recomendado para funções retornadas de custom hooks.

**`SlideExportControls` simplificado**
Removidas props `slideRef` e `filename`. Componente agora renderiza apenas o botão global com `variant="outline"`, usando shadcn `<Button>` (Tailwind) em vez de inline styles — alinhado com a convenção do projeto (inline styles só em templates de slide).

---

## Feature: Post Routing
*Spec: `07-04-26-post-routing.spec.md` | Plan: `07-04-26-post-routing.plan.md`* (Implementado)

### O que foi construído
Sistema de roteamento dinâmico por post. Cada post tem sua própria rota `/:slug` derivada do slug da pasta em `src/posts/`. O `main.tsx` agora é responsável apenas por providers e routing. `App.tsx` foi removido.

### Decisões técnicas

**Registry Pattern para mapeamento slug → Carousel**
Arquivo centralizado `src/posts/registry.ts` exporta um objeto `Record<string, Carousel>` que mapeia slugs para dados de carousel. Novo padrão para adicionar posts: criar pasta `src/posts/<slug>/index.ts` e registrar em `registry.ts`. Alternativa descartada: lazy loading por rota — sem necessidade ainda, simples mantém código claro.

**`main.tsx` como única fonte de roteamento**
Movemos toda a lógica de routing para `main.tsx` (BrowserRouter + Routes + rota `/:slug` → `PostPage`). `App.tsx` foi completamente deletado. Razão: separação clara de responsabilidades — entry point cuida de providers + routing, componentes lidam com rendering.

**`PostPage.tsx` genérico para qualquer post**
Um único componente renderiza qualquer post procurando pelo slug no registry. Migra toda a lógica anterior de `App.tsx` (refs para export, renderSlide, SlideItem, slices, filenames) sem alteração. Alternativa descartada: copiar lógica para cada post — violaria DRY e criaria duplicação de código.

**`useRef` para array de refs, não `useMemo` + `createRef`**
`PostPage` usa `useRef` com inicialização inline para obter array estável de refs. `useMemo` + `createRef` é para class components e causaria instabilidade em functional components. Alternativa descartada: `useMemo` com createRef — causaria criação de novo array a cada render se dependências não fossem exatas.

**`SlideItem` memoizado para performance**
Cada `SlideItem` é um componente memoizado independente. Razão: evitar re-renders de irmãos quando um slide entra/sai do estado de exporting. Sem memo, clique no botão de download de um slide re-renderia todo o carousel.

**Tratamento simples de "not found"**
Rota inválida (ex: `/nonexistent`) renderiza uma mensagem inline "Post não encontrado." sem página 404 dedicada. Simplicidade: sem router.useNavigate, sem componentes de erro, sem estado complexo. Fora de escopo por enquanto.

**Stack técnico**
- react-router-dom v6 (novo)
- TypeScript strict (sem mudanças)
- Vite (sem mudanças)

### Commits relacionados
- `4841c42` - chore: install react-router-dom
- `54ae7c1` - feat: add posts registry mapping slug to Carousel
- `a5ad5d8` - feat: add PostPage component reading carousel from registry via slug
- `21c77d9` - feat: replace App.tsx with PostPage routing via react-router-dom

---

## Feature: New Post Command (Planejado)
*Spec: `07-04-26-new-post-command.spec.md` | Plan: `07-04-26-new-post-command.plan.md`* (Não implementado ainda)

### O que será construído
Quando o usuário disser "criar novo post `<slug>`", o agente executa automaticamente todo o scaffolding: cria a pasta, cria o `index.ts` com estrutura base e registra o post no `registry.ts` — sem perguntas adicionais.

### Decisões técnicas

**Acionamento por variação de comando**
Reconhece frases: "criar novo post `<slug>`", "novo post `<slug>`", "adicionar post `<slug>`". Slug fornecido diretamente no comando. Sem perguntas adicionais sobre título, formato ou conteúdo — tudo usa valores padrão sensatos.

**Conversão slug → camelCase para export name**
Rule: separar por `-`, capitalizar cada parte exceto a primeira, concatenar.
- `piloto-testes` → `pilotoTestes`
- `angular-na-pratica` → `angularNaPratica`
- `react-hooks` → `reactHooks`

Razão: consistência com padrão de exports do JavaScript. Alternativa descartada: manter slug como nome da variável — viola convenção e fica inconsistente com `pilotoTestes` existente.

**Estrutura padrão de novo post**
Arquivo criado em `src/posts/<slug>/index.ts` com estrutura mínima editável:
```ts
export const <camelCaseSlug>: Carousel = {
  title: "<slug>",
  slug: "<slug>",
  format: SlideFormat.Square,  // padrão: Square (não Vertical)
  slides: [{ type: "cover", ... }],  // cover como slide inicial único
}
```

Valores padrão:
- `format`: `SlideFormat.Square` (escolha consciente: formato menor é mais rápido de carregar e editar)
- `title`, `headline`: slug literal (usuário edita depois)
- `overline`, `subtitle`: string vazia
- `tags`, `highlightWords`: array vazio
- `authorPhoto`: `/src/assets/img-cover.png`

Todos editáveis após scaffolding — estrutura é apenas um ponto de partida.

**Validações obrigatórias antes de criar**
1. Se `src/posts/<slug>/` já existe: abortar com aviso (não sobrescrever)
2. Se slug já está em `registry.ts`: abortar com aviso (não duplicar)

Razão: evitar perda acidental de dados ou conflitos silenciosos.

**Mensagem de confirmação clara**
Após sucesso:
```
Post criado com sucesso:

- src/posts/<slug>/index.ts — estrutura base pronta para edição
- src/posts/registry.ts — registrado como "<slug>"
- Acessível em http://localhost:5173/<slug> (com dev server rodando)

Próximos passos: edite src/posts/<slug>/index.ts para preencher título, slides e conteúdo.
```

Razão: usuário saiba exatamente o que foi feito e como acessar.

### Fora de escopo (decisão consciente)
- Receber título, formato ou conteúdo via comando (apenas slug por enquanto)
- Geração automática de slides além do cover
- Interface visual para criação de posts

---

## Padrões e convenções estabelecidos no projeto

- **Inline styles apenas em `features/slides/templates/`** — obrigatório para html-to-image. Fora dos templates: Tailwind + shadcn.
- **Hooks em `features/<feature>/use*.ts`**, componentes em `features/<feature>/*.tsx`
- **Sem barrel files** — imports diretos do arquivo fonte
- **`@/` para imports cross-feature**, relativos dentro da mesma feature
- **shadcn/ui** para todos os componentes de UI — nunca estilizar `<button>` nativo à mão
- **Registry pattern para posts** — mapa centralizado em `src/posts/registry.ts`, um componente `PostPage.tsx` genérico
