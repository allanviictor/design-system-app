import type { Carousel } from "@/features/slides/types";
import { SlideFormat } from "@/shared/enums/slide-format";

export const pilotoTestes: Carousel = {
  title: "Programação com Agentes de IA",
  format: SlideFormat.Square,
  slides: [
    // 1 — Capa
    {
      type: "cover",
      overline: "IA · AGENTES · SDK",
      headline: "Programação com Agentes de IA",
      highlightWords: ["Agentes"],
      subtitle:
        "Como LLMs com ferramentas estão mudando a forma de construir software",
      tags: ["IA", "Agentes", "LLM", "TypeScript"],
    },

    // 2 — Conteúdo: O que é um agente
    {
      type: "content",
      overline: "CONCEITO",
      headline: "O que é um agente?",
      highlightWords: ["agente"],
      body: [
        "Um agente é um LLM que pode usar ferramentas para completar tarefas. Diferente de um chat simples, ele planeja, executa ações e avalia os resultados.",
        "Em vez de só gerar texto, o agente pode ler arquivos, rodar código, acessar APIs — e decidir o próximo passo com base no resultado anterior.",
      ],
      footnote: "Autonomia + Ferramentas + Loop de feedback = Agente",
    },

    // 3 — Código: SDK da Anthropic
    {
      type: "code",
      overline: "NA PRÁTICA",
      headline: "Criando um agente com a SDK da Anthropic",
      highlightWords: ["SDK"],
      language: "typescript",
      code: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const response = await client.messages.create({
  model: "claude-opus-4-6",
  max_tokens: 1024,
  tools: [readFileTool, executeCodeTool],
  messages: [
    { role: "user", content: userPrompt },
  ],
});`,
      caption: 'O agente para quando stop_reason === "end_turn"',
    },

    // 4 — Comparação: Script vs Agente
    {
      type: "comparison",
      overline: "COMPARAÇÃO",
      headline: "Script vs Agente",
      highlightWords: ["Script", "Agente"],
      left: {
        title: "Script tradicional",
        body: "Sequência rígida de passos. Falha se algo inesperado acontece. Você precisa prever todos os casos de erro.",
        label: "imperativo",
        variant: "error",
      },
      right: {
        title: "Agente com tools",
        body: "Decide os próximos passos com base no resultado anterior. Se algo falha, tenta outra abordagem automaticamente.",
        label: "adaptativo",
        variant: "success",
      },
      conclusion: "Agentes tomam decisões. Scripts executam instruções.",
    },

    // 5 — Conteúdo: Boas práticas
    {
      type: "content",
      overline: "BOAS PRÁTICAS",
      headline: "Controle o escopo do agente",
      highlightWords: ["escopo"],
      body: [
        "Defina exatamente quais ferramentas o agente pode usar. Menos ferramentas significa comportamento mais previsível.",
        "Adicione um limite de iterações para evitar loops. Em produção, monitore o número de tool calls por request.",
      ],
      footnote: "Autonomia é poderosa. Autonomia sem limites é perigosa.",
    },

    // 6 — Fechamento
    {
      type: "closing",
      cta: "Curtiu? Salva pra consultar depois.",
      handle: "@allanvictorm",
      actions: ["Curta", "Comente", "Compartilhe"],
    },
  ],
};
