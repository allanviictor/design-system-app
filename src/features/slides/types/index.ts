export type SlideFormat = "vertical" | "square";

export type SlideType = "cover" | "content" | "code" | "comparison" | "closing";

interface BaseSlide {
  type: SlideType;
  overline?: string;
}

export interface CoverSlide extends BaseSlide {
  type: "cover";
  headline: string;
  highlightWords?: string[];
  subtitle: string;
  tags?: string[];
}

export interface ContentSlide extends BaseSlide {
  type: "content";
  headline: string;
  highlightWords?: string[];
  body: string | string[];
  footnote?: string;
}

export interface CodeSlide extends BaseSlide {
  type: "code";
  headline?: string;
  highlightWords?: string[];
  code: string;
  language: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  caption?: string;
}

export interface ComparisonCard {
  title: string;
  body: string;
  label?: string;
  variant: "success" | "error" | "warning" | "neutral";
  code?: string;
  language?: string;
}

export interface ComparisonSlide extends BaseSlide {
  type: "comparison";
  headline?: string;
  highlightWords?: string[];
  left: ComparisonCard;
  right: ComparisonCard;
  conclusion?: string;
}

export interface ClosingSlide extends BaseSlide {
  type: "closing";
  authorName?: string;
  cta: string;
  handle?: string;
  actions?: string[];
}

export type Slide =
  | CoverSlide
  | ContentSlide
  | CodeSlide
  | ComparisonSlide
  | ClosingSlide;

export interface Carousel {
  title: string;
  format: SlideFormat;
  slides: Slide[];
}
