import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/lib/ThemeProvider"
import { Toaster } from "@/shared/components/ui/sonner"
import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  </StrictMode>
)
