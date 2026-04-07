# Export Pipeline — Design Spec

**Data:** 2026-04-05  
**Status:** Aprovado  
**Scope:** Feature de exportação de slides como PNG via `html-to-image`

---

## Objetivo

Permitir que o usuário exporte slides individualmente ou em batch como arquivos PNG de alta resolução (pixelRatio 2x), acionado por botões contextuais abaixo de cada slide no preview.

---

## Comportamento esperado

- Cada slide exibe dois botões abaixo do preview: **"Este slide"** e **"Todos os slides"**
- **"Este slide"** exporta apenas o slide correspondente
- **"Todos os slides"** exporta todos os slides do carousel em sequência, um arquivo por slide
- Durante o export, o botão acionado muda para estado de loading ("Exportando...") e ambos os botões ficam desabilitados
- Ao concluir, um toast de confirmação aparece no canto inferior direito:
  - Export individual: `"piloto-testes-cover.png exportado"`
  - Export batch: `"5 slides exportados"`
- Nomenclatura dos arquivos: `{slug}-{tipo}.png` — ex: `piloto-testes-cover.png`, `piloto-testes-content.png`

---

## Arquitetura

### Novos arquivos

```
src/features/export/
├── useExport.ts              # hook: lógica de export
└── SlideExportControls.tsx   # componente: botões de export
```

### Arquivos modificados

- `src/features/slides/types/index.ts` — adiciona campo `slug` ao tipo `Carousel`
- `src/posts/piloto-testes/index.ts` — adiciona `slug: "piloto-testes"` ao dado
- `src/App.tsx` — cria refs, gera filenames, renderiza `SlideExportControls`

---

## useExport — API

```typescript
interface UseExportOptions {
  filename: string  // nome base sem extensão, ex: "piloto-testes-cover"
}

interface UseExportReturn {
  exportOne: () => Promise<void>
  exportAll: () => Promise<void>
  isExporting: boolean
}

function useExport(
  ref: RefObject<HTMLDivElement>,
  allRefs: RefObject<HTMLDivElement>[],
  allFilenames: string[],
  options: UseExportOptions
): UseExportReturn
```

**Detalhes de implementação do hook:**

1. Aguarda `document.fonts.ready` antes de capturar — resolve problema de Google Fonts não renderizadas
2. Chama `toPng(ref.current, { pixelRatio: 2 })` do `html-to-image`
3. Download via anchor element programático: `<a href={dataUrl} download={filename}>` + `.click()`
4. `isExporting` é `true` durante qualquer export em andamento — bloqueia novos cliques
5. `exportAll` itera `allRefs` em sequência (não paralelo), aguardando cada export antes do próximo

---

## SlideExportControls — Componente

```typescript
interface SlideExportControlsProps {
  ref: RefObject<HTMLDivElement>       // ref do slide atual
  filename: string                     // nome base deste slide
  allRefs: RefObject<HTMLDivElement>[] // todos os refs do carousel
  allFilenames: string[]               // filenames paralelos a allRefs
}
```

**UI:**
- Dois botões lado a lado: `↓ Este slide` (primário, laranja) e `↓ Todos os slides` (outline)
- Durante loading: botão acionado mostra "Exportando..." com opacity reduzida; ambos desabilitados
- Toast via `sonner` (shadcn): duração 3s, posição `bottom-right`

---

## Integração em App.tsx

```typescript
// Refs para cada slide (array estável, não recriado a cada render)
const slideRefs = useRef(slides.map(() => createRef<HTMLDivElement>()))

// Filenames baseados no slug do carousel e tipo de cada slide
const filenames = slides.map(s => `${carousel.slug}-${s.type}`)

// Cada slide:
<div ref={slideRefs.current[i]} style={{ width, height, ... }}>
  {renderSlide(slide, format, i + 1, total)}
</div>
<SlideExportControls
  ref={slideRefs.current[i]}
  filename={filenames[i]}
  allRefs={slideRefs.current}
  allFilenames={filenames}
/>
```

---

## Mudança no tipo Carousel

```typescript
// Antes
interface Carousel {
  title: string
  slides: Slide[]
  format: SlideFormat
}

// Depois
interface Carousel {
  title: string
  slug: string   // ← novo: identificador kebab-case, ex: "piloto-testes"
  slides: Slide[]
  format: SlideFormat
}
```

---

## Dependências

| Pacote | Uso | Instalação |
|--------|-----|------------|
| `html-to-image` | Renderiza DOM → PNG com pixelRatio: 2 | `npm install html-to-image` |
| `sonner` | Toast de confirmação | `npx shadcn@latest add sonner` |

---

## Limitação conhecida: Google Fonts no export

`html-to-image` não consegue embedar fontes carregadas via `@import` de CDN externo por restrições de CORS. Mitigação primária: aguardar `document.fonts.ready` antes de capturar. Se as fontes ainda não renderizarem corretamente no PNG, a solução de fallback é migrar para pacotes `@fontsource` (npm) para as 3 fontes do projeto (DM Sans, Inter, JetBrains Mono) — elimina a dependência de CDN externo e garante embed.

---

## Fora de escopo

- Exportação para outros formatos (SVG, PDF, WEBP)
- Seleção individual de slides para batch parcial
- Progress bar por slide durante batch export
- Nomenclatura customizada pelo usuário antes de baixar
