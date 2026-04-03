# AVM Slides — MVP Scope

**Data:** 2026-04-01
**Versão:** 1.0 (v3 Brand)

---

## Visão do MVP

**Em uma frase:**
> Renderiza slide de capa (Cover) com design system minimalista + moderno editorial, pronto para visualizar e iterar.

**Qual hipótese estamos testando?**
> Uma identidade visual clean e editorial com tipografia DM Sans + orange quente cria a base visual para posts LinkedIn memoráveis.

**Como saberemos que funcionou?**
> Conseguir criar uma capa visualmente atrativa em menos de 10 minutos, com paleta consistente e tipografia elegante.

---

## Escopo: O que ENTRA

### Must Have (P0) — Sem isso não lança

| Feature | Descrição | Critério de Done |
|---------|-----------|------------------|
| Design System v1 | Tokens CSS com nova paleta (DM Sans + orange #FF6B00 + off-white #FAF8F3) | Tokens importáveis, aplicados globalmente |
| Slide Canvas | Container que renderiza no tamanho exato (1080×1080) | Renderiza pixel-perfect no formato quadrado com background light |
| Template: Cover | Layout com conteúdo e suporte a foto/placeholder | Componente funcional, responsivo em preview |
| Preview | Visualização em tempo real do slide sendo editado | Hot reload do conteúdo |
| Tema Light | Todos os componentes em tema light por padrão | Slides e UI renderizam em paleta light |

### Should Have (P1) — Importante, pode esperar v1.1

| Feature | Descrição | Por que não é P0 |
|---------|-----------|------------------|
| Demais templates | Conteúdo, código, comparação, fechamento | Cover valida a identidade visual |
| Suporte vertical (1080×1350) | Formato portrait para carousels | Quadrado é suficiente para validar |
| Exportação PNG | Botão que exporta o slide como PNG 2x | Visualização é prioridade agora |
| Dark Mode | Tema escuro alternativo | Light é o foco principal |

### Could Have (P2) — Nice to have

| Feature | Descrição | Quando considerar |
|---------|-----------|-------------------|
| Integração Claude API | IA gera conteúdo via prompt | Quando design system estiver maduro |
| Salvamento local | Salvar slides como JSON | Quando frequência de uso justificar |
| Múltiplos carousels | Gerenciar vários projetos | Quando começar a reutilizar templates |

---

## Escopo: O que NÃO ENTRA

| Feature | Por que não entra | Quando reconsiderar |
|---------|-------------------|---------------------|
| Exportação PNG | Focus é visualização e design primeiro | v1.1 quando design estiver validado |
| Deploy público | É ferramenta pessoal local | Se decidir abrir como SaaS |
| CMS / Dashboard | Over-engineering para uso pessoal | Se escalar para time |
| Mobile responsive | Slides são criados no desktop | Nunca (dimensões fixas) |
| Backend / API | Tudo roda local | Se integrar com IA |
| Autenticação | Uso pessoal apenas | Se virar SaaS |

---

## Stack do MVP

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Build | Vite | Startup rápido, zero config |
| UI | React + TypeScript | Componentização, type safety |
| Styling | Tailwind CSS | Utility-first, produtividade |
| Componentes | shadcn/ui | Base de UI consistente |
| Design Tokens | CSS Custom Properties | Nativas, sem runtime, fácil de tematizar |
| Syntax Highlight | Shiki | Qualidade superior, temas customizáveis |
| Fonts | Google Fonts (DM Sans, Inter, JetBrains Mono) | Gratuitas, alta qualidade |

### O que NÃO usar
- Exportação (html-to-image deixa para v1.1)
- State management externo (React state é suficiente)
- Backend/API
- Autenticação

---

## Fluxo Crítico: Criar um Slide

```
1. Allan abre o projeto local (npm run dev)
2. Edita arquivo de dados do slide (conteúdo + props)
3. Visualiza no browser com hot reload
4. Ajusta conteúdo e layout
5. Itera até ficar visualmente atrativo
6. Pronto para usar/customizar
```

---

## Definition of Done (MVP)

O MVP está pronto quando:

- [ ] Design tokens v1 aplicados (DM Sans + orange #FF6B00 + background #FAF8F3)
- [ ] Template Cover renderizando com foto/placeholder no formato 1080×1080
- [ ] Preview em tempo real funcionando
- [ ] Tema light consistente em toda a aplicação
- [ ] `npm run build` passa sem erros
- [ ] Pelo menos 1 capa criada e validada visualmente

---

## Decisões de Simplificação

### Foco
- [x] Design system visual como prioridade (tipografia + cor)
- [x] Um template (Cover) como validação
- [x] Visualização em tempo real
- [x] Tema light only

### O que não faz parte
- [x] Exportação de imagens (v1.1)
- [x] Dark theme (futura iteração)
- [x] Múltiplos templates (futura iteração)
- [x] Persistência de dados (hardcoded no MVP)

---

## Próximos Passos Pós-MVP

1. [ ] Exportação PNG (v1.1)
2. [ ] Demais templates (Content, Code, Comparison, Closing)
3. [ ] Suporte vertical (1080×1350)
4. [ ] Dark theme
5. [ ] Integração com Claude API
