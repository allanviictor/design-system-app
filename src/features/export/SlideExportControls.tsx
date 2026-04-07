import { Button } from "@/shared/components/ui/button"
import type { RefObject } from "react"
import { toast } from "sonner"
import { useExport } from "./useExport"

interface SlideExportControlsProps {
  allRefs: RefObject<HTMLDivElement | null>[]
  allFilenames: string[]
}

export function SlideExportControls({
  allRefs,
  allFilenames,
}: SlideExportControlsProps) {
  const { exportAll, isExporting } = useExport(null, allRefs, allFilenames)

  async function handleExportAll() {
    await exportAll()
    toast.success(`${allRefs.length} slides exportados`)
  }

  return (
    <div className="flex justify-center mt-4">
      <Button
        onClick={handleExportAll}
        disabled={isExporting}
        variant="outline"
        size="sm"
        className="cursor-pointer"
      >
        {isExporting ? "Exportando..." : "↓ Todos os slides"}
      </Button>
    </div>
  )
}
