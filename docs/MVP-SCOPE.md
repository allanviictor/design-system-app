# AVM Slides — MVP Scope

**Data:** 31/03/2026
**Versão:** 2.0

---

## Visão do MVP

**Em uma frase, o que o MVP faz?**
> Renderiza slides HTML com design system próprio e exporta como PNG de alta resolução, pronto para postar no LinkedIn.

**Qual hipótese estamos testando?**
> Um sistema de templates com identidade visual consistente reduz o tempo de criação de posts e aumenta o reconhecimento do perfil no feed.

**Como saberemos que funcionou?**
> Conseguir criar uma capa em menos de 15 minutos, com qualidade visual que se destaque no feed.

---

## Escopo: O que ENTRA

### Must Have (P0) — Sem isso não lança

| Feature | Descrição | Critério de Done |
|---------|-----------|------------------|
| Design Tokens CSS v2 | Scales numéricas de primary/secondary/neutral, Orbitron como fonte de headline | Tokens importáveis, slides renderizam com nova paleta e fonte |
| Slide Canvas | Container que renderiza no tamanho exato (1080×1080) | Renderiza pixel-perfect no formato quadrado |
| Template: Capa | Layout split 50/50 — conteúdo à esquerda, foto à direita | Componente funcional com props de conteúdo e suporte a foto/placeholder |
| Exportação PNG | Botão que exporta o slide atual como PNG 2x | Imagem 2160×2160 em alta qualidade |
| Preview | Visualização em tempo real do slide sendo editado | Hot reload do conteúdo |
| Dark Mode | Tema escuro como padrão de todos os componentes | Todas as cores usando tokens dark |

### Should Have (P1) — Importante, pode esperar v1.1

| Feature | Descrição | Por que não é P0 |
|---------|-----------|------------------|
| Demais templates de slide | Conteúdo, código, comparação, fechamento | Capa é o mais crítico para validar identidade visual |
| Suporte vertical (1080×1350) | Formato portrait para carousels | Quadrado é suficiente para validar |
| Exportação em lote | Exportar todos os slides de uma vez | No MVP pode exportar um por um |
| Light Mode | Tema claro alternativo | Dark é suficiente para lançar |

### Could Have (P2) — Nice to have

| Feature | Descrição | Quando considerar |
|---------|-----------|-------------------|
| Integração Claude API | IA gera conteúdo e monta slides via prompt | Quando design system estiver maduro |
| Salvamento local | Salvar slides como JSON para editar depois | Quando a frequência justificar |
| Template: Lista/Bullets | Slide com lista de itens estilizada | Quando surgirem posts desse tipo |

---

## Escopo: O que NÃO ENTRA

| Feature | Por que não entra | Quando reconsiderar |
|---------|-------------------|---------------------|
| Deploy público | É ferramenta pessoal local | Se decidir abrir como SaaS |
| CMS / Dashboard | Over-engineering para uso pessoal | Se escalar para time |
| Mobile responsive | Slides são criados no desktop | Nunca (slides são fixos) |
| Animações nos slides | PNG é estático | Se migrar para vídeo/stories |
| Backend / API | Não precisa de servidor | Se integrar com IA |
| Autenticação | Roda local, só o Allan usa | Se virar SaaS |

---

## Decisões de Simplificação

### Stack
- [x] Vite + React + TypeScript
- [x] Tailwind CSS para utility classes
- [x] shadcn/ui como base de componentes UI
- [x] CSS Custom Properties para design tokens (scales numéricas)
- [x] html-to-image para exportação
- [x] Shiki para syntax highlighting

### Conteúdo
- [x] Props diretas nos componentes (sem CMS)
- [x] Um slide = um arquivo de dados
- [x] Conteúdo hardcoded para o MVP, refatorar depois

### UI da Ferramenta
- [x] Página única com preview + botão de exportar
- [x] Sem onboarding — é ferramenta própria
- [x] Sem editor visual — edita código React direto

---

## Fluxo Crítico: Criar e Exportar um Slide

```
1. Allan abre o projeto local (npm run dev)
2. Edita arquivo de dados do slide (conteúdo + props)
3. Visualiza no browser com hot reload
4. Ajusta conteúdo
5. Clica em "Exportar" → PNG gerado em 2x
6. Faz upload manual no LinkedIn
```

---

## Stack do MVP

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Build | Vite | Startup rápido, zero config |
| UI | React + TypeScript | Componentização, type safety |
| Styling | Tailwind CSS | Produtividade, utility-first |
| Componentes | shadcn/ui | Base de UI consistente |
| Design Tokens | CSS Custom Properties | Nativas, sem runtime, fácil de tematizar |
| Syntax Highlight | Shiki | Qualidade superior, temas customizáveis |
| Exportação | html-to-image | Simples, roda no browser, suficiente |
| Fonts | Google Fonts (Orbitron, Inter, JetBrains Mono) | Gratuitas, alta qualidade |

### O que NÃO usar
- Next.js (não precisa de SSR/SSG)
- State management externo (React state é suficiente)
- Puppeteer (html-to-image é mais simples para o MVP)
- Backend/API (tudo client-side)

---

## Definition of Done (MVP)

O MVP está pronto quando:

- [ ] Design tokens v2 aplicados (nova paleta + Orbitron)
- [ ] Template de capa renderizando com foto/placeholder no formato 1080×1080
- [ ] Exportação PNG em alta resolução funcionando
- [ ] Pelo menos 1 capa criada e postada no LinkedIn

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| html-to-image com problemas de fidelidade (fonts, gradientes) | Média | Alto | Testar cedo; fallback para Puppeteer se precisar |
| Fonts não carregando na exportação | Média | Médio | Pré-carregar fonts antes de exportar |
| Foto do autor não estar pronta | Alta | Baixo | Placeholder já está previsto no template |
| Cores/contraste não funcionarem no feed do LinkedIn | Baixa | Alto | Testar no mobile real antes de publicar |

---

## Próximos Passos Pós-MVP

1. [ ] Demais templates de slide (conteúdo, código, comparação, fechamento)
2. [ ] Suporte vertical (1080×1350)
3. [ ] Exportação em lote
4. [ ] Light mode como tema alternativo
5. [ ] Integração com Claude API para gerar conteúdo via prompt
