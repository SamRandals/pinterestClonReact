import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Detecta si estás en GitHub Pages (se publica en una subcarpeta)
const repoName = "galleryWeb"; // 👈 pon aquí el nombre exacto de tu repo
const isGithubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGithubPages ? `/${repoName}/` : "./",
  plugins: [react()],
});
