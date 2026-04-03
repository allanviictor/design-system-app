export enum SlideFormat {
  Vertical = "vertical",
  Square = "square",
}

export const SLIDE_DIMENSIONS: Record<
  SlideFormat,
  { width: number; height: number }
> = {
  [SlideFormat.Vertical]: { width: 1080, height: 1350 },
  [SlideFormat.Square]: { width: 1080, height: 1080 },
}
