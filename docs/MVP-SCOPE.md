# AVM Slides — MVP Scope

**Data:** 25/03/2026
**Versão:** 1.0

---

## Visão do MVP

**Em uma frase, o que o MVP faz?**
> Renderiza slides HTML com design system próprio e exporta como PNG de alta resolução, pronto para postar no LinkedIn.

**Qual hipótese estamos testando?**
> Um sistema de templates com identidade visual consistente reduz o tempo de criação de posts e aumenta o reconhecimento do perfil no feed.

**Como saberemos que funcionou?**
> Conseguir criar um carousel completo (6-8 slides) em menos de 30 minutos, com qualidade visual que se destaque no feed.

---

## Escopo: O que ENTRA

### Must Have (P0) — Sem isso não lança

| Feature | Descrição | Critério de Done |
|---------|-----------|------------------|
| Design Tokens CSS | Variáveis CSS com toda a paleta, tipografia, espaçamento | Arquivo de tokens importável em qualquer componente |
| Slide Canvas | Container que renderiza no tamanho exato (1080×1350 e 1080×1080) | Renderiza pixel-perfect nos dois formatos |
| Template: Capa | Slide de abertura com título, subtítulo, categoria, tags | Componente funcional com props de conteúdo |
| Template: Conteúdo | Slide com headline, body text, e elementos visuais de apoio | Suporta texto corrido e listas |
| Template: Código | Slide otimizado para blocos de código com syntax highlighting | Shiki/Prism integrado, tema custom funcionando |
| Template: Comparação | Slide com 2 blocos lado a lado (ex: antes/depois, certo/errado) | Cards com cores semânticas (verde/vermelho) |
| Template: Slide Final | Slide de fechamento com assinatura, CTA, redes sociais | Componente com dados do autor |
| Exportação PNG | Botão que exporta o slide atual como PNG 2x | Imagem 2160×2700 ou 2160×2160 em alta qualidade |
| Preview | Visualização em tempo real do slide sendo editado | Hot reload do conteúdo |
| Dark Mode | Tema escuro como padrão de todos os componentes | Todas as cores usando tokens dark |

### Should Have (P1) — Importante, pode esperar v1.1

| Feature | Descrição | Por que não é P0 |
|---------|-----------|------------------|
| Template: Thumbnail/Capa do post | Imagem de capa para o post do LinkedIn (1200×627) | Formato diferente, pode usar o de capa adaptado |
| Exportação em lote | Exportar todos os slides de um carousel de uma vez | No MVP pode exportar um por um |
| Light Mode | Tema claro alternativo | Dark é suficiente para lançar |
| Template: Lista/Bullets | Slide com lista de itens estilizada | Pode usar template de conteúdo com lista manual |
| Galeria de slides | Visualização de todos os slides de um carousel | Preview individual é suficiente |

### Could Have (P2) — Nice to have

| Feature | Descrição | Quando considerar |
|---------|-----------|-------------------|
| Integração Claude API | IA gera conteúdo e monta slides via prompt | Quando design system estiver maduro |
| Template: Citação | Slide com quote estilizado | Quando surgirem posts desse tipo |
| Template: Timeline/Steps | Slide com passos numerados | Quando a necessidade surgir |
| Salvamento local | Salvar carousels como JSON para editar depois | Quando a frequência justificar |

---

## Escopo: O que NÃO ENTRA

### Explicitamente Fora do MVP

| Feature | Por que não entra | Quando reconsiderar |
|---------|-------------------|---------------------|
| Deploy público | É ferramenta pessoal local | Se decidir abrir como SaaS |
| CMS / Dashboard | Over-engineering para 2 posts/semana | Se escalar para time |
| Mobile responsive | Slides são criados no desktop | Nunca (slides são fixos) |
| Animações nos slides | PNG é estático | Se migrar para vídeo/stories |
| Multi-idioma (i18n) | Posts são em português | Se postar em inglês |
| Backend / API | Não precisa de servidor | Se integrar com IA |
| Autenticação | Roda local, só o Allan usa | Se virar SaaS |
| Banco de dados | Arquivos locais são suficientes | Se precisar histórico |

---

## Decisões de Simplificação

### Stack
- [x] Vite + React + TypeScript
- [x] Tailwind CSS para utility classes
- [x] shadcn/ui como base de componentes UI (botões, inputs, etc.)
- [x] CSS Custom Properties para design tokens
- [x] html-to-image para exportação
- [x] Shiki para syntax highlighting (melhor qualidade que Prism)

### Conteúdo
- [x] Props diretas nos componentes (sem CMS)
- [x] Um carousel = um arquivo/página com array de slides
- [x] Conteúdo hardcoded para o MVP, refatorar depois

### UI da Ferramenta
- [x] Página única com preview + controles simples
- [x] Sem onboarding — é ferramenta própria
- [x] Sem editor visual — edita código React direto

---

## Fluxos Críticos

### Fluxo 1: Criar um Carousel

```
1. Allan abre o projeto local (npm run dev)
2. Cria/edita arquivo com array de slides (conteúdo + tipo de template)
3. Visualiza no browser com hot reload
4. Ajusta conteúdo e layout
5. Clica em "Exportar" → PNG de cada slide é gerado
6. Faz upload manual no LinkedIn
```

### Fluxo 2: Exportar Slides

```
1. Allan visualiza um slide no preview
2. Seleciona formato (vertical ou quadrado)
3. Clica em "Exportar PNG"
4. html-to-image gera a imagem em 2x (alta resolução)
5. Imagem é salva na pasta local do projeto
```

---

## Stack do MVP

### Escolhas Definitivas

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Build | Vite | Startup rápido, zero config |
| UI | React + TypeScript | Componentização, type safety |
| Styling | Tailwind CSS | Produtividade, utility-first |
| Componentes | shadcn/ui | Base de UI consistente |
| Design Tokens | CSS Custom Properties | Nativas, sem runtime, fácil de tematizar |
| Syntax Highlight | Shiki | Qualidade superior, temas customizáveis |
| Exportação | html-to-image | Simples, roda no browser, suficiente |
| Fonts | Google Fonts (Space Grotesk, Inter, JetBrains Mono) | Gratuitas, alta qualidade |

### O que NÃO usar

- [ ] Next.js (não precisa de SSR/SSG)
- [ ] State management externo (React state é suficiente)
- [ ] Puppeteer (html-to-image é mais simples para o MVP)
- [ ] Backend/API (tudo client-side)
- [ ] Banco de dados (não precisa persistir dados)
- [ ] Docker (roda direto com node)

---

## Timeline Estimado

| Fase | Duração | Entregáveis |
|------|---------|-------------|
| Setup | 1–2 dias | Projeto Vite, tokens CSS, fonts, Tailwind configurado |
| Design Tokens | 1–2 dias | Todas as variáveis CSS, tema dark implementado |
| Componentes Base | 2–3 dias | SlideCanvas, CodeBlock, Tag, Pagination, AccentBar |
| Templates | 3–4 dias | 5 templates P0 funcionais |
| Exportação | 1 dia | html-to-image integrado, botão de exportar |
| Polish + Primeiro Post | 1–2 dias | Ajustes visuais, primeiro carousel real |
| **Total** | **~10–14 dias** | |

---

## Definition of Done (MVP)

O MVP está pronto quando:

- [ ] Todas as features P0 implementadas
- [ ] Design tokens aplicados consistentemente
- [ ] 5 templates renderizando corretamente nos dois formatos
- [ ] Exportação PNG em alta resolução funcionando
- [ ] Pelo menos 1 carousel completo criado e postado no LinkedIn
- [ ] Workflow viável em < 30 minutos por carousel

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| html-to-image com problemas de fidelidade (fonts, gradientes) | Média | Alto | Testar cedo; fallback para Puppeteer se precisar |
| Scope creep (querer mais templates antes de validar) | Alta | Médio | Limitar a 5 templates P0, criar novos só após usar |
| Fonts não carregando na exportação | Média | Médio | Pré-carregar fonts antes de exportar |
| Cores/contraste não funcionarem no feed do LinkedIn | Baixa | Alto | Testar no mobile real antes de publicar |

---

## Hipóteses a Validar

| Hipótese | Como validar | Sucesso = |
|----------|--------------|-----------|
| Templates aceleram a criação | Medir tempo do 1º vs 5º carousel | < 30 min por carousel |
| Visual se destaca no feed | Feedback qualitativo + engagement | Mais impressões que posts anteriores |
| Consistência visual cria reconhecimento | Postar 8+ vezes com o sistema | Comentários mencionando o visual |
| Workflow "código → export" é viável | Uso contínuo por 4 semanas | Não abandonar o sistema |

---

## Próximos Passos Pós-MVP

1. [ ] Light mode como tema alternativo
2. [ ] Exportação em lote (todos os slides de uma vez)
3. [ ] Template de thumbnail LinkedIn (1200×627)
4. [ ] Integração com Claude API para gerar conteúdo via prompt
5. [ ] Salvar/carregar carousels como JSON
6. [ ] Novos templates conforme necessidade (quote, timeline, lista)
