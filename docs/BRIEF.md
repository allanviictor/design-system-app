# AVM Slides — Design System & Carousel Builder

**Data:** 25/03/2026
**Autor:** Allan Victor de Moura
**Status:** Building

---

## 💡 Problema

**Em uma frase:**
> Criar conteúdo visual consistente e profissional para LinkedIn consome muito tempo e resulta em posts genéricos sem identidade própria.

**Contexto:**
Devs que produzem conteúdo no LinkedIn geralmente usam Canva ou ferramentas genéricas que não refletem personalidade técnica. Cada post exige recriar layouts do zero, sem consistência visual entre publicações. Isso custa tempo e reduz a frequência de postagem.

---

## ✅ Solução

**Em uma frase:**
> Um design system pessoal implementado como projeto React local que gera carousels e capas para LinkedIn com identidade visual única, otimizados para exportação como imagem.

**Como funciona:**
Projeto Vite + React que renderiza slides HTML usando tokens de design pré-definidos (cores, tipografia, espaçamento). O dev seleciona um template, insere o conteúdo, visualiza em tempo real e exporta como PNG em alta resolução. No futuro, integra com IA para gerar o conteúdo automaticamente.

---

## 👤 Público-Alvo

**Persona principal:**
> Allan Victor — dev frontend que quer se posicionar no LinkedIn com conteúdo técnico e acessível, atingindo tanto devs juniores quanto seniores.

**Early adopters:**
> O próprio Allan. Este é um projeto de ferramenta pessoal (dogfooding). Pode ser aberto como open-source futuramente.

---

## 🎯 Proposta de Valor

**Por que isso e não Canva/PowerPoint?**
> Identidade visual 100% própria, otimizada para conteúdo técnico (syntax highlighting, blocos de código), com workflow integrado ao ecossistema dev.

**Alternativas atuais:**
- Canva: genérico, sem suporte a código, perde identidade
- PowerPoint/Google Slides: trabalhoso exportar, sem consistência

**Seu diferencial:**
- Design system como código (versionável, replicável, consistente)
- Templates pré-prontos para conteúdo técnico
- Exportação otimizada para LinkedIn (dimensões, resolução)

---

## 📊 Métricas de Sucesso

**North Star Metric:**
> Tempo médio para criar um carousel completo (meta: < 30 min)

**Metas iniciais (3 meses):**
- [ ] Design system definido e implementado
- [ ] 5 templates funcionais (capa, conteúdo, código, comparação, CTA final)
- [ ] 12+ posts publicados usando o sistema (2/semana × 6 semanas)

---

## 🚀 MVP Scope

**O que entra:**
- Design system (tokens de cor, tipografia, espaçamento, componentes)
- 5 templates de slide (capa, conteúdo texto, código, comparação, slide final)
- Template de thumbnail/capa de post
- Suporte vertical (1080×1350) e quadrado (1080×1080)
- Dark mode (tema primário)
- Exportação HTML → PNG via html-to-image
- Preview em tempo real

**O que NÃO entra:**
- Light mode (v1.1)
- Integração com IA (v2)
- CMS/painel de gerenciamento
- Deploy público
- Animações

---

## 🛠 Stack

| Camada | Tecnologia |
|--------|------------|
| Build Tool | Vite |
| UI | React + TypeScript |
| Styling | Tailwind CSS |
| Componentes | shadcn/ui (base) |
| Syntax Highlight | Shiki ou Prism |
| Exportação | html-to-image |
| Fonts | Google Fonts (a definir) |

---

## 📝 Notas

- Estética: base orgânica (gradientes, formas suaves) com detalhes glitch/cyber pontuais
- Paleta: Laranja vibrante (#FF6B00) como acento dominante + Cyan elétrico (#00F0E0) como cor de suporte, sobre fundo neutro escuro (#141414)
- Hierarquia de cor: laranja em ~70% dos destaques (headlines, keywords, CTAs), cyan em ~20% (funções, tags secundárias)
- Marca: assinatura tipográfica simples no footer ou slide final
- Futuro: integração com Claude/IA para gerar conteúdo + slides automaticamente via prompt
