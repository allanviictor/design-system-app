import { toPng } from "html-to-image"
import type { RefObject } from "react"
import { useCallback, useRef, useState } from "react"

interface UseExportOptions {
  filename: string
}

interface UseExportReturn {
  exportOne: () => Promise<void>
  exportAll: () => Promise<void>
  isExporting: boolean
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = `${filename}.png`
  a.click()
}

async function captureElement(el: HTMLElement): Promise<string> {
  await document.fonts.ready
  return toPng(el, { pixelRatio: 2 })
}

export function useExport(
  ref: RefObject<HTMLDivElement | null>,
  allRefs: RefObject<HTMLDivElement | null>[],
  allFilenames: string[],
  options: UseExportOptions
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false)
  const exportingRef = useRef(false)

  const exportOne = useCallback(async () => {
    if (exportingRef.current || !ref.current) return
    exportingRef.current = true
    setIsExporting(true)
    try {
      const dataUrl = await captureElement(ref.current)
      triggerDownload(dataUrl, options.filename)
    } finally {
      exportingRef.current = false
      setIsExporting(false)
    }
  }, [ref, options.filename])

  const exportAll = useCallback(async () => {
    if (exportingRef.current) return
    exportingRef.current = true
    setIsExporting(true)
    try {
      for (let i = 0; i < allRefs.length; i++) {
        const el = allRefs[i].current
        if (!el) continue
        const dataUrl = await captureElement(el)
        triggerDownload(dataUrl, allFilenames[i])
      }
    } finally {
      exportingRef.current = false
      setIsExporting(false)
    }
  }, [allRefs, allFilenames])

  return { exportOne, exportAll, isExporting }
}
