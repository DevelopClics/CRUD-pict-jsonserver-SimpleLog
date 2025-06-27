// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync } from "fs";

// 🔁 Plugin pour copier 404.html à la racine de dist
function copy404Plugin() {
  return {
    name: "copy-404",
    closeBundle() {
      copyFileSync(
        resolve(__dirname, "public/404.html"),
        resolve(__dirname, "dist/404.html")
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), copy404Plugin()],
  base: "/CRUD-pict-jsonserver-SimpleLog/", // 👈 nom EXACT du repo GitHub Pages
});
