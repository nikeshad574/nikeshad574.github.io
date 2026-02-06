import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/nikeshad574.github.io/", // Replace with your actual repository name
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
