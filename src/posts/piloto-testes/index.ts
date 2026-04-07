import { SlideFormat } from "@/shared/enums/slide-format"
import type { Carousel } from "@/shared/types"

export const pilotoTestes: Carousel = {
  title: "Programação com Agentes de IA",
  slug: "piloto-testes",
  format: SlideFormat.Square,
  slides: [
    {
      type: "cover",
      overline: "IA · AGENTES · SDK",
      headline: "Programação com Agentes de IA",
      highlightWords: ["Agentes"],
      subtitle:
        "Como LLMs com ferramentas estão mudando a forma de construir software",
      tags: ["IA", "Agentes", "LLM", "TypeScript"],
      authorPhoto: "/src/assets/img-cover.png",
    },
  ],
}
