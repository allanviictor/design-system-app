# Floating Download Button — Design Spec

**Data:** 2026-04-06
**Status:** Aprovado

---

## Objetivo

Mover o botão de exportação individual para cima do slide como um elemento flutuante fixo no canto superior direito, melhorando a UX ao deixar a ação de download contextualmente posicionada sobre o próprio slide.

---

## Comportamento

- O botão de download individual fica **sempre visível** no canto superior direito do preview do slide (não depende de hover).
- O botão "↓ Todos os slides" fica posicionado **abaixo de todos os slides**, como uma ação global — uma única instância no final da lista.

---

## Mudanças por arquivo

### `src/App.tsx`

- Adicionar import de `useExport` (ou criar um hook local de exportação individual).
- Dentro do loop de slides, no wrapper `div` com `relative overflow-hidden rounded-lg`, adicionar um `<Button>` com `size="icon"` posicionado `absolute top-2 right-2 z-10`.
- O botão chama `exportOne` para o slide correspondente.
- `SlideExportControls` sai de dentro do loop e é renderizado **uma única vez** abaixo do `div.flex.flex-col.gap-6`.

### `src/features/export/SlideExportControls.tsx`

- Remover props `slideRef` e `filename` (não são mais necessárias).
- Remover `exportOne` e `handleExportOne`.
- Props resultantes:

```typescript
interface SlideExportControlsProps {
  allRefs: RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}
```

- O componente renderiza apenas o botão "↓ Todos os slides" centralizado.

### `src/features/export/useExport.ts`

- Sem mudanças na lógica — `exportOne` e `exportAll` continuam existindo.
- `App.tsx` instancia `useExport` por slide para obter `exportOne` individual, ou chama a função diretamente.

> **Nota:** Como `useExport` recebe `slideRef` e `allRefs` no mesmo hook, o mais simples é manter a chamada atual em `App.tsx` por slide e usar apenas `exportOne` do retorno. `SlideExportControls` instancia o hook passando só `allRefs`/`allFilenames`.

---

## Estilo do botão flutuante

- Componente: `<Button>` shadcn com `size="icon"` e `variant="ghost"` ou `variant="secondary"`.
- Posição: `absolute top-2 right-2 z-10` dentro do wrapper `relative` do slide.
- Ícone: seta de download (pode usar Lucide `Download` ou o caractere `↓`).
- Estado desabilitado: `disabled={isExporting}`.

---

## O que NÃO muda

- Lógica de exportação (`useExport`, `html-to-image`) — intocada.
- Toast de feedback após exportação — mantido em ambos os botões.
- Botão "↓ Todos os slides" — apenas reposicionado, sem mudança visual.

---

## Estrutura final em `App.tsx`

```tsx
<div className="flex flex-col gap-6">
  {slides.map((slide, i) => (
    <div key={i} className="relative">
      <div className="relative overflow-hidden rounded-lg shadow-2xl" style={...}>
        {/* botão flutuante */}
        <Button size="icon" variant="ghost" className="absolute top-2 right-2 z-10" ...>
          <Download />
        </Button>
        <div ref={slideRefs.current[i]} style={...}>
          {renderSlide(...)}
        </div>
      </div>
    </div>
  ))}
</div>

{/* exportação global — uma instância abaixo de todos os slides */}
<SlideExportControls allRefs={slideRefs.current} allFilenames={filenames} />
```
