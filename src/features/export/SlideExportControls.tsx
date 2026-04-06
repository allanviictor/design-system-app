import { useExport } from "./useExport"
import type { RefObject } from "react"
import { toast } from "sonner"

interface SlideExportControlsProps {
  slideRef: RefObject<HTMLDivElement | null>
  filename: string
  allRefs: RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}

export function SlideExportControls({
  slideRef,
  filename,
  allRefs,
  allFilenames,
}: SlideExportControlsProps) {
  const { exportOne, exportAll, isExporting } = useExport(
    slideRef,
    allRefs,
    allFilenames,
    { filename }
  )

  async function handleExportOne() {
    await exportOne()
    toast.success(`${filename}.png exportado`)
  }

  async function handleExportAll() {
    await exportAll()
    toast.success(`${allRefs.length} slides exportados`)
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      <button
        onClick={handleExportOne}
        disabled={isExporting}
        style={{
          padding: "6px 14px",
          background: isExporting ? "rgba(255,107,0,0.6)" : "#FF6B00",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          cursor: isExporting ? "not-allowed" : "pointer",
          transition: "background 0.15s",
        }}
      >
        {isExporting ? "Exportando..." : "↓ Este slide"}
      </button>
      <button
        onClick={handleExportAll}
        disabled={isExporting}
        style={{
          padding: "6px 14px",
          background: "transparent",
          color: isExporting ? "#9A9790" : "#5C5A56",
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: 6,
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          cursor: isExporting ? "not-allowed" : "pointer",
          opacity: isExporting ? 0.5 : 1,
          transition: "opacity 0.15s",
        }}
      >
        ↓ Todos os slides
      </button>
    </div>
  )
}
