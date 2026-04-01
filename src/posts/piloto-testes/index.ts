import type { Carousel } from "@/features/slides/types"
import { SlideFormat } from "@/shared/enums/slide-format"

export const pilotoTestes: Carousel = {
  title: "Programação com Agentes de IA",
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
      authorPhoto:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=800&fit=crop",
    },
  ],
}
