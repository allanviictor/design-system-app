import { Button } from "@/shared/components/ui/button"
import type { RefObject } from "react"
import { toast } from "sonner"
import { useExport } from "./useExport"

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
    <div className="mt-3 flex justify-center gap-2">
      <Button
        onClick={handleExportOne}
        disabled={isExporting}
        size="sm"
        className="cursor-pointer"
      >
        {isExporting ? "Exportando..." : "↓ Este slide"}
      </Button>
      <Button
        onClick={handleExportAll}
        disabled={isExporting}
        variant="outline"
        size="sm"
        className="cursor-pointer"
      >
        ↓ Todos os slides
      </Button>
    </div>
  )
}
