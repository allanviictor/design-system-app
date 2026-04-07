import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PostPage } from "@/features/posts/PostPage"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { Toaster } from "@/shared/components/ui/sonner"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:slug" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  </StrictMode>
)
