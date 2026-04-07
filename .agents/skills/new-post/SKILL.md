---
name: new-post
description: Use when the user says "criar novo post <slug>", "novo post <slug>", or "adicionar post <slug>". Scaffolds the post folder, index.ts with minimal structure, and registers the slug in the registry automatically.
---

# New Post

Scaffold a new post in the AVM Slides project from a slug.

## Trigger

Any variation of:
- "criar novo post `<slug>`"
- "novo post `<slug>`"
- "adicionar post `<slug>`"

Execute immediately — no clarifying questions.

## Slug → camelCase

Strip hyphens, capitalize each part after the first:

| Slug | camelCase |
|------|-----------|
| `piloto-testes` | `pilotoTestes` |
| `angular-na-pratica` | `angularNaPratica` |
| `react-hooks` | `reactHooks` |

## Steps

### 1. Validate — abort if conflict

```bash
ls src/posts/<slug> 2>/dev/null && echo "EXISTS" || echo "OK"
```

If `EXISTS`: stop and inform the user. Do not create any file.

Also check `src/posts/registry.ts` for an existing `"<slug>"` key. If found: stop and inform.

### 2. Create `src/posts/<slug>/index.ts`

```ts
import { SlideFormat } from "@/shared/enums/slide-format"
import type { Carousel } from "@/shared/types"

export const <camelCaseSlug>: Carousel = {
  title: "<slug>",
  slug: "<slug>",
  format: SlideFormat.Square,
  slides: [
    {
      type: "cover",
      overline: "",
      headline: "<slug>",
      highlightWords: [],
      subtitle: "",
      tags: [],
      authorPhoto: "/src/assets/img-cover.png",
    },
  ],
}
```

### 3. Register in `src/posts/registry.ts`

Add the import below existing imports and a new entry in the `registry` object:

```ts
import type { Carousel } from "@/shared/types"
import { pilotoTestes } from "./piloto-testes"
import { <camelCaseSlug> } from "./<slug>"        // ← add

export const registry: Record<string, Carousel> = {
  "piloto-testes": pilotoTestes,
  "<slug>": <camelCaseSlug>,                       // ← add
}
```

### 4. Verify and commit

```bash
npm run typecheck
```

Expected: zero errors.

```bash
git add src/posts/<slug>/index.ts src/posts/registry.ts
git commit -m "feat: scaffold post <slug>"
```

### 5. Confirm to user

```
Post criado:
- src/posts/<slug>/index.ts
- Registrado em src/posts/registry.ts como "<slug>"
- Acessível em http://localhost:5173/<slug>

Edite src/posts/<slug>/index.ts para preencher título, slides e conteúdo.
```

## Defaults

| Field | Value |
|-------|-------|
| `format` | `SlideFormat.Square` |
| `title` | slug literal |
| `headline` | slug literal |
| `overline` | `""` |
| `subtitle` | `""` |
| `tags` | `[]` |
| `highlightWords` | `[]` |
| `authorPhoto` | `"/src/assets/img-cover.png"` |
