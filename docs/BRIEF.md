# AVM Slides — Design System & Slide Builder

**Data:** 2026-04-01
**Autor:** Allan Victor de Moura
**Status:** v1 Brand Implementation

---

## Problema

**Em uma frase:**
> Criar conteúdo visual consistente e profissional para LinkedIn consome muito tempo e resulta em posts genéricos sem identidade própria.

**Contexto:**
Devs que produzem conteúdo no LinkedIn geralmente usam Canva ou ferramentas genéricas que não refletem personalidade técnica. Cada post exige recriar layouts do zero, sem consistência visual entre publicações. Isso custa tempo e reduz a frequência de postagem.

---

## Solução

**Em uma frase:**
> Um design system pessoal implementado como projeto React local que renderiza slides para LinkedIn com identidade visual minimalista + moderna, pronto para visualizar e iterar.

**Como funciona:**
Projeto Vite + React que renderiza slides HTML usando tokens de design pré-definidos (cores, tipografia, espaçamento). O dev edita um arquivo de dados, visualiza em tempo real com hot reload, e itera até estar satisfeito visualmente. No futuro, integra com IA para gerar conteúdo automaticamente.

---

## Público-Alvo

**Persona principal:**
> Allan Victor — dev frontend que quer se posicionar no LinkedIn com conteúdo técnico e acessível, com identidade visual clara e elegant.

**Early adopters:**
> O próprio Allan. Este é um projeto de ferramenta pessoal (dogfooding). Pode ser aberto como open-source futuramente.

---

## Proposta de Valor

**Por que isso e não Canva/PowerPoint?**
> Identidade visual 100% própria, otimizada para conteúdo técnico, com workflow integrado ao ecossistema dev e controle total sobre design.

**Alternativas atuais:**
- Canva: genérico, sem suporte a código, perde identidade
- PowerPoint/Google Slides: trabalhoso exportar, sem consistência

**Diferenciais:**
- Design system como código (versionável, replicável, consistente)
- Template de capa pronto para validar a identidade
- Workflow simplificado: editar → visualizar → iterar

---

## Identidade Visual v1

### Direção
**Minimalista + Moderno Editorial** — Clean, direto ao ponto, com personalidade através de tipografia elegante e cor quente suave.

### Tipografia
- **Headlines:** DM Sans 700 — Editorial elegante com personalidade
- **Body:** Inter 400/500 — Máxima legibilidade
- **Código/Mono:** JetBrains Mono 400/500 — Técnico, claro

### Paleta de Cores
- **Primary (Orange Quente):** `#FF6B00` — Vibrant, marca presença sem agressividade
- **Background (Off-White Warm):** `#FAF8F3` — Cream quentinho, acessível
- **Text Primary:** `#141414` — Dark, alta legibilidade
- **Text Secondary:** `#5C5A56` — Subtle, suportante
- **Accent Variations:** `#FF7A45` (hover), `#FF8A3D` (light), `#E55A00` (pressed)

### Filosofia
Identidade visual que transmite:
- **Clareza:** Tipografia sem-serifa moderna e legível
- **Calor:** Orange quente que conecta com personalidade
- **Elegância:** Composição minimalista, sem poluição visual
- **Acessibilidade:** Alto contraste, tons neutros, fácil leitura

---

## Métricas de Sucesso

**North Star Metric:**
> Conseguir criar uma capa visualmente atrativa e alinhada com a identidade em menos de 10 minutos

**Metas do v1 MVP:**
- [ ] Design system v1 implementado (DM Sans + orange #FF6B00 + off-white #FAF8F3)
- [ ] Template Cover pronto e funcional
- [ ] Preview em tempo real funcionando
- [ ] Tema light consistente
- [ ] Primeira capa criada e validada

**Metas pós-MVP (v1.1+):**
- [ ] Exportação PNG de alta resolução
- [ ] Demais templates (Content, Code, Comparison, Closing)
- [ ] Suporte formato vertical (1080×1350)
- [ ] Dark theme como variante

---

## MVP Scope

### O que ENTRA

| Feature | Descrição |
|---------|-----------|
| Design System v1 | Tokens CSS com DM Sans + orange #FF6B00 + off-white #FAF8F3 |
| Template: Cover | Slide de capa com suporte a foto/placeholder |
| Preview em Tempo Real | Hot reload do conteúdo |
| Tema Light | Todos componentes em tema light |
| Slide Canvas | Container 1080×1080 pixel-perfect |

### O que NÃO ENTRA

| Feature | Motivo | Quando |
|---------|--------|--------|
| Exportação PNG | Focus é visualização primeiro | v1.1 |
| Demais Templates | Cover valida identidade | v1.1+ |
| Formato Vertical | Quadrado é suficiente MVP | v1.1+ |
| Dark Theme | Light é prioridade agora | v2.0 |
| Deploy Público | Ferramenta pessoal local | Futuro |
| CMS/Dashboard | Over-engineering | Se escalar |

---

## Stack Tecnológico

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Build | Vite | Startup rápido, zero config |
| UI | React + TypeScript | Componentização, type safety |
| Styling | Tailwind CSS | Utility-first, produtividade |
| Componentes | shadcn/ui | Base consistente |
| Design Tokens | CSS Custom Properties | Nativo, sem runtime |
| Syntax Highlight | Shiki | Highlighting de código |
| Fonts | Google Fonts | DM Sans, Inter, JetBrains Mono |

### O que NÃO usar
- ~~html-to-image~~ (v1.1 para exportação)
- ~~State management externo~~ (React state é suficiente)
- ~~Backend/API~~ (tudo local)
- ~~Dark theme~~ (light only no MVP)

---

## Fluxo Crítico (MVP)

```
1. Allan abre o projeto: npm run dev
2. Edita dados do slide em src/posts/piloto-testes/index.ts
3. Visualiza no browser com hot reload
4. Ajusta tipografia, cores, conteúdo
5. Itera até estar visualmente satisfeito
6. Capa pronta para usar/customizar
```

---

## Notas

- **Foto do autor:** Template suporta placeholder até foto final estar pronta
- **Iteração de design:** Focus é refinar o template Cover baseado em feedback visual
- **Próximas features:** Exportação PNG, demais templates, dark theme vêm depois de validação
- **Futura integração IA:** Claude API para gerar conteúdo + montar slides automaticamente via prompt
