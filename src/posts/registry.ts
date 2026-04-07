import type { Carousel } from "@/shared/types"
import { pilotoTestes } from "./piloto-testes"

export const registry: Record<string, Carousel> = {
  "piloto-testes": pilotoTestes,
}
