# AVM Slides — Design System & Slide Builder

**Data:** 31/03/2026
**Autor:** Allan Victor de Moura
**Status:** Building

---

## Problema

**Em uma frase:**
> Criar conteúdo visual consistente e profissional para LinkedIn consome muito tempo e resulta em posts genéricos sem identidade própria.

**Contexto:**
Devs que produzem conteúdo no LinkedIn geralmente usam Canva ou ferramentas genéricas que não refletem personalidade técnica. Cada post exige recriar layouts do zero, sem consistência visual entre publicações. Isso custa tempo e reduz a frequência de postagem.

---

## Solução

**Em uma frase:**
> Um design system pessoal implementado como projeto React local que gera capas e slides para LinkedIn com identidade visual única, otimizados para exportação como imagem.

**Como funciona:**
Projeto Vite + React que renderiza slides HTML usando tokens de design pré-definidos (cores, tipografia, espaçamento). O dev seleciona um template, insere o conteúdo, visualiza em tempo real e exporta como PNG em alta resolução. No futuro, integra com IA para gerar o conteúdo automaticamente.

---

## Público-Alvo

**Persona principal:**
> Allan Victor — dev frontend que quer se posicionar no LinkedIn com conteúdo técnico e acessível, atingindo tanto devs juniores quanto seniores.

**Early adopters:**
> O próprio Allan. Este é um projeto de ferramenta pessoal (dogfooding). Pode ser aberto como open-source futuramente.

---

## Proposta de Valor

**Por que isso e não Canva/PowerPoint?**
> Identidade visual 100% própria, otimizada para conteúdo técnico (syntax highlighting, blocos de código), com workflow integrado ao ecossistema dev.

**Alternativas atuais:**
- Canva: genérico, sem suporte a código, perde identidade
- PowerPoint/Google Slides: trabalhoso exportar, sem consistência

**Diferenciais:**
- Design system como código (versionável, replicável, consistente)
- Templates pré-prontos para conteúdo técnico
- Exportação otimizada para LinkedIn (dimensões, resolução)

---

## Identidade Visual

**Direção:** Cyberpunk Tech Editorial — grit controlado, tipografia sci-fi, paleta quente com tensão fria.

**Tipografia:**
- Headlines: **Orbitron** 700/900
- Body: **Inter** 400
- Metadados, overlines, código: **JetBrains Mono** 400/500

**Paleta principal:**
- `--primary-500: #FF5500` — laranja-fogo (headlines, CTAs, keywords)
- `--primary-600: #FF2D00` — vermelho-fogo (bordas ativas, pressed)
- `--primary-800: #6B0D00` — ferrugem (fundos de destaque)
- `--secondary-500: #00E5C8` — cyan elétrico (funções, tipos, tags)
- `--secondary-900: #0A2020` — teal profundo (fundos secundários)
- `--neutral-950: #080808` — fundo dos slides

**Hierarquia de cor:** primary em ~70% dos destaques, secondary em ~20%.

---

## Métricas de Sucesso

**North Star Metric:**
> Tempo médio para criar um slide completo (meta: < 15 min)

**Metas iniciais:**
- [ ] Design system v2 implementado (nova paleta + Orbitron)
- [ ] Template de capa funcional com foto do autor
- [ ] 12+ posts publicados usando o sistema (2/semana × 6 semanas)

---

## MVP Scope

**O que entra:**
- Design system v2 (tokens de cor scales numéricas, Orbitron, espaçamento)
- Template de capa (cover slide) com layout split 50/50 e foto do autor
- Suporte formato quadrado (1080×1080)
- Dark mode (tema primário)
- Exportação HTML → PNG via html-to-image

**O que NÃO entra:**
- Outros templates de slide (conteúdo, código, comparação, fechamento) — v1.1
- Light mode — v1.1
- Integração com IA — v2
- CMS/painel de gerenciamento
- Deploy público
- Animações

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Build Tool | Vite |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Componentes | shadcn/ui (base) |
| Syntax Highlight | Shiki |
| Exportação | html-to-image |
| Fonts | Google Fonts (Orbitron, Inter, JetBrains Mono) |

---

## Notas

- Foto do autor ainda será editada — template usa placeholder até foto final estar pronta
- Elementos visuais cyberpunk avançados (grain, grid, brackets nos slides) serão ajustados na refatoração de templates
- Futuro: integração com Claude/IA para gerar conteúdo + slides automaticamente via prompt
