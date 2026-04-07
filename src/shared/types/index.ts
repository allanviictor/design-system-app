import { SlideFormat } from "@/shared/enums/slide-format"
export { SlideFormat }

export type SlideType = "cover" | "content" | "code" | "comparison" | "closing"

interface BaseSlide {
  type: SlideType
  overline?: string
}

export interface CoverSlide extends BaseSlide {
  type: "cover"
  headline: string
  highlightWords?: string[]
  subtitle: string
  tags?: string[]
  authorPhoto?: string
}

export type Slide = CoverSlide

export interface Carousel {
  title: string
  slug: string
  format: SlideFormat
  slides: Slide[]
}
